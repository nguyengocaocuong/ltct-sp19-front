import React from 'react'

import { Route, Switch } from 'react-router-dom'

import Dashboard from '../pages/Dashboard'
import { Promotion } from '../pages/Promotion'
import { Code } from '../pages/Code'
import { Trash } from '../pages/Trash'


const Routes = () => {
    return (
        <Switch>
             <Route path='/' exact component={Dashboard}/>
            <Route path='/promotion' component={Promotion}/>
            <Route path='/code' component={Code}/>
            <Route path='/trash' component={Trash}/>
        </Switch>
    )
}

export default Routes
