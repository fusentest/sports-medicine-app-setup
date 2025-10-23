
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Appointments from './pages/Appointments';
import Treatments from './pages/Treatments';
import Athletes from './pages/Athletes';
import Resources from './pages/Resources';
import Profile from './pages/Profile';
import SignUp from './pages/SignUp';
import Biometrics from './pages/Biometrics';
import BiometricsConsent from './pages/BiometricsConsent';
import { Toaster } from './components/ui/toaster';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="appointments" element={<Appointments />} />
          <Route path="treatments" element={<Treatments />} />
          <Route path="athletes" element={<Athletes />} />
          <Route path="resources" element={<Resources />} />
          <Route path="profile" element={<Profile />} />
          <Route path="biometrics" element={<Biometrics />} />
        </Route>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/biometrics/consent" element={<BiometricsConsent />} />
      </Routes>
      <Toaster />
    </Router>
  );
}

export default App;