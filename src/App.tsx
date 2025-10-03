import { Route, Routes } from "react-router-dom"
import SignUp from "./pages/SignUp"
import SignIn from "./pages/SignIn"
import Home from "./pages/Home"
import AddRestaurant from "./pages/Restaurant/AddRestaurant"
import AddFoodItem from "./pages/Restaurant/AddFoodItem"
import EditFoodItem from "./pages/Restaurant/EditFoodItem"
import Cart from "./pages/Cart"
import Checkout from "./pages/Checkout"
function App() {
  return (
    <Routes>
      <Route path="/signup" element={<SignUp />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/" element={<Home />} />
      <Route path="/add-restaurant" element={<AddRestaurant />} />
      <Route path="/add-food-item" element={<AddFoodItem />} />
      <Route path="/edit-food-item/:id" element={<EditFoodItem />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/checkout" element={<Checkout />} />
    </Routes>
  )
}

export default App
