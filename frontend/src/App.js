import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import './App.css';

import Header from './components/Header';
import Footer from './components/Footer';

import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ProfileScreen from './screens/ProfileScreen';
import ShippingScreen from './screens/ShippingScreen';
import PaymentScreen from './screens/PaymentScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import OrderScreen from './screens/OrderScreen';

import UserListScreen from './screens/UserListScreen';
import UserEditScreen from './screens/UserEditScreen';
import ProductListScreen from './screens/ProductListScreen';
import ProductEditScreen from './screens/ProductEditScreen';
import OrderListScreen from './screens/OrderListScreen';

import AdminRoute from './components/adminroute';

import DoorAnimation from './components/animations/DoorAnimation';
import HeartAnimation from './components/animations/HeartAnimation';

const App = () => {
  const [showDoor, setShowDoor] = useState(true);
  const [showHeart, setShowHeart] = useState(false);
  const [darkMode] = useState(false);

  useEffect(() => {
    const doorTimer = setTimeout(() => {
      setShowDoor(false);
      setShowHeart(true);
    }, 3000); // Door animation duration

    const heartTimer = setTimeout(() => {
      setShowHeart(false);
    }, 6000); // Heart starts after door (3s) and lasts 3s

    return () => {
      clearTimeout(doorTimer);
      clearTimeout(heartTimer);
    };
  }, []);

  useEffect(() => {
    document.body.classList.toggle('dark-mode', darkMode);
  }, [darkMode]);

  if (showDoor) return <DoorAnimation />;
  if (showHeart) return <HeartAnimation />;

  return (
    <Router>
      <Header />
      <main className='py-3'>
        <Container>
          <Switch>
            {/* Public Routes */}
            <Route path='/' component={HomeScreen} exact />
            <Route path='/search/:keyword' component={HomeScreen} exact />
            <Route path='/page/:pageNumber' component={HomeScreen} exact />
            <Route path='/search/:keyword/page/:pageNumber' component={HomeScreen} exact />
            <Route path='/product/:id' component={ProductScreen} />
            <Route path='/cart/:id' component={CartScreen} />
            <Route path='/cart' component={CartScreen} exact />
            <Route path='/login' component={LoginScreen} />
            <Route path='/register' component={RegisterScreen} />
            <Route path='/profile' component={ProfileScreen} />
            <Route path='/shipping' component={ShippingScreen} />
            <Route path='/payment' component={PaymentScreen} />
            <Route path='/placeorder' component={PlaceOrderScreen} />
            <Route path='/order/:id' component={OrderScreen} />

            {/* Admin Routes */}
            <AdminRoute path='/admin/userlist' component={UserListScreen} />
            <AdminRoute path='/admin/user/:id/edit' component={UserEditScreen} />
            <AdminRoute path='/admin/productlist' component={ProductListScreen} exact />
            <AdminRoute path='/admin/productlist/:pageNumber' component={ProductListScreen} />
            <AdminRoute path='/admin/product/:id/edit' component={ProductEditScreen} />
            <AdminRoute path='/admin/orderlist' component={OrderListScreen} />
          </Switch>
        </Container>
      </main>
      <Footer />
    </Router>
  );
};

export default App;
