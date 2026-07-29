import { Link, useLocation } from "react-router-dom";
import { FaHeartbeat, FaHome, FaChartBar, FaHistory } from "react-icons/fa";

function Navbar() {
  const location = useLocation();

  const navLink = (path) =>
    `flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 ${
      location.pathname === path
        ? "bg-white text-blue-700 shadow-md font-semibold"
        : "text-white hover:bg-blue-500"
    }`;

  return (
    <nav className="sticky top-0 z-50 bg-gradient-to-r from-blue-700 to-blue-500 shadow-lg">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-3 text-white text-2xl font-bold tracking-wide"
        >
          <FaHeartbeat className="text-red-300 text-3xl" />
          <span>AI Health Companion</span>
        </Link>

        {/* Navigation Links */}
        <div className="flex items-center gap-4">
          <Link to="/" className={navLink("/")}>
            <FaHome />
            <span>Home</span>
          </Link>

          <Link to="/dashboard" className={navLink("/dashboard")}>
            <FaChartBar />
            <span>Dashboard</span>
          </Link>

          <Link to="/history" className={navLink("/history")}>
            <FaHistory />
            <span>History</span>
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;