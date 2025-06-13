import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import { LogOut, Menu, User, X } from "lucide-react";
import { useState, useRef, useEffect } from "react";

function NavBar() {
  const { isLoggedIn } = useAuthContext();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <header className="bg-slate-200 shadow-md px-5 py-4  top-0 sticky w-full z-20 border-b-2 border-b-slate-300">
        <nav className="max-w-7xl mx-auto flex justify-between items-center">
          {/* Logo */}
          <h1 className="text-2xl font-bold tracking-tight text-blue-700">
            <NavLink to="/">IDEA-HUB</NavLink>
          </h1>

          {/* Desktop Menu */}
          <ul className="hidden md:flex gap-6 items-center text-gray-700 text-sm font-medium">
            <NavItem to="/">Home</NavItem>
            <NavItem to="/ideas">Ideas</NavItem>
            {isLoggedIn && <NavItem to="/postIdea">Post Idea</NavItem>}
          </ul>

          {/* Auth Buttons or User Dropdown */}
          <div className="hidden md:block">
            {!isLoggedIn ? (
              <div className="space-x-4 text-sm font-medium text-blue-700">
                <NavLink
                  to="/login"
                  className="hover:underline hover:text-blue-900"
                >
                  Login
                </NavLink>
                <NavLink
                  to="/signup"
                  className="hover:underline hover:text-blue-900"
                >
                  Sign Up
                </NavLink>
              </div>
            ) : (
              <UserDropdown />
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-gray-700 focus:outline-none"
            >
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </nav>

        {/* Mobile Menu Content */}
        {menuOpen && (
          <div className="md:hidden px-5 pt-4 pb-6 space-y-3 bg-white border-t">
            <MobileNavItem to="/">Home</MobileNavItem>
            <MobileNavItem to="/ideas">Ideas</MobileNavItem>
            <div className="text-gray-600 hover:text-blue-600 cursor-pointer">About</div>
            {isLoggedIn && <MobileNavItem to="/postIdea">Post Idea</MobileNavItem>}
            {!isLoggedIn ? (
              <div className="space-x-4 text-sm font-medium text-blue-700">
                <NavLink to="/login">Login</NavLink>
                <NavLink to="/signup">Sign Up</NavLink>
              </div>
            ) : (
              <UserDropdown />
            )}
          </div>
        )}
      </header>

      <Outlet />
    </>
  );
}

export default NavBar;

function NavItem({ to, children }: { to: string; children: React.ReactNode }) {
  return (
    <li>
      <NavLink
        to={to}
        className={({ isActive }) =>
          `hover:text-blue-600 transition-colors ${
            isActive ? "text-blue-700 font-semibold" : ""
          }`
        }
      >
        {children}
      </NavLink>
    </li>
  );
}

function MobileNavItem({
  to,
  children,
}: {
  to: string;
  children: React.ReactNode;
}) {
  return (
    <NavLink
      to={to}
      className="block text-gray-700 font-medium hover:text-blue-600"
    >
      {children}
    </NavLink>
  );
}

export function UserDropdown() {
  const navigate = useNavigate();
  const { logOut, setIsLoggedIn } = useAuthContext();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-center w-9 h-9 rounded-full border border-gray-300 bg-white hover:bg-gray-100 transition"
      >
        <User className="w-5 h-5 text-gray-700" />
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-44 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-gray-200 z-20">
          <div className="py-1">
            {/* <Link
              to="/my-ideas"
              onClick={() => setOpen(false)}
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              My Ideas
            </Link> */}
            <button
              onClick={() => {
                setOpen(false);
                logOut();
                setIsLoggedIn(false);
                navigate("/");
              }}
              className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
            >
              <span className="flex items-center gap-2">
                <LogOut className="w-4 h-4" />
                Logout
              </span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
