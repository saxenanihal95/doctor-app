import React from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";

const PrivateRoute = ({ component: Component, isAuthenticated, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      isAuthenticated ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: "/login",
            state: { from: props.location },
          }}
        />
      )
    }
  />
);
export const AuthContext = React.createContext();
const initialState = {
  isAuthenticated: !!localStorage.getItem("loggedInUser"),
  loggedInUser: JSON.parse(localStorage.getItem("loggedInUser")),
};
const reducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      localStorage.setItem(
        "loggedInUser",
        JSON.stringify(action.payload.loggedInUser)
      );
      return {
        ...state,
        isAuthenticated: true,
        loggedInUser: action.payload.loggedInUser,
      };
    case "LOGOUT":
      localStorage.removeItem("loggedInUser");
      return {
        ...state,
        isAuthenticated: false,
        loggedInUser: null,
      };
    default:
      return state;
  }
};

function App() {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  return (
    <div className="App">
      <AuthContext.Provider value={{ state, dispatch }}>
        <Router>
          <Switch>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/register">
              <Register />
            </Route>
            <PrivateRoute
              component={Home}
              isAuthenticated={state.isAuthenticated}
            />
          </Switch>
        </Router>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
