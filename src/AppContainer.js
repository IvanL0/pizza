import React from 'react'
import { connect } from 'react-redux'

import { BrowserRouter as Router } from 'react-router-dom'
import App from './App'
// import { getUser } from './actions/user/userActions'

class AppContainer extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      reload: false,
      token: null,
    }
  }

  componentDidMount(){
    this.chekToken()
  }

  componentDidUpdate(prevProps, prevState) {
    if(prevProps.user !== this.props.user){
      this.chekToken()
    }
  }

  chekToken = () => {
    let token = localStorage.getItem('test')

    if (token){
      this.setState({token: true})
    } else {
      this.setState({token: false})
    }
  }

  updateAuth = (token) => {
    this.setState({token: token})
    this.props.getUser()
  }
  
  render() {
    const { token } = this.state

    return (
      <App />
    )
  }
}

const mapStateToProps = state => ({
  user: state.user,
})

// const mapDispatchToProps = dispatch => ({
//   // getUser: () => dispatch(getUser())
// })

export default connect(mapStateToProps)(AppContainer)