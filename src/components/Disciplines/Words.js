import Word from "../../svg/Words.svg";

const Words = () => {
    return (
        <div className="flex items-center justify-center space-x-2 bg-primary-content px-4 py-2 rounded-full m-4 flex-shrink-0">
            <img src={Word} className="h-6" />
            <h1 className="font-semibold text-primary-focus">Words Expert</h1>
        </div>
    );
};

export default Words;
