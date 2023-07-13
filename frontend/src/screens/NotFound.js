const NotFound = () => {
    return (
        <div className="hero min-h-screen bg-base-100">
            <div className="hero-content text-center">
                <div className="max-w-md">
                    <div className="flex items-center justify-center space-x-2">
                        <h1 className="text-5xl font-bold text-primary">SP</h1>
                        <h1 className="text-5xl font-light">MSC</h1>
                    </div>
                    <p className="py-6 text-lg italic">
                        Sorry, the page you have requested for does not exist!
                    </p>
                </div>
            </div>
        </div>
    );
};

export default NotFound;
