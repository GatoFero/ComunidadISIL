import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {Course} from "../models/Course.ts";
import {fetchCourse} from "../service/apiCourses.ts";
import {Teacher} from "../models/Teacher.ts";
import {addTeacher, fetchTeachersByCourse} from "../service/apiTeachers.ts";
import '../assets/teachers.css';
import {TeacherCard} from "../components/TeacherCard.tsx";
import {supabase} from "../supabaseClient.ts";
import {getUsername} from "../service/apiUsers.ts";
import {ModalAdd} from "../components/modales/ModalAdd.tsx";

export const CoursePage: React.FC = () => {
    const [course, setCourse] = useState<Course|null>(null);
    const [teachers, setTeachers] = useState<Teacher[]>([]);
    const { id } = useParams<{id: string}>();
    const [username, setUsername] = useState<string|null>(null);
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();

    const handleAddComment = async (
        idTeacher: number,
        content: string,
        qualification: number
    ) => {
        const { data, error } = await supabase
            .from('comments')
            .insert([
                { idteacher: idTeacher, content: content,
                    qualification: qualification, username: username, },
            ])
        if (error){
            console.error('Error inserir usuario:', error);
            return
        }
        console.log('Inserted comment:', data)
        if(id) fetchTeachers(id)
    }

    const handleAddTeacher = async (name: string) => {
        if (id) {
            await addTeacher(parseInt(id), name)
            fetchTeachersByCourse(parseInt(id), setTeachers)
        }
        setShowModal(false)
    }

    const fetchTeachers = async (id: string) => {
        fetchTeachersByCourse(parseInt(id), setTeachers);
    }

    useEffect(() => {
        if (id) {
            fetchCourse(parseInt(id), setCourse)
            fetchTeachers(id)
        }
        const fetchUsername = async () => {
            setUsername(await getUsername());
        }
        fetchUsername();
    },[id])

    return (
        <div className="course-page">
            <div style={{display: 'flex', justifyContent: 'start', width: '100%'}}>
                <button
                    onClick={()=> navigate("/welcome")}
                    style={{padding: '15px 30px', marginBottom: '30px'}}
                >Atras</button>
            </div>
            <h1>{course?.name}</h1>
            <h1>Profesores:</h1>
            <div className="teachers-content">
                <button onClick={()=> setShowModal(true)}>Agregar profesor</button>
                {teachers.length > 0 ? (
                    teachers.map((teacher: Teacher) => (
                        <TeacherCard key={teacher.id} teacher={teacher} addComment={handleAddComment} />
                    ))
                ) : (
                    <p>No se encontraron profesores para este curso.</p>
                )}
            </div>
            {showModal && (<ModalAdd
                title="Profesor"
                onAdd={handleAddTeacher}
                onCancel={()=> setShowModal(false)} />)}
        </div>
    );
}