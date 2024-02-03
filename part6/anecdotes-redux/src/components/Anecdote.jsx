import { useDispatch } from 'react-redux'
import { addVote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const Anecdote = ({ anecdote }) => {
    const dispatch = useDispatch()

    const vote = (id, content) => {
        console.log('vote', id)
        dispatch(addVote(id));
        dispatch(setNotification(`You voted for "${content}" !`))
      }
      
    return (
        <div>
            <div>
                { anecdote.content }
            </div>
            <div>
                has <strong>{ anecdote.votes }</strong>
            <button onClick={ () => vote(anecdote.id, anecdote.content) }>vote</button>
            </div>
        </div>
    )
}

export default Anecdote