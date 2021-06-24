import './App.css';
import Home from './components/Home/Home';
import { createContext, useState } from 'react';
import Header from './components/Header/Header';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Admin from './components/Admin/Admin';
import NotFound from './components/NotFound/NotFound';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import Login from './components/Login/Login';
import UpdateProduct from './components/UpdateProduct/UpdateProduct';
import ProductDetails from './components/ProductDetails/ProductDetails';
import Orders from './components/Orders/Orders';
import Deals from './components/Deals/Deals';
import CheckOut from './components/CheckOut/CheckOut';
export const UserContext = createContext();
function App() {
  const [loggedInUser, setLoggedInUser] = useState({})
  return (
    <div className="container">
      <UserContext.Provider value={[loggedInUser, setLoggedInUser]}>
        <Router>
          <Header />
          <Switch>
            <Route path='/home'>
              <Home />
            </Route>
            <PrivateRoute path='/orders'>
              <Orders />
            </PrivateRoute>
            <PrivateRoute path='/admin/:options'>
              <Admin />
            </PrivateRoute>
            <Route path='/deals'>
              <Deals />
            </Route>
            <Route path='/login'>
              <Login />
            </Route>
            <Route path='/details/:id'>
              <ProductDetails />
            </Route>
            <PrivateRoute path='/editProduct/:id'>
              <UpdateProduct />
            </PrivateRoute>
            <PrivateRoute path='/product/:id'>
              <CheckOut />
            </PrivateRoute>
            <Route exact path='/'>
              <Home />
            </Route>
            <Route path='*'>
              <NotFound />
            </Route>
          </Switch>
        </Router >
      </UserContext.Provider>
    </div>
  );
}

export default App;
