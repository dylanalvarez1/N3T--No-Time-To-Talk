import React from 'react';
import Login from './Login';
import { useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';


function PrivateRoute({ user, children, ...rest }) {
  return (
    <Route
      {...rest}
      render={({ location }) =>
        user !== "" ? (
          children
        ) : ( 
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location }
            }}
          />
        )
      }
    />
  );
}



function App() {
  const [user, setUser] = useState("");

  let signOut = () => {
    setUser("");
  }

  return (
        <Router>
          <Switch>
            <Route path="/login">
              <Login setUser={setUser} />
            </Route>
            <PrivateRoute path="/" user={user}>
              <div>
                <div>hi {user}</div>
                <button className={"bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"}
                        onClick={signOut}
                    >
                    Sign out
                </button>
              </div>
            </PrivateRoute>
          </Switch>
      </Router>
  );
}

export default App;
