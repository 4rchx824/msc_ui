import { useState, createContext, useEffect } from "react";
import Navbar from "../components/Navbar";
import "../main.css";

export const ThemeContext = createContext("corporate");

function Layout({ children }) {
    const [theme, setTheme] = useState("corporate");

    useEffect(() => {
        let saved_theme = localStorage.getItem("msc_theme");
        if (saved_theme) setTheme(saved_theme);
    }, []);

    useEffect(() => {
        localStorage.setItem("msc_theme", theme);
    }, [theme]);

    return (
        <ThemeContext.Provider value={theme}>
            <div
                className="min-h-screen h-full bg-base-100 w-full"
                data-theme={theme}
            >
                <header>
                    <Navbar setTheme={setTheme} />
                </header>
                <main className="px-8 py-2">{children}</main>
            </div>
        </ThemeContext.Provider>
    );
}

export default Layout;
