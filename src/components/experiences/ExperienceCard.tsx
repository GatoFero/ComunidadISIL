import {Experience} from "../../models/Experience.ts";

interface ExperienceProps {
    experience: Experience
}

export function ExperienceCard(
    { experience }: ExperienceProps
) {
    return(
        <div className="experience-card">
            <header>
                <h1><strong>De:</strong> {experience.author}</h1>
                <h2>{experience.title}</h2>
            </header>
            <aside>
                <p>{experience.content}</p>
            </aside>
        </div>
    )
}