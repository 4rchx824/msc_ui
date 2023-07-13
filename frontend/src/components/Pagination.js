const Pagination = ({ setPage, page, maxPage }) => {
    const handleFirst = () => {
        setPage(1);
    };

    const handleLast = () => {
        setPage(maxPage);
    };

    const handleNext = () => {
        setPage(page + 1 > maxPage ? page : page + 1);
    };

    const handlePrev = () => {
        setPage(page - 1 >= 1 ? page - 1 : page);
    };

    return (
        <div className="join">
            <button className="join-item btn" onClick={handleFirst}>
                «
            </button>
            <button className="join-item btn" onClick={handlePrev}>
                Prev
            </button>
            <button className="join-item btn">{page}</button>
            <button className="join-item btn" onClick={handleNext}>
                Next
            </button>
            <button className="join-item btn" onClick={handleLast}>
                »
            </button>
        </div>
    );
};

export default Pagination;
