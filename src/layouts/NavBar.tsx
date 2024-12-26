import '../assets/css/layout.css';
import {Outlet} from "react-router-dom";
import {createPortal} from "react-dom";
import {useClickOutside} from "../hooks/useClickOutside.tsx";
import {useState} from "react";
import {User} from "../models/User.ts";
import Invited from '/invited.svg'
import {useUserContext} from "../hooks/useUserContext.tsx";
import {useAppContext} from "../hooks/useAppContext.tsx";

export function NavBar() {
    const [optionsShow, setOptionsShow] = useState<boolean>(false);
    const [userModalShow, setUserModalShow] = useState<boolean>(false);
    const { user, handleSignOut } = useUserContext();

    return (
        <>
            <nav className="navbar">
                <i
                    className="fas fa-bars"
                    style={optionsShow ? { opacity: 0 } : { opacity: 1 }}
                    onClick={() => setOptionsShow(!optionsShow)}
                ></i>
                <h1>Comunidad <strong>ISIL</strong></h1>
                <img src={user? user.picture : Invited}
                     alt={"user-picture"}
                     onClick={() =>
                         setUserModalShow(!userModalShow)}
                />
                <MenuNav
                    optionsShow={optionsShow}
                    setOptionsShow={setOptionsShow}
                />
                {userModalShow && <UserMenuModal
                    user={user}
                    setOptionsShow={setUserModalShow}
                    handleNavigateToUser={() => handleSignOut()}
                />}
            </nav>
            <Outlet />
        </>
    );
}

export interface Option {
    icon?: string;
    text: string;
    onClickOption: string;
}

interface MenuNavProps {
    optionsShow?: boolean;
    setOptionsShow: (optionsShow: boolean) => void;
    options?: Option[];
}

interface UserMenuModalProps extends MenuNavProps {
    user?: User | null;
    handleNavigateToUser: () => Promise<void>;
}

export function UserMenuModal(
    { user, setOptionsShow, handleNavigateToUser }: UserMenuModalProps
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
                <img style={{borderRadius: '100%'}}
                     src={user?.picture ? user.picture : Invited}
                     alt="user"/>
                <h1>Hola {user? user.username : 'Invitado'}!</h1>
            </header>
            <aside>
                {user && (
                    <span>
                        <i className="fas fa-gear"></i>
                        <p>Configurar</p>
                    </span>
                )}
                <span>
                    <i className="fas fa-dollar-sign"></i>
                    <p>Contribuir</p>
                </span>
                <span onClick={handleNavigateToUser}>
                    <p>{user? 'Cerrar Sesión' : 'Iniciar Sesión'}   </p>
                </span>
            </aside>
        </span>,
        document.body
    );
}

export function MenuNav(
    {optionsShow, setOptionsShow}: MenuNavProps
) {
    const navRef = useClickOutside<HTMLDivElement>(() =>
        setOptionsShow(false));
    const { navigate } = useAppContext();
    const options: Option[] = [
        {
          icon: "fas fa-home",
          text: "Inicio",
          onClickOption: "/home"
        },
        {
            icon: "fas fa-calculator",
            text: "Calcular Notas",
            onClickOption: "/calculator"
        },
        {
            icon: "fas fa-graduation-cap",
            text: "Carreras",
            onClickOption: "/calculator"
        },
        {
            icon: "fas fa-book",
            text: "Reseñas de Cursos",
            onClickOption: "/calculator"
        },
        {
            icon: "fas fa-user-tie",
            text: "Profesores",
            onClickOption: "/calculator"
        },
        {
            icon: 'fas fa-comments',
            text: "Experiencias ISIL",
            onClickOption: "/calculator"
        }
    ];
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
                          onClick={() => {
                              setOptionsShow(false)
                              navigate(option.onClickOption)
                          }}
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
