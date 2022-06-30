import React from 'react';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import PrivateRoute from '../components/PrivateRoute';
import Layout from '../layouts/layout';
import BillList from '../pages/bill_list';
import Dashboard from '../pages/dashboard';
import Login from '../pages/login';

const Routes = () => {
    return (
        <React.Fragment>
            <Router>
                <Switch>
                    <Route path="/signup-login">
                        <Login/>
                    </Route>
                    <PrivateRoute exact path="/">
                        <Layout>
                            <Dashboard/>
                        </Layout>
                    </PrivateRoute>
                    <PrivateRoute path="/bill-list" >
                        <Layout>
                            <BillList />
                        </Layout>
                    </PrivateRoute>
                    <Route exact path="*" component={() => <h1>Page not found</h1> } />
                </Switch>
            </Router>
        </React.Fragment>
    );
};

export default Routes;