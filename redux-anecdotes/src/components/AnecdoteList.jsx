import { useDispatch, useSelector } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {

	const anecdotes = useSelector(({filter, anecdotes}) => {    
		if ( filter === '' ) {      
			return anecdotes
		} else {
			return anecdotes.filter(anecdote => anecdote.content.includes(filter))
		}
	})
	
	const dispatch = useDispatch()
  
	const vote = (anecdote) => {
		dispatch(voteAnecdote(anecdote))
		dispatch(setNotification('Anecdote Voted!', 3))
	}

  	return(
  		<>
			{anecdotes.map(anecdote =>
				<div key={anecdote.id}>
		  			<div>
						{anecdote.content}
		  			</div>
		  			<div>
						has {anecdote.votes}
						<button onClick={() => vote(anecdote)}>vote</button>
		  			</div>
				</div>
			)}
  		</>
	)
}

export default AnecdoteList