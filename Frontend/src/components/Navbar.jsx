import { useState } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";

const Navbar = ({ toggleAuthModel }) => {
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await axios.get("/auth/logout", { withCredentials: true });
      logout();
      setOpen(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <nav className="fixed top-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="h-20 flex items-center justify-between">
          
          {/* Logo */}
          <div className="flex items-center">
            <p className="text-2xl text-white">M-FIT </p>
            <p className="text-[#7AB204] text-2xl">Gym</p>
          </div>

          {/* Links */}
          <div className="flex gap-6">
            {["Home","About","Classes","Membership","Testimonial","Contact"].map(link => (
              <a key={link} href="#" className="text-sm text-white hover:text-[#7AB204]">
                {link}
              </a>
            ))}
          </div>

          {/* Auth Section */}
          <div className="relative">
            {!user ? (
              <button
                onClick={toggleAuthModel}
                className="border border-white text-white px-4 py-2 hover:bg-[#7AB204]"
              >
                Join now
              </button>
            ) : (
              <>
                <button
                  onClick={() => setOpen(prev => !prev)}
                  className="w-10 h-10 rounded-full bg-[#7AB204] text-white flex items-center justify-center font-semibold"
                >
                  {user?.username?.charAt(0).toUpperCase()}
                </button>

                {open && (
                  <div className="absolute right-0 mt-2 w-40 bg-white border rounded-lg shadow-lg">
                    <div className="px-4 py-2 border-b text-sm font-medium">
                      {user?.username}
                    </div>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </>
            )}
          </div>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;
