export interface Category {
  id: string
  slug: string
  name: string
  description: string
  icon: string
  providerCount: number
}

export const categories: Category[] = [
  {
    id: '1',
    slug: 'instalatii-sanitare',
    name: 'Instalații sanitare',
    description: 'Reparații și montaj țevi, robineți, chiuvete, toalete, boilere și sisteme de canalizare.',
    icon: '🔧',
    providerCount: 142
  },
  {
    id: '2',
    slug: 'electricitate',
    name: 'Electricitate',
    description: 'Instalații electrice, reparații prize, cablare, tablouri electrice și iluminat.',
    icon: '⚡',
    providerCount: 128
  },
  {
    id: '3',
    slug: 'renovari-constructii',
    name: 'Renovări & Construcții',
    description: 'Renovări complete, construcții, zidărie, tencuială și lucrări de finisare.',
    icon: '🏗️',
    providerCount: 95
  },
  {
    id: '4',
    slug: 'curatenie',
    name: 'Curățenie',
    description: 'Curățenie generală, curățenie după reparații, curățenie de întreținere.',
    icon: '🧹',
    providerCount: 186
  },
  {
    id: '5',
    slug: 'mobila-montaj',
    name: 'Mobilă & Montaj',
    description: 'Asamblare mobilier, montaj bucătării, dulapuri și mobilier la comandă.',
    icon: '🪑',
    providerCount: 73
  },
  {
    id: '6',
    slug: 'gradinarit',
    name: 'Grădinărit & Amenajare exterioară',
    description: 'Întreținere grădini, plantare, gazonare, sisteme de irigare și amenajare peisagistică.',
    icon: '🌿',
    providerCount: 64
  },
  {
    id: '7',
    slug: 'climatizare-incalzire',
    name: 'Climatizare & Încălzire',
    description: 'Montaj și reparații aer condiționat, centrale termice, calorifere și ventilație.',
    icon: '❄️',
    providerCount: 87
  },
  {
    id: '8',
    slug: 'acoperisuri',
    name: 'Acoperișuri',
    description: 'Montaj, reparații și izolarea acoperișurilor, jgheaburi și burlane.',
    icon: '🏠',
    providerCount: 45
  },
  {
    id: '9',
    slug: 'zugravit-vopsit',
    name: 'Zugrăvit & Vopsit',
    description: 'Zugrăveli interioare și exterioare, vopsitorie, tapet și finisaje decorative.',
    icon: '🎨',
    providerCount: 156
  },
  {
    id: '10',
    slug: 'ferestre-usi',
    name: 'Instalare ferestre & uși',
    description: 'Montaj ferestre PVC, uși interioare și exterioare, geamuri termopan.',
    icon: '🪟',
    providerCount: 68
  },
  {
    id: '11',
    slug: 'pardoseli',
    name: 'Pardoseli',
    description: 'Montaj parchet, gresie, faianță, podele epoxidice și alte tipuri de pardoseli.',
    icon: '🏗️',
    providerCount: 92
  },
  {
    id: '12',
    slug: 'amenajari-interioare',
    name: 'Amenajări interioare',
    description: 'Design interior, decorațiuni, mobilare și amenajarea spațiilor de locuit.',
    icon: '🛋️',
    providerCount: 54
  },
  {
    id: '13',
    slug: 'sisteme-securitate',
    name: 'Sisteme de securitate',
    description: 'Instalare camere video, alarme, interfoane, control acces și sisteme antiefracție.',
    icon: '🔒',
    providerCount: 38
  },
  {
    id: '14',
    slug: 'reparatii-electrocasnice',
    name: 'Reparații electrocasnice',
    description: 'Reparații mașini de spălat, frigidere, cuptoare, aspiratoare și alte electrocasnice.',
    icon: '🔌',
    providerCount: 76
  },
  {
    id: '15',
    slug: 'transport-mutari',
    name: 'Transport & Mutări',
    description: 'Servicii de mutare, transport mobilier, ambalare și depozitare temporară.',
    icon: '🚚',
    providerCount: 112
  },
  {
    id: '16',
    slug: 'sisteme-solare',
    name: 'Sisteme solare & Energie verde',
    description: 'Instalare panouri solare, pompe de căldură și soluții de energie regenerabilă.',
    icon: '☀️',
    providerCount: 29
  },
  {
    id: '17',
    slug: 'apa-canalizare',
    name: 'Instalații de apă și canalizare',
    description: 'Montaj și reparații conducte de apă, canalizare, fose septice și stații de pompare.',
    icon: '💧',
    providerCount: 83
  },
  {
    id: '18',
    slug: 'casa-inteligenta',
    name: 'Automatizare casă inteligentă',
    description: 'Sisteme smart home, automatizare iluminat, încălzire, securitate și electrocasnice.',
    icon: '🤖',
    providerCount: 21
  }
]
