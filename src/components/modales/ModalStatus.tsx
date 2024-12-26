import {createPortal} from "react-dom";
import {ModalType} from "../../utils/Enums.ts";
import {useClickOutside} from "../../hooks/useClickOutside.tsx";
import {useEffect, useState} from "react";

export interface ModalProps {
    title: string;
    message: string
    onClose: () => void
}

export interface ModalStateProps extends ModalProps {
    type: string;
}

export function ModalStatus(
    { title, message, type, onClose }: ModalStateProps
){
    const [modalType, setModalType] = useState<{className: string, text: string}>({className: '', text: ''});
    const modalRef = useClickOutside<HTMLDivElement>(() =>
        onClose());
    useEffect(() => {
       if (type == ModalType.Error) setModalType({className: "buttonClose", text: "Cerrar"});
       else if (type == ModalType.Success) setModalType({className: "buttonSecondary", text: "Aceptar"});
    },[setModalType, type])

    return createPortal(
        <div className={`modal-status`}>
            <div ref={modalRef}
                 className="modal-content">
                <h1>{title}</h1>
                <pre>{message}</pre>
                <button className={modalType.className}
                        onClick={onClose}
                >{modalType.text}</button>
            </div>
        </div>,
        document.body
    );
}