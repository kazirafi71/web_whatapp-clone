import "./App.css";
import Chat from "./components/Chat/Chat";
import { BrowserRouter, Route, Switch, useHistory } from "react-router-dom";
import Sidebar from "./components/sidebar/Sidebar";
import { useEffect, useState } from "react";
import Login from "./components/Login/Login";
import { useDispatch, useSelector } from "react-redux";

const Routing = () => {
  const auth=useSelector(state=>(state.user.user))
  //console.log(auth)
  let history = useHistory();
  const dispatch = useDispatch()

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem(("user")));
    //console.log(auth)
    if(user){
      dispatch({type:"SET_USER",payload:user})
    }
    else{
      history.push('/login')
    }
  }, []);
  return (
    <Switch>
      <Route exact path="/room/:roomId">
        <div className="app___body">
          <Sidebar />
          <Chat />
        </div>
      </Route>
      <Route exact path="/">
        <div className="app___body">
          <Sidebar />
        </div>
      </Route>
      <Route exact path="/login">
        <Login />
      </Route>
    </Switch>
  );
};

function App() {
  // const auth=useSelector(state=>state.user.user)
  // console.log(auth)

  return (
    <div className="App">
      <BrowserRouter>
        <Routing />
      </BrowserRouter>
    </div>
  );
}

export default App;
