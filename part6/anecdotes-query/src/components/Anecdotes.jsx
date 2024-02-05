import { useMutation, useQueryClient } from '@tanstack/react-query'

import { useNotificationDispatch } from '../NotificationContext'

import { voteAnecdote } from '../../request'

const Anecdotes = ({ anecdotes }) => {

    const dispatch = useNotificationDispatch()

    const queryClient = useQueryClient()

    const updateAnecdoteMutation = useMutation({ 
        mutationFn: voteAnecdote,
        onSuccess: () => {
            queryClient.invalidateQueries('anecdotes')
        }
    })

    const handleVote = (anecdote) => {
        console.log('vote', anecdote.id)
        console.log({ ...anecdote, votes: anecdote.votes + 1 })
        updateAnecdoteMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 })

        dispatch({ type: 'showNotification', payload: `You voted: ${anecdote.content} !` })
        setTimeout(() => {
          dispatch({ type: 'hideNotification' })
        }, 5000)
    }

    return (
        <>
        {
            anecdotes.map(anecdote =>
            <div key={anecdote.id}>
                <div>
                    { anecdote.content }
                </div>
                <div>
                    has {anecdote.votes}
                    <button onClick={() => handleVote(anecdote)}>vote</button>
                </div>
            </div>
        )}
        </>
    )
}

export default Anecdotes