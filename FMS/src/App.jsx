import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Login";
import Signup from "./Signup";
import Display from './Display'
import Display2 from './Display2'
import { AuthProvider } from './AuthContext';







function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/Display" element={<Display2 />} />
        </Routes>
      </Router>
      </AuthProvider>
      );
}

      export default App;
