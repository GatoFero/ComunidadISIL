import { useState, useEffect } from 'react';

export const useTypingEffect = (
    phrases: string[], typingSpeed = 40, delayBetweenPhrases = 1500
) => {
    const [displayedText, setDisplayedText] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);
    const [phraseIndex, setPhraseIndex] = useState(0);
    const [charIndex, setCharIndex] = useState(0);

    useEffect(() => {
        const typingInterval = setInterval(() => {
            const currentPhrase = phrases[phraseIndex];

            if (isDeleting) {
                if (charIndex > 0) {
                    setDisplayedText(currentPhrase.substring(0, charIndex - 1));
                    setCharIndex((prev) => prev - 1);
                } else {
                    setIsDeleting(false);
                    setPhraseIndex((prev) => (prev + 1) % phrases.length);
                }
            } else {
                if (charIndex < currentPhrase.length) {
                    setDisplayedText(currentPhrase.substring(0, charIndex + 1));
                    setCharIndex((prev) => prev + 1);
                } else {
                    setTimeout(() => setIsDeleting(true), delayBetweenPhrases);
                }
            }
        }, typingSpeed);

        return () => clearInterval(typingInterval);
    }, [charIndex, isDeleting, phraseIndex, phrases, typingSpeed, delayBetweenPhrases]);

    return displayedText;
};
