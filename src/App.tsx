import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

import Navbar from './components/navbar';
import Home from './pages/home';

import Footer from './components/footer';
import About from './pages/about';

function ConditionalNavbar(props: React.PropsWithChildren) {
  const location = useLocation();

  if(location.pathname !== "/") {
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
          <Route path='/about' element={<About />}></Route>
          
          {/* <Route path='*' element={404}></Route> */}
        </Routes>
        <Footer />
    </ConditionalNavbar>
    </Router>
  )
}

export default App
