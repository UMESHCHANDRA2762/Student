// components/StudentForm.tsx

import { FC, useState, useEffect } from 'react';
import { Student } from 'lib/types'; // Adjust the import as necessary

interface StudentFormProps {
  onStudentAdded: (student: Student) => void;
  student?: Student | null;
  onStudentUpdated: (student: Student) => void;
}

const StudentForm: FC<StudentFormProps> = ({ onStudentAdded, student, onStudentUpdated }) => {
  const [name, setName] = useState<string>(student ? student.name : '');
  const [city, setCity] = useState<string>(student ? student.city : '');
  const [number, setNumber] = useState<string>(student ? student.number : '');

  useEffect(() => {
    if (student) {
      setName(student.name);
      setCity(student.city);
      setNumber(student.number);
    }
  }, [student]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const studentData: Student = {
      id: student ? student.id : Date.now(), // Use Date.now() for a new ID or get it from server
      name,
      city,
      number,
    };

    const response = student
      ? await fetch('/api/students', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(studentData),
        })
      : await fetch('/api/students', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(studentData),
        });

    const newStudent = await response.json();
    if (student) {
      onStudentUpdated(newStudent);
    } else {
      onStudentAdded(newStudent);
    }

    // Reset form fields after submission
    setName('');
    setCity('');
    setNumber('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
        required
      />
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="City"
        required
      />
      <input
        type="text"
        value={number}
        onChange={(e) => setNumber(e.target.value)}
        placeholder="Contact Number"
        required
      />
      <button type="submit">{student ? 'Update Student' : 'Add Student'}</button>
    </form>
  );
};

export default StudentForm;
