function Navbar() {
  return (
    <nav className="bg-blue-600 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        <h1 className="text-2xl font-bold">
          🏥 AI Health Companion
        </h1>

        <div className="space-x-8 font-medium">
          <a href="/" className="hover:text-gray-200">
            Home
          </a>

          <a href="/history" className="hover:text-gray-200">
            History
          </a>

          <a href="#" className="hover:text-gray-200">
            About
          </a>
        </div>

      </div>
    </nav>
  );
}

export default Navbar;