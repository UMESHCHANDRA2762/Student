// components/StudentCard.tsx

import { FC } from 'react';

interface Student {
  id: number;
  name: string;
  city: string;
  number: string;
}

interface StudentCardProps {
  student: Student;
  onEdit: (student: Student) => void;
  onDelete: (id: number) => void;
}

const StudentCard: FC<StudentCardProps> = ({ student, onEdit, onDelete }) => {
  return (
    <li>
      <span>{student.name} - {student.city} - {student.number}</span>
      <button onClick={() => onEdit(student)}>Edit</button>
      <button onClick={() => onDelete(student.id)}>Delete</button>
    </li>
  );
};

export default StudentCard;
