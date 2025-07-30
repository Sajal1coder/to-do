import './navbar.css';
import { useAuth } from '../context/AuthContext';
const Navbar = () => {
  const {logout}=useAuth();
  return (
    <nav className="navbar">
      <h1>Daily Task Manager</h1>
      <button className="logout-btn" onClick={logout}>Logout</button>
    </nav>
  );
};

export default Navbar;
