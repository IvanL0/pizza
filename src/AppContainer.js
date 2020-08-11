import React from 'react'
import { connect } from 'react-redux'

import App from './App'

class AppContainer extends React.Component {

  constructor(props) {
    super(props)

  }
  
  render() {

    return (
      <App />
    )
  }
}

const mapStateToProps = state => ({
  user: state.user,
})

export default connect(mapStateToProps)(AppContainer)