import { useNavigate } from "react-router-dom";
const SearchResultRow = ({ member }) => {
    const navigate = useNavigate()

    const handleRowClicked = () => {
        let ichat = member.ichat.replace("@ichat.sp.edu.sg", "")
        navigate(`/${ichat}/stats`)
    }
    return (
        <tr onClick={handleRowClicked} className="hover hover:cursor-pointer">
            <td>{member.name}</td>
            <td>{member.images == null ? "Unattempted" : member.images}</td>
            <td>{member.cards == null ? "Unattempted" : member.cards}</td>
            <td>{member.words == null ? "Unattempted" : member.words}</td>
            <td>{member.numbers == null ? "Unattempted" : member.numbers}</td>
            <td>{member.names == null ? "Unattempted" : member.names}</td>
        </tr>
    );
};

export default SearchResultRow;
