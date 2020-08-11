import React from 'react'

import { connect } from 'react-redux'

import Avatar from './Avatar'

class Header extends React.Component{
  constructor(props){
    super(props)
  }
  
  exit = () => {
    localStorage.removeItem('test')
    this.props.clear()
  }
  
  render(){
    return(
      <div className='header'>
        <div 
          style={{cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center'}}
          onClick={() => this.exit()}
        >
          <Avatar size={'30px'} icon={this.props.icon}/>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user,
})

const mapDispatchToProps = dispatch => ({
  clear: () => dispatch({type: 'CLEAR'})
})

export default connect(mapStateToProps, mapDispatchToProps)(Header)