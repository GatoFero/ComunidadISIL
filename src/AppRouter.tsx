import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import {Home} from "./layouts/Home.tsx";
import {Register} from "./layouts/Register";
import {Login} from "./layouts/Login.tsx";
import {NavBar} from "./layouts/NavBar.tsx";

export const AppRouter = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route element={<NavBar />}>
                    <Route path="/home" element={<Home />} />
                    {/*<Route path="/course/:id" element={<CoursePage />}/>*/}
                </Route>
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </Router>
    );
};