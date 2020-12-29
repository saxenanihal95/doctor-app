import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";

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
          </Switch>
        </Router>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
