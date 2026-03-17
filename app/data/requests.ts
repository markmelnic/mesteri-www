export interface Offer {
  id: string
  providerId: string
  providerName: string
  price: number
  message: string
  estimatedDays: number
}

export interface ServiceRequest {
  id: string
  clientId: string
  title: string
  description: string
  category: string
  city: string
  urgency: 'urgent' | 'this_week' | 'flexible'
  budgetMin?: number
  budgetMax?: number
  status: 'new' | 'offers_received' | 'in_progress' | 'completed'
  createdAt: string
  offers: Offer[]
}

export const serviceRequests: ServiceRequest[] = [
  {
    id: 'req1',
    clientId: 'u1',
    title: 'Reparație robinet bucătărie',
    description: 'Robinetul din bucătărie curge constant. Are nevoie de înlocuire sau reparație urgentă. Robinetul este cu un singur mâner, tip mixer.',
    category: 'instalatii-sanitare',
    city: 'Chișinău',
    urgency: 'urgent',
    budgetMin: 200,
    budgetMax: 500,
    status: 'offers_received',
    createdAt: '2025-12-10',
    offers: [
      { id: 'o1', providerId: '1', providerName: 'Ion Ceban', price: 350, message: 'Pot veni mâine dimineață. Dacă este un robinet standard, reparația va dura aproximativ 1 oră.', estimatedDays: 1 },
      { id: 'o2', providerId: '4', providerName: 'Vasile Rotaru', price: 400, message: 'Disponibil în această săptămână. Pot aduce și un robinet nou dacă este necesar.', estimatedDays: 3 }
    ]
  },
  {
    id: 'req2',
    clientId: 'u1',
    title: 'Zugrăvire dormitor și living',
    description: 'Doresc să zugrăvesc dormitorul și livingul. Camerele au aproximativ 18mp și respectiv 25mp. Prefer culori deschise, alb sau crem.',
    category: 'zugravit-vopsit',
    city: 'Chișinău',
    urgency: 'this_week',
    budgetMin: 1000,
    budgetMax: 3000,
    status: 'offers_received',
    createdAt: '2025-12-08',
    offers: [
      { id: 'o3', providerId: '7', providerName: 'Alexandru Popa', price: 1800, message: 'Pot începe săptămâna viitoare. Prețul include materiale de calitate superioară. Durata estimată: 3-4 zile.', estimatedDays: 4 }
    ]
  },
  {
    id: 'req3',
    clientId: 'u1',
    title: 'Montaj aer condiționat Samsung',
    description: 'Am cumpărat un aer condiționat Samsung WindFree 12000 BTU. Am nevoie de montaj profesional, apartament la etajul 3.',
    category: 'climatizare-incalzire',
    city: 'Chișinău',
    urgency: 'flexible',
    budgetMin: 1500,
    budgetMax: 2500,
    status: 'new',
    createdAt: '2025-12-12',
    offers: []
  },
  {
    id: 'req4',
    clientId: 'u1',
    title: 'Curățenie generală după renovare',
    description: 'Am finalizat renovarea apartamentului cu 3 camere. Am nevoie de curățenie profesională completă: geamuri, pardoseli, baie, bucătărie.',
    category: 'curatenie',
    city: 'Chișinău',
    urgency: 'this_week',
    budgetMin: 1500,
    budgetMax: 3000,
    status: 'in_progress',
    createdAt: '2025-12-05',
    offers: [
      { id: 'o4', providerId: '5', providerName: 'Elena Cojocaru', price: 2000, message: 'Putem veni cu echipa de 3 persoane. Curățenia va dura aproximativ 6-8 ore.', estimatedDays: 1 }
    ]
  },
  {
    id: 'req5',
    clientId: 'u1',
    title: 'Montaj parchet laminat dormitor',
    description: 'Doresc montaj parchet laminat în dormitor, aproximativ 15mp. Am parchetul deja cumpărat. Am nevoie doar de montaj cu substrat.',
    category: 'pardoseli',
    city: 'Chișinău',
    urgency: 'flexible',
    status: 'completed',
    createdAt: '2025-11-20',
    offers: [
      { id: 'o5', providerId: '11', providerName: 'Sergiu Munteanu', price: 800, message: 'Pot veni oricând în săptămâna viitoare. Montajul va dura o zi.', estimatedDays: 1 }
    ]
  }
]
