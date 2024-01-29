import { useDispatch } from 'react-redux'
import { newAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const addAnecdote = (event) => {
        event.preventDefault()
        dispatch(newAnecdote(event.target.anecdote.value))
      }
      
    return (
        <form onSubmit={ addAnecdote }>
            <div><input name='anecdote' /></div>
            <button type='submit'>create</button>
        </form>
    )
}

export default AnecdoteForm