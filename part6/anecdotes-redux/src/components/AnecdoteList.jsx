import { useSelector } from 'react-redux'

import Anecdote from "./Anecdote"

const AnecdotesList = () => {
    const anecdotes = useSelector(state => {
        if(state.filter === null) {
            return state.anecdotes
        }
        return state.anecdotes.filter(anecdote => anecdote.content.includes(state.filter))
    })

    const byVote = (a, b) => b.votes - a.votes

    return(
        <>
            {
                anecdotes.sort(byVote).map(anecdote =>
                    <Anecdote key={ anecdote.id } anecdote={ anecdote }/>
                )
            }
        </>
    )
}

export default AnecdotesList