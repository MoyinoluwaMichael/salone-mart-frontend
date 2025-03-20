import { Route, Routes } from 'react-router-dom';
import LandingPage from './pages/landingpage';
import UserAuthentication from './pages/UserAuthentication';
<<<<<<< HEAD
import ProductListing from './pages/ProductLising';
=======
import UserProfile from "@/pages/userprofile";
>>>>>>> 6845f648a8cc32201f2b2303227a4558a4075d3a


function App(): JSX.Element {
 

  return (
    <>
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/auth' element={<UserAuthentication />} />
<<<<<<< HEAD
        <Route path='/product' element={<ProductListing />} />
=======
        <Route path='/user-profile' element={<UserProfile />} />
>>>>>>> 6845f648a8cc32201f2b2303227a4558a4075d3a
      </Routes>
    </>
  );
}

export default App;
