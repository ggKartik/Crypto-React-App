import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import Home from './components/Home'
import Exchanges from './components/Exchanges'
import CoinsDetails from './components/CoinsDetails'
import Coins from './components/Coins'
import Header from './components/Header';
import Loader from './components/Loader';
import Footer from './components/Footer';
function App() {
  return (
    <Router>
      <Header/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/coins' element={<Coins/>}/>
        <Route path='/coin/:id' element={<CoinsDetails/>}/>
        <Route path='/exchanges' element={<Exchanges/>}/>
      </Routes>
      <Footer/>
    </Router>
  );
}

export default App;
