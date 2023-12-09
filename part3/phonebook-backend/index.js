const express = require('express');
const morgan = require('morgan');
const cors = require('cors')

const app = express();

const requestLogger = (request, response, next) => {
    console.log('Method:', request.method)
    console.log('Path:  ', request.path)
    console.log('Body:  ', request.body)
    console.log('---')
    next()
  }

app.use(express.json());
app.use(cors())
app.use(morgan('tiny'));
app.use(requestLogger)
app.use(express.static('build'))

let persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
];

const generateId = () => {
    return Math.floor(Math.random() * Number.MAX_SAFE_INTEGER);
}

const duplicate = (person) => {
    return persons.find(per => per.name === person.name);
}


app.get('/', (request, response) => {
    response.send('<h1>Server Working!</h1>');
})

app.get('/api/persons', (request, response) => {
    response.json(persons);
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id);
    const person = persons.find(person => person.id === id);

    if(person) {
        response.json(person);
    }

    response.status(404).end();
})

app.get('/info', (request, response) => {
    const info = `<p>Phonebook hs info for ${ persons.length } people</p>`;
    const date = `<p>${ new Date }</p>`;

    response.send(info + date);
})

morgan.token('body', request => JSON.stringify(request.body));
const postMorganLog = morgan(':method :url :status :res[content-length] - :response-time ms :body')

app.post('/api/persons', postMorganLog, (request, response) => {
    const body = request.body;

    if(!body) {
        response.status(400).json({
            'error': 'content missing',
        });
    }

    if(!body.name || !body.number) {
        response.status(400).json({
            'error': 'content missing',
        });
    } else {
        const person = {
            id: generateId(),
            name: body.name,
            number: body.number,
        }
    
        if(duplicate(person)) {
            response.status(400).json({
                'error': 'name must be unique',
            }).end();
        } else {
            persons = persons.concat(person);
            response.json(persons);
        }
    }
})


app.delete('/api/persons/:id', (request, response) => {
    const id = request.params.id;
    persons = persons.filter(person => person.id !== id);

    response.status(204).end();
})


const unknownEndpoint = (request, response) => {
    response.status(404).send({
        'error': 'unknown endpoint',
    });
}

app.use(unknownEndpoint);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${ PORT }`);
});