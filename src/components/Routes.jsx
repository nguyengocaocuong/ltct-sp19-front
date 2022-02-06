import React from 'react'

import { Route, Switch } from 'react-router-dom'

import { Promotion } from '../pages/Promotion'
import { Code } from '../pages/Code'
import { Trash } from '../pages/Trash'


const Routes = () => {
    return (
        <Switch>
             <Route path='/' exact component={Code}/>
            <Route path='/code' exact component={Code}/>
            <Route path='/promotion' component={Promotion}/>
            <Route path='/trash' component={Trash}/>
        </Switch>
    )
}

export default Routes
