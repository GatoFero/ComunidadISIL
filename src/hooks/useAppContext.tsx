import {useContext} from "react";
import {AppContext} from "../context/AppContext.tsx";

export const useAppContext = () => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error("useAppContext must be used within the AppProvider");
    }
    return context;
};