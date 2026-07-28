import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-blue-600 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        <h1 className="text-2xl font-bold">
          🏥 AI Health Companion
        </h1>

        <div className="flex items-center space-x-8 font-medium">

          <Link
            to="/"
            className="hover:text-blue-200 transition"
          >
            🏠 Home
          </Link>

          <Link
            to="/dashboard"
            className="hover:text-blue-200 transition"
          >
            📊 Dashboard
          </Link>

          <Link
            to="/history"
            className="hover:text-blue-200 transition"
          >
            📜 History
          </Link>

        </div>

      </div>
    </nav>
  );
}

export default Navbar;