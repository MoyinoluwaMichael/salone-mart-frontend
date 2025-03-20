import { Route, Routes } from 'react-router-dom';
import LandingPage from './pages/landingpage';
import UserAuthentication from './pages/UserAuthentication';
import ProductListing from './pages/ProductLising';
import UserProfile from "@/pages/userprofile";
import ProductDetails from './pages/ProductDetails';


function App(): JSX.Element {
 

  return (
    <>
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/auth' element={<UserAuthentication />} />
        <Route path='/product' element={<ProductListing />} />  {/* Query params*/}
        <Route path='/user-profile' element={<UserProfile />} />
        <Route path='/details' element={<ProductDetails />} />
        </Routes>
    </>
  );
}

export default App;
