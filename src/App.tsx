import { Route, Routes } from 'react-router-dom';
import LandingPage from './pages/landingpage';
import UserAuthentication from './pages/UserAuthentication';
import ProductListing from './pages/ProductLising';


function App(): JSX.Element {
 

  return (
    <>
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/auth' element={<UserAuthentication />} />
        <Route path='/product' element={<ProductListing />} />
      </Routes>
    </>
  );
}

export default App;
