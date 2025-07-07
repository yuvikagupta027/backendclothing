import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle";
import './App.css';
import Home from './Home';
import Login from './Login';
import Adminloginn from './Adminloginn';
import Dashboard from './Dashboard';
import Products from './Products';
import Customermanagement from './Customermanagement';
import CustomerDetailsView from './CustomerDetailsView';
import Categories from './Categories';
import Shop from './Shop';
import Billingaddress from './Billingaddress';
import Viewproduct from './Viewproduct';
import Orders from './Orders';
import OrderDetail from './OrderDetail';
import Adminorders from './Adminorders';
import Adminorderdetails from './Adminorderdetails';
import Bestsellingpage from './Bestsellingpage';
import Newlaunches from './Newlaunches';
import Cart from './Cart';
import Support from './Support';
import Track from './Track';
import Profile from './Profile';
import Manageaddress from './Manageaddress';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='Login' element={<Login />}></Route>
          <Route path='Cart' element={<Cart />}></Route>
          <Route path='Adminloginn' element={<Adminloginn />}></Route>
          <Route path='Dashboard' element={<Dashboard />}></Route>
          <Route path='Products' element={<Products />}></Route>
          <Route path='Customermanagement' element={<Customermanagement />}></Route>
          <Route path='CustomerDetailsView' element={<CustomerDetailsView />}></Route>
          <Route path='Categories' element={<Categories />}></Route>
          <Route path='Shop' element={<Shop />}></Route>
          <Route path='Billingaddress' element={<Billingaddress />}></Route>
          <Route path='Viewproduct' element={<Viewproduct />}></Route>
          <Route path='Orders' element={<Orders />}></Route>
          <Route path='OrderDetail' element={<OrderDetail />}></Route>
          <Route path='Adminorders' element={<Adminorders />}></Route>
          <Route path='Adminorderdetails' element={<Adminorderdetails />}></Route>
          <Route path='Bestsellingpage' element={<Bestsellingpage />}></Route>
          <Route path='Newlaunches' element={<Newlaunches />}></Route>
          <Route path='Support' element={<Support />}></Route>
          <Route path='Track' element={<Track />}></Route>
          <Route path='Profile' element={<Profile />}></Route>
          <Route path='Manageaddress' element={<Manageaddress />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
