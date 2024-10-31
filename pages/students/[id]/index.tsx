import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import StudentForm from 'components/forms/studentForm';

interface Student {
  id: number;
  name: string;
  city: string;
  number: string;
}

const StudentDetails = () => {
  const [student, setStudent] = useState<Student | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (id) {
      const fetchStudent = async () => {
        try {
          const res = await fetch(`/api/students?id=${id}`);
          if (!res.ok) throw new Error('Failed to fetch student');
          const data: Student = await res.json();
          setStudent(data);
        } catch (error) {
          console.error('Error fetching student:', error);
        }
      };

      fetchStudent();
    }
  }, [id]);

  if (!student && !isAdding) return <div>Loading...</div>;

  const toggleAdd = () => {
    setIsAdding((prev) => !prev);
    if (isAdding) {
      setStudent(null); // Reset student when cancelling the add
    }
  };

  const toggleEdit = () => {
    setIsEditing((prev) => !prev);
  };

  const handleStudentAdded = async (newStudent: Student) => {
    // Handle the addition of a new student
    try {
      const res = await fetch('/api/students', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newStudent), // Send the new student data
      });

      if (!res.ok) throw new Error('Failed to add student');
      const addedStudent = await res.json();
      setStudent(addedStudent); // Set the newly added student
      setIsAdding(false); // Close the add form
    } catch (error) {
      console.error('Error adding student:', error);
    }
  };

  const handleStudentUpdated = async (updatedStudent: Student) => {
    // Handle updating the student
    try {
      const res = await fetch('/api/students', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedStudent), // Send updated student data
      });

      if (!res.ok) throw new Error('Failed to update student');
      const updatedData = await res.json();
      setStudent(updatedData); // Update the state with the updated student
      setIsEditing(false); // Close the edit form
    } catch (error) {
      console.error('Error updating student:', error);
    }
  };

  const handleStudentDeleted = async () => {
    // Handle student deletion
    if (confirm('Are you sure you want to delete this student?')) {
      try {
        await fetch('/api/students', {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id }), // Send the ID of the student to delete
        });

        // Redirect or reset the state after deletion
        router.push('/'); // Redirect to the main page or student list
      } catch (error) {
        console.error('Error deleting student:', error);
      }
    }
  };

  return (
    <div>
      <button onClick={toggleAdd}>
        {isAdding ? 'Cancel' : 'Add Student'}
      </button>

      <button onClick={toggleEdit}>
        {isEditing ? 'Cancel' : 'Edit Student'}
      </button>

      {isAdding && <StudentForm isEditing={false} onStudentAdded={handleStudentAdded} />}
      {isEditing && student && (
        <StudentForm isEditing={true} student={student} onStudentUpdated={handleStudentUpdated} />
      )}

      {!isAdding && !isEditing && (
        <>
          <h2>Manage Addresses</h2>
          <Link href={`/students/${id}/addresses`}>
            <button>Manage Addresses</button>
          </Link>

          <h2>Manage Contacts</h2>
          <Link href={`/students/${id}/contacts`}>
            <button>Manage Contacts</button>
          </Link>

          <button onClick={handleStudentDeleted}>Delete Student</button>
        </>
      )}
    </div>
  );
};

export default StudentDetails;
