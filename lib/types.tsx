// lib/types.ts

export interface Student {
  id: number; // Make this non-optional if it should always be present
  name: string;
  city: string;
  number: string;
}

export interface Address {
  id?: number; // Optional for new addresses
  street: string;
  city: string;
  state: string;
  country: string;
  studentId: number; // Required
}

export interface Contact {
  id?: number; // Optional for new contacts
  number: string;
  studentId: number; // Required
}
