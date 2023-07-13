import { useNavigate } from "react-router-dom";
const LeaderboardRow = ({ member }) => {
    const navigate = useNavigate();

    const handleRowClicked = () => {
        let ichat = member.ichat.replace("@ichat.sp.edu.sg", "");
        navigate(`/${ichat}/stats`);
    };

    return (
        <tr onClick={handleRowClicked} className="hover">
            <td>
                <div className="flex items-center justify-center">
                    <h1
                        className={`${
                            member.standing === 1
                                ? "badge badge-primary"
                                : member.standing === 2
                                ? "badge badge-secondary"
                                : member.standing === 3
                                ? "badge badge-accent"
                                : ""
                        }`}
                    >
                        {member.standing}
                    </h1>
                </div>
            </td>
            <td>{member.name}</td>
            <td>{member.images == null ? "Unattempted" : member.images}</td>
            <td>{member.cards == null ? "Unattempted" : member.cards}</td>
            <td>{member.words == null ? "Unattempted" : member.words}</td>
            <td>{member.numbers == null ? "Unattempted" : member.numbers}</td>
            <td>{member.names == null ? "Unattempted" : member.names}</td>
        </tr>
    );
};

export default LeaderboardRow;
