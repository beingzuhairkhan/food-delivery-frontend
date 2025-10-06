import { Route, Routes } from 'react-router-dom';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import Home from './pages/Home';
import AddRestaurant from './pages/Restaurant/AddRestaurant';
import AddFoodItem from './pages/Restaurant/AddFoodItem';
import EditFoodItem from './pages/Restaurant/EditFoodItem';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import OwnerDashboard from './components/Dashboard/ownerDashboard';
import DeliveryDashboard from './components/Dashboard/deliveryDashboard';
import PaymentSuccess from './pages/PaymentSuccess';
import PaymentFailure from './pages/PaymentFailure';
import ProtectedRoute from './service/ProtectedRoute';
import MyOrders from './pages/Orders/Myorders';
import RestaurantOrder from './pages/Orders/RestaurantOrder';
import RestaurantDetail from './pages/RestaurantDetail';

function App() {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/signup" element={<SignUp />} />
      <Route path="/login" element={<SignIn />} />

      {/* User routes */}
      <Route
        path="/"
        element={
          <ProtectedRoute allowedRoles={['user']}>
            <Home />
          </ProtectedRoute>
        }
      />
      <Route
        path="/cart"
        element={
          <ProtectedRoute allowedRoles={['user']}>
            <Cart />
          </ProtectedRoute>
        }
      />
      <Route
        path="/checkout"
        element={
          <ProtectedRoute allowedRoles={['user']}>
            <Checkout />
          </ProtectedRoute>
        }
      />
      <Route
        path="/myorders"
        element={
          <ProtectedRoute allowedRoles={['user']}>
            <MyOrders />
          </ProtectedRoute>
        }
      />
      <Route
        path="/restaurant/:id"
        element={
          <ProtectedRoute allowedRoles={['user']}>
            <RestaurantDetail />
          </ProtectedRoute>
        }
      />

      {/* Payment result routes - accessible to users */}
      <Route
        path="/payment-success"
        element={
          <ProtectedRoute allowedRoles={['user']}>
            <PaymentSuccess />
          </ProtectedRoute>
        }
      />
      <Route
        path="/payment-failure"
        element={
          <ProtectedRoute allowedRoles={['user']}>
            <PaymentFailure />
          </ProtectedRoute>
        }
      />

      {/* Restaurant routes */}
      <Route
        path="/restaurant"
        element={
          <ProtectedRoute allowedRoles={['restaurant']}>
            <OwnerDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/add-restaurant"
        element={
          <ProtectedRoute allowedRoles={['restaurant']}>
            <AddRestaurant />
          </ProtectedRoute>
        }
      />
      <Route
        path="/add-food-item"
        element={
          <ProtectedRoute allowedRoles={['restaurant']}>
            <AddFoodItem />
          </ProtectedRoute>
        }
      />
      <Route
        path="/restaurantOrders"
        element={
          <ProtectedRoute allowedRoles={['restaurant']}>
            <RestaurantOrder />
          </ProtectedRoute>
        }
      />
      <Route
        path="/edit-food-item/:id"
        element={
          <ProtectedRoute allowedRoles={['restaurant']}>
            <EditFoodItem />
          </ProtectedRoute>
        }
      />

      {/* Delivery routes */}
      <Route
        path="/delivery"
        element={
          <ProtectedRoute allowedRoles={['delivery']}>
            <DeliveryDashboard />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;

// export default App;
// import { Route, Routes } from "react-router-dom"
// import SignUp from "./pages/SignUp"
// import SignIn from "./pages/SignIn"
// import Home from "./pages/Home"
// import AddRestaurant from "./pages/Restaurant/AddRestaurant"
// import AddFoodItem from "./pages/Restaurant/AddFoodItem"
// import EditFoodItem from "./pages/Restaurant/EditFoodItem"
// import Cart from "./pages/Cart"
// import Checkout from "./pages/Checkout"
// import OwnerDashboard from "./components/Dashboard/ownerDashboard";
// import OrderPlaced from "./pages/Orders/OrderPlaced"
// import MyOrders from "./pages/Orders/Myorders"
// import RestaurantOrder from "./pages/Orders/RestaurantOrder"
// function App() {
//   return (
//     <Routes>
//       <Route path="/signup" element={<SignUp />} />
//       <Route path="/signin" element={<SignIn />} />
//       <Route path="/" element={<Home />} />
//       <Route path="/myorders" element={<MyOrders />} />
//       <Route path="/restaurant" element={<OwnerDashboard/>} />
//       <Route path="/add-restaurant" element={<AddRestaurant />} />
//       <Route path="/add-food-item" element={<AddFoodItem />} />
//       <Route path="/restaurantOrders" element={<RestaurantOrder />} />
//       <Route path="/edit-food-item/:id" element={<EditFoodItem />} />
//       <Route path="/cart" element={<Cart />} />
//       <Route path="/checkout" element={<Checkout />} />
//       <Route path="/orderSuccess" element={<OrderPlaced/>}/>
//     </Routes>
//   )
// }

// export default App
