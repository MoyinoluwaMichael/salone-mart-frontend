import { Route, Routes } from 'react-router-dom';
import LandingPage from './pages/landingpage';
import UserAuthentication from './pages/UserAuthentication';
import UserProfile from "@/pages/userprofile";


function App(): JSX.Element {
 

  return (
    <>
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/auth' element={<UserAuthentication />} />
        <Route path='/user-profile' element={<UserProfile />} />
      </Routes>
    </>
  );
}

export default App;
