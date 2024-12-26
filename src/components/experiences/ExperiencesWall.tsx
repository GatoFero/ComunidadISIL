import {Experience} from "../../models/Experience.ts";
import {ExperienceCard} from "./ExperienceCard.tsx";
import '../../assets/css/experiences.css';

interface ExperiencesWallProps {
    experiences: Experience[];
}

export function ExperiencesWall(
    { experiences }: ExperiencesWallProps
) {
    return (
        <div className="experiences-wall">
            {experiences.map((experience, index) => (
                <ExperienceCard experience={experience} key={index} />
            ))}
        </div>
    )
}
