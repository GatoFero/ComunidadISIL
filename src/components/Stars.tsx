import {useState} from "react";
import star from "/star-solid.svg";
import starVoid from "/star-solid-void.svg";

interface StarsProp {
    qualification: number;
}
interface InteractiveStarsProps{
    selectedStars: number;
    onChange: (qualification: number) => void;
}

export function StaticStars(
    { qualification }: StarsProp
){
    return (
        <span className="stars">
        {Array.from({length: 5}, (_, index) => (
            <img
                key={index}
                src={index < qualification ? star : starVoid}
                alt={index < qualification ? "star" : "empty star"}
                style={{opacity: index < qualification ? 1 : 0.3}}
            />
        ))}
    </span>
    )
}

export function InteractiveStars(
    { selectedStars , onChange }: InteractiveStarsProps
){
    const [hoverStars, setHoverStars] = useState<number | null>(null);
    const currentStars = hoverStars !== null ? hoverStars : selectedStars;
    return (
        <span>
            {Array.from({ length: 5 }, (_, index) => (
                <img
                    key={index}
                    src={index < currentStars ? star : starVoid}
                    alt={index < currentStars ? "star" : "empty star"}
                    style={{
                        opacity: index < currentStars ? 1 : 0.3,
                        cursor: "pointer",
                    }}
                    onClick={() => onChange(index + 1)}
                    onMouseEnter={() => setHoverStars(index + 1)}
                    onMouseLeave={() => setHoverStars(null)}
                />
            ))}
        </span>
    )
}