/**
 * ELARIS Digital Invitations Catalog Data
 *
 * Each invitation is completely data-driven.
 * Categories: wedding, engagement, birthday, baptism, corporate
 */
export const invitationsData = [
  {
    id: "invitation-001",
    title: {
      hy: "Elegant",
      ru: "Elegant",
      en: "Elegant"
    },
    category: "wedding",
    price: 15000,
    image: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80",
    previewUrl: "https://example.com/preview/invitation-001",
    description: {
      hy: "Ոսկեզօծ շեշտադրումներով և մինիմալիստական էսթետիկայով շքեղ հրավիրատոմս:",
      ru: "Роскошное приглашение с золотыми акцентами и минималистичной эстетикой.",
      en: "A luxurious digital invitation featuring soft gold accents and timeless typography."
    },
    features: ["rsvp", "music", "map", "countdown", "gallery"]
  },
  {
    id: "invitation-002",
    title: {
      hy: "Pure Pearl",
      ru: "Pure Pearl",
      en: "Pure Pearl"
    },
    category: "wedding",
    price: 13500,
    image: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80",
    previewUrl: "https://example.com/preview/invitation-002",
    description: {
      hy: "Մարգարտյա նուրբ երանգներ, անիմացիոն ծաղկային շեշտադրումներ և ռոմանտիկ մթնոլորտ:",
      ru: "Нежные жемчужные тона, анимированные флористические акценты и романтика.",
      en: "Delicate pearl tones, animated floral accents, and a romantic atmosphere."
    },
    features: ["rsvp", "music", "map", "countdown", "schedule"]
  },
  {
    id: "invitation-003",
    title: {
      hy: "Velvet Promise",
      ru: "Velvet Promise",
      en: "Velvet Promise"
    },
    category: "engagement",
    price: 12500,
    image: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=800&q=80",
    previewUrl: "https://example.com/preview/invitation-003",
    description: {
      hy: "Նուրբ և ջերմ ձևավորում նշանադրության արարողության համար՝ անհատական երաժշտությամբ:",
      ru: "Изысканный и теплый дизайн для церемонии помолвки с индивидуальной музыкой.",
      en: "Warm and graceful design crafted for engagement celebrations with custom music."
    },
    features: ["rsvp", "map", "music", "countdown"]
  },
  {
    id: "invitation-004",
    title: {
      hy: "Golden Jubilee",
      ru: "Golden Jubilee",
      en: "Golden Jubilee"
    },
    category: "birthday",
    price: 10900,
    image: "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?auto=format&fit=crop&w=800&q=80",
    previewUrl: "https://example.com/preview/invitation-004",
    description: {
      hy: "Վառ, ժամանակակից և հանդիսավոր դիզայն ծննդյան տոնակատարությունների համար:",
      ru: "Яркий, современный и торжественный дизайн для празднования дня рождения.",
      en: "Vibrant, modern, and celebratory design for memorable birthday milestones."
    },
    features: ["rsvp", "map", "countdown", "gallery"]
  },
  {
    id: "invitation-005",
    title: {
      hy: "Angelic Light",
      ru: "Angelic Light",
      en: "Angelic Light"
    },
    category: "baptism",
    price: 11900,
    image: "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80",
    previewUrl: "https://example.com/preview/invitation-005",
    description: {
      hy: "Լուսավոր և օրհնված ձևավորում մկրտության սրբազան խորհրդի համար:",
      ru: "Светлый и одухотворенный дизайн для таинства крещения.",
      en: "Luminous, pure, and spiritual aesthetic crafted for holy baptism ceremonies."
    },
    features: ["map", "countdown", "music", "rsvp"]
  },
  {
    id: "invitation-006",
    title: {
      hy: "White Blossom",
      ru: "White Blossom",
      en: "White Blossom"
    },
    category: "wedding",
    price: 13900,
    image: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=800&q=80",
    previewUrl: "https://example.com/preview/invitation-006",
    description: {
      hy: "Նրբաճաշակ սպիտակ ծաղիկների կոմպոզիցիա և թեթև անիմացիոն էֆեկտներ:",
      ru: "Композиция из белых цветов с деликатными анимационными эффектами.",
      en: "Graceful white florals paired with delicate animations for refined weddings."
    },
    features: ["rsvp", "map", "countdown", "gallery"]
  },
  {
    id: "invitation-007",
    title: {
      hy: "Prestige Gala",
      ru: "Prestige Gala",
      en: "Prestige Gala"
    },
    category: "corporate",
    price: 18500,
    image: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=800&q=80",
    previewUrl: "https://example.com/preview/invitation-007",
    description: {
      hy: "Կորպորատիվ բարձրակարգ հանդիպումների, գալա երեկոների և պաշտոնական ընդունելությունների համար:",
      ru: "Для статусных корпоративных мероприятий, гала-вечеров и официальных приемов.",
      en: "Polished and sophisticated digital invitation for executive galas and corporate summits."
    },
    features: ["rsvp", "map", "schedule", "countdown"]
  },
  {
    id: "invitation-008",
    title: {
      hy: "Eternal Whisper",
      ru: "Eternal Whisper",
      en: "Eternal Whisper"
    },
    category: "engagement",
    price: 12900,
    image: "https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=800&q=80",
    previewUrl: "https://example.com/preview/invitation-008",
    description: {
      hy: "Ռոմանտիկ մինիմալիզմ նշանադրության և սիրո խոստման արարողության համար:",
      ru: "Романтический минимализм для церемонии помолвки и клятвы любви.",
      en: "Romantic minimalism celebrating engagement promises and love stories."
    },
    features: ["rsvp", "map", "music", "countdown", "gallery"]
  }
];

export default invitationsData;
