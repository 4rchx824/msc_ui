import Image from "../../svg/Images.svg";

const Images = () => {
    return (
        <div className="flex items-center justify-center space-x-2 bg-accent-content px-4 py-2 rounded-full m-4">
            <img src={Image} className="h-6" />
            <h1 className="font-semibold text-accent-focus">Images Expert</h1>
        </div>
    );
};

export default Images;
