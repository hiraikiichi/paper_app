import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import NotFoundPage from "./pages/NotFoundPage";
import ContactPage from "./pages/ContactPage";

import './styles/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  return (
    <Router>
      <div className="page-content">
        <Header />
        <Switch>
          <Route exact path="/">
            <HomePage />
          </Route>
          <Route path="/contact">
            <ContactPage />
          </Route>
          <Route>
            <NotFoundPage />
          </Route>
        </Switch>
      </div>
      <Footer />
    </Router>
  );
}

export default App;


