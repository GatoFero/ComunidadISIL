import React from "react";
import {createPortal} from "react-dom";

interface ModalProps {
    message: string
    onClose: () => void
}

export const Modal: React.FC<ModalProps> = ({ message, onClose }) => {
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