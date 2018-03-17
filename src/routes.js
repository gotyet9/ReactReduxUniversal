"use strict"
// REACT
import React from 'react';
import {render} from 'react-dom';
// REACT-ROUTER
//import {Router, Route, IndexRoute, browserHistory} from 'react-router';
import { Route, Switch} from 'react-router-dom';
import Menu from './components/menu.jsx';
import Footer from './components/footer.jsx';
// END REACT- ROUTER

import BooksList from './components/pages/booksList.jsx';
import Cart from './components/pages/cart.jsx';
import BooksForm from './components/pages/booksForm.jsx';
//import Main from './main';

// RETRIVES COMPONENTS BASED ON STATUS
const Status = function ({ code, children }){
  return (
        <Route render={function({ staticContext }) {
          if (staticContext)
            staticContext.status = code
          return children
        }}/>
    )
}
//NOT-FOUND COMPONENT
const NotFound = function(){
    return (
      <Status code={404}>
        <div>
          <h2> Sorry, can’t find this page</h2>
        </div>
      </Status>
    )
}

// CLIENT-SERVER SHARED ROUTES
const routes = (
      <div>
          <Menu />
          <Switch>
              <Route exact={true} path="/" component={BooksList}/>
              <Route path="/admin" component={BooksForm}/>
              <Route path="/cart" component={Cart}/>
              <Route component={NotFound}/>
          </Switch>
          <Footer />
      </div>
    );

export default routes;
