// components/StudentList.tsx

import { FC } from 'react';
import { Student } from 'lib/types';

interface StudentListProps {
  students: Student[];
  onSelect: (student: Student) => void;  // Correctly define the onSelect prop
  onDelete: (id: number) => void;
}

const StudentList: FC<StudentListProps> = ({ students, onSelect, onDelete }) => {
  return (
    <ul>
      {students.map((student) => (
        <li key={student.id}>
          {student.name} - {student.city} 
          <button onClick={() => onSelect(student)}>Edit</button>
          <button onClick={() => onDelete(student.id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
};

export default StudentList;

