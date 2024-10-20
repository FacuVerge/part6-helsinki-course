import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',  
  initialState: null,
  reducers: {
    notificate(state, action) {
      return action.payload
    }
  },
})

export const setNotification = (message, time) => {  
  return async dispatch => {    
    dispatch(notificate(message))
		setTimeout(() => {
			dispatch(notificate(''))
		}, time * 1000)
  }
}

export const { notificate } = notificationSlice.actions
export default notificationSlice.reducer