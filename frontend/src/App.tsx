import './App.css';
import { Admin } from './components/Admin';
import Home from './components/Home';
import { User } from './components/User';
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className='bg-[#764abc]'>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="admin" element={<Admin />} />
          <Route path="user" element={<User />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
