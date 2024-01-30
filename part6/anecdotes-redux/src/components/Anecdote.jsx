import { useDispatch } from 'react-redux'
import { addVote } from '../reducers/anecdoteReducer'

const Anecdote = ({ anecdote }) => {
    const dispatch = useDispatch()

    const vote = (id) => {
        console.log('vote', id)
        dispatch(addVote(id));
      }
      
    return (
        <div>
            <div>
                { anecdote.content }
            </div>
            <div>
                has { anecdote.votes }
            <button onClick={ () => vote(anecdote.id) }>vote</button>
            </div>
        </div>
    )
}

export default Anecdote