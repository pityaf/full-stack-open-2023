import axios from 'axios'

const baseURL = 'http://localhost:3001/anecdotes'

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const getAll = async () => {
    const response = await axios.get(baseURL)
    return response.data
}

const createNew = async (content) => {
    const obj = asObject(content)
    const response = await axios.post(baseURL, obj)
    return response.data
}

const updateVote = async (content) => {
  const response = await axios.get(`${baseURL}/${content.id}`)
  const newAnecdote = {
    ...response.data,
    votes: response.data.votes + 1
  }
  const request = await axios.put(`${baseURL}/${content.id}`, newAnecdote)
  return request.data
}

export default { getAll, createNew, updateVote }