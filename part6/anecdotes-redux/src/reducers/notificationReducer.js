import { createSlice } from "@reduxjs/toolkit"

export const setNotification = (text) => {
    return dispatch => {
        dispatch(showNotification(text))
        setTimeout(() => {
            dispatch(hideNotification())
        }, 5000)
    }
}

const notificationSlice = createSlice({
    name: 'notification',
    initialState: '',
    reducers: {
        showNotification(state, action) {
            return action.payload
        },
        hideNotification(state, action) {
            return ''
        }
    }
})
 

export const { showNotification, hideNotification } = notificationSlice.actions
export default notificationSlice.reducer