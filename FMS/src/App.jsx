import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import Display from './Pages/Display'
import { AuthProvider } from './AuthContext';



function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/Display" element={<Display />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
