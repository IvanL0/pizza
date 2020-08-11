import { combineReducers } from 'redux'

import shopCart from './shopCart'
import user from './user'

export const appReducer = combineReducers({
  shopCart,
  user,
})