import React, { useState, useEffect } from 'react'

import { connect } from 'react-redux'

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

const pizzaCells = [
  {id: 0, title: 'Super Pizza', description: 'bacon, cheese, olive, sauce', price: 3.25},
  {id: 1, title: 'Simple Pizza', description: 'bacon, cheese, olive, sauce', price: 4.99},
  {id: 2, title: 'Simple Pizza', description: 'bacon, cheese, olive, sauce', price: 5.95},
  {id: 3, title: 'Simple Pizza', description: 'bacon, cheese, olive, sauce', price: 4.99},
  {id: 4, title: 'Simple Pizza', description: 'bacon, cheese, olive, sauce', price: 5.00},
  {id: 5, title: 'Simple Pizza', description: 'bacon, cheese, olive, sauce', price: 5.00},
  {id: 6, title: 'Simple Pizza', description: 'bacon, cheese, olive, sauce', price: 4.10},
  {id: 7, title: 'Simple Pizza', description: 'bacon, cheese, olive, sauce', price: 3.70},
]

function Main(props){
  const { shopCart } = props
  
  const [state, setState] = useState({
    selectedTab: 0,
    isOpenModal: false,
    currency: false,
    isVisibleOrderModal: false,
    isOrderCreate: false,
    isOpenCreateUserModal: false,
    isShowUserOrder: false,
    name: '',
    phone: '',
    address: '',
  })
  
  const {
    currency,
    isVisibleOrderModal,
    isOpenCreateUserModal,
    isShowUserOrder,
    isOrderCreate,
    name, 
    address,
    phone
  } = state
  
  useEffect(() => {
    if(isOrderCreate){
      props.clearOrder()
      setTimeout(() => setState({
        ...state, 
        isVisibleOrderModal: false, 
        isOrderCreate: false
      }), 1000)
    }
  }, [isOrderCreate])
  
  const popover = () => {
    return(
      <>
        {
          Object.keys(props.user).length > 0 ?
          <Button type='text' onClick={() => setState({...state, isShowUserOrder: true})}>Orders</Button> :
          <Button 
            type='text' 
            style={{color: '#03a9f4'}}
            onClick={() => setState({...state, isOpenCreateUserModal: true})}
          >Sign In</Button>
        }
      </>
    )
  }
  
  const sum = () => {
    let sum = 0
    for(let i = 0; i < shopCart.items.length; i++){
      sum += shopCart.items[i].price*shopCart.items[i].count
    }
    return !currency ? sum.toFixed(2) : (sum*1.18).toFixed(2)
  }
  
  const shop = () => {
    return(
      shopCart.items.length > 0 ?
      <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column'}}>
        <div style={{
          padding: '10px'
        }}>
          <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
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
                    onClick={() => item.count >= 2 ? props.updatePizzaCount({id: item.id, count: -1}) : false}
                  />
                  <Typography style={{fontSize: '16px', color: '#03a9f4'}}>{item.count}</Typography>
                  <Button 
                    type='text' 
                    icon={<PlusOutlined style={{fontSize: '14px', color: '#808080'}}/>} 
                    onClick={() => props.updatePizzaCount({id: item.id, count: 1})}
                  />
                </div>
                <Typography style={{fontWeight: 600, marginTop: '3px'}}>{!currency ? (item.price).toFixed(2) : (item.price*1.18).toFixed(2)}</Typography>
                <Button 
                  type='text' 
                  icon={<DeleteOutlined />} 
                  onClick={() => props.removeFromCart(item.id)}
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
          style={{marginTop: '10px', backgroundColor: '#4caf50', color: '#fff'}}
          onClick={() => goTo('cart')}
          // onClick={() => Object.keys(props.user).length > 0 ? createOrder() : setState({...state, isVisibleOrderModal: true})}
        >Checkout</Button>
      </div> :
      <Typography>Cart is empty</Typography>
    )
  }
  
  const createOrder = () => {
    if(Object.keys(props.user).length > 0){
      props.updateUserOrder(props.shopCart.items)
      setState({...state, isOrderCreate: true, isVisibleOrderModal: true})
      return
    }
    setState({...state, isOrderCreate: true})
  }
  
  const createUser = () => {
    props.createUser({name: name, address: address, phone: phone})
    setState({...state, isUserCreate: true, isOpenCreateUserModal: false})
  }

  const goTo = (path) => {
    props.history.push(path)
  }
  
  return(
    <Layout className='main'>
      <Modal
        title='Order info'
        width={'300px'}
        visible={isShowUserOrder}
        onOk={createUser}
        okText={'Confirm'}
        content={!isOrderCreate ? <Typography>hello</Typography> : null}
        onCancel={() => setState({...state, isShowUserOrder: false})}
      >
        {
          props.user.order ?
            <>
              <div className='shopCart' style={{alignItems: 'flex-start'}}>
                <Typography style={{flex: 1}} style={{fontWeight: 600}}>Title</Typography>
                <Typography style={{fontWeight: 600}}>Count</Typography>
              </div> 
              {
                props.user.order.map((item, i) => (
                <div key={i} className='shopCart' style={{alignItems: 'flex-start'}}>
                  <Typography style={{flex: 1}}>{item.title}</Typography>
                  <Typography style={{fontSize: '16px', color: '#03a9f4'}}>{item.count}</Typography>
                </div>
              )) 
              }
            </> 
          : <Typography>No orders</Typography>
        }
      </Modal>
      <Modal
        title='Create user'
        visible={isOpenCreateUserModal}
        onOk={createUser}
        okText={'Confirm'}
        width={'fit-content'}
        content={!isOrderCreate ? <Typography>hello</Typography> : null}
        onCancel={() => setState({...state, isOpenCreateUserModal: false})}
      >
        <div>
          {
            isOrderCreate ?
            <div style={{position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(255, 255, 255, 1)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10}}>
              <CheckOutlined style={{fontSize: '40px', color: '#4caf50'}}/>
              <Typography>Succsesfully create!</Typography>
            </div> 
            :
            null
          }
          <div style={{display: 'flex', flexDirection: 'column'}}>
            <label>Name</label>
            <Input style={{width: '300px', marginTop: '5px'}} onChange={(e) => setState({...state, name: e.target.value})}/>
          </div>
          <div style={{display: 'flex', flexDirection: 'column', marginTop: '10px'}}>
            <label>Phone number</label>
            <Input style={{width: '300px', marginTop: '5px'}} onChange={(e) => setState({...state, name: e.target.value})}/>
          </div>
          <div style={{display: 'flex', flexDirection: 'column', marginTop: '10px'}}>
            <label>Address</label>
            <Input style={{width: '300px', marginTop: '5px'}} onChange={(e) => setState({...state, name: e.target.value})}/>
          </div>
        </div>
      </Modal>
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
      <header className='header'>
        <div style={{flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
          <Typography style={{fontSize: '30px'}}>Simple Pizza App</Typography>
        </div>
        <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
          <div 
            style={{
                position: 'relative', 
                display: 'flex', 
                flexDirection: 'column', 
                cursor: 'pointer'
              }} 
            onClick={() => shopCart.items.length > 0 ? goTo('cart') : false}
          >
            <Badge 
              count={shopCart.items.length} 
              style={{position: 'absolute', right: 20, top: -5, backgroundColor: 'rgba(255, 255, 255, 0.9)', color: 'red', fontSize: '16px', fontWeight: 600}}/>
            <ShoppingCartOutlined style={{fontSize: '30px', color: '#808080'}}/>
          </div>
          {/* <Popover placement='bottomRight' content={shop} visible={true}>
            <div 
              style={{
                  position: 'relative', 
                  display: 'flex', 
                  flexDirection: 'column', 
                  cursor='pointer'
                }} 
              onClick={() => goTo('cart')}
            >
              <Badge 
                count={shopCart.items.length} 
                style={{position: 'absolute', right: 20, top: -5, backgroundColor: 'rgba(255, 255, 255, 0.9)', color: 'red', fontSize: '16px', fontWeight: 600}}/>
              <ShoppingCartOutlined style={{fontSize: '30px', color: '#808080'}}/>
            </div>
          </Popover> */}
          <Divider type='vertical'/>
          <Popover placement='bottomRight' content={popover}>
            {
              Object.keys(props.user).length > 0 ?
                <Avatar size='large' style={{backgroundColor: '#f56a00', fontSize: '24px'}}>{props.user.name[0].toUpperCase()}</Avatar> :
                <Avatar size='large' icon={<UserOutlined />}/>
            }
          </Popover>
        </div>
      </header>
      <Layout.Content style={{padding: '50px 10%'}}>
        <div className='card-flex'>
          {
            pizzaCells.map((item, i) => (
              <Card 
                key={i}
                hoverable  
                cover={<img src='/pizza/images/images.jpeg'/>}
                actions={[
                  <Button type='primary' onClick={() => props.addToCart(item)}>Order</Button>,
                ]}
                style={{ width: '240px', margin: '5px' }}
              >
                <Card.Meta title={item.title} description={item.description}/>
              </Card>
            ))
          }
        </div>
      </Layout.Content>
    </Layout>
  )
}

const mapStateToProps = state => ({
  user: state.user,
  shopCart: state.shopCart
})

const mapDispatchToProps = dispatch => ({
  addToCart: (data) => dispatch({type: 'ADD_TO_CART', payload: data}),
  updatePizzaCount: (data) => dispatch({type: 'UPDATE_COUNT', payload: data}),
  removeFromCart: (id) => dispatch({type: 'REMOVE_FROM_CART', payload: id}),
  clearOrder: () => dispatch({type: 'CLEAR_ORDER'}),
  createUser: (data) => dispatch({type: 'CREATE_USER', payload: data}) ,
  updateUserOrder: (data) => dispatch({type: 'UPDATE_USER_ORDER', payload: data})
})

export default connect(mapStateToProps, mapDispatchToProps)(Main)