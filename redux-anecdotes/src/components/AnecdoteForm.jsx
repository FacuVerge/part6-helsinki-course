import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteForm = () => {

  const dispatch = useDispatch()

  const create = async (event) => {
    event.preventDefault()    
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    dispatch(createAnecdote(content))
    dispatch(setNotification('New Anecdote Created', 5))
  }


  return (
    <>
        <h2>Create new Anecdote</h2>
        <form onSubmit={create}>
            <input name='anecdote'/>
            <button type="submit">create</button>
        </form>
    </>
  )
}

export default AnecdoteForm