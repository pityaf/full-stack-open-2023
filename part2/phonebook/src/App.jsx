import { useState, useEffect } from 'react';

import personServices from './services/person';

import Persons from './Components/Persons';
import Form from './Components/Form';
import Search from './Components/Search';
import Notification from './Components/Notification';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filteredPerson, setFilteredPerson] = useState([]);
  const [filter, setFilter] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [errorType, setErrorType] = useState(null);

  useEffect(() => {
    personServices
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons);
      })
  }, []);

  const checkDuplicate = (newPerson) => {
    return persons.find(person => person.name === newPerson.name);
  }

  const addNewPerson = (newPerson) => {
    personServices
      .create(newPerson)
      .then(returnPerson => {
        setPersons(persons.concat(returnPerson));
    })
  }

  const updatePersonNumber = (newPerson) => {
    personServices
    .update(newPerson.id, newPerson)
    .then(returnPerson => { 
      setPersons(persons.map(person => person.id === returnPerson.id ? returnPerson : person));
  })
  }

  const addPerson = (event) => {
    event.preventDefault();
    const newPerson = {
      name: newName,
      number: newNumber,
    }
    
    if(checkDuplicate(newPerson)) {
      newPerson.id = checkDuplicate(newPerson).id;
      if(confirm(`${newName} is already added to phonebook, replace the old number with the new one?`)) {
        updatePersonNumber(newPerson);

        const message = 'Update ' + newPerson.name + ' information';

        setErrorMessage(message);
        setErrorType('addition');
  
        setTimeout(() => {
          setErrorMessage(null);
          setErrorType(null);
        }, 3000);
      }
    } else {
      addNewPerson(newPerson);

      const message = 'Added ' + newPerson.name;

      setErrorMessage(message);
      setErrorType('addition');

      setTimeout(() => {
        setErrorMessage(null);
        setErrorType(null);
      }, 3000);
    }
  }

  const handleNewPerson = (event) => {
    setNewName(event.target.value)
  }
  const handleNewNumber = (event) => {
    setNewNumber(event.target.value)
  }
  const handleFilterPersons = (event) => {
    filteredPerson.length === 0 ? setFilter(false) : setFilter(true);
    setFilteredPerson(persons.filter(person => person.name.toLowerCase().includes(event.target.value.toLocaleLowerCase())));
  }
  const handleRemoval = (id) => {
    personServices
      .remove(id)
      .then((/*response*/) => {
        setPersons(persons.filter(person => person.id !== id));

        const message = 'Removed ' + persons.find(p => p.id === id).name;

        setErrorMessage(message);
        setErrorType('removal');
        
        setTimeout(() => {
          setErrorMessage(null);
          setErrorType(null);
        }, 3000);
      })
      .catch((/*error*/) => {

        const message = 'Information of  ' + persons.find(p => p.id === id).name + ' has already been removed from server';

        setErrorMessage(message);
        setErrorType('removal');

        setPersons(persons.filter(p => p.id !== id));
        
        setTimeout(() => {
          setErrorMessage(null);
          setErrorType(null);
        }, 3000);
      })
  }

  const onSearchSubmit = (event) => {
    event.preventDefault();
  }

  const personToShow = filter ? filteredPerson : persons;

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={ errorMessage } type={ errorType } />
      <Form debug={ newName } onSubmit={ addPerson } handleNewPerson={ handleNewPerson } handleNewNumber={ handleNewNumber } />
      <br />
      <Search onSearchSubmit={ onSearchSubmit } handleFilterPersons={ handleFilterPersons } value={ filteredPerson }/>
      <h2>Numbers</h2>
      <ul>
        {
          personToShow.map(person => {
            return(
              <Persons key={ person.id } name={ person.name } number={ person.number } handleRemoval={ () => handleRemoval(person.id) }/>
            )
          })
        }
      </ul>
    </div>
  )
};

export default App;