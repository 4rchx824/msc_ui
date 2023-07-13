import ChangeTheme from "./ChangeTheme";
import { Link } from "react-router-dom";

const Navbar = ({ setTheme }) => {
    return (
        <>
            <div className="navbar bg-base-300 px-4">
                <div className="navbar-start">
                    <div className="dropdown">
                        <label tabIndex={0} className="btn btn-ghost lg:hidden">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h8m-8 6h16"
                                />
                            </svg>
                        </label>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-300 rounded-box w-52"
                        >
                            <li>
                                <Link to="/search">
                                    <h1>Search</h1>
                                </Link>
                            </li>
                            <li>
                                <Link to="/leaderboard">
                                    <h1>Leaderboard</h1>
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <Link
                        className="flex items-center justify-center text-2xl btn btn-ghost normal-case p-1"
                        to="/"
                    >
                        <h1 className="font-bold text-primary">SP</h1>
                        <h1 className="font-light">MSC</h1>
                    </Link>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1 space-x-2">
                        <li>
                            <Link to="/search">
                                <h1>Search</h1>
                            </Link>
                        </li>
                        <li>
                            <Link to="/leaderboard">
                                <h1>Leaderboard</h1>
                            </Link>
                        </li>
                    </ul>
                </div>

                <div className="navbar-end">
                    <ChangeTheme setTheme={setTheme} />
                </div>
            </div>
        </>
    );
};

export default Navbar;
