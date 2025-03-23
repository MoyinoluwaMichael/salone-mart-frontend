import { Route, Routes } from 'react-router-dom';
import LandingPage from './home/HomePage';
import UserAuthentication from './authentication/AuthenticationPage';
import ProductListing from './product/productlist/ProductListPage';
import UserProfile from "@/userprofile/UserProfilePage";
import ProductDetails from './product/productdetail/ProductDetailPage';

function App(): JSX.Element {
  return (
      <>
        <Routes>
          <Route path='/' element={<LandingPage />} />
          <Route path='/auth' element={<UserAuthentication />} />
          <Route path='/products' element={<ProductListing />} />  {/* Query params*/}
          <Route path='/products/:productId' element={<ProductDetails />} />  {/* Dynamic route */}
          <Route path='/user-profile' element={<UserProfile />} />
        </Routes>
      </>
  );
}

export default App;
