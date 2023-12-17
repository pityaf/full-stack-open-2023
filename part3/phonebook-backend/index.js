require('dotenv').config();

const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const Person = require('./models/person');

const app = express();

const requestLogger = (request, _response, next) => {
    console.log('Method:', request.method);
    console.log('Path:  ', request.path);
	console.log('Body:  ', request.body);
    console.log('---');
    next();
  };

app.use(express.static('dist'));
app.use(express.json());
app.use(cors());
app.use(morgan('tiny'));
app.use(requestLogger);

app.get('/', (_request, response) => {
    response.send('<h1>Server Working!</h1>');
});

app.get('/api/persons', (_request, response) => {
    Person.find({}).then(persons => {
        response.json(persons);
    });
});

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
});

app.get('/info', (_request, response) => {
    Person.find({}).then(persons => {
        const info = `<p>Phonebook hs info for ${ persons.length } people</p>`;
        const date = `<p>${ new Date }</p>`;
        response.send(info + date);
    });
});

morgan.token('body', request => JSON.stringify(request.body));
const postMorganLog = morgan(':method :url :status :res[content-length] - :response-time ms :body');

app.post('/api/persons', postMorganLog, (request, response, next) => {
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
        });
    
        person.save().then(savedPerson => {
            response.json(savedPerson);
        })
        .catch(error => next(error));
    }
});

app.put('/api/persons/:id', (request, response, next) => {
    const { name, number} = request.body;

    console.log('updating...');

    Person.findByIdAndUpdate(request.params.id, { name, number }, { new: true, runValidators: true, context: 'query' })
        .then(updatedPerson => {
            response.json(updatedPerson);
        })
        .catch(error => next(error));
});


app.delete('/api/persons/:id', (request, response, next) => {
    Person.findByIdAndDelete(request.params.id)
        .then(() => {
            response.status(204).end();
        })
        .catch(error => next(error));
});


const unknownEndpoint = (_request, response) => {
    response.status(404).send({
        'error': 'unknown endpoint',
    });
};
app.use(unknownEndpoint);

const errorHandler = (error, _request, response, next) => {
    console.log(error.message);

    if(error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id'});
    } else if(error.name === 'ValidationError') {
        return response.status(400).json({ error: error.message });
    }

    next(error);
};
app.use(errorHandler);

// eslint-disable-next-line no-undef
const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server running on port ${ PORT }`);
});