import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Auth from '../pages/Auth'
import Login from '../pages/Login';
import { useUserSaved } from '../context/auth'
import Container from '../componets/Container'
import List from '../pages/List'
import Profile from '../pages/Profile';
const RouterMain: React.FC = () => {
    const { userSaved } = useUserSaved()
    if (!userSaved) {
        return (
            <BrowserRouter>
                <Switch>
                    <Route path="/" exact component={Auth} />
                    <Route path="/login" exact component={Login} />
                    <Route component={Auth} />
                </Switch>
            </BrowserRouter>
        )
    }
    return (
        <BrowserRouter>
            <Container>
                    <Switch>
                        <Route path="/" exact component={List} />
                        <Route path="/list" exact component={List} />
                        <Route path="/profile" exact component={Profile} />
                        <Route component={List} />
                    </Switch>
            </Container>
        </BrowserRouter>
    )
}
export default RouterMain;