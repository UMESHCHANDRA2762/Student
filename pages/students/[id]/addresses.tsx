import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import AddressForm from 'components/forms/addressForm';

// Define the Address type
interface Address {
  id: number;
  street: string;
  city: string;
  state: string;
  country: string;
  studentId: number;
}

const StudentAddresses = () => {
  // Set the type of addresses as Address[]
  const [addresses, setAddresses] = useState<Address[]>([]);
  const router = useRouter();
  const [studentId, setStudentId] = useState<number | null>(null);
  const { id } = router.query;

  useEffect(() => {
    if (id) {
      const fetchAddresses = async () => {
        try {
          const res = await fetch(`/api/addresses?studentId=${id}`);
          const data: Address[] = await res.json(); // Specify the type of fetched data
          setAddresses(data);
        } catch (error) {
          console.error('Failed to fetch addresses:', error);
        }
      };

      fetchAddresses();
    }
  }, [id]);

  return (
    <div>
      <h1>Manage Addresses</h1>
      <ul>
        {addresses.map((address) => (
          <li key={address.id}>
            {address.street}, {address.city}, {address.state}, {address.country}
          </li>
        ))}
      </ul>

      <h2>Add New Address</h2>
      <AddressForm />
    </div>
  );
};

export default StudentAddresses;
