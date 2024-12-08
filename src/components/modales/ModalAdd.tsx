import React, {useState} from "react";
import {createPortal} from "react-dom";

interface ModalAddProps {
    title: string;
    onAdd: (courseName: string) => void;
    onCancel: () => void;
}

export const ModalAdd: React.FC<ModalAddProps> = ({ title, onAdd, onCancel }) => {
    const [modelName, setModelName] = useState('');

    return createPortal(
        <div className="modal">
            <div className="modal-content">
                <h2>Añadir {title}</h2>
                <span>
                    <label>Nombre:</label>
                    <input
                        placeholder={`Nombre del ${title.toLowerCase()}`}
                        value={modelName}
                        onChange={(e) => setModelName(e.target.value)}
                    />
                </span>
                <div className="modal-buttons">
                    <button className="closeButton" onClick={onCancel}>Cancelar</button>
                    <button onClick={() => onAdd(modelName)}>Agregar</button>
                </div>
            </div>
        </div>,
        document.body
    );
};