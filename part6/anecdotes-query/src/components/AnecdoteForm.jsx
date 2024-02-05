import { useMutation, useQueryClient } from '@tanstack/react-query'

import { useNotificationDispatch } from '../NotificationContext'

import { createAnecdote } from '../../request'

const AnecdoteForm = () => {

  const dispatch = useNotificationDispatch()

  const queryClient = useQueryClient()

  const newAnecdoteMutation = useMutation({ 
    mutationFn: createAnecdote,
    onSuccess: () => {
      queryClient.invalidateQueries(['anecdotes'])
      dispatch({ type: 'showNotification', payload: `Anecdote added sucessfully !` })
      setTimeout(() => {
        dispatch({ type: 'hideNotification' })
      }, 5000)
    },
    onError: () => {
      dispatch({ type: 'showNotification', payload: `too short anecdote, must have length 5 or more !` })
      setTimeout(() => {
        dispatch({ type: 'hideNotification' })
      }, 5000)
    }
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newAnecdoteMutation.mutate({ content })
}

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
