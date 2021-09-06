import React, { Fragment, useState } from 'react'
import './App.css';
//routing
import { BrowserRouter as Router } from 'react-router-dom';
import { Route, Switch, Redirect } from 'react-router-dom';

//pages
import Home from './pages/Home';
import Login from './pages/Login';
import ForgotPassword from './pages/ForgotPassword';
import ChangePassword from './pages/ChangePassword';
import Register from './pages/Register';
import ProductsPage from './pages/ProductsPage';
import SelectedProduct from './pages/SelectedProduct';
import NotFound from './pages/NotFound';
import ShowHidePassword from './pages/ShowHidePassword';
import LaptopPage from './pages/LaptopPage';
import KeyboardPage from './pages/KeyboardPage';
import AccessoriesPage from './pages/AccessoriesPage';
import DashboardPage from './pages/DashboardPage';
import CartPage from './pages/CartPage';

//components
import AppNavbar from './components/AppNavbar';
import Footer from './components/Footer';

//React Context
import UserContext from './UserContext';


function App() {
  
    const [user, setUser] = useState({
    firstName: localStorage.getItem('firstName'),
    email: localStorage.getItem('email'),
    accessToken: localStorage.getItem('accessToken'),
    isAdmin: localStorage.getItem('isAdmin') === true
  })
    
    const unsetUser = ()=>{
      localStorage.clear();
      setUser({
        firstName: null, 
        email: null, 
        accessToken: null,
        isAdmin: null
      })
    }

  return (
    <Fragment>
      < UserContext.Provider value={{ user, setUser, unsetUser }}>
        < Router>
          < AppNavbar />
            < Switch >
              < Route exact path="/showhide" component={ShowHidePassword} />
              < Route exact path="/" component={Home} />
              < Route exact path="/login" component={Login} />
              < Route exact path="/forgotPassword" component={ForgotPassword} />
              < Route exact path="/changePassword" component={ChangePassword} />
              < Route exact path="/register" component={Register}>{user.email !== null ? <Redirect to ="/"/>: <Register/>}</Route>
              < Route exact path="/products" component={ProductsPage} />
              < Route exact path="/products/category-laptop" component={LaptopPage} />
              < Route exact path="/products/category-keyboard" component={KeyboardPage} />
              < Route exact path="/products/category-accessories" component={AccessoriesPage} />
              < Route exact path="/products/:productId" component={SelectedProduct}/>
              < Route exact path="/dashboard" component={DashboardPage}>{user.isAdmin !== true ? <NotFound/> : <DashboardPage />}</Route>
              < Route exact path="/add-to-cart" component={CartPage}/>
              < NotFound />
            </Switch> 
          < Footer />
        </ Router >
      </ UserContext.Provider >  
    </Fragment>

  );
}

export default App;

