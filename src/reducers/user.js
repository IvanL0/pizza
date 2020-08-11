function user(state = {}, action){
  switch(action.type){
    case 'CREATE_USER':
      return Object.assign({}, state, {
        ...action.payload,
      })
    case 'UPDATE_USER_ORDER':
      return {
        ...state,
        order: action.payload
      }
    case 'CLEAR':
      return null
    default:
      return state
  }
}

export default user