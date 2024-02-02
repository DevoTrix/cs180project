import './App.css';
import { Routes, Route, BrowserRouter } from 'react-router-dom'

//import Sidebar from './components/Sidebar'
import Home from './pages/Home'
import Quarter from './pages/Quarter'

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' exact element={<Quarter />} />
          <Route path='/home' exact element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>

  );
}

export default App;
