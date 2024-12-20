import {Outlet} from "react-router-dom";
import '../assets/layout.css';
import {createPortal} from "react-dom";
import {useClickOutside} from "../hooks/useClickOutside.tsx";
import joy from '/joy.png'
import {useState} from "react";
import {User} from "../models/User.ts";

export function NavBar() {
    const [optionsShow, setOptionsShow] = useState(false);
    const [userModalShow, setUserModalShow] = useState(false);
    const options: Option[] = [
        {
            icon: "fas fa-user",
            text: "Ver Reseñas",
            onClickOption: () => alert("Ver Reseñas")
        },
        {
            icon: "fas fa-star",
            text: "Calificar",
            onClickOption: () => alert("Ver Calificaciones")
        },
        {
            icon: "fas fa-comments",
            text: "Dejar Comentarios",
            onClickOption: () => alert("Ver Comentarios")
        }
    ];
    const user: User = {
        email: "nataelsoto1234@gmail.com",
        username: "Gato",
        image: joy
    }

    return (
        <>
            <nav className="navbar">
                <i
                    className="fas fa-bars"
                    style={optionsShow ? { opacity: 0 } : { opacity: 1 }}
                    onClick={() => setOptionsShow(!optionsShow)}
                ></i>
                <h1>Comunidad <strong>ISIL</strong></h1>
                <i
                    className="fas fa-user"
                    onClick={() => setUserModalShow(!userModalShow)}
                ></i>
                <MenuNav
                    optionsShow={optionsShow}
                    setOptionsShow={setOptionsShow}
                    options={options}
                />
                {userModalShow && <UserMenuModal
                    user={user}
                    options={options}
                    setOptionsShow={setUserModalShow}
                />}
            </nav>
            <Outlet />
        </>
    );
}

export interface Option {
    icon?: string;
    text: string;
    onClickOption: () => void;
}

interface MenuNavProps {
    optionsShow?: boolean;
    setOptionsShow: (optionsShow: boolean) => void;
    options: Option[];
}

interface UserMenuModalProps extends MenuNavProps {
    user: User;
}

export function UserMenuModal(
    { user, setOptionsShow }: UserMenuModalProps
) {
    const navRef = useClickOutside<HTMLSpanElement>(() =>
        setOptionsShow(false)
    );

    return createPortal(
        <span
            className="user-menu-modal"
            ref={navRef}
        >
            <header>
                <span className="modal-close">
                    <i className="fa-solid fa-x close"
                       onClick={() => setOptionsShow(false)}
                    ></i>
                </span>
                <img src={user.image} alt="user"/>
                <h1>Hola {user.username}!</h1>
            </header>
        </span>,
        document.body
    );
}

export function MenuNav(
    {optionsShow, setOptionsShow, options}: MenuNavProps
) {
    const navRef = useClickOutside<HTMLDivElement>(() =>
        setOptionsShow(false));
    return (
        <aside
            className="options-nav"
            style={{ left: optionsShow ? "0" : "-100%" }}
            ref={navRef}
        >
            <div className="options-nav-content">
                {options.map((option, index) => (
                    <span key={index}
                          className="options-nav-option"
                          onClick={option.onClickOption}
                    >
                        <i className={option.icon}
                        ></i>
                        <p>{option.text}</p>
                    </span>
                ))}
                <i
                    className="fa-solid fa-x close"
                    onClick={() => setOptionsShow(false)}
                ></i>
            </div>
        </aside>
    )
}
