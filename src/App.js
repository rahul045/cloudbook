import './App.css';
import Navbar from './Components/Navbar';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Home from './Components/Home';
import About from './Components/About';
import NoteState from './Context/notes/NoteState';
import Login from './Components/Login';
import Signup from './Components/Signup';
import AlertState from './Context/AlertState';
function App() {

  return (
    <>
      <AlertState>
        <NoteState>
          <Router>
            <Navbar />

            <div className="container">
              <Routes>

                <Route exact path='/' element={<Home />} />
                <Route exact path='/about' element={<About />} />
                <Route exact path='/login' element={<Login />} />
                <Route exact path='/signup' element={<Signup />} />
              </Routes>
            </div>
          </Router>
        </NoteState>
      </AlertState>
    </>
  );
}

export default App;
