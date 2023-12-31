import Name from "../../svg/Names.svg";

const Names = () => {
    return (
        <div className="flex items-center justify-center space-x-2 bg-primary-content px-4 py-2 rounded-full m-4 flex-shrink-0">
            <img src={Name} className="h-6" />
            <h1 className="font-semibold text-primary-focus">Names Expert</h1>
        </div>
    );
};

export default Names;
