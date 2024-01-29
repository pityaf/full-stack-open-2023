import { useSelector, useDispatch } from 'react-redux'
import { addVote, orderAnecdotes } from './reducers/anecdoteReducer'

import AnecdoteForm from './components/AnecdoteForm'

const App = () => {
  const anecdotes = useSelector(state => state)
  const dispatch = useDispatch()

  const vote = (id) => {
    console.log('vote', id)
    dispatch(addVote(id));
  }

  const order = () => {
    dispatch(orderAnecdotes())
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      {
        anecdotes.map(anecdote =>
          <div key={ anecdote.id }>
            <div>
              { anecdote.content }
            </div>
            <div>
              has { anecdote.votes }
              <button onClick={ () => vote(anecdote) }>vote</button>
            </div>
          </div>
        )
      }
      <button onClick={ order }>order anecdotes</button>
      <h2>create new</h2>
      <AnecdoteForm />
    </div>
  )
}

export default App