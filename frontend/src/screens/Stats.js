import { useEffect, useState } from "react";

import Cards from "../components/Disciplines/Cards";
import Numbers from "../components/Disciplines/Numbers";
import Words from "../components/Disciplines/Words";
import Images from "../components/Disciplines/Images";
import Names from "../components/Disciplines/Names";

import { useParams, useNavigate, Link } from "react-router-dom";
import { axiosPrivate } from "../api/axios";

import UserRadarChart from "../components/UserRadarChart";
import ErrorAlert from "../components/ErrorAlert";

function Stats() {
    const { ichat } = useParams();
    const navigate = useNavigate();

    const [width, setWidth] = useState(window.innerWidth);

    window.addEventListener("resize", (e) => {
        setWidth(e.target.innerWidth);
    });

    const [isLoading, setLoading] = useState(false);
    const [hasError, setHasError] = useState(false);
    const [errorMessage, setErrorMessage] = useState(
        "An unexpected error has occured"
    );

    const [userDetails, setUserDetails] = useState({});
    const [name, setName] = useState({
        first: "",
        last: "",
    });
    const [ranking, setRanking] = useState("Unranked");
    const [mastered, setMastered] = useState({});
    const [additional, setAdditional] = useState({});
    const [ccaDetails, setCCADetails] = useState({});
    const fetchData = async () => {
        try {
            setLoading(true);
            let userDetails = await axiosPrivate.get(
                `/${ichat}/stats?levels=true`
            );

            setUserDetails(userDetails.data);

            let splitted_names = userDetails.data.name.split(" ");
            let first = "";
            let last = splitted_names[splitted_names.length - 1];
            for (let i = 0; i < splitted_names.length - 1; i++) {
                first += splitted_names[i];
                i === splitted_names.length - 2
                    ? (first += "")
                    : (first += " ");
            }
            setName({
                first: first,
                last: last,
            });

            let ranking = await axiosPrivate.get(`/${ichat}/ranking`);
            setRanking(ranking.data.ranking);

            let mastered = await axiosPrivate.get(`/${ichat}/mastered`);
            setMastered(mastered.data);

            let additional = await axiosPrivate.get(
                `/${ichat}/additional_information`
            );
            setAdditional(additional.data);

            let cca_details = await axiosPrivate.get(`/cca/stats`);
            setCCADetails(cca_details.data);
        } catch (e) {
            if (e.code === "ERR_BAD_REQUEST") return navigate("/NotFound");
            setErrorMessage(
                !e.message ? "An unexpected error has occured" : e.message
            );
            setHasError(true);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <>
            {isLoading ? (
                <div className="flex items-center justify-center min-h-screen">
                    <span className="loading loading-dots loading-lg text-primary"></span>
                </div>
            ) : hasError ? (
                <ErrorAlert hasError={hasError} message={errorMessage} />
            ) : (
                <>
                    <div className="flex flex-col items-center justify-center">
                        <UserRadarChart
                            userDetails={userDetails}
                            ccaDetails={ccaDetails}
                        />
                        <div className="flex items-center justify-center space-x-2 text-5xl pt-12 flex-wrap text-center">
                            <h1 className="font-light">
                                {name.first}
                                <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent animate-gradient font-bold">
                                    {" " + name.last}
                                </span>
                            </h1>
                        </div>

                        <div className="flex items-center justify-center space-x-2  mt-8 text-sm">
                            <h1 className="italic font-light">CCA Ranking:</h1>

                            <Link
                                to="/leaderboard"
                                className={`badge badge-primary ${
                                    ranking !== "Unranked"
                                        ? ""
                                        : "badge-outline"
                                }`}
                            >
                                {ranking}
                            </Link>
                        </div>
                        {additional.quote ? (
                            <blockquote className="px-4 py-2 border-l-4 border-primary bg-primary-light text-primary-dark mt-8 bg-base-200 rounded-md">
                                <p className="font-light italic text-xl">
                                    "{additional.quote}"
                                </p>
                            </blockquote>
                        ) : (
                            ""
                        )}

                        <div className="flex items-center justify-center mt-12 overflow-x-auto w-full px-12 md:w-[750px] hide-scrollbar">
                            <div
                                className={`md:flex-wrap flex items-center justify-between md:justify-center whitespace-nowrap w-full ${
                                    width < 768 ? "marquee-content" : ""
                                }`}
                            >
                                {mastered.cards ? <Cards /> : ""}
                                {mastered.images ? <Images /> : ""}
                                {mastered.names ? <Names /> : ""}
                                {mastered.numbers ? <Numbers /> : ""}
                                {mastered.words ? <Words /> : ""}
                            </div>
                        </div>
                    </div>
                </>
            )}
        </>
    );
}

export default Stats;
