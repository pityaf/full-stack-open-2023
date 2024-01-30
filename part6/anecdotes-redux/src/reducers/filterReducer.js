export const filterChange = (filter) => {
    return {
        type: 'SET_FILTER',
        payload: filter
    }
}

export const filterReducer = (state = null, action) => {
    switch (action.type) {
        case 'SET_FILTER':
          return action.payload
        default:
          return state
      }
}