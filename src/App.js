import React from "react";
// import "./App.css";
import Dashboard from "./component/Dashboard"
import Login from "./component/Login"
import Notfound from "./component/404"
import Demo from "./component/demo"
import dash from './component/dash'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

const App = () => {
    return (
        <Router>
            <Routes>
                <Route exact path='/' Component={Login} />
                <Route path='/dashboard' Component={Dashboard} />
                <Route path='*' Component={Notfound} />
                <Route path='/demo' Component={Demo} />
                <Route path='/dash' Component={dash} />
            </Routes>
        </Router>
    )

}
export default App;

