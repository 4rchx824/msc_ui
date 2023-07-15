import { useState, useEffect } from "react";
import ErrorAlert from "./ErrorAlert";
import { axiosPrivate } from "../api/axios";
import SearchResultRow from "./SearchResultRow";

const SearchResults = ({ searchOptions, page, setMaxPage, setIsLoading }) => {
    const [data, setData] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [hasError, setHasError] = useState(false);
    const [errorMessage, setErrorMessage] = useState(
        "An unexpected error has occured"
    );

    const fetchData = async () => {
        try {
            setLoading(true);
            setIsLoading(true);
            let { data } = await axiosPrivate.post("/search", {
                ...searchOptions,
                page: page,
            });
            setData(data.results);

            let count = await axiosPrivate.post("/search/count", {
                ...searchOptions,
                page: page,
            });
            setMaxPage(count.data.results);
        } catch (e) {
            console.error(e);
            setErrorMessage(
                !e.message ? "An unexpected error has occured" : e.message
            );
            setHasError(true);
        } finally {
            setTimeout(() => {
                setLoading(false);
                setIsLoading(false);
            }, 800);
        }
    };

    useEffect(() => {
        fetchData();
    }, [searchOptions, page]);

    return (
        <div
            className={`w-full h-full flex flex-col items-center ${
                isLoading ? "justify-center" : ""
            } flex-grow`}
        >
            {isLoading ? (
                <>
                    <span className="loading loading-dots loading-lg text-primary"></span>
                </>
            ) : hasError ? (
                <ErrorAlert hasError={hasError} message={errorMessage} />
            ) : (
                <>
                    {data.length === 0 ? (
                        <div className="flex flex-col items-center justify-center flex-grow">
                            <h1>There are no results for your search...</h1>
                        </div>
                    ) : (
                        <div className="w-full overflow-x-auto">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Images</th>
                                        <th>Cards</th>
                                        <th>Words</th>
                                        <th>Numbers</th>
                                        <th>Names</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.map((member) => (
                                        <SearchResultRow
                                            member={member}
                                            key={member.member_id}
                                        />
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default SearchResults;
