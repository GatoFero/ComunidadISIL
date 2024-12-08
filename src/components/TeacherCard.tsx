import {Teacher} from "../models/Teacher.ts";
import React, {useState} from "react";
import {InteractiveStars, StaticStars} from "./Stars.tsx";

interface TeacherCardProps {
    teacher: Teacher;
    addComment: (idTeacher: number, content: string, qualification: number) => void;
}

export const TeacherCard: React.FC<TeacherCardProps> = ({ teacher, addComment }) => {
    const [newComment, setNewComment] = useState<string>('');
    const [selectedStars, setSelectedStars] = useState<number>(0);
    
    return (
        <span className="teacher-card">
            <header className="teacher-card-header">
                <h1>{teacher.name}</h1>
                <StaticStars qualification={teacher.qualification} />
            </header>
            <aside className="teacher-card-body">
                <h2>Comentarios:</h2>
                <div className="comment">
                    <h3>Comentar</h3>
                    <div>
                        <InteractiveStars selectedStars={selectedStars} onChange={setSelectedStars} />
                    </div>
                    <input
                        type="text"
                        placeholder="Escribe un comentario..."
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                    />
                    <button onClick={() =>
                        addComment(teacher.id, newComment, selectedStars)}>Enviar</button>
                </div>
                {teacher.comments.length > 0 ? (
                    teacher.comments.map((comment, index) => (
                        <div className="comment" key={index}>
                            <h3>{comment.username}</h3>
                            <StaticStars qualification={comment.qualification} />
                            <p>{comment.content}</p>
                        </div>
                    ))
                ) : (
                    <p>Profesor sin comentarios.</p>
                )}
            </aside>
        </span>
    );
};