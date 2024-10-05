import './App.css';
import Header from './components/Header';
import { Routes, Route } from "react-router-dom"
import Blogs from './pages/Blogs';
import Login from './pages/Login';
import Register from './pages/Register';
import Footer from './components/Footer';
import Blogview from './pages/Blogview';
import Userblogs from './pages/Userblogs';
import Createblog from './pages/Createblog';
import Editblog from './pages/Editblog';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <>
      <Header />
      <Toaster />
      <Routes>
        <Route path='/' element={<Blogs />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/blogview' element={<Blogview />} />
        <Route path='/userblogs' element={<Userblogs />} />
        <Route path='/create-blog' element={<Createblog />} />
        <Route path='/edit-blog/:id' element={<Editblog />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
