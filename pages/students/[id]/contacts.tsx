import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import ContactForm from 'components/forms/contactForm';

interface Contact {
  id: number;
  number: string;
  type: string;
}

const StudentContacts = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [studentId, setStudentId] = useState<number | null>(null);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (id) {
      const numericId = Number(id);
      setStudentId(numericId); // Set the studentId from the router query
      const fetchContacts = async () => {
        try {
          const res = await fetch(`/api/contacts?studentId=${numericId}`);
          if (!res.ok) throw new Error('Failed to fetch contacts');
          const data: Contact[] = await res.json();
          setContacts(data);
        } catch (error) {
          console.error('Failed to fetch contacts:', error);
        }
      };

      fetchContacts();
    }
  }, [id]);

  if (studentId === null) return <div>Loading...</div>; // Show loading state while fetching ID

  return (
    <div>
      <h1>Manage Contacts</h1>
      <ul>
        {contacts.map((contact) => (
          <li key={contact.id}>
            {contact.id}, {contact.type}, {contact.number}
          </li>
        ))}
      </ul>

      <h2>Add New Contact</h2>
      <ContactForm studentId={studentId} />
    </div>
  );
};

export default StudentContacts;
