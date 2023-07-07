import RandomTheme from "./RandomTheme";

const Navbar = ({ setTheme }) => {
    return (
        <div className="w-full bg-base-300">
            <div className="w-full py-6 px-12 flex items-center justify-between">
                <div className="flex items-center justify-center space-x-2 text-2xl">
                    <h1 className="font-bold text-primary">SP</h1>
                    <h1 className="font-light">MSC</h1>
                </div>
                <RandomTheme setTheme={setTheme} />
            </div>
        </div>
    );
};

export default Navbar;
