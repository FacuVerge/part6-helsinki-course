import { createSlice } from '@reduxjs/toolkit'
import anecdotes from '../services/anecdotes'

const anecdoteSlice = createSlice({
  name: 'anecdotes',  
  initialState: [],
  reducers: {
    vote(state, action) {
      const newAnecdotes = state.map(anecdote => anecdote.id === action.payload.id ? action.payload : anecdote ) 
      return [...newAnecdotes].sort((a, b) => b.votes - a.votes)
    },
    appendAnecdote(state, action) {      
      state.push(action.payload)    
    },
    setAnecdotes(state, action) {      
      return action.payload    
    },
    sortAnecdotes(state, action) {
      return [...state].sort((a, b) => b.votes - a.votes)
    }
  },
})

export const initializeAnecdotes = () => {  
  return async dispatch => {    
    const anecdotesData = await anecdotes.getAll()    
    dispatch(setAnecdotes(anecdotesData))  
  }
}

export const createAnecdote = content => {  
  return async dispatch => {    
    const newAnecdote = await anecdotes.createNew(content)    
    dispatch(appendAnecdote(newAnecdote))  
  }
}

export const voteAnecdote = anecdote => {  
  return async dispatch => {    
    const newAnecdote = await anecdotes.putAnecdote({ ...anecdote, votes: anecdote.votes + 1})    
    dispatch(vote(newAnecdote))  
  }
}

export const { vote, appendAnecdote, setAnecdotes } = anecdoteSlice.actions
export default anecdoteSlice.reducer