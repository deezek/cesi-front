import React, { Component } from 'react';

import ReactDOM from 'react-dom';
//import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { BrowserRouter, Route, withRouter } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Welcome from './components/Welcome';
import Login from './components/Login';
import SignUp from './components/SignUp'
import SingleArticle from './components/SingleArticle';
import CreerArticle from './components/CreerArticle';
import * as serviceWorker from './serviceWorker';
import Article from './components/Article';
import MesArticles from './components/MesArticles'

//import Welcome from './components/Welcome' ;

//const Chart =  import('react-apexcharts');

export const Routage = withRouter(({ location }) => {
  return (
    <div>
      {
        //location.pathname !== '/login' && location.pathname !== '/signup' &&
        <Navbar />
      }

      <Route exact path="/" component={Welcome} />
      <Route path="/login" component={Login} />
      <Route path="/article" component={Article} />
      <Route path="/mesArticles" component={MesArticles} />
      <Route path="/article/:slug" component={SingleArticle} />
      <Route path="/articles/create" component={CreerArticle} />
      <Route path="/signup" component={SignUp} />
      

      {
        //location.pathname !== '/login' && location.pathname !== '/signup' &&
        <Footer />
      }
    </div>
  );
});
ReactDOM.render(
  <BrowserRouter>
    <Routage />
  </BrowserRouter>, document.getElementById('root'));

serviceWorker.unregister();
//reportWebVitals();
