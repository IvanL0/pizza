import lodash from 'lodash'

const initialState = {
  items: [],
}

function shopCart(state = initialState, action){
  switch(action.type){
    case 'ADD_TO_CART':
      let newObj = {
        ...action.payload,
        count: 1
      }
      return {
        items: [
          ...state.items,
          newObj
        ]
      }
    case 'UPDATE_COUNT':
      let newArr = state.items.reduce((newArr, item) => {
        if(item.id === action.payload.id){
          item.count = item.count + action.payload.count
          newArr.push(item)
        } else {
          newArr.push(item)
        }
        return newArr
      }, [])
      return {
        items: [
          ...newArr
        ]
      }
    case 'REMOVE_FROM_CART':
      let remove = state.items.filter(item => item.id !== action.payload)
      return {
        items: [
          ...remove,
        ]
      }
    case 'CLEAR_ORDER':
      return initialState
    default:
      return state
  }
}

export default shopCart