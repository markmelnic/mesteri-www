export interface Service {
  name: string
  description: string
  priceFrom: number
  priceTo?: number
  currency: string
}

export interface PortfolioItem {
  id: string
  image: string
  caption: string
  category: string
}

export interface Provider {
  id: string
  name: string
  avatar: string
  specialty: string
  categories: string[]
  city: string
  bio: string
  rating: number
  reviewCount: number
  completedJobs: number
  verified: boolean
  memberSince: string
  priceRange: string
  services: Service[]
  portfolio: PortfolioItem[]
}

export const providers: Provider[] = [
  {
    id: '1',
    name: 'Ion Ceban',
    avatar: 'https://i.pravatar.cc/150?img=1',
    specialty: 'Instalator sanitar',
    categories: ['instalatii-sanitare', 'apa-canalizare'],
    city: 'Chișinău',
    bio: 'Cu peste 15 ani de experiență în domeniul instalațiilor sanitare, ofer servicii profesionale de montaj și reparații. Am lucrat atât în apartamente cât și în case particulare din Chișinău și împrejurimi. Garantez calitatea lucrărilor și folosesc materiale de cea mai bună calitate.',
    rating: 4.9,
    reviewCount: 87,
    completedJobs: 234,
    verified: true,
    memberSince: '2022-03-15',
    priceRange: '300-2000 MDL',
    services: [
      { name: 'Montaj chiuvetă', description: 'Instalare chiuvetă nouă cu racordare la apă și canalizare', priceFrom: 400, priceTo: 800, currency: 'MDL' },
      { name: 'Reparație robinet', description: 'Înlocuire sau reparație robineți orice tip', priceFrom: 200, priceTo: 500, currency: 'MDL' },
      { name: 'Montaj boiler', description: 'Instalare boiler electric sau pe gaz cu toate racordurile', priceFrom: 800, priceTo: 2000, currency: 'MDL' },
      { name: 'Desfundare canalizare', description: 'Desfundare țevi cu echipament profesional', priceFrom: 300, priceTo: 700, currency: 'MDL' }
    ],
    portfolio: [
      { id: 'p1-1', image: 'https://picsum.photos/seed/plumbing1/600/400', caption: 'Renovare completă baie — Chișinău', category: 'instalatii-sanitare' },
      { id: 'p1-2', image: 'https://picsum.photos/seed/plumbing2/600/400', caption: 'Montaj sistem de încălzire prin pardoseală', category: 'instalatii-sanitare' },
      { id: 'p1-3', image: 'https://picsum.photos/seed/plumbing3/600/400', caption: 'Instalare cabină de duș modernă', category: 'instalatii-sanitare' }
    ]
  },
  {
    id: '2',
    name: 'Andrei Moraru',
    avatar: 'https://i.pravatar.cc/150?img=3',
    specialty: 'Electrician autorizat',
    categories: ['electricitate', 'casa-inteligenta'],
    city: 'Chișinău',
    bio: 'Electrician autorizat ANRE cu 12 ani de experiență. Execut lucrări de instalații electrice noi, reparații, modernizări și automatizări. Lucrez cu atenție la detalii și respect toate normele de siguranță.',
    rating: 4.8,
    reviewCount: 64,
    completedJobs: 189,
    verified: true,
    memberSince: '2022-06-20',
    priceRange: '200-3000 MDL',
    services: [
      { name: 'Montaj priză/întrerupător', description: 'Instalare prize și întrerupătoare noi', priceFrom: 150, priceTo: 300, currency: 'MDL' },
      { name: 'Cablare apartament', description: 'Trasare cabluri electrice pentru apartament complet', priceFrom: 3000, priceTo: 8000, currency: 'MDL' },
      { name: 'Montaj tablou electric', description: 'Instalare și configurare tablou electric nou', priceFrom: 1500, priceTo: 3000, currency: 'MDL' },
      { name: 'Instalare iluminat LED', description: 'Montaj corpuri de iluminat și benzi LED', priceFrom: 200, priceTo: 1000, currency: 'MDL' }
    ],
    portfolio: [
      { id: 'p2-1', image: 'https://picsum.photos/seed/electric1/600/400', caption: 'Cablare completă apartament 3 camere', category: 'electricitate' },
      { id: 'p2-2', image: 'https://picsum.photos/seed/electric2/600/400', caption: 'Montaj tablou electric inteligent', category: 'electricitate' }
    ]
  },
  {
    id: '3',
    name: 'Maria Lungu',
    avatar: 'https://i.pravatar.cc/150?img=5',
    specialty: 'Designer interior',
    categories: ['amenajari-interioare', 'zugravit-vopsit'],
    city: 'Chișinău',
    bio: 'Designer de interior cu studii la Academia de Arte din București. Transform spațiile în locuri unice, funcționale și estetice. Lucrez cu fiecare client pentru a înțelege viziunea și a o transforma în realitate.',
    rating: 5.0,
    reviewCount: 42,
    completedJobs: 78,
    verified: true,
    memberSince: '2023-01-10',
    priceRange: '2000-15000 MDL',
    services: [
      { name: 'Concept design interior', description: 'Proiectare completă cu vizualizări 3D', priceFrom: 5000, priceTo: 15000, currency: 'MDL' },
      { name: 'Consultanță design', description: 'Consultanță profesională pentru amenajarea spațiului', priceFrom: 500, priceTo: 1500, currency: 'MDL' },
      { name: 'Amenajare cameră', description: 'Design și supervizare amenajare cameră completă', priceFrom: 3000, priceTo: 8000, currency: 'MDL' }
    ],
    portfolio: [
      { id: 'p3-1', image: 'https://picsum.photos/seed/interior1/600/400', caption: 'Amenajare living modern minimalist', category: 'amenajari-interioare' },
      { id: 'p3-2', image: 'https://picsum.photos/seed/interior2/600/400', caption: 'Design bucătărie stil scandinav', category: 'amenajari-interioare' },
      { id: 'p3-3', image: 'https://picsum.photos/seed/interior3/600/400', caption: 'Renovare apartament complet — Botanica', category: 'amenajari-interioare' }
    ]
  },
  {
    id: '4',
    name: 'Vasile Rotaru',
    avatar: 'https://i.pravatar.cc/150?img=7',
    specialty: 'Constructor & Renovări',
    categories: ['renovari-constructii', 'pardoseli', 'acoperisuri'],
    city: 'Bălți',
    bio: 'Echipa noastră de 5 meșteri profesioniști oferă servicii complete de construcții și renovări. De la fundație până la acoperiș, realizăm proiecte la cheie cu materiale de calitate superioară.',
    rating: 4.7,
    reviewCount: 53,
    completedJobs: 145,
    verified: true,
    memberSince: '2021-09-05',
    priceRange: '1000-50000 MDL',
    services: [
      { name: 'Renovare apartament la cheie', description: 'Renovare completă incluzând toate finisajele', priceFrom: 15000, priceTo: 50000, currency: 'MDL' },
      { name: 'Montaj gresie/faianță', description: 'Placare pereți și podele cu gresie sau faianță', priceFrom: 1500, priceTo: 5000, currency: 'MDL' },
      { name: 'Tencuire & Nivelare', description: 'Tencuieli interioare și exterioare', priceFrom: 2000, priceTo: 8000, currency: 'MDL' },
      { name: 'Construcție anexă', description: 'Construcție garaje, terase, anexe gospodărești', priceFrom: 10000, priceTo: 50000, currency: 'MDL' }
    ],
    portfolio: [
      { id: 'p4-1', image: 'https://picsum.photos/seed/reno1/600/400', caption: 'Renovare completă apartament 2 camere', category: 'renovari-constructii' },
      { id: 'p4-2', image: 'https://picsum.photos/seed/reno2/600/400', caption: 'Construcție terasă din lemn', category: 'renovari-constructii' }
    ]
  },
  {
    id: '5',
    name: 'Elena Cojocaru',
    avatar: 'https://i.pravatar.cc/150?img=9',
    specialty: 'Servicii de curățenie',
    categories: ['curatenie'],
    city: 'Chișinău',
    bio: 'Compania noastră oferă servicii profesionale de curățenie pentru locuințe și birouri. Folosim produse ecologice și echipamente moderne. Disponibili 7 zile pe săptămână.',
    rating: 4.6,
    reviewCount: 128,
    completedJobs: 412,
    verified: true,
    memberSince: '2022-01-20',
    priceRange: '500-3000 MDL',
    services: [
      { name: 'Curățenie generală apartament', description: 'Curățenie completă pentru apartament cu toate camerele', priceFrom: 800, priceTo: 2000, currency: 'MDL' },
      { name: 'Curățenie după reparații', description: 'Curățenie profesională post-renovare', priceFrom: 1500, priceTo: 3000, currency: 'MDL' },
      { name: 'Curățenie de întreținere', description: 'Curățenie săptămânală sau bi-săptămânală', priceFrom: 500, priceTo: 1000, currency: 'MDL' }
    ],
    portfolio: [
      { id: 'p5-1', image: 'https://picsum.photos/seed/clean1/600/400', caption: 'Curățenie generală apartament Centru', category: 'curatenie' }
    ]
  },
  {
    id: '6',
    name: 'Dumitru Cebotari',
    avatar: 'https://i.pravatar.cc/150?img=11',
    specialty: 'Montaj mobilier',
    categories: ['mobila-montaj'],
    city: 'Chișinău',
    bio: 'Specialist în asamblarea și montajul mobilierului din orice magazin. Lucrez rapid, curat și cu atenție la detalii. Experiență de 8 ani cu mobilier IKEA, JYSK, Mobexpert și producători locali.',
    rating: 4.8,
    reviewCount: 95,
    completedJobs: 320,
    verified: true,
    memberSince: '2022-04-12',
    priceRange: '200-2000 MDL',
    services: [
      { name: 'Montaj bucătărie', description: 'Asamblare completă bucătărie cu corpuri și blat', priceFrom: 1000, priceTo: 3000, currency: 'MDL' },
      { name: 'Montaj dulap', description: 'Asamblare dulapuri, șifoniere și garderoburi', priceFrom: 300, priceTo: 800, currency: 'MDL' },
      { name: 'Montaj mobilier divers', description: 'Asamblare paturi, mese, comode, rafturi', priceFrom: 200, priceTo: 500, currency: 'MDL' }
    ],
    portfolio: [
      { id: 'p6-1', image: 'https://picsum.photos/seed/furniture1/600/400', caption: 'Montaj bucătărie la comandă', category: 'mobila-montaj' },
      { id: 'p6-2', image: 'https://picsum.photos/seed/furniture2/600/400', caption: 'Garderobă walk-in montată complet', category: 'mobila-montaj' }
    ]
  },
  {
    id: '7',
    name: 'Alexandru Popa',
    avatar: 'https://i.pravatar.cc/150?img=12',
    specialty: 'Zugrav profesionist',
    categories: ['zugravit-vopsit'],
    city: 'Cahul',
    bio: 'Zugrav cu 20 de ani de experiență. Realizez lucrări de zugrăvire interioară și exterioară, tapet decorativ, stucco venețian și diverse tehnici decorative moderne.',
    rating: 4.9,
    reviewCount: 71,
    completedJobs: 198,
    verified: true,
    memberSince: '2021-11-30',
    priceRange: '500-5000 MDL',
    services: [
      { name: 'Zugrăvire cameră', description: 'Zugrăvire completă pereți și tavan pentru o cameră', priceFrom: 500, priceTo: 1500, currency: 'MDL' },
      { name: 'Aplicare tapet', description: 'Montaj tapet decorativ pe pereți', priceFrom: 800, priceTo: 2000, currency: 'MDL' },
      { name: 'Stucco venețian', description: 'Aplicare stucco venețian pentru un finish elegant', priceFrom: 2000, priceTo: 5000, currency: 'MDL' }
    ],
    portfolio: [
      { id: 'p7-1', image: 'https://picsum.photos/seed/paint1/600/400', caption: 'Zugrăvire apartament tehnica ombre', category: 'zugravit-vopsit' },
      { id: 'p7-2', image: 'https://picsum.photos/seed/paint2/600/400', caption: 'Stucco venețian living premium', category: 'zugravit-vopsit' }
    ]
  },
  {
    id: '8',
    name: 'Natalia Stratan',
    avatar: 'https://i.pravatar.cc/150?img=16',
    specialty: 'Grădinar & Peisagist',
    categories: ['gradinarit'],
    city: 'Orhei',
    bio: 'Pasionată de grădinărit și amenajarea spațiilor verzi. Ofer servicii complete de amenajare peisagistică, întreținere grădini și consultanță pentru grădini productive.',
    rating: 4.7,
    reviewCount: 34,
    completedJobs: 67,
    verified: false,
    memberSince: '2023-04-01',
    priceRange: '300-5000 MDL',
    services: [
      { name: 'Amenajare grădină', description: 'Proiectare și amenajare grădină de la zero', priceFrom: 3000, priceTo: 10000, currency: 'MDL' },
      { name: 'Întreținere gazon', description: 'Tundere, fertilizare și îngrijire gazon', priceFrom: 300, priceTo: 800, currency: 'MDL' },
      { name: 'Sistem de irigare', description: 'Instalare sistem de irigare automat', priceFrom: 2000, priceTo: 5000, currency: 'MDL' }
    ],
    portfolio: [
      { id: 'p8-1', image: 'https://picsum.photos/seed/garden1/600/400', caption: 'Amenajare grădină cu plante ornamentale', category: 'gradinarit' },
      { id: 'p8-2', image: 'https://picsum.photos/seed/garden2/600/400', caption: 'Gazonare curte 200mp', category: 'gradinarit' }
    ]
  },
  {
    id: '9',
    name: 'Victor Balan',
    avatar: 'https://i.pravatar.cc/150?img=13',
    specialty: 'Specialist HVAC',
    categories: ['climatizare-incalzire'],
    city: 'Chișinău',
    bio: 'Inginer HVAC cu certificări internaționale. Montez și întretin sisteme de climatizare, ventilație și încălzire pentru locuințe și spații comerciale. Lucrez cu toate brandurile majore.',
    rating: 4.8,
    reviewCount: 56,
    completedJobs: 167,
    verified: true,
    memberSince: '2022-08-15',
    priceRange: '500-8000 MDL',
    services: [
      { name: 'Montaj aer condiționat', description: 'Instalare completă aparat de aer condiționat', priceFrom: 1500, priceTo: 3000, currency: 'MDL' },
      { name: 'Întreținere AC', description: 'Curățare, verificare și reîncărcare freon', priceFrom: 500, priceTo: 1000, currency: 'MDL' },
      { name: 'Montaj centrală termică', description: 'Instalare centrală termică pe gaz cu toate racordurile', priceFrom: 3000, priceTo: 8000, currency: 'MDL' }
    ],
    portfolio: [
      { id: 'p9-1', image: 'https://picsum.photos/seed/hvac1/600/400', caption: 'Montaj sistem de climatizare multi-split', category: 'climatizare-incalzire' },
      { id: 'p9-2', image: 'https://picsum.photos/seed/hvac2/600/400', caption: 'Instalare centrală termică Viessmann', category: 'climatizare-incalzire' }
    ]
  },
  {
    id: '10',
    name: 'Gheorghe Ursu',
    avatar: 'https://i.pravatar.cc/150?img=14',
    specialty: 'Specialist ferestre & uși',
    categories: ['ferestre-usi'],
    city: 'Bălți',
    bio: 'Reprezentant autorizat al mai multor producători de ferestre și uși. Ofer consultanță, măsurare, livrare și montaj profesional. Garanție extinsă pentru toate lucrările.',
    rating: 4.6,
    reviewCount: 45,
    completedJobs: 134,
    verified: true,
    memberSince: '2022-02-10',
    priceRange: '800-5000 MDL',
    services: [
      { name: 'Montaj fereastră PVC', description: 'Demontare vechi + montaj fereastră PVC nouă', priceFrom: 800, priceTo: 2000, currency: 'MDL' },
      { name: 'Montaj ușă interioară', description: 'Instalare ușă interioară cu toc și feronerie', priceFrom: 500, priceTo: 1500, currency: 'MDL' },
      { name: 'Montaj ușă de intrare', description: 'Instalare ușă metalică sau din lemn masiv', priceFrom: 1000, priceTo: 3000, currency: 'MDL' }
    ],
    portfolio: [
      { id: 'p10-1', image: 'https://picsum.photos/seed/windows1/600/400', caption: 'Înlocuire ferestre apartament 3 camere', category: 'ferestre-usi' }
    ]
  },
  {
    id: '11',
    name: 'Sergiu Munteanu',
    avatar: 'https://i.pravatar.cc/150?img=15',
    specialty: 'Specialist pardoseli',
    categories: ['pardoseli'],
    city: 'Comrat',
    bio: 'Specialist în montajul tuturor tipurilor de pardoseli: parchet, laminat, gresie, piatră naturală. Lucrez cu precizie și ofer finisaje impecabile.',
    rating: 4.5,
    reviewCount: 38,
    completedJobs: 98,
    verified: false,
    memberSince: '2023-02-28',
    priceRange: '500-4000 MDL',
    services: [
      { name: 'Montaj parchet laminat', description: 'Instalare parchet laminat cu substrat și plinte', priceFrom: 500, priceTo: 2000, currency: 'MDL' },
      { name: 'Montaj gresie', description: 'Placare podea cu gresie porțelanată', priceFrom: 1000, priceTo: 3000, currency: 'MDL' },
      { name: 'Șlefuire parchet masiv', description: 'Șlefuire și lăcuire parchet din lemn masiv', priceFrom: 1500, priceTo: 4000, currency: 'MDL' }
    ],
    portfolio: [
      { id: 'p11-1', image: 'https://picsum.photos/seed/floor1/600/400', caption: 'Montaj parchet herringbone living', category: 'pardoseli' }
    ]
  },
  {
    id: '12',
    name: 'Cristina Dabija',
    avatar: 'https://i.pravatar.cc/150?img=20',
    specialty: 'Sisteme de securitate',
    categories: ['sisteme-securitate'],
    city: 'Chișinău',
    bio: 'Inginer de securitate cu experiență în proiectarea și instalarea sistemelor de supraveghere video, alarmă și control acces. Oferim soluții complete pentru locuințe și afaceri.',
    rating: 4.9,
    reviewCount: 29,
    completedJobs: 85,
    verified: true,
    memberSince: '2022-11-05',
    priceRange: '1000-10000 MDL',
    services: [
      { name: 'Instalare camere video', description: 'Montaj sistem de supraveghere cu 4-8 camere', priceFrom: 3000, priceTo: 8000, currency: 'MDL' },
      { name: 'Montaj alarmă', description: 'Instalare sistem de alarmă wireless', priceFrom: 2000, priceTo: 5000, currency: 'MDL' },
      { name: 'Interfon video', description: 'Montaj interfon video la poarta sau ușa de intrare', priceFrom: 1000, priceTo: 3000, currency: 'MDL' }
    ],
    portfolio: [
      { id: 'p12-1', image: 'https://picsum.photos/seed/security1/600/400', caption: 'Sistem de supraveghere vilă — 8 camere', category: 'sisteme-securitate' }
    ]
  },
  {
    id: '13',
    name: 'Mihai Rusu',
    avatar: 'https://i.pravatar.cc/150?img=17',
    specialty: 'Reparații electrocasnice',
    categories: ['reparatii-electrocasnice'],
    city: 'Soroca',
    bio: 'Meșter cu experiență de 10 ani în reparația electrocasnicelor de toate tipurile. Reparații rapide și garantate, piese de schimb originale.',
    rating: 4.4,
    reviewCount: 62,
    completedJobs: 287,
    verified: false,
    memberSince: '2023-06-15',
    priceRange: '200-2000 MDL',
    services: [
      { name: 'Reparație mașină de spălat', description: 'Diagnosticare și reparație mașini de spălat', priceFrom: 300, priceTo: 1500, currency: 'MDL' },
      { name: 'Reparație frigider', description: 'Reparație frigidere și congelatoare', priceFrom: 400, priceTo: 2000, currency: 'MDL' },
      { name: 'Reparație cuptor/plită', description: 'Reparație cuptoare electrice și plite', priceFrom: 200, priceTo: 1000, currency: 'MDL' }
    ],
    portfolio: []
  },
  {
    id: '14',
    name: 'Dorin Grosu',
    avatar: 'https://i.pravatar.cc/150?img=18',
    specialty: 'Transport & Mutări',
    categories: ['transport-mutari'],
    city: 'Chișinău',
    bio: 'Servicii profesionale de mutare cu echipă experimentată și camioane echipate. Ambalare, transport și dezambalare — totul inclus. Operăm în toată Moldova.',
    rating: 4.7,
    reviewCount: 93,
    completedJobs: 356,
    verified: true,
    memberSince: '2021-07-20',
    priceRange: '500-5000 MDL',
    services: [
      { name: 'Mutare apartament', description: 'Mutare completă apartament cu ambalare', priceFrom: 1500, priceTo: 4000, currency: 'MDL' },
      { name: 'Transport mobilier', description: 'Transport mobilier și obiecte voluminoase', priceFrom: 500, priceTo: 2000, currency: 'MDL' },
      { name: 'Mutare birou', description: 'Relocare birou cu tot echipamentul', priceFrom: 3000, priceTo: 8000, currency: 'MDL' }
    ],
    portfolio: [
      { id: 'p14-1', image: 'https://picsum.photos/seed/moving1/600/400', caption: 'Mutare apartament 4 camere Chișinău', category: 'transport-mutari' }
    ]
  },
  {
    id: '15',
    name: 'Pavel Condrea',
    avatar: 'https://i.pravatar.cc/150?img=19',
    specialty: 'Energie solară',
    categories: ['sisteme-solare'],
    city: 'Ungheni',
    bio: 'Inginer energetic specializat în sisteme fotovoltaice. Proiectez și instalez panouri solare pentru case particulare și ferme. Consultanță gratuită pentru dimensionarea sistemului optim.',
    rating: 4.8,
    reviewCount: 18,
    completedJobs: 42,
    verified: true,
    memberSince: '2023-09-01',
    priceRange: '5000-50000 MDL',
    services: [
      { name: 'Sistem solar rezidențial', description: 'Proiectare și montaj sistem fotovoltaic pentru casă', priceFrom: 15000, priceTo: 50000, currency: 'MDL' },
      { name: 'Consultanță energetică', description: 'Evaluare necesar energetic și dimensionare sistem', priceFrom: 500, priceTo: 1000, currency: 'MDL' },
      { name: 'Întreținere panouri', description: 'Curățare și verificare sistem existent', priceFrom: 500, priceTo: 1500, currency: 'MDL' }
    ],
    portfolio: [
      { id: 'p15-1', image: 'https://picsum.photos/seed/solar1/600/400', caption: 'Instalare 20 panouri solare — Ungheni', category: 'sisteme-solare' },
      { id: 'p15-2', image: 'https://picsum.photos/seed/solar2/600/400', caption: 'Sistem on-grid pentru fermă', category: 'sisteme-solare' }
    ]
  }
]
