import {createPortal} from "react-dom";

interface ModalProps {
    message: string
    onClose: () => void
}

export function Modal(
    { message, onClose }: ModalProps
){
    return createPortal(
        <div className="modal">
            <div className="modal-content">
                <h2>Error</h2>
                <p>{message}</p>
                <button onClick={onClose}>Cerrar</button>
            </div>
        </div>,
        document.body
    );
}