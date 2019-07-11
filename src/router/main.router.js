import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import routes from './routes';
import { dynamicImport } from '../utils/router.utils';

class MainRouter extends Component{

    routes = routes.map((route)=>{
        let component = dynamicImport(route.component);
        return <Route exact={ route.exact } key={ route.name } path={ route.path }  component={ component } />
    });
    
    render(){
        return(
            <React.Suspense fallback={<div>Carregando</div>}>
                <Router>
                    <Switch>
                        {this.routes}
                    </Switch>
                </Router>
            </React.Suspense>
        );
    }
}

export default MainRouter;