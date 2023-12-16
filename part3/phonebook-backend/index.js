require('dotenv').config();

const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const Person = require('./models/person');

const app = express();

const requestLogger = (request, response, next) => {
    console.log('Method:', request.method)
    console.log('Path:  ', request.path)
    console.log('Body:  ', request.body)
    console.log('---')
    next()
  }

app.use(express.static('dist'))
app.use(express.json());
app.use(cors())
app.use(morgan('tiny'));
app.use(requestLogger)

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
    Person.find({}).then(persons => {
        response.json(persons);
    })
})

app.get('/api/persons/:id', (request, response, next) => {
    Person
        .findById(request.params.id)
        .then(person => {
            if(person) {
                response.json(person);
            } else {
                response.status(404).end();
            }
       
        })
        .catch(error => next(error));
})

app.get('/info', (request, response) => {
    Person.find({}).then(persons => {
        const info = `<p>Phonebook hs info for ${ persons.length } people</p>`;
        const date = `<p>${ new Date }</p>`;

        response.send(info + date);
    })
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
        const person = new Person ({
            name: body.name,
            number: body.number,
        })
    
        if(duplicate(person)) {
            response.status(400).json({
                'error': 'name must be unique',
            }).end();
        } else {
            person.save().then(savedPerson => {
                response.json(savedPerson);
            })
        }
    }
})

app.put('/api/persons/:id', (request, response, next) => {
    const body = request.body;

    console.log('updating...')

    const person = {
        name: body.name,
        number: body.number,
    }

    Person.findByIdAndUpdate(request.params.id, person, {new: true})
        .then(updatedPerson => {
            response.json(updatedPerson);
        })
        .catch(error => next(error));
})


app.delete('/api/persons/:id', (request, response, next) => {
    Person.findByIdAndDelete(request.params.id)
        .then(restult => {
            response.status(204).end();
        })
        .catch(error => next(error));
})


const unknownEndpoint = (request, response) => {
    response.status(404).send({
        'error': 'unknown endpoint',
    });
}
app.use(unknownEndpoint);

const errorHandler = (error, request, response, next) => {
    console.log(error.message);

    if(error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id'});
    }

    next(error);
}
app.use(errorHandler);

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server running on port ${ PORT }`);
});