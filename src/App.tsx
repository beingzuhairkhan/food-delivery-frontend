import { Route, Routes } from "react-router-dom"
import SignUp from "./pages/SignUp"
import SignIn from "./pages/SignIn"
import Home from "./pages/Home"
import AddRestaurant from "./pages/Restaurant/AddRestaurant"
function App() {
  return (
    <Routes>
      <Route path="/signup" element={<SignUp />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/" element={<Home />} />
      <Route path="/add-restaurant" element={<AddRestaurant />} />
    </Routes>
  )
}

export default App
