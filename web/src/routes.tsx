import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import Landing from '~/pages/Landing'
import Orphanages from '~/pages/Orphanages'

const Routes: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route path="/orfanatos" component={Orphanages} />
      </Switch>
    </BrowserRouter>
  )
}

export default Routes
