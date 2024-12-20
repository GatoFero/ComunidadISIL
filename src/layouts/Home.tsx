import '../assets/courses.css';
import {SlideCarousel} from "../components/functional-containers/SlideCarousel.tsx";
import {PlacedPodium} from "../components/podium/PlacedPodium.tsx";
import {Podium} from "../components/podium/Podium.tsx";
import {useTypingEffect} from "../hooks/useTypingEffect.tsx";

export function Home() {
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
            <HelloWorld tittle={"Hola"} bg={"red"}/>
            <HelloWorld tittle={"Hola"} bg={"blue"}/>
        </>
    );
}

interface HelloWorldProps{
    tittle: string;
    bg: string;
}

export function HelloWorld(
    { tittle, bg }: HelloWorldProps
){
    return(
        <div style={{background: bg}}>
            <h1>{tittle}</h1>
            <button style={{color: "blue"}}
                    onClick={() => alert(tittle)}
            >{tittle}</button>
        </div>
    )
}

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