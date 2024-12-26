import {Career} from "../models/Career.ts";
import {createContext, ReactNode, useEffect, useState} from "react";
import {getAllCareers} from "../service/apiCareers.ts";
import {ModalStateProps, ModalStatus} from "../components/modales/ModalStatus.tsx";
import {NavigateFunction, useNavigate} from "react-router-dom";

interface AppContextType {
    careers: Career[];
    navigate: NavigateFunction;
    toggleModalStatus: (show: boolean, modalProps?: ModalStateProps) => void;
}

// eslint-disable-next-line react-refresh/only-export-components
export const AppContext = createContext<
    AppContextType | undefined
>(undefined);

export function AppProvider(
    { children }: { children: ReactNode }
) {
    const [careers, setCareers] = useState<Career[]>([]);
    const [modalStatus, setModalStatus] = useState<ModalStateProps>({
        title: "",
        message: "",
        onClose: () => {},
        type: ""
    });
    const [showModalStatus, setShowModalStatus] = useState<boolean>(false)
    const navigate = useNavigate();

    const fetchCareers = async () => {
        const data = await getAllCareers();
        setCareers(data);
        localStorage.setItem('careers', JSON.stringify(data));
    };

    const toggleModalStatus = (show: boolean, modalProps?: ModalStateProps) => {
        setShowModalStatus(show);
        if (modalProps) {
            setModalStatus(modalProps);
        }
        console.log(modalProps, show);
    };

    useEffect(() => {
        const storedCareers = localStorage.getItem('careers');
        if (storedCareers) {
            setCareers(JSON.parse(storedCareers));
        } else {
            fetchCareers();
        }
    }, [])

    return (
        <AppContext.Provider value={{
            careers,
            navigate,
            toggleModalStatus,
        }}>
            {children}
            {showModalStatus && (
                <ModalStatus type={modalStatus.type}
                             title={modalStatus.title}
                             message={modalStatus.message}
                             onClose={modalStatus.onClose}
                />
            )}
        </AppContext.Provider>
    )
}
