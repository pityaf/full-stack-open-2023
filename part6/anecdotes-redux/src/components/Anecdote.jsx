import { useDispatch } from 'react-redux'
import { updateAnectodes } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

import anecdotesService from '../utils/anecdotes'

const Anecdote = ({ anecdote }) => {
    const dispatch = useDispatch()

    const vote = (anecdote) => {
        console.log('vote', anecdote.id)
        dispatch(updateAnectodes(anecdote))
      }
      
    return (
        <div>
            <div>
                { anecdote.content }
            </div>
            <div>
                has <strong>{ anecdote.votes }</strong>
            <button onClick={ () => vote(anecdote) }>vote</button>
            </div>
        </div>
    )
}

export default Anecdote