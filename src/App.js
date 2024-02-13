import React from 'react';
import Signup from './Signup';
import './App.css';
import Home from './Home';
import {  Route,Routes } from 'react-router-dom';
import Mobile from './display';
import Products from './Products';
import Login from './Login';
import Cart from './cart/Cart';
import Payment from './cart/Payment'
import Navigate from './navigate';
function App() {
  return (
    <>
    <Navigate/>
    <Routes>
     <Route path='/' element={<Home/>} />
     <Route path='/login' element={<Login/>}/>
     <Route path='/signup' element={<Signup/>}/>
     <Route path='/cart' element={<Cart/>}/>
      <Route path='/:id' element={<Mobile/>} />
      <Route path='/order' element={<Payment />}/>
      <Route path='/laptop/:id' element={<Products datas='laptop'/>}/>
      <Route path='/toys/:id' element={<Products datas='toys'/>} />
      <Route path='/fashion/:id' element={<Products datas='fashion'/>} />
      <Route path='/mobile/:id' element={<Products datas='mobile' />} />
      <Route path='/furniture/:id' element={<Products datas='furniture' />} />
      </Routes>
      
      
    </>
  );
}

export default App;
