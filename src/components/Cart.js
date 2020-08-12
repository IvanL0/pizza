import React, { useState, useEffect, useCallback } from 'react'

import { useSelector, useDispatch  } from 'react-redux'

import {
  Avatar,
  Layout,
  Card,
  Divider,
  Button,
  Popover,
  Badge,
  Typography,
  Switch,
  Modal,
  Input,
} from 'antd'

import {
  UserOutlined,
  ShoppingCartOutlined,
  DeleteOutlined,
  MinusOutlined,
  PlusOutlined,
  CheckOutlined,
} from '@ant-design/icons'

function Cart(props){
  const dispatch = useDispatch()
  const shopCart = useSelector(state => state.shopCart)
  const user = useSelector(state => state.user)

  const updatePizzaCount = useCallback(
    (data) => dispatch({type: 'UPDATE_COUNT', payload: data})
    , [dispatch]
  )

  const removeFromCart = useCallback(
    (id) => dispatch({type: 'REMOVE_FROM_CART', payload: id})
    , [dispatch]
  )

  const updateUserOrder = useCallback(
    (data) => dispatch({type: 'UPDATE_USER_ORDER', payload: data})
    , [dispatch]
  )

  const clearOrder = useCallback(
    () => dispatch({type: 'CLEAR_ORDER'})
    , [dispatch]
  )

  const [state, setState] = useState({
    currency: false,
    isVisibleOrderModal: false,
    isOrderCreate: false,
  })
  
  const {
    currency,
    isVisibleOrderModal,
    isOrderCreate,
  } = state

  useEffect(() => {
    if(isOrderCreate){
      clearOrder()
      setTimeout(() => setState({
        ...state, 
        isVisibleOrderModal: false, 
        isOrderCreate: false
      }), 1000)
      setTimeout(() => props.history.push('pizza'), 1100)
    }
  }, [isOrderCreate])

  const sum = () => {
    let sum = 0
    for(let i = 0; i < shopCart.items.length; i++){
      sum += shopCart.items[i].price*shopCart.items[i].count
    }
    return !currency ? sum.toFixed(2) : (sum*1.18).toFixed(2)
  }

  const createOrder = () => {
    if(Object.keys(user).length > 0){
      updateUserOrder(shopCart.items)
      setState({...state, isOrderCreate: true, isVisibleOrderModal: true})
      return
    }
    setState({...state, isOrderCreate: true})
  }

  return (
    <Layout>
      <Modal
        title='Add client info and confirm'
        visible={isVisibleOrderModal}
        onOk={createOrder}
        okText={'Confirm'}
        width={'fit-content'}
        content={!isOrderCreate ? <Typography>hello</Typography> : null}
        onCancel={() => setState({...state, isVisibleOrderModal: false})}
      >
        <div>
          {
            isOrderCreate ?
            <div className='modalConfirm'>
              <CheckOutlined style={{fontSize: '40px', color: '#4caf50'}}/>
              <Typography>Succsesfully confirm!</Typography>
            </div> 
            :
            null
          }
          <div style={{display: 'flex', flexDirection: 'column'}}>
            <label>Name</label>
            <Input style={{width: '300px', marginTop: '5px'}}/>
          </div>
          <div style={{display: 'flex', flexDirection: 'column', marginTop: '10px'}}>
            <label>Phone number</label>
            <Input style={{width: '300px', marginTop: '5px'}}/>
          </div>
          <div style={{display: 'flex', flexDirection: 'column', marginTop: '10px'}}>
            <label>Address</label>
            <Input style={{width: '300px', marginTop: '5px'}}/>
          </div>
        </div>
      </Modal>
      <div className='cart'>
        <Typography style={{fontSize: '1.4em', fontWeight: 600}}>Cart</Typography>
        <div className='cart_body'>
          <div style={{
            padding: '10px'
          }}>
            <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginBottom: '20px'}}>
              <Typography style={{fontSize: '1.1em', fontWeight: 600, marginBottom: '10px'}}>List</Typography>
              <Switch 
                checkedChildren='US' 
                unCheckedChildren='EUR' 
                defaultChecked 
                onChange={() => setState({...state, currency: !currency})}
              />
            </div>
            {
              shopCart.items.map((item, i) => (
                <div 
                  key={i} 
                  className='shopCart'
                >
                  <Typography style={{flex: 1, marginTop: '3px'}}>{item.title}</Typography>
                  <div className='counter'>
                    <Button 
                      type='text' 
                      icon={<MinusOutlined style={{fontSize: '14px', color: '#808080'}}/>} 
                      onClick={() => item.count >= 2 ? updatePizzaCount({id: item.id, count: -1}) : false}
                    />
                    <Typography style={{fontSize: '16px', color: '#03a9f4'}}>{item.count}</Typography>
                    <Button 
                      type='text' 
                      icon={<PlusOutlined style={{fontSize: '14px', color: '#808080'}}/>} 
                      onClick={() => updatePizzaCount({id: item.id, count: 1})}
                    />
                  </div>
                  <Typography style={{fontWeight: 600, marginTop: '3px'}}>{!currency ? (item.price).toFixed(2) : (item.price*1.18).toFixed(2)}</Typography>
                  <Button 
                    type='text' 
                    icon={<DeleteOutlined />} 
                    onClick={() => removeFromCart(item.id)}
                  />
                </div>
              ))
            }
            <Divider />
            <div style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between'
            }}>
              <Typography style={{fontWeight: 600}}>Current</Typography>
              <Typography style={{fontWeight: 600}}>{sum()}</Typography>
            </div>
          </div>
          <Button 
            style={{margin: '10px', backgroundColor: '#4caf50', color: '#fff'}}
            // onClick={() => goTo('cart')}
            onClick={() => Object.keys(user).length > 0 ? createOrder() : setState({...state, isVisibleOrderModal: true})}
          >Checkout</Button>
        </div>
      </div>
    </Layout>
  )
}

export default Cart