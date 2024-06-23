import { NavLink } from "react-router-dom";

const Navbar = () => {
  const activeStyle = {
    fontWeight: 700,
    color: "rgb(250, 153, 8)",
  };

  return (
    <header>
      <h2 className="logo">KYN</h2>
      <nav>
        <ul className="nav_link">
          <li>
            <NavLink
              style={({ isActive }) => (isActive ? activeStyle : null)}
              to="/"
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              style={({ isActive }) => (isActive ? activeStyle : null)}
              to="/about"
            >
              About Us
            </NavLink>
          </li>
          <li>
            <NavLink
              style={({ isActive }) => (isActive ? activeStyle : null)}
              to="/contact"
            >
              Contact Us
            </NavLink>
          </li>
          <li>
            <NavLink
              style={({ isActive }) => (isActive ? activeStyle : null)}
              to="/terms"
            >
              Terms
            </NavLink>
          </li>
        </ul>
      </nav>
      <div className="btn">
        <li>
          <a href="/login" className="login">
            Login
          </a>
        </li>
        <li>
          <a href="/register">Register</a>
        </li>
      </div>
    </header>
  );
};

export default Navbar;

{
  /* <NavLink
style={({ isActive }) => (isActive ? activeStyle : null)}
to="/about
/contac
/terms"
>
Home
</NavLink> */
}
