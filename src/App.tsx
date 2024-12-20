import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

import Navbar from './components/navbar';
import Home from './pages/home';
import About from './pages/about';
import Contact from './pages/contact';

import Footer from './components/footer';
import Page404 from './pages/404';
import Login from './pages/login';
import Signup from './pages/signup';
import PiecePage from './pages/piecePage';
import Account from './pages/account';

function ConditionalNavbar(props: React.PropsWithChildren) {
  const location = useLocation();

  if (location.pathname !== "/") {
    return <>
      <Navbar />
      {props.children}
    </>
  }

  return props.children
}

function App() {

  return (
    <Router>
      <ConditionalNavbar>
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/signup' element={<Signup />}></Route>
          <Route path='/account' element={<Account />}></Route>
          <Route path='/contact' element={<Contact />}></Route>

          <Route path='/pieces/:id' element={<PiecePage />}></Route>
          <Route path='/users/:id' element={<About />}></Route>


          <Route path='*' element={<Page404 />}></Route>
        </Routes>
        <Footer />
      </ConditionalNavbar>
    </Router>
  )
}

export default App
