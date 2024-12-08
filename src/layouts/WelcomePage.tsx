import {useEffect, useState} from 'react';
import {signOut} from "../service/apiUsers.ts";
import {CoursesView} from "../components/CoursesView.tsx";
import '../assets/courses.css';
import {Logo} from "./Logo.tsx";

export const WelcomePage = () => {
    const [displayedText, setDisplayedText] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);
    const [phraseIndex, setPhraseIndex] = useState(0);
    const [charIndex, setCharIndex] = useState(0);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const welcomePhrases: string[] = [
        'Si tiene más quejas que estrellas, ¡huye!',
        'Elige al profe que enseña, no al que desaparece más que tus ganas de estudiar.',
        'Un mal profe puede convertir el curso más fácil en la misión imposible.',
        'Un mal profe enseña, pero sobre todo paciencia.',
        'Antes de elegir, revisa si ¿enseña o solo lee diapositivas?',
        'Un mal profe es el plot twist de tu ciclo.',
        'Más que clase, parece castigo.'
    ];

    useEffect(() => {
        const typingInterval = setInterval(() => {
            const currentPhrase = welcomePhrases[phraseIndex];

            if (isDeleting) {
                if (charIndex > 0) {
                    setDisplayedText(currentPhrase.substring(0, charIndex - 1));
                    setCharIndex((prev) => prev - 1);
                } else {
                    setIsDeleting(false);
                    setPhraseIndex((prev) => (prev + 1) % welcomePhrases.length);
                }
            } else {
                if (charIndex < currentPhrase.length) {
                    setDisplayedText(currentPhrase.substring(0, charIndex + 1));
                    setCharIndex((prev) => prev + 1);
                } else {
                    setTimeout(() => setIsDeleting(true), 1500);
                }
            }
        }, 50);
        return () => clearInterval(typingInterval);
    }, [charIndex, isDeleting, phraseIndex, welcomePhrases]);

    const handleLogout = async () => {
        await signOut();
        window.location.href = '/';
    };

    return (
        <div className="welcome-view">
            <Logo style={'logo'}/>
            <span className="phrases">
                <h1>{displayedText}</h1>
            </span>
            <CoursesView/>
            <button className="closeButton" onClick={handleLogout}>Cerrar Sesión</button>
        </div>
    );
};