import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import LoginSignup from "./components/loginSignup";
import Popup from "./components/shared/Popup";

function App() {

  return (
    <div className="h-screen max-w-[1140px] w-full mx-auto">
      <Popup />
      <Routes>
        <Route exact path="/*" element={<Home />} />
        <Route exact path="/login" element={<LoginSignup />} />
        <Route exact path="/sign-up" element={<LoginSignup />} />
      </Routes>
    </div>
  )
}

export default App
