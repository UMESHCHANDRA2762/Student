

import { useEffect, useState } from 'react';
import StudentForm from 'components/forms/studentForm';
import AddressForm from 'components/forms/addressForm';
import ContactForm from 'components/forms/contactForm';
import StudentList from 'components/forms/studentList';
import { Student, Address, Contact } from 'lib/types'; // Ensure this path is correct

const Home = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

  useEffect(() => {
    const fetchStudents = async () => {
      const response = await fetch('/api/students');
      const data = await response.json();
      setStudents(data);
    };
    fetchStudents();
  }, []);

  const handleStudentAdded = (student: Student) => {
    setStudents((prev) => [...prev, student]);
  };

  const handleStudentUpdated = (updatedStudent: Student) => {
    setStudents((prev) =>
      prev.map((student) => (student.id === updatedStudent.id ? updatedStudent : student))
    );
  };

  const handleStudentDeleted = (id: number) => {
    setStudents((prev) => prev.filter((student) => student.id !== id));
  };

  return (
    <div>
      <h1>Student Management</h1>
      <StudentForm 
        onStudentAdded={handleStudentAdded} 
        onStudentUpdated={handleStudentUpdated} 
        student={selectedStudent} 
      />
      <StudentList 
        students={students} 
        onSelect={setSelectedStudent} 
        onDelete={handleStudentDeleted} 
      />
      {selectedStudent && (
        <>
          <AddressForm studentId={selectedStudent.id} />
          <ContactForm studentId={selectedStudent.id} />
        </>
      )}
    </div>
  );
};

export default Home;

