import React, {useState} from "react";
import star from "/star-solid.svg";
import starVoid from "/star-solid-void.svg";

export const StaticStars: React.FC<{ qualification: number }> = ({ qualification }) => (
    <span>
        {Array.from({ length: 5 }, (_, index) => (
            <img
                key={index}
                src={index < qualification ? star : starVoid}
                alt={index < qualification ? "star" : "empty star"}
                style={{ opacity: index < qualification ? 1 : 0.3 }}
            />
        ))}
    </span>
);

export const InteractiveStars: React.FC<{
    selectedStars: number;
    onChange: (stars: number) => void;
}> = ({ selectedStars, onChange }) => {
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
    );
};