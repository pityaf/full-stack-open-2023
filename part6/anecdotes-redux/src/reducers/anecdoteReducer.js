const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

export const addVote = (id) => {
  return {
    type: 'VOTE',
    payload: id
  }
}

export const newAnecdote = (anecdote) => {
  return {
    type: 'ADD_ANECDOTE',
    payload: anecdote
  }
}

export const orderAnecdotes = () => {
  return {
    type: 'ORDER_ANECDOTE'
  }
}


const initialState = anecdotesAtStart.map(asObject)

export const reducer = (state = initialState, action) => {
  console.log('state now: ', state)
  console.log('action', action)

  switch(action.type) {
    case 'ORDER_ANECDOTE':
      return state.sort((a, b) => b.votes - a.votes)
    case 'ADD_ANECDOTE':
      return state.concat(asObject(action.payload))
    case 'VOTE': {
      const updateAnectodes = state.find(anecdote => anecdote.id === action.payload.id)
      const changeAnectoders = {
        ...updateAnectodes,
        votes: updateAnectodes.votes + 1
      }
      return state.map(anecdote => anecdote.id !== action.payload.id ? anecdote : changeAnectoders)
    }
    default:
       return state
  }
}
