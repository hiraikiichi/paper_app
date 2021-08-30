import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import './styles/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  return (
    <Router>
      <div className="page-content">
          <Header />
      <Switch>
        <Route path="/">
          <HomePage />
        </Route>
        </Switch>
      </div>
      <Footer />
    </Router>
  );
}

export default App;


