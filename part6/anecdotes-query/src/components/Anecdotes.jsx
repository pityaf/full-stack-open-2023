import { useMutation, useQueryClient } from '@tanstack/react-query'

import { voteAnecdote } from '../../request'

const Anecdotes = ({ anecdotes }) => {

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