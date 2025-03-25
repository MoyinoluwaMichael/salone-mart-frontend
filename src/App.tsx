import { Route, Routes } from 'react-router-dom';
import LandingPage from './home/HomePage';
import UserAuthentication from './authentication/AuthenticationPage';
import ProductListing from './product/productlist/ProductListPage';
import UserProfile from "@/userprofile/customer/CustomerPage";
import ProductDetails from './product/productdetail/ProductDetailPage';
import AdminProfile from "@/userprofile/admin/AdminProfilePage";
import VendorDetails from "@/userprofile/admin/components/VendorDetails";
import VendorProfilePage from "@/userprofile/vendor/VendorProfilePage";

function App(): JSX.Element {
  return (
      <>
        <Routes>
          <Route path='/' element={<LandingPage />} />
          <Route path='/auth' element={<UserAuthentication />} />
          <Route path='/products' element={<ProductListing />} />  {/* Query params*/}
          <Route path='/products/:productId' element={<ProductDetails />} />  {/* Dynamic route */}
          <Route path='/profile' element={<UserProfile />} />
          <Route path='/admin-profile' element={<AdminProfile />} />
          <Route path='/vendor-profile' element={<VendorProfilePage />} />
          <Route path='/vendors/:vendorId' element={<VendorDetails />} />
        </Routes>
      </>
  );
}

export default App;
