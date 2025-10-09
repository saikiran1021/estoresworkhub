import { type User } from '@/lib/types';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const getImage = (id: string) => {
    const image = PlaceHolderImages.find(img => img.id === id);
    return {
        url: image?.imageUrl ?? `https://picsum.photos/seed/${id}/100/100`,
        hint: image?.imageHint ?? 'portrait person'
    }
}

export const mockUsers: User[] = [
  {
    id: 1,
    name: 'Ava',
    surname: 'Johnson',
    phone: '202-555-0184',
    email: 'ava.johnson@estores.com',
    role: 'Employee',
    avatarUrl: getImage('avatar1').url,
    avatarHint: getImage('avatar1').hint,
  },
  {
    id: 2,
    name: 'Liam',
    surname: 'Smith',
    phone: '202-555-0196',
    email: 'liam.smith@estores.com',
    role: 'Admin',
    avatarUrl: getImage('avatar2').url,
    avatarHint: getImage('avatar2').hint,
  },
  {
    id: 3,
    name: 'Noah',
    surname: 'Williams',
    phone: '202-555-0161',
    email: 'noah.williams@estores.com',
    role: 'Employee',
    avatarUrl: getImage('avatar3').url,
    avatarHint: getImage('avatar3').hint,
  },
  {
    id: 4,
    name: 'Olivia',
    surname: 'Brown',
    phone: '202-555-0173',
    email: 'olivia.brown@estores.com',
    role: 'College',
    avatarUrl: getImage('avatar4').url,
    avatarHint: getImage('avatar4').hint,
  },
  {
    id: 5,
    name: 'Emma',
    surname: 'Jones',
    phone: '202-555-0182',
    email: 'emma.jones@estores.com',
    role: 'Industry',
    avatarUrl: getImage('avatar5').url,
    avatarHint: getImage('avatar5').hint,
  },
  {
    id: 6,
    name: 'James',
    surname: 'Garcia',
    phone: '202-555-0154',
    email: 'james.garcia@estores.com',
    role: 'Admin',
    avatarUrl: getImage('avatar6').url,
    avatarHint: getImage('avatar6').hint,
  },
  {
    id: 7,
    name: 'Sophia',
    surname: 'Miller',
    phone: '202-555-0112',
    email: 'sophia.miller@estores.com',
    role: 'Employee',
    avatarUrl: getImage('avatar7').url,
    avatarHint: getImage('avatar7').hint,
  },
  {
    id: 8,
    name: 'Benjamin',
    surname: 'Davis',
    phone: '202-555-0139',
    email: 'benjamin.davis@estores.com',
    role: 'College',
    avatarUrl: getImage('avatar8').url,
    avatarHint: getImage('avatar8').hint,
  },
];
