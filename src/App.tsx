import './App.css';

import { Route, Routes } from 'react-router-dom';

import PostDetail from './components/PostDetail';
import PrimaryPage from './components/PrimaryPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<PrimaryPage />} />
      <Route path="/post/:id" element={<PostDetail />} />
    </Routes>
  );
}

export default App;
