import {StaticStars} from "../Stars.tsx";
import '../../assets/podiums.css'
import {useEffect, useState} from "react";

export interface PlacedPodium {
    position: number;
    name: string;
    qualification: number;
}

interface PlacedPodiumProps{
    placedData: PlacedPodium;
}

export function PlacedPodium(
    { placedData }: PlacedPodiumProps
){
    const[positionStyle, setPositionStyle] = useState<string>("")

    useEffect(() => {
        const colors: string[] = [
            "var(--dorado)", "#a8a8a8", "#864100"
        ]
        setPositionStyle(colors[placedData.position - 1])
    },[placedData.position, positionStyle])

    return (
        <span className="placed-podium-card"
              style={{border: `2px solid ${positionStyle}`}}
        >
            <h1 className="placed-podium-data" style={{color: positionStyle}}>{placedData.position}st</h1>
            <div className="placed-podium-data">
                <h2>{placedData.name}</h2>
                <StaticStars qualification={placedData.qualification}/>
            </div>
            <div className="placed-podium-data">
                <h2>10 Reseñas</h2>
                <button className="navigateButton">Ver</button>
            </div>
        </span>
    )
}