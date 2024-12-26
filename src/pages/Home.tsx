import '../assets/css/courses.css';
import {SlideCarousel} from "../components/functional-containers/SlideCarousel.tsx";
import {PlacedPodium} from "../components/podium/PlacedPodium.tsx";
import {Podium} from "../components/podium/Podium.tsx";
import {useTypingEffect} from "../hooks/useTypingEffect.tsx";
import {Experience} from "../models/Experience.ts";
import {ExperiencesWall} from "../components/experiences/ExperiencesWall.tsx";

export function Home() {
    const titlesOfWorstTeachersPhrases: string[] = [
        'Si ves a estos tres... ¡Corre, Forrest, corre!',
        'Las ovejas negras del instituto.',
        'Si solo están ellos, mejor deja el curso para el próximo ciclo.',
        'No querrás verlos ni en la cafetería.',
    ];
    const titlesOfBestTeachersPhrases: string[] = [
        'Si los ves, ¡chapa rápido un cupo para su clase!',
        'Las joyas de la corona de ISIL.',
        'Esta garantizado que aprenderás cosas útiles.',
        'No faltes a ninguna de sus clases, ¡podrías perderte algo interesante!'
    ]
    const titlesOfWorstTeachers = useTypingEffect(titlesOfWorstTeachersPhrases);
    const titlesOfBestTeachers = useTypingEffect(titlesOfBestTeachersPhrases);
    return (
        <>
            <SlideCarousel
                slides={[
                    <Podium title={"Peor Valorados"}
                            phrases={titlesOfWorstTeachers}
                            placedPodiums={data}
                    />,
                    <Podium title={"Mejor Valorados"}
                            phrases={titlesOfBestTeachers}
                            placedPodiums={goodTeachers}
                    />
                ]}
            />
            <h1>Comparte tus Experiencias, Dudas o Recomendaciones</h1>
            <ExperiencesWall experiences={experiences}/>
        </>
    );
}

const experiences: Experience[] = [
    {
        author: "Gato",
        title: "Experiencia de prueba",
        content: "Esta es una prueba de experiencia",
    },
    {
        author: "Gato",
        title: "Experiencia de prueba",
        content: "Esta es una prueba de experiencia",
    },
    {
        author: "Gato",
        title: "Experiencia de prueba",
        content: "Esta es una prueba de experiencia",
    },
    {
        author: "Gato",
        title: "Experiencia de prueba",
        content: "Esta es una prueba de experiencia",
    },
    {
        author: "Gato",
        title: "Experiencia de prueba",
        content: "Esta es una prueba de experiencia",
    },
    {
        author: "Gato",
        title: "Experiencia de prueba",
        content: "Esta es una prueba de experiencia",
    }
]
const data: PlacedPodium[] = [
    {
        position: 1,
        name: "Joseph Jesus Jimenez Sanchez",
        qualification: 1
    },
    {
        position: 2,
        name: "Ruben Arturo Loli Vasquez",
        qualification: 2
    },
    {
        position: 3,
        name: "Kevin Salazar Ruiz",
        qualification: 2
    }
]
const goodTeachers: PlacedPodium[] = [
    {
        position: 1,
        name: "Sergio Matsukawa",
        qualification: 5
    },
    {
        position: 2,
        name: "Aurelio Daniel Cespedes Merino",
        qualification: 5
    },
    {
        position: 3,
        name: "Romulo Benitez",
        qualification: 5
    }
]