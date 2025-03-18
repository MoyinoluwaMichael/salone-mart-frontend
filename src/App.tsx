import { Route, Routes } from 'react-router-dom';
import LandingPage from './pages/landingpage';


function App(): JSX.Element {
 

  return (
    <>
      <Routes>
        <Route path='/' element={<LandingPage />} />
      </Routes>
    </>
  );
}

export default App;
