import {ThemeColors} from "./ThemeColors";
import { useContext } from "react";
import { ThemeContext } from "../screens/Layout";
const ChangeTheme = ({ setTheme }) => {
    let theme = useContext(ThemeContext)
    const handleChangeTheme = (e) => {
        e.preventDefault();
        let next_index = ThemeColors.indexOf(theme) + 1 === ThemeColors.length ? 0 : ThemeColors.indexOf(theme) + 1
        setTheme(ThemeColors[next_index]);
    };

    return (
        <button
            className="btn bg-base-100 shadow-lg"
            onClick={handleChangeTheme}
        >
            Change Theme
        </button>
    );
};

export default ChangeTheme;
