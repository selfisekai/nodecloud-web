import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import { history } from '../_helpers/history';
import { alertActions } from '../_actions/alert.actions';
import { PrivateRoute } from '../_components/PrivateRoute';
import { HomePage } from '../HomePage/HomePage';
import { LoginPage } from '../LoginPage/LoginPage';
import { SignupPage } from '../SignupPage/SignupPage';
import { VirtualMachine } from '../CreateServices/VirtualMachine';
import { VirtualNetwork } from '../CreateServices/VirtualNetwork';
import { Database } from '../CreateServices/Database';
import { Security } from '../CreateServices/Security';
import { PageNotFound } from '../_helpers/PageNotFound';

class App extends React.Component {
  constructor(props) {
    super(props);

    const { dispatch } = this.props;
    history.listen((location, action) => {
      // clear alert on location change
      dispatch(alertActions.clear());
    });
  }

  render() {
    const { alert } = this.props;
    return (
      <div>
        {alert.message && (
          <div className={`ui ${alert.type} message`}>{alert.message}</div>
        )}
        <Router history={history}>
          <Switch>
            <PrivateRoute exact path="/" component={HomePage} />
            <Route path="/login" component={LoginPage} />
            <Route path="/home" component={HomePage} />
            <Route path="/signup" component={SignupPage} />
            <Route path="/virtualmachines" component={VirtualMachine} />
            <Route path="/virtualnetworks" component={VirtualNetwork} />
            <Route path="/database" component={Database} />
            <Route path="/security" component={Security} />
            <Route component={PageNotFound} />
          </Switch>
        </Router>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { alert } = state;
  return {
    alert,
  };
}

const connectedApp = connect(mapStateToProps)(App);
export { connectedApp as App };
