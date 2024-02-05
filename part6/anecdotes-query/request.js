import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    ...anecdote,
    id: getId(),
    votes: 0
  }
}

export const getAnecdotes = () =>
    axios.get(baseUrl).then(res => res.data)

export const createAnecdote = (newAnecdote) => {
    axios.post(baseUrl, asObject(newAnecdote)).then(res => res.data).catch(e => console.log(e))

}

export const voteAnecdote = (anecdote) => {
    console.log(`${baseUrl}/${anecdote.id}`, anecdote)
    axios.put(`${baseUrl}/${anecdote.id}`, anecdote).then(res => res.data)
}