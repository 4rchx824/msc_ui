import Card from "../../svg/Cards.svg";

const Cards = () => {
    return (
        <div className="flex items-center justify-center space-x-2 bg-primary-content px-4 py-2 rounded-full m-4">
            <img src={Card} className="h-6" />
            <h1 className="font-semibold text-primary-focus">Cards Expert</h1>
        </div>
    );
};

export default Cards;
