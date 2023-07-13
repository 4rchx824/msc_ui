import { Link } from "react-router-dom";
const Landing = () => {
    return (
        <div className="hero min-h-screen">
            <div className="hero-content text-center">
                <div className="max-w-full">
                    <div className="flex items-center justify-center space-x-2 text-5xl">
                        <h1 className="font-bold text-primary">SP</h1>
                        <h1 className="font-light">MSC</h1>
                    </div>
                    <p className="py-12 max-w-md text-lg italic">
                        Welcome to SP MSC! Search for a member's statistics with
                        their Name or iChat email!
                    </p>
                    <Link
                        to="/search"
                        className="btn btn-primary animate-bounce"
                    >
                        Get Started
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Landing;
