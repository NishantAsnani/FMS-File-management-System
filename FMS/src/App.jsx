import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Login from "./Login";
import Signup from "./Signup";
import Display from './Display'







function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/Display" element={<Display />}/>
      </Routes>
    </Router>
  );
}

export default App;
