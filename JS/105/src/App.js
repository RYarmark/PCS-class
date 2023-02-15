import './App.css';
import { Routes, Route, Outlet, Navigate } from 'react-router-dom';
import Home from './Home';
import Posts from './PostList';
import AddPost from './AddPost';




function App() {

  return (
    <>    <h1 id='header'>The Blog Spot</h1>
      <Routes>
        <Route index element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/posts/:id" element={<Posts />} />
        <Route path="/addPost" element={<AddPost />} />

        <Route path="*" element={<Navigate to="/" replace="true" />} />

      </Routes>
      <Outlet />

    </>
  )

}

export default App