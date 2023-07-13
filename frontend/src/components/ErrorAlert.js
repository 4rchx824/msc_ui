import { useEffect } from "react";

const ErrorAlert = ({ hasError, message }) => {
    useEffect(() => {
        if (hasError) window.error_modal.showModal();
    }, [hasError]);
    return (
        <>
            <dialog id="error_modal" className="modal">
                <form method="dialog" className="modal-box">
                    <h3 className="font-bold text-lg">Error!</h3>
                    <p className="py-4">{message}</p>
                </form>
                <form method="dialog" className="modal-backdrop">
                    <button>Close</button>
                </form>
            </dialog>
        </>
    );
};

export default ErrorAlert;
