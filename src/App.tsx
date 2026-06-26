import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import Menu from './pages/Menu';
import Locations from './pages/Locations';
import Story from './pages/Story';

function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="menu" element={<Menu />} />
          <Route path="locations" element={<Locations />} />
          <Route path="story" element={<Story />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
