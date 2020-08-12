import React from 'react'
import { createBrowserHistory } from 'history'

import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom'

import Main from './components/Main'
import Cart from './components/Cart'

import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { faCheckSquare, faCoffee } from '@fortawesome/free-solid-svg-icons'

library.add(fab, faCheckSquare, faCoffee)

export const history = createBrowserHistory()

export default function App(){

  return (
    <Router history={history}>
      <div style={{display: 'flex', flexDirection: 'row', width: '100%'}}>
        <Routes/>
      </div>
    </Router>
  )
}

const Routes = () => {
  return(
    <Switch>
      <Route exact path="/pizza" component={Main} />
      <Route path="/cart" component={Cart} /> 
    </Switch>
  )
}
