import Number from "../../svg/Numbers.svg";

const Numbers = () => {
    return (
        <div className="flex items-center justify-center space-x-2 bg-primary-content px-4 py-2 rounded-full m-4">
            <img src={Number} className="h-6" />
            <h1 className="font-semibold text-primary-focus">Numbers Expert</h1>
        </div>
    );
};

export default Numbers;
