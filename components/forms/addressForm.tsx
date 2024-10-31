// components/AddressForm.tsx

import { FC, useState } from 'react';
import { Address } from 'lib/types'; // Import the Address type as needed

interface AddressFormProps {
  studentId: number;  // Correctly define the studentId prop
}

const AddressForm: FC<AddressFormProps> = ({ studentId }) => {
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [country, setCountry] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const addressData: Address = {
      street,
      city,
      state,
      country,
      studentId,  // Use the studentId from props
    };

    // Submit the addressData to the API
    await fetch('/api/addresses', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(addressData),
    });

    // Reset the form fields after submission
    setStreet('');
    setCity('');
    setState('');
    setCountry('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={street} onChange={(e) => setStreet(e.target.value)} placeholder="Street" required />
      <input type="text" value={city} onChange={(e) => setCity(e.target.value)} placeholder="City" required />
      <input type="text" value={state} onChange={(e) => setState(e.target.value)} placeholder="State" required />
      <input type="text" value={country} onChange={(e) => setCountry(e.target.value)} placeholder="Country" required />
      <button type="submit">Add Address</button>
    </form>
  );
};

export default AddressForm;

