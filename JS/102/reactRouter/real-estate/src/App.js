import { NavLink, Outlet } from 'react-router-dom'
import './App.css';

export default function App() {
  return (
    <>
    <div id='header'>
    <h1>Real Estate</h1>

      <nav >
        <NavLink to="/">home</NavLink> |
        <NavLink to="/buy"> buy</NavLink> |
        <NavLink to="/sell"> sell</NavLink>
      </nav>
      </div>
      <Outlet />
    </>
  );
}


