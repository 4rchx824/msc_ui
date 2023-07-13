import { useEffect, useState } from "react";
import { axiosPrivate } from "../api/axios";

import ErrorAlert from "../components/ErrorAlert";
import LeaderboardRow from "../components/LeaderboardRow";

const Leaderboard = () => {
    const [isLoading, setLoading] = useState(false);
    const [hasError, setHasError] = useState(false);
    const [errorMessage, setErrorMessage] = useState(
        "An unexpected error has occured"
    );

    const [leaderboard, setLeaderboard] = useState([]);

    const fetchLeaderboard = async () => {
        try {
            setLoading(true);
            const { data } = await axiosPrivate.get("/cca/leaderboard");
            setLeaderboard(data);
        } catch (e) {
            console.error(e);
            setErrorMessage(
                !e.message ? "An unexpected error has occured" : e.message
            );
            setHasError(true);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchLeaderboard();
    }, []);
    return (
        <div className="my-8">
            <div className="flex items-center justify-center space-x-4 text-5xl">
                <div className="flex items-center justify-center space-x-2">
                    <h1 className="font-bold text-primary">SP</h1>
                    <h1 className="font-light">MSC</h1>
                </div>
                <h1 className="font-light">- Leaderboard ( TOP 15 )</h1>
            </div>

            {isLoading ? (
                <div className="flex items-center justify-center min-h-screen">
                    <span className="loading loading-dots loading-lg text-primary"></span>
                </div>
            ) : hasError ? (
                <ErrorAlert hasError={hasError} message={errorMessage} />
            ) : (
                <>
                    {leaderboard.length === 0 ? (
                        <h1>Leaderboard is empty...</h1>
                    ) : (
                        <div className="w-full overflow-x-auto mt-8">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>
                                            <div className="flex items-center justify-center">
                                                Ranking
                                            </div>
                                        </th>
                                        <th>Name</th>
                                        <th>Images</th>
                                        <th>Cards</th>
                                        <th>Words</th>
                                        <th>Numbers</th>
                                        <th>Names</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {leaderboard.map((member) => (
                                        <LeaderboardRow
                                            member={member}
                                            key={member.ichat}
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

export default Leaderboard;
