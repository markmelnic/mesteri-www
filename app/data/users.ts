export interface User {
  id: string
  email: string
  password: string
  name: string
  phone: string
  city: string
  avatar: string
  role: 'client' | 'provider'
  providerId?: string
}

export const users: User[] = [
  {
    id: 'u1',
    email: 'client@mesteri.md',
    password: 'client123',
    name: 'Alexandru Munteanu',
    phone: '+373 69 123 456',
    city: 'Chișinău',
    avatar: 'https://i.pravatar.cc/150?img=60',
    role: 'client'
  },
  {
    id: 'u2',
    email: 'mester@mesteri.md',
    password: 'mester123',
    name: 'Ion Ceban',
    phone: '+373 68 987 654',
    city: 'Chișinău',
    avatar: 'https://i.pravatar.cc/150?img=1',
    role: 'provider',
    providerId: '1'
  }
]
