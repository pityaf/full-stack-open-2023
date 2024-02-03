import { createSlice } from '@reduxjs/toolkit'

import anecdoteService from '../utils/anecdotes'

const anecdoteSlice = createSlice({
    name: 'anecdotes',
    initialState: [],
    reducers: {
        addVote(state, action)  {
          const updateAnectodes = action.payload
          return state.map(anecdote => anecdote.id !== action.payload ? anecdote : updateAnectodes)
        },
        appendAnecdote(state, action) {
          state.push(action.payload)
        },
        setAnecdotes(state, action) {
          return action.payload
        }
    }
})

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}

export const updateAnectodes = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.updateVote(content)
    dispatch(addVote(newAnecdote))
    
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const { addVote, appendAnecdote, setAnecdotes } = anecdoteSlice.actions
export default anecdoteSlice.reducer
