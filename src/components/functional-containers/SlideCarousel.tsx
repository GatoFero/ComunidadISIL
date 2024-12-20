import React, {useRef, useState} from "react";
import "../../assets/slide-carousel.css";

interface SlideCarouselProps {
    slides: React.ReactNode[];
}

export function SlideCarousel({ slides }: SlideCarouselProps) {
    const [currentSlide, setCurrentSlide] = useState(0);
    const slideRef = useRef<HTMLDivElement | null>(null);

    const startX = useRef(0); // Posición inicial
    const isDragging = useRef(false); // Estado del arrastre
    const currentTranslate = useRef(0); // Desplazamiento actual
    const prevTranslate = useRef(0); // Último desplazamiento registrado

    // Inicia el arrastre (para mouse y toque)
    const handleStart = (e: React.MouseEvent | React.TouchEvent) => {
        isDragging.current = true;
        startX.current = "touches" in e ? e.touches[0].clientX : e.clientX;
        prevTranslate.current = -currentSlide * 100; // Posición inicial del carrusel

        if (slideRef.current) {
            slideRef.current.style.transition = "none"; // Desactiva la transición durante el arrastre
        }
    };

    // Mueve el slide según el arrastre (para mouse y toque)
    const handleMove = (e: React.MouseEvent | React.TouchEvent) => {
        if (!isDragging.current) return;

        const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
        const deltaX = clientX - startX.current;
        currentTranslate.current = prevTranslate.current + (deltaX / window.innerWidth) * 100;

        if (slideRef.current) {
            slideRef.current.style.transform = `translateX(${currentTranslate.current}vw)`;
        }
    };

    // Finaliza el arrastre y determina el slide (para mouse y toque)
    const handleEnd = () => {
        if (!isDragging.current) return;

        isDragging.current = false;

        const deltaX = currentTranslate.current - prevTranslate.current;

        // Cambia de slide si el arrastre supera el umbral (15vw)
        if (deltaX < -10 && currentSlide < slides.length - 1) {
            setCurrentSlide((prev) => prev + 1);
        } else if (deltaX > 10 && currentSlide > 0) {
            setCurrentSlide((prev) => prev - 1);
        }

        // Restablece la posición del slide actual
        if (slideRef.current) {
            slideRef.current.style.transition = "transform 0.3s ease";
            slideRef.current.style.transform = `translateX(-${currentSlide * 100}vw)`;
        }
    };

    return (
        <div
            className="slide-carousel"
            ref={slideRef}
            onMouseDown={handleStart}
            onTouchStart={handleStart}
            onMouseMove={handleMove}
            onTouchMove={handleMove}
            onMouseUp={handleEnd}
            onTouchEnd={handleEnd}
            onMouseLeave={handleEnd} // Para manejar el caso cuando el mouse sale del carrusel
            style={{
                transform: `translateX(-${currentSlide * 100}vw)`,
                width: `${slides.length * 100}vw`,
            }}
        >
            {slides.map((slide, index) => (
                <div className="slide-carousel-children" key={index}>
                    {slide}
                </div>
            ))}
        </div>
    );
}

