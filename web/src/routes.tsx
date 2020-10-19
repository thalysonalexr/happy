import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import CreateOrphanage from '~/pages/CreateOrphanage'
import Landing from '~/pages/Landing'
import Orphanage from '~/pages/Orphanage'
import Orphanages from '~/pages/Orphanages'

const Routes: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route exact path="/orfanatos" component={Orphanages} />

        <Route exact path="/orfanatos/:id" component={Orphanage} />
        <Route exact path="/criar-novo-orfanato" component={CreateOrphanage} />
      </Switch>
    </BrowserRouter>
  )
}

export default Routes
