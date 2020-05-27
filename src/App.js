import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import {Switch,Route, Router} from 'react-router-dom';

import Navbar from './components/Navbar';
import ProductList from './components/ProductList';
import Details from './components/Details';
import Cart from './components/Cart';
import Default from './components/Default';  
import Modal from './components/Modal'
import axios from 'axios';
import VegProductList from './components/VegProductList';
import NonVegProductList from './components/NonVegProductList'


class App extends React.Component {
   render() {
      return (
         <React.Fragment>
           <Navbar />
               <Switch>
                  <Route exact path="/" component={ProductList}></Route>
                  <Route path="/details" component={Details}></Route>
                  <Route path="/cart" component={Cart}></Route>
                  <Route path="/veg" component={VegProductList}></Route>
                  <Route path="/nonveg" component={NonVegProductList}></Route>
                  <Route component={Default}></Route>
               </Switch>
               <Modal />
         </React.Fragment>
        
      );
   }
}

export default App;