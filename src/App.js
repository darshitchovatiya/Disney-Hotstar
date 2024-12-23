import {BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import './App.css';
import Hender from './components/Hender';

function App() {
  return (
    <div className="App">
      <Router>
        <Hender/>
          <Routes>
            {/* <Route exact path="/" >
              <Login />
            </Route> */}
            <Route  path="/" element={<Login />} />
          </Routes>
      </Router>
      
    </div>
  );
}

export default App;
