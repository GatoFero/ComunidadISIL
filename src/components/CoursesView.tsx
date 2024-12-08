import {useEffect, useState} from "react";
import {Course} from "../models/Course.ts";
import {supabase} from "../supabaseClient.ts";
import {CourseItem} from "./CourseItem.tsx";
import {ModalAdd} from "./modales/ModalAdd.tsx";
import {fetchCourses} from "../service/apiCourses.ts";

export const CoursesView = () => {
    const [courses, setCourses] = useState<Course[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [showModal, setShowModal] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
       fetchCourses(setCourses, setError)
    }, []);

    const handleAddCourse = async (courseName: string) => {
        if (!courseName.trim()) {
            setError('El nombre del curso no puede estar vacío.');
            return;
        }

        const { data, error } = await supabase
            .from('courses')
            .insert([{ name: courseName }])
            .select();

        if (error) {
            console.error('Error al agregar curso:', error.message);
            setError('Error al agregar el curso.');
            return;
        }
        if (data) {
            setCourses(prevCourses => {
                const updatedCourses = [data[0], ...prevCourses];
                return updatedCourses.slice(0, 12);
            });
        }
    };

    return (
        <div className="courses-view">
            <h1>Cursos</h1>

            {error && <p style={{ color: 'red' }}>{error}</p>}
            <input
                type="text"
                placeholder="Buscar curso"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value.toLowerCase())}
            />
            <div className="courses-list">
                <button
                    onClick={() => setShowModal(true)}
                    style={{fontSize: '20px'}}>+
                </button>
                {courses
                    .filter(course =>
                        course.name.toLowerCase().includes(searchTerm)
                    )
                    .map(course => (
                        <CourseItem key={course.id} course={course}/>
                    ))}
            </div>
            {showModal && (
                <ModalAdd
                    title="Curso"
                    onAdd={(courseName) => {
                        handleAddCourse(courseName);
                        setShowModal(false);
                    }}
                    onCancel={() => setShowModal(false)}
                />
            )}
        </div>
    );
};