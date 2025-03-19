import { Route, Routes } from 'react-router-dom';
import LandingPage from './pages/landingpage';
import UserAuthentication from './pages/UserAuthentication';


function App(): JSX.Element {
 

  return (
    <>
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/auth' element={<UserAuthentication />} />
      </Routes>
    </>
  );
}

export default App;
