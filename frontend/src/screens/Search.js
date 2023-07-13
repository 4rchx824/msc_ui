import { useEffect, useState } from "react";
import SearchResults from "../components/SearchResults";
import Pagination from "../components/Pagination";

const Search = () => {
    const [searchType, setSearchType] = useState("iChat");
    const [page, setPage] = useState(1);
    const [searchOptions, setSearchOptions] = useState({
        searchType: searchType,
        searchString: "",
    });

    const [textInput, setTextInput] = useState("");
    const [maxPage, setMaxPage] = useState(1);

    const handleChangeType = (e) => {
        e.target.checked === true
            ? setSearchType("iChat")
            : setSearchType("Name");
    };

    const handleTextInput = (e) => {
        setTextInput(e.target.value);
    };

    const handleSearch = () => {
        setPage(1);
        setSearchOptions({
            searchType: searchType,
            searchString: textInput,
        });
    };

    const handleFormSubmit = (e) => {
        e.preventDefault()
        handleSearch()
    }

    useEffect(() => {
        setPage(1);
    }, [searchOptions]);

    return (
        <div className="flex flex-col min-h-screen items-center justify-between space-y-6 py-6">
            <div className="flex flex-col items-center justify-center w-full h-full flex-grow">
                <form className="flex items-center justify-center space-x-4 py-6 w-full" onSubmit={handleFormSubmit}>
                    <label className="swap btn btn-ghost text-primary rounded-md">
                        <input type="checkbox" onClick={handleChangeType} id="searchType" defaultChecked={searchType === "iChat" ? true : false} />
                        <div className="swap-on">iChat</div>
                        <div className="swap-off">Name</div>
                    </label>
                    <input
                        type="text"
                        placeholder={"Search " + searchType}
                        className="input input-bordered input-primary w-full max-w-md rounded-md"
                        onChange={handleTextInput}
                    />
                    <button className="btn btn-primary" onClick={handleSearch}>
                        <h1>Search</h1>
                    </button>
                </form>

                <SearchResults
                    searchOptions={searchOptions}
                    page={page}
                    setMaxPage={setMaxPage}
                />
            </div>

            <Pagination setPage={setPage} page={page} maxPage={maxPage} />
        </div>
    );
};

export default Search;
