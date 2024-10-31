// components/ContactForm.tsx

import { FC, useState } from 'react';
import { Contact } from 'lib/types'; // Import the Contact type as needed

interface ContactFormProps {
  studentId: number;  // Correctly define the studentId prop
}

const ContactForm: FC<ContactFormProps> = ({ studentId }) => {
  const [number, setNumber] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const contactData: Contact = {
      number,
      studentId,  // Use the studentId from props
    };

    // Submit the contactData to the API
    await fetch('/api/contacts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(contactData),
    });

    // Reset the form fields after submission
    setNumber('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={number} onChange={(e) => setNumber(e.target.value)} placeholder="Contact Number" required />
      <button type="submit">Add Contact</button>
    </form>
  );
};

export default ContactForm;

