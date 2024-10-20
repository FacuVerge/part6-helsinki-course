import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createAnecdote } from '../requests'
import { useContext } from 'react'
import NotificationContext from './NotificationContext'

const AnecdoteForm = () => {

  const queryClient = useQueryClient()
  const [notification, notificationDispatch] = useContext(NotificationContext)

  const newAnecdoteMutation = useMutation({ 
    mutationFn: createAnecdote,
    onSuccess: (newAnecdote) => {      
      const anecdotes = queryClient.getQueryData(['anecdotes'])      
      queryClient.setQueryData(['anecdotes'], anecdotes.concat(newAnecdote))
    },
    onError: (error) => {
      notificationDispatch({ type: 'NOTIFICATE', payload: error.response.data.error})
      setTimeout(() => notificationDispatch({ type: 'NOTIFICATE', payload: ''}), 5000)
    }
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newAnecdoteMutation.mutate({ content, id: Math.floor(Math.random() * 10000).toString(), votes: 0 })  
    notificationDispatch({ type: 'NOTIFICATE', payload: 'New Anecdote Created!'})
    setTimeout(() => notificationDispatch({ type: 'NOTIFICATE', payload: ''}), 5000)
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
