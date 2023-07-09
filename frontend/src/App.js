import "./main.css";
import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import UserRadarChart from "./components/UserRadarChart";

import Cards from "./components/Disciplines/Cards";
import Numbers from "./components/Disciplines/Numbers";
import Words from "./components/Disciplines/Words";
import Images from "./components/Disciplines/Images";
import Names from "./components/Disciplines/Names";

function App() {
    const [theme, setTheme] = useState("corporate");
    const [styles, setStyles] = useState("");

    const [width, setWidth] = useState(window.innerWidth)

   window.addEventListener("resize", (e) => {
        setWidth(
            e.target.innerWidth
        );
    });

    useEffect(() => {
        setStyles(
            window.getComputedStyle(document.getElementById("hidden_element"))
        );
    }, [theme]);

    return (
        <div data-theme={theme} className="min-h-screen h-full bg-base-100">
            <Navbar setTheme={setTheme} />
            <div
                className="hidden fill-primary stroke-secondary"
                id="hidden_element"
            ></div>
            <div className="flex flex-col items-center justify-center">
                <UserRadarChart fill={styles.fill} accent={styles.stroke} />
                <div className="flex items-center justify-center space-x-2 text-5xl pt-12">
                    <h1 className="font-light">Kenneth</h1>
                    <h1 className="font-bold text-5xl">
                        <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent animate-gradient">
                            Tan
                        </span>
                    </h1>
                </div>
                <div className="flex items-center justify-center space-x-2  mt-4 text-sm">
                    <h1 className="italic font-light">CCA Ranking:</h1>

                    <h1 className="px-3 py-1 bg-primary rounded-full font-bold text-primary-content">
                        1
                    </h1>
                </div>
                <blockquote className="px-4 py-2 border-l-4 border-primary bg-primary-light text-primary-dark mt-8 bg-base-100 rounded-md">
                    <p className="font-light italic text-xl">
                        "if i don't see it, it's not my problem"
                    </p>
                </blockquote>

                <div className="flex items-center justify-center mt-12 overflow-x-auto w-full px-12 md:w-[750px] hide-scrollbar">
                    <div className={`md:flex-wrap flex items-center justify-between md:justify-center whitespace-nowrap w-full ${width < 768 ? "marquee-content" : ""}`}>
                        <Cards />
                        <Images  />
                        <Names />
                        <Numbers  />
                        <Words  />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
