import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import {Home} from "./pages/Home.tsx";
import {Register} from "./layouts/Register";
import {Login} from "./layouts/Login.tsx";
import {NavBar} from "./layouts/NavBar.tsx";
import {AppProvider} from "./context/AppContext.tsx";
import {UserProvider} from "./context/UserContext.tsx";
import {GradeCalculator} from "./pages/GradeCalculator.tsx";

export const AppRouter = () => {
    return (
        <Router>
            <AppProvider>
                <UserProvider>
                    <Routes>
                        <Route path="/" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route element={<NavBar />}>
                            <Route path="/home" element={<Home />} />
                            <Route path="/calculator" element={<GradeCalculator/>} />
                            {/*<Route path="/course/:id" element={<CoursePage />}/>*/}
                        </Route>
                        <Route path="*" element={<Navigate to="/" />} />
                    </Routes>
                </UserProvider>
            </AppProvider>
        </Router>
    );
};