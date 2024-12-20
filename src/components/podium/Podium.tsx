import {PlacedPodium} from "./PlacedPodium.tsx";

interface PodiumProps {
    title: string;
    phrases: string;
    placedPodiums: PlacedPodium[];
}

export function Podium(
    {title, phrases, placedPodiums}: PodiumProps,
) {
    return(
        <>
            <div className="podium-header">
                <h1>{title}</h1>
                <h2>{phrases}</h2>
            </div>
            <div className="podium-container">
            {placedPodiums.map((placedPodium, index) => (
                <PlacedPodium key={index}
                              placedData={placedPodium}
                />
            ))}
            </div>
        </>
    )
}