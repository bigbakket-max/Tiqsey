import { Attraction, Destination } from '../types';
import lindtImage from '../assets/images/lindt_chocolate_fountain_1779240843252.png';

export const POPULAR_ATTRACTIONS: Attraction[] = [
  {
    id: 'ams-rijksmuseum',
    name: 'Rijksmuseum: Skip-the-line Admission',
    location: 'Amsterdam, Netherlands',
    city: 'Amsterdam',
    category: 'Museum',
    rating: 4.9,
    reviewsCount: 18400,
    price: 21,
    discountPrice: 16,
    imageUrl: 'https://aws-tiqets-cdn.imgix.net/images/content/0efa6312d9f84dc683af182d0c37f673.jpeg?auto=format%2Ccompress&dpr=2&fit=clip&h=695.2000122070312&q=85&s=519110b4ab8db921a4b7e4f12cce1025&w=null',
    isPopular: true,
    description: 'Explore Dutch art and history from the Middle Ages to the present day at the national museum of the Netherlands.',
    highlights: [
      'See Rembrandt\'s The Night Watch',
      'Discover masterpieces by Vermeer and Frans Hals',
      'Explore the library and research center',
      'Admire the stunning 19th-century architecture'
    ],
    included: [
      'Skip-the-line entrance ticket',
      'Access to permanent collections',
      'Access to temporary exhibitions'
    ],
    duration: '2-3 hours',
    openingHours: 'Daily: 09:00 - 17:00'
  },
  {
    id: 'lis-jeronimos',
    name: 'Jerónimos Monastery: Admission Ticket',
    location: 'Lisbon, Portugal',
    city: 'Lisbon',
    category: 'Landmark',
    rating: 4.7,
    reviewsCount: 12500,
    price: 10,
    imageUrl: 'https://aws-tiqets-cdn.imgix.net/images/content/8dda2bb7142f44b38c3d90d1fd677d2f.jpg?auto=format%2Ccompress&fit=crop&q=85&w=1200&s=6ad1c37b4fe53de884ec10685140b5e8',
    isPopular: true,
    description: 'Visit the Mosteiro dos Jerónimos, a magnificent 16th-century monastery and UNESCO World Heritage site in Lisbon.',
    highlights: [
      'Admission to the Jerónimos Monastery',
      'See the stunning Manueline architecture',
      'Visit the tombs of Vasco da Gama and Luís de Camões',
      'Explore the beautiful cloisters'
    ],
    included: [
      'Admission ticket',
      'Access to the cloisters and church'
    ],
    duration: '1-2 hours',
    openingHours: 'Tue-Sun: 10:00 - 18:30 (Closed Mondays)'
  },
  {
    id: 'bcn-casa-batllo',
    name: 'Casa Batlló: Entrance Ticket + Audio Guide',
    location: 'Barcelona, Spain',
    city: 'Barcelona',
    category: 'Architecture',
    rating: 4.8,
    reviewsCount: 35000,
    price: 35,
    discountPrice: 28,
    imageUrl: 'https://infotur.scene7.com/is/image/cta/act-24-0836-finestra-vitralls-colors-casa-batllo:1-1?wid=748&hei=748',
    isPopular: true,
    description: 'Step inside Antoni Gaudí’s architectural masterpiece, Casa Batlló, and discover a world of magic and fantasy.',
    highlights: [
      'Entrance to Casa Batlló',
      'Augmented reality smart guide',
      'Explore the Noble Floor and attic',
      'See the iconic roof terrace with its dragon-back scale'
    ],
    included: [
      'Entrance ticket',
      'Smart guide (AR audio guide)',
      'Access to the Gaudi Cube and Gaudi Dome'
    ],
    duration: '1-1.5 hours',
    openingHours: 'Daily: 09:00 - 20:00'
  },
  {
    id: 'bcn-casa-mila',
    name: 'La Pedrera - Casa Milà: Skip-the-line Ticket',
    location: 'Barcelona, Spain',
    city: 'Barcelona',
    category: 'Architecture',
    rating: 4.7,
    reviewsCount: 28000,
    price: 25,
    discountPrice: 18,
    imageUrl: 'https://www.casabatllo.es/wp-content/uploads/2023/01/casa-mila-pedrera.png',
    isPopular: true,
    description: 'Explore La Pedrera (Casa Milà), another of Gaudí’s iconic buildings, famous for its unique stone facade and sculptural roof.',
    highlights: [
      'Skip-the-line access to La Pedrera',
      'Audio guide in multiple languages',
      'Visit the sculptural roof terrace',
      'Explore the Whale Attic and Espai Gaudí'
    ],
    included: [
      'Skip-the-line ticket',
      'Audio guide',
      'Access to the Warrior Rooftop'
    ],
    duration: '1.5 hours',
    openingHours: 'Daily: 09:00 - 20:30'
  },
  {
    id: 'ny-edge',
    name: 'Edge NYC: Observation Deck Admission',
    location: 'New York, USA',
    city: 'New York',
    category: 'Observation Deck',
    rating: 4.8,
    reviewsCount: 15200,
    price: 36,
    imageUrl: 'https://www.edgenyc.com/content/uploads/2025/04/Flex-Admission.jpg',
    isPopular: true,
    description: 'Experience 360-degree views of New York City from the highest outdoor sky deck in the Western Hemisphere.',
    highlights: [
      'Access to the outdoor sky deck',
      'Step onto the glass floor',
      'See NYC from angled glass walls',
      'Enjoy panoramic views of Manhattan'
    ],
    included: [
      'Admission ticket',
      'Access to the Level 100 indoor and outdoor decks',
      'Glass floor and Skyline Steps'
    ],
    duration: '1-2 hours',
    openingHours: 'Daily: 10:00 - 22:00'
  },
  {
    id: 'zrh-lindt',
    name: 'Lindt Home of Chocolate Museum: Tour & Tasting',
    location: 'Zurich, Switzerland',
    city: 'Zurich',
    category: 'Museum',
    rating: 4.9,
    reviewsCount: 12800,
    price: 15,
    imageUrl: lindtImage,
    isPopular: true,
    description: 'Discover the world of chocolate at the Lindt Home of Chocolate, featuring a massive 9-meter chocolate fountain.',
    highlights: [
      'See the world\'s tallest chocolate fountain',
      'Interactive tour of chocolate history',
      'Unlimited chocolate tasting',
      'Visit the largest Lindt shop in the world'
    ],
    included: [
      'Admission ticket',
      'Audio guide',
      'Chocolate tasting'
    ],
    duration: '1.5 - 2 hours',
    openingHours: 'Daily: 10:00 - 18:00'
  },
  {
    id: 'rom-colosseum',
    name: 'Colosseum: Priority Entrance Ticket',
    location: 'Rome, Italy',
    city: 'Rome',
    category: 'Landmark',
    rating: 4.8,
    reviewsCount: 45000,
    price: 24,
    discountPrice: 19,
    imageUrl: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    isPopular: true,
    description: 'Step back in time and explore the mighty Colosseum, the largest amphitheater ever built.',
    highlights: [
      'Skip-the-line access to the Colosseum',
      'Explore the first and second tiers',
      'Visit the Roman Forum and Palatine Hill',
      'Learn about gladiatorial combat'
    ],
    included: [
      'Skip-the-line entrance ticket',
      'Access to the Roman Forum',
      'Access to Palatine Hill'
    ],
    duration: '3 hours',
    openingHours: 'Daily: 08:30 - 19:00'
  },
  {
    id: 'rom-forum',
    name: 'Roman Forum & Palatine Hill Admission',
    location: 'Rome, Italy',
    city: 'Rome',
    category: 'History',
    rating: 4.7,
    reviewsCount: 32000,
    price: 18,
    imageUrl: 'https://www.baldhiker.com/wp-content/uploads/2013/05/view-of-the-Forum-in-Rome.jpg',
    isPopular: true,
    description: 'Explore the ruins of the central hub of ancient Rome and the hill where the city was founded.',
    highlights: [
      'Walk the Via Sacra',
      'See the Temple of Saturn',
      'Visit the House of the Vestals',
      'Panoramic views from Palatine Hill'
    ],
    included: [
      'Admission ticket',
      'Digital map'
    ],
    duration: '2 hours',
    openingHours: 'Daily: 09:00 - 18:30'
  },
  {
    id: 'rom-castel',
    name: 'Castel Sant\'Angelo: Fast Track Ticket',
    location: 'Rome, Italy',
    city: 'Rome',
    category: 'Museum',
    rating: 4.6,
    reviewsCount: 21000,
    price: 15,
    imageUrl: 'https://aws-tiqets-cdn.imgix.net/images/content/a2e1f4dcaa1a4d4d81be637a4e62224a.jpg?auto=format%2Ccompress&dpr=2&fit=clip&h=695.2000122070312&q=85&s=041b2b1bbec8bd81e2144884a3e7032a&w=null',
    isPopular: true,
    description: 'Visit Hadrian\'s mausoleum, transformed into a fortress and Papal residence over the centuries.',
    highlights: [
      'Fast-track entry to the castle',
      'See the stunning Papal apartments',
      'Explore the ancient prison cells',
      'Roof terrace with views of St. Peter\'s'
    ],
    included: [
      'Skip-the-line entrance',
      'Access to all open sections'
    ],
    duration: '1.5 - 2 hours',
    openingHours: 'Daily: 09:00 - 19:30'
  },
  {
    id: 'rom-vatican',
    name: 'Vatican Museums & Sistine Chapel Entrance Ticket',
    location: 'Vatican City, Rome, Italy',
    city: 'Rome',
    category: 'Museum',
    rating: 4.8,
    reviewsCount: 52000,
    price: 28,
    discountPrice: 22,
    imageUrl: 'https://images.visititaly.eu/uploads/articoli/evidenza/20200120164846Creazione%20di%20Adamo,%20musei%20vaticani%20Visit%20Italy.jpg',
    isPopular: true,
    description: 'Walk through the breathtaking exhibitions of the Vatican Museums and stand in awe under Michelangelo\'s legendary frescoes in the Sistine Chapel.',
    highlights: [
      'Skip-the-line entrance to one of the world\'s greatest art collections',
      'See Michelangelo\'s iconic masterpiece ceiling in the Sistine Chapel',
      'Explore the Gallery of Maps, tapestries, and the Gallery of Candelabra',
      'Admire Raphael\'s Rooms and spectacular classical sculptures'
    ],
    included: [
      'Fast-track admission ticket to the Vatican Museums',
      'Admission ticket to the Sistine Chapel',
      'Access to all open galleries and exhibitions'
    ],
    duration: '3 - 4 hours',
    openingHours: 'Mon-Sat: 09:00 - 18:00 (Closed Sundays)'
  },
  {
    id: 'ist-cistern',
    name: 'Basilica Cistern: Skip-the-Line Entry',
    location: 'Istanbul, Turkey',
    city: 'Istanbul',
    category: 'Landmark',
    rating: 4.8,
    reviewsCount: 18500,
    price: 30,
    imageUrl: 'https://media1.thrillophilia.com/filestore/c6pgzmy1dqfpn668t4ksm8d4wvew_Basilica_Cistern_after_restoration_2022_(11).jpg?w=400&dpr=2',
    isPopular: true,
    description: 'Descend beneath the streets of Istanbul to discover the magical Basilica Cistern, the largest of several hundred ancient cisterns.',
    highlights: [
      'Explore the "Sunken Palace"',
      'See the famous Medusa Head columns',
      'Marvel at the 336 marble columns',
      'Experience the atmospheric lighting and music'
    ],
    included: [
      'Admission ticket',
      'Access to the entire cistern'
    ],
    duration: '1 hour',
    openingHours: 'Daily: 09:00 - 19:00'
  },
  {
    id: 'ist-hagia',
    name: 'Hagia Sophia: Entry & Highlights Guided Tour',
    location: 'Istanbul, Turkey',
    city: 'Istanbul',
    category: 'Religious',
    rating: 4.9,
    reviewsCount: 52000,
    price: 25,
    imageUrl: 'https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    isPopular: true,
    description: 'Visit one of the world\'s most significant historical and religious landmarks, a masterpiece of Byzantine architecture.',
    highlights: [
      'Guided tour of the main highlights',
      'See the massive floating dome',
      'Admire Byzantine mosaics and Islamic calligraphy',
      'Learn about its transition from church to mosque'
    ],
    included: [
      'Admission ticket',
      'Professional guide'
    ],
    duration: '1 hour',
    openingHours: 'Daily: 09:00 - 19:30'
  },
  {
    id: 'ist-dolmabahce',
    name: 'Dolmabahçe Palace: Admission & Audio Guide',
    location: 'Istanbul, Turkey',
    city: 'Istanbul',
    category: 'Architecture',
    rating: 4.7,
    reviewsCount: 15600,
    price: 30,
    imageUrl: 'https://cdn.istanbultouristpass.com/banner/doc/c1bf7675959df6b6d6f4d1e1a089fad8-649050b6411fe.jpg',
    isPopular: true,
    description: 'Explore the lavish and grandiose 19th-century palace that served as the primary residence of Ottoman Sultans.',
    highlights: [
      'Visit the Crystal Staircase',
      'See the world\'s largest Bohemian crystal chandelier',
      'Explore the Harem sections',
      'Walk through the manicured palace gardens'
    ],
    included: [
      'Entry to main palace and Harem',
      'Multilingual audio guide'
    ],
    duration: '2 hours',
    openingHours: 'Daily: 09:00 - 16:00 (Closed Mondays)'
  },
  {
    id: 'ist-topkapi',
    name: 'Topkapi Palace: Fast Track & Highlights Tour',
    location: 'Istanbul, Turkey',
    city: 'Istanbul',
    category: 'History',
    rating: 4.8,
    reviewsCount: 38000,
    price: 45,
    imageUrl: 'https://anascreccatravel.com/wp-content/uploads/2018/06/Topkapi-Palace-Istanbul-Touristic-Places.webp',
    isPopular: true,
    description: 'Step into the Ottoman Empire\'s court at Topkapi Palace, featuring opulent courtyards, sacred relics, and magnificent views.',
    highlights: [
      'Fast-track access to the palace complex',
      'Explore the Harem and Treasury',
      'See the Spoonmaker\'s Diamond',
      'Panoramic views of the Golden Horn'
    ],
    included: [
      'Skip-the-line entry ticket',
      'Access to the Harem',
      'Tour guide introduction'
    ],
    duration: '3 hours',
    openingHours: 'Daily: 09:00 - 18:00 (Closed Tuesdays)'
  },
  {
    id: 'ist-galata',
    name: 'Galata Tower Entry Tickets',
    location: 'Galata, Istanbul, Turkey',
    city: 'Istanbul',
    category: 'Landmark',
    rating: 4.7,
    reviewsCount: 28000,
    price: 25,
    imageUrl: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    isPopular: true,
    description: 'Climb to the top of the iconic Galata Tower for breathtaking 360-degree views of Istanbul, the Bosporus, and the Golden Horn.',
    highlights: [
      'Enjoy spectacular panoramic views of Istanbul',
      'See the historic Bosporus Strait and Golden Horn',
      'Explore the historical museum inside the tower',
      'Marvel at this medieval stone tower dating back to 1348'
    ],
    included: [
      'Standard admission ticket',
      'Access to the viewing platform',
      'Access to the museum exhibition sections'
    ],
    duration: '1 hour',
    openingHours: 'Daily: 08:30 - 23:00'
  },
  {
    id: 'sin-universal',
    name: 'Universal Studios Singapore Admission',
    location: 'Sentosa Island, Singapore',
    city: 'Singapore',
    category: 'Fun',
    rating: 4.8,
    reviewsCount: 42000,
    price: 57,
    imageUrl: 'https://ik.imagekit.io/tvlk/blog/2023/12/shutterstock_476270212.jpg',
    isPopular: true,
    description: 'Experience cutting-edge rides, shows, and attractions based on your favorite blockbuster films and television series.',
    highlights: [
      'Visit the themed zones like Hollywood and Ancient Egypt',
      'Ride the Battlestar Galactica rollercoasters',
      'Meet your favorite movie characters',
      'Explore Transformers: The Ride'
    ],
    included: [
      'Standard admission ticket',
      'Access to all shows and rides'
    ],
    duration: 'Flexible (all day)',
    openingHours: 'Daily: 11:00 - 18:00'
  },
  {
    id: 'tok-teamlab',
    name: 'teamLab Planets TOKYO: Admission Ticket',
    location: 'Tokyo, Japan',
    city: 'Tokyo',
    category: 'Arts',
    rating: 4.9,
    reviewsCount: 28500,
    price: 23,
    imageUrl: 'https://arquitecturaviva.com/assets/uploads/articulos/78785/av_239877.webp?h=0f6a4a4e',
    isPopular: true,
    description: 'Dive into a body-immersive digital art museum where you walk through water and become one with the flowers.',
    highlights: [
      'Explore 10 unique immersive art installations',
      'Walk through knee-deep water with digital koi fish',
      'Experience the infinite crystal universe',
      'Interact with floating flower gardens'
    ],
    included: [
      'Admission ticket',
      'Access to all installations'
    ],
    duration: '2 hours',
    openingHours: 'Daily: 09:00 - 22:00'
  },
  {
    id: 'ams-van-gogh',
    name: 'Van Gogh Museum: Entrance Ticket',
    location: 'Amsterdam, Netherlands',
    city: 'Amsterdam',
    category: 'Museum',
    rating: 4.8,
    reviewsCount: 15600,
    price: 22,
    imageUrl: 'https://aws-tiqets-cdn.imgix.net/images/content/71e1edc441ef419789f059c8ee9b3ec4.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200',
    isPopular: true,
    provider: 'Van Gogh Museum',
    duration: '1.5 - 2 hours',
    fastTrack: true,
    description: 'Explore the world’s largest collection of works by Vincent van Gogh, including masterpieces like Sunflowers, The Potato Eaters, and Almond Blossom.',
    highlights: [
      'Admission to the permanent collection',
      'See masterpieces by Vincent van Gogh',
      'Discover the story of Van Gogh\'s life and art',
      'Access to temporary exhibitions'
    ],
    included: [
      'Timed-entry admission ticket',
      'Access to the permanent collection',
      'Access to temporary exhibitions'
    ],
    galleryUrls: [
      'https://aws-tiqets-cdn.imgix.net/images/content/71e1edc441ef419789f059c8ee9b3ec4.jpg?auto=format%2Ccompress&dpr=2&fit=crop&h=360&q=30&w=1200'
    ],
    openingHours: 'Daily: 09:00 - 18:00',
    cancellationPolicy: 'This ticket is non-refundable'
  },
  {
    id: 'sagrada-familia',
    name: 'Sagrada Familia: Fast Track Ticket + Optional Towers',
    location: 'Barcelona, Spain',
    city: 'Barcelona',
    category: 'Architecture',
    rating: 4.7,
    reviewsCount: 64965,
    price: 33.80,
    imageUrl: 'https://images.unsplash.com/photo-1511527661048-7fe73d85e9a4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    isPopular: true,
    provider: 'Sagrada Família',
    duration: '1h 30mins',
    fastTrack: true,
    liveGuide: 'English',
    maxGroupSize: 30,
    description: 'Get fast-track access to Gaudi\'s unfinished masterpiece. Explore the stunning interior and learn about the history of this iconic basilica.',
    highlights: [
      'Fast track entrance to Sagrada Familia',
      'Downloadable Sagrada Familia app with audio guide',
      'Access to the interior of the basilica',
      'Optional access to the Passion or Nativity Towers'
    ],
    included: [
      'Fast track entrance to Sagrada Familia',
      'Downloadable Sagrada Familia app with audio guide'
    ],
    galleryUrls: [
      'https://images.unsplash.com/photo-1511527661048-7fe73d85e9a4?auto=format&fit=crop&q=85&w=1200',
      'https://images.unsplash.com/photo-1583779457094-0cfcf3600897?auto=format&fit=crop&q=85&w=1200',
      'https://images.unsplash.com/photo-1558642084-fd07fae5282e?auto=format&fit=crop&q=85&w=1200',
      'https://images.unsplash.com/photo-1523531294919-4bcd7c65e216?auto=format&fit=crop&q=85&w=1200'
    ],
    openingHours: 'Daily: 09:00 - 20:00',
    cancellationPolicy: 'This ticket cannot be cancelled or rescheduled'
  },
  {
    id: 'park-guell',
    name: 'Park Güell: Admission Ticket',
    location: 'Barcelona, Spain',
    city: 'Barcelona',
    category: 'Park',
    rating: 4.3,
    reviewsCount: 49291,
    price: 13.50,
    imageUrl: 'https://images.unsplash.com/photo-1523531294919-4bcd7c65e216?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    isPopular: true,
    provider: 'Park Güell',
    duration: '2 hours',
    description: 'Secure your Park Güell tickets and enter into Gaudi’s colorful world with timed entry that lets you see it all.',
    highlights: [
      'Visit the Monumental Zone of Park Güell',
      'See the famous mosaic salamander (El Drac)',
      'Enjoy panoramic views of Barcelona',
      'Explore the Hipostila Room and Nature Square'
    ],
    included: [
      'Admission to the Monumental Zone',
      'Access to the surrounding park areas'
    ],
    galleryUrls: [
      'https://images.unsplash.com/photo-1523531294919-4bcd7c65e216?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1563492065599-3520f775eeed?auto=format&fit=crop&q=80&w=800'
    ],
    openingHours: 'Daily: 09:30 - 19:30',
    cancellationPolicy: 'Free cancellation up to 24 hours in advance'
  },
  {
    id: '1',
    name: 'The Louvre Museum',
    location: 'Paris, France',
    city: 'Paris',
    category: 'Museum',
    rating: 4.8,
    reviewsCount: 12450,
    price: 17,
    imageUrl: 'https://images.unsplash.com/photo-1565099824688-e93eb20fe622?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    isPopular: true,
    description: 'Explore the worlds largest and most visited museum. From the enigmatic Mona Lisa to the majestic Venus de Milo, discover masterpieces that span thousands of years of art history.',
    highlights: [
      'Skip-the-line access to the museum',
      'See the iconic Mona Lisa and Venus de Milo',
      'Explore the stunning Louvre Pyramid',
      'Discover thousands of works of art across multiple wings'
    ],
    included: [
      'Fast-track entrance ticket',
      'Access to permanent collections',
      'Access to temporary exhibitions (subject to availability)',
      'Digital map of the museum'
    ],
    excluded: [
      'Guided tour',
      'Audio guide (available for rent)',
      'Food and drinks'
    ],
    knowBeforeYouGo: [
      'The museum is closed on Tuesdays.',
      'Bags larger than 55 x 35 x 20 cm are not allowed.',
      'Photography is allowed without flash.',
      'Expect long security lines even with skip-the-line tickets.'
    ],
    whatToBring: [
      'Comfortable walking shoes',
      'ID card or Passport',
      'Water bottle'
    ],
    duration: '3-4 hours',
    galleryUrls: [
      'https://images.unsplash.com/photo-1565099824688-e93eb20fe622?auto=format&fit=crop&q=85&w=1200',
      'https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&q=85&w=1200'
    ],
    cancellationPolicy: 'Free cancellation up to 24 hours in advance',
  },
  {
    id: '2',
    name: 'Gardens by the Bay',
    location: 'Singapore',
    city: 'Singapore',
    category: 'Nature',
    rating: 4.9,
    reviewsCount: 32000,
    price: 28,
    imageUrl: 'https://www.reflectionsenroute.com/wp-content/uploads/2022/08/gardens-by-bay-singapore-5-1024x683.jpg.webp',
    isPopular: true,
    galleryUrls: [
      'https://images.unsplash.com/photo-1525596662741-e94ff9f26de1?auto=format&fit=crop&q=85&w=1200',
      'https://images.unsplash.com/photo-1565967511849-75a6fd7f9a0a?auto=format&fit=crop&q=85&w=1200',
      'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&q=85&w=1200',
      'https://images.unsplash.com/photo-1557180295-76eee20ae8aa?auto=format&fit=crop&q=85&w=1200'
    ],
  },
  {
    id: '3',
    name: 'The Grand Palace',
    location: 'Bangkok, Thailand',
    city: 'Bangkok',
    category: 'Cultural',
    rating: 4.7,
    reviewsCount: 15000,
    price: 15,
    imageUrl: 'https://images.unsplash.com/photo-1563492065599-3520f775eeed?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    isPopular: true,
    galleryUrls: [
      'https://images.unsplash.com/photo-1563492065599-3520f775eeed?auto=format&fit=crop&q=85&w=1200',
      'https://images.unsplash.com/photo-1508009603885-50cf7c579365?auto=format&fit=crop&q=85&w=1200',
      'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&q=85&w=1200',
      'https://images.unsplash.com/photo-1598970434795-0c54fe7c0648?auto=format&fit=crop&q=85&w=1200'
    ],
  },
  {
    id: '4',
    name: 'Sydney Opera House',
    location: 'Sydney, Australia',
    city: 'Sydney',
    category: 'Architectural',
    rating: 4.9,
    reviewsCount: 45600,
    price: 43,
    imageUrl: 'https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    isPopular: true,
    galleryUrls: [
      'https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?auto=format&fit=crop&q=85&w=1200',
      'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&q=85&w=1200',
      'https://images.unsplash.com/photo-1549490349-8643362247b5?auto=format&fit=crop&q=85&w=1200',
      'https://images.unsplash.com/photo-1528072164453-f4e8ef0d475a?auto=format&fit=crop&q=85&w=1200'
    ],
  },
  {
    id: '5',
    name: 'Tokyo Tower',
    location: 'Tokyo, Japan',
    city: 'Tokyo',
    category: 'Landmark',
    rating: 4.8,
    reviewsCount: 22000,
    price: 12,
    imageUrl: 'https://images.unsplash.com/photo-1513407030348-c983a97b98d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    isPopular: true,
    galleryUrls: [
      'https://images.unsplash.com/photo-1513407030348-c983a97b98d8?auto=format&fit=crop&q=85&w=1200',
      'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&q=85&w=1200',
      'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&q=85&w=1200',
      'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&q=85&w=1200'
    ],
  },
  {
    id: 'osaka-castle',
    name: 'Osaka Castle: Entrance & Observatory Ticket',
    location: 'Osaka, Japan',
    city: 'Osaka',
    category: 'History',
    rating: 4.8,
    reviewsCount: 19400,
    price: 15,
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/Osaka_Castle_03bs3200.jpg/1280px-Osaka_Castle_03bs3200.jpg',
    isPopular: true,
    description: 'Immerse yourself in Japan\'s rich history. Explore the legendary Osaka Castle, including the informative museum exhibits and the stunning top-floor panoramic observatory deck.',
    highlights: [
      'Panoramic 360-degree views of Osaka city',
      'Learn about Toyotomi Hideyoshi and the Sengoku period',
      'See beautiful artifacts, weapons, and historical treasures',
      'Walk through the scenic castle gardens and cherry blossom zones'
    ],
    included: [
      'Standard admission ticket to Castle Main Tower',
      'Access to special history museum exhibits'
    ],
    duration: '1.5 - 2 hours',
    openingHours: 'Daily: 09:00 - 17:00',
    galleryUrls: [
      'https://images.unsplash.com/photo-1590253465376-7c34090ef84a?auto=format&fit=crop&q=85&w=1200',
      'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&q=85&w=1200'
    ]
  },
  {
    id: 'osaka-usj',
    name: 'Universal Studios Japan (USJ) Osaka Studio Pass',
    location: 'Osaka, Japan',
    city: 'Osaka',
    category: 'Theme Park',
    rating: 4.9,
    reviewsCount: 38200,
    price: 74,
    imageUrl: 'https://resources.matcha-jp.com/resize/720x2000/2025/03/18-228351.webp',
    isPopular: true,
    description: 'Experience your favorite movie worlds in Osaka! Visit Super Nintendo World, The Wizarding World of Harry Potter, Minion Park, and hold on tight to world-class rollercoasters.',
    highlights: [
      'Interact with live characters in Super Nintendo World',
      'Explore Hogwarts Castle and sample some butterbeer',
      'Enjoy action-packed thrilling family rides and spectacular evening shows',
      'Convenient direct enter-with-QR-code pass'
    ],
    included: [
      '1-Day general admission studio pass',
      'Access to all themed zones and regular rides'
    ],
    duration: 'Full day',
    openingHours: 'Daily: 08:30 - 21:00',
    galleryUrls: [
      'https://images.unsplash.com/photo-1627581177641-fc1cb3fe4445?auto=format&fit=crop&q=85&w=1200',
      'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&q=85&w=1200'
    ]
  },
  {
    id: 'usa-statue',
    name: 'Statue of Liberty',
    location: 'New York, USA',
    city: 'USA',
    category: 'Landmark',
    rating: 4.8,
    reviewsCount: 18900,
    price: 24,
    imageUrl: 'https://assets.cityexperiences.com/wp-content/uploads/2021/07/New-York-Statue-of-Liberty.jpg',
    galleryUrls: [
      'https://images.unsplash.com/photo-1485738422979-f5c462d49f74?auto=format&fit=crop&q=85&w=1200',
      'https://images.unsplash.com/photo-1518391846015-55a9cc003b25?auto=format&fit=crop&q=85&w=1200',
      'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&q=85&w=1200',
      'https://images.unsplash.com/photo-1543716091-a840c05249ec?auto=format&fit=crop&q=85&w=1200'
    ],
    description: 'The Statue of Liberty is a colossal neoclassical sculpture on Liberty Island in New York Harbor within New York City, in the United States.',
    highlights: [
      'Access to the pedestal',
      'Ferry from Manhattan or New Jersey',
      'Ellis Island Immigration Museum access',
      'Stunning views of the Manhattan skyline'
    ],
    included: [
      'Round-trip ferry service',
      'Statue of Liberty Museum access',
      'Ellis Island Immigration Museum access'
    ],
    duration: '3-4 hours',
    openingHours: 'Daily: 09:00 - 17:00'
  },
  {
    id: 'usa-disney',
    name: 'Walt Disney World® Resort',
    location: 'Orlando, USA',
    city: 'USA',
    category: 'Fun',
    rating: 4.9,
    reviewsCount: 125400,
    price: 109,
    imageUrl: 'https://www.thetopvillas.com/_next/image?url=https%3A%2F%2Fbkt-euwest2-prod-cms-strapi01.s3.eu-west-2.amazonaws.com%2FDisney_world_Florida_3647c1dd18.jpg&w=3840&q=100',
    description: 'Magic Kingdom, Epcot, Disney\'s Hollywood Studios, and Disney\'s Animal Kingdom – Walt Disney World® Resort is the place where dreams come true.',
    highlights: [
      'Access to one or more theme parks',
      'FastPass+ eligibility',
      'Complimentary transportation within the resort',
      'Spectacular fireworks shows'
    ],
    included: [
      'Admission to the requested parks',
      'Access to all standard attractions and entertainment'
    ],
    duration: '1-7 days',
    openingHours: 'Daily: 09:00 - 22:00'
  },
  {
    id: 'ny-911-memorial',
    name: '9/11 Memorial Museum, New York | Skip-The-Line Admission Tickets',
    location: 'New York, USA',
    city: 'New York',
    category: 'Museum',
    rating: 4.8,
    reviewsCount: 15400,
    price: 33,
    imageUrl: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2e/42/39/57/caption.jpg?w=1200&h=-1&s=1',
    description: 'Pay your respects at the 9/11 Memorial and explore the Museum to learn about the events of September 11, 2001.',
    highlights: [
      'Skip-the-line access to the museum',
      'See the Survivor Tree at the memorial',
      'Hear stories of resilience and hope',
      'Explore the historic foundations of the Twin Towers'
    ],
    duration: '3 hours - 7 days',
    openingHours: 'Daily: 09:00 - 19:00'
  },
  {
    id: 'ny-one-world',
    name: 'One World Observatory Tickets, New York',
    location: 'New York, USA',
    city: 'New York',
    category: 'Observation Deck',
    rating: 4.6,
    reviewsCount: 12400,
    price: 44,
    imageUrl: 'https://www.oneworldobservatory.com/wp-content/uploads/2022/04/dsc_5921_retouch-1.jpeg',
    description: 'Experience 360-degree views of New York City from the tallest building in the Western Hemisphere.',
    highlights: [
      'Ride the SkyPod elevators to the 102nd floor',
      'Interactive exhibits about NYC history',
      'See the Statue of Liberty and Brooklyn Bridge',
      'Dine at the peak of the skyline'
    ],
    duration: '1 hour - 3 days',
    openingHours: 'Daily: 09:00 - 21:00'
  },
  {
    id: 'ny-central-park',
    name: 'Central Park Walking Tour, New York',
    location: 'New York, USA',
    city: 'New York',
    category: 'Tour',
    rating: 4.5,
    reviewsCount: 3500,
    price: 25,
    imageUrl: 'https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    description: 'Discover the hidden gems and history of Manhattan\'s iconic green oasis on a guided walking tour.',
    highlights: [
      'Visit Bethesda Terrace and Fountain',
      'See Strawberry Fields and the Dakota',
      'Walk across Bow Bridge',
      'Learn about the park\'s design and architecture'
    ],
    duration: '2 hours',
    openingHours: 'Daily: 08:00 - 20:00'
  },
  {
    id: 'ny-moma',
    name: 'Museum Of Modern Art Tickets, New York',
    location: 'New York, USA',
    city: 'New York',
    category: 'Museum',
    rating: 5.0,
    reviewsCount: 23000,
    price: 28,
    imageUrl: 'https://loving-newyork.com/wp-content/uploads/2019/05/Museum-of-Modern-Art-New-York-191010133114004.jpg',
    description: 'Explore the world\'s leading museum of modern and contemporary art, featuring works by Van Gogh, Picasso, and Warhol.',
    highlights: [
      'See Van Gogh\'s "The Starry Night"',
      'Explore temporary and permanent exhibitions',
      'Visit the Sculpture Garden',
      'Shop at the prestigious MoMA Design Store'
    ],
    duration: '2 hours - 10 days',
    openingHours: 'Daily: 10:30 - 17:30'
  },
  {
    id: 'ny-met',
    name: 'Metropolitan Museum of Art, New York | Skip-The-Line Admission Tickets',
    location: 'New York, USA',
    city: 'New York',
    category: 'Museum',
    rating: 4.0,
    reviewsCount: 4200,
    price: 30,
    imageUrl: 'https://www.exp1.com/wp-content/uploads/sites/7/2020/06/Met-Museum-1.jpg',
    description: 'Discover over 5,000 years of art from around the world at the Met, one of the world\'s largest art museums.',
    highlights: [
      'Visit the Temple of Dendur',
      'Explore the Egyptian Art collection',
      'See European masterpieces',
      'Enjoy panoramic views from the Cantor Roof Garden'
    ],
    duration: '2 hours',
    openingHours: 'Daily: 10:00 - 17:00'
  },
  {
    id: 'ny-madame-tussauds',
    name: 'Madame Tussauds Tickets, New York',
    location: 'New York, USA',
    city: 'New York',
    category: 'Entertainment',
    rating: 4.2,
    reviewsCount: 8900,
    price: 36,
    imageUrl: 'https://images.trvl-media.com/place/2621/bf9746a3-7c06-49c2-b12e-842e1a0a1464.jpg',
    description: 'Meet your favorite stars and experience the interactive Marvel 4D Cinema at the world\'s greatest wax museum.',
    highlights: [
      'Strike a pose with 200+ lifelike wax figures',
      'Step onto the set of The Tonight Show',
      'Enter the Marvel Universe in 4D',
      'Experience the Glow Gala'
    ],
    duration: '3 hours - 6 days',
    openingHours: 'Daily: 10:00 - 20:00'
  },
  {
    id: 'ny-broadway-museum',
    name: 'The Museum Of Broadway, New York | Skip-The-Line Admission Tickets',
    location: 'New York, USA',
    city: 'New York',
    category: 'Museum',
    rating: 4.7,
    reviewsCount: 1200,
    price: 45,
    imageUrl: 'https://cdn.prod.website-files.com/645976a6c63b66486d263125/6462fc37221666b53fe5370e_mob-outside-museum.jpg',
    description: 'Journey through the history of Broadway in this immersive and interactive museum experience.',
    highlights: [
      'Go behind the scenes of legendary shows',
      'See authentic costumes and props',
      'Learn about the evolution of the theater district',
      'Unique photo opportunities in theatrical sets'
    ],
    duration: '2 hours - 5 days',
    openingHours: 'Daily: 10:00 - 22:00'
  },
  {
    id: 'ny-go-pass',
    name: 'Go City New York All-Inclusive Pass',
    location: 'New York, USA',
    city: 'New York',
    category: 'Card',
    rating: 4.5,
    reviewsCount: 37000,
    price: 139,
    imageUrl: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    description: 'Save up to 50% on top New York attractions with one pass. Choose from 1 to 10 days of unlimited sightseeing.',
    highlights: [
      'Access to 100+ attractions',
      'Empire State Building and Top of the Rock included',
      'Hop-on hop-off Big Bus tour',
      'Circle Line and Statue of Liberty cruises'
    ],
    duration: '1 day - 10 days',
    openingHours: 'Varies by attraction'
  },
  {
    id: 'ny-riseny',
    name: 'RiseNY Tickets, New York',
    location: 'New York, USA',
    city: 'New York',
    category: 'Fun',
    rating: 4.8,
    reviewsCount: 6500,
    price: 32,
    imageUrl: 'https://res.cloudinary.com/dtljonz0f/image/upload/c_auto,ar_4:3,w_3840,g_auto/f_auto/q_auto/v1/gc-v1/new-york-pass/rise_ny_visit_photos_outside_gokydd?_a=BAVAZGDY0',
    description: 'A world-class attraction that combines a museum with a spectacular 4D flight simulation over New York City.',
    highlights: [
      'Immersive journey through NYC\'s cultural history',
      '4D flying theater experience',
      'Stunning aerial views of the city skyline',
      'Located in the heart of Times Square'
    ],
    duration: '1 hour - 3 days',
    openingHours: 'Daily: 10:00 - 21:00'
  },
  {
    id: 'ny-friends',
    name: 'The FRIENDS Experience New York',
    location: 'New York, USA',
    city: 'New York',
    category: 'Fun',
    rating: 4.5,
    reviewsCount: 24000,
    price: 52,
    imageUrl: 'https://s.yimg.com/ny/api/res/1.2/UBA3oBwl0eOfqN0eFCryNw--/YXBwaWQ9aGlnaGxhbmRlcjt3PTEyNDI7aD02OTk7Y2Y9d2VicA--/https://s.yimg.com/uu/api/res/1.2/nuH3mkCEBIGG.pXWYdVjvg--~B/aD0yOTIwO3c9NTE5MDthcHBpZD15dGFjaHlvbg--/https://d29szjachogqwa.cloudfront.net/images/user-uploaded/33._central_perk_from_friends_new_york_city_-_edited.jpg',
    description: 'Step into the world of FRIENDS™ and explore iconic sets, including Rachel and Monica\'s apartment and Central Perk.',
    highlights: [
      'Sit on the orange couch at Central Perk',
      'Recreate the "Pivot!" scene',
      'See original costumes and props',
      'Shop at the Friends Experience Store'
    ],
    duration: '1 hour',
    openingHours: 'Daily: 10:00 - 19:00'
  },
  {
    id: 'ny-statue-cruise',
    name: 'Statue Of Liberty And Ellis Island Cruise, New York',
    location: 'New York, USA',
    city: 'New York',
    category: 'Cruise',
    rating: 4.5,
    reviewsCount: 36000,
    price: 24,
    imageUrl: 'https://assets.cityexperiences.com/wp-content/uploads/2021/07/New-York-Statue-of-Liberty.jpg',
    description: 'Enjoy a scenic cruise to the Statue of Liberty and Ellis Island, America\'s most famous landmarks.',
    highlights: [
      'Close-up views of the Statue of Liberty',
      'Visit the Ellis Island Immigration Museum',
      'Self-guided audio tour included',
      'Breathtaking views of the Manhattan harbor'
    ],
    duration: '1 hour',
    openingHours: 'Daily: 09:00 - 17:00'
  },
  {
    id: 'ny-empire-state',
    name: 'Empire State Building Tickets, New York',
    location: 'New York, USA',
    city: 'New York',
    category: 'Landmark',
    rating: 4.8,
    reviewsCount: 3200,
    price: 44,
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/d/df/NYC_Empire_State_Building.jpg?utm_source=commons.wikimedia.org&utm_campaign=index&utm_content=original',
    description: 'Visit the world\'s most famous building and experience its 86th-floor open-air observatory.',
    highlights: [
      'Stunning 360-degree open-air views',
      'High-speed elevators with multimedia show',
      'Museum-quality exhibits on the 2nd and 80th floors',
      'Iconic Art Deco architecture'
    ],
    duration: '2 hours - 3 hours',
    openingHours: 'Daily: 09:00 - 24:00'
  },
  {
    id: 'dubai-burj',
    name: 'Burj Khalifa',
    location: 'Dubai, UAE',
    city: 'Dubai',
    category: 'Landmark',
    rating: 4.9,
    reviewsCount: 85000,
    price: 45,
    imageUrl: 'https://climatecontrol.imiplc.com/_next/image?url=https%3A%2F%2Fcdn.tessa.imihy.eimed-project.de%2F621346%2FWeb_Header%2FBurj_Khalifa_Tower.webp&w=3840&q=75',
    isPopular: true,
    galleryUrls: [
      'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&q=85&w=1200',
      'https://images.unsplash.com/photo-1549490349-8643362247b5?auto=format&fit=crop&q=85&w=1200',
      'https://images.unsplash.com/photo-1489516408517-0c0a15662682?auto=format&fit=crop&q=85&w=1200',
      'https://images.unsplash.com/photo-1518104593124-ac2e82a5eb9d?auto=format&fit=crop&q=85&w=1200',
      'https://images.unsplash.com/photo-1580674205030-cf0fcf360089e?auto=format&fit=crop&q=85&w=1200'
    ],
  },
  {
    id: 'swiss-titlis',
    name: 'Mount Titlis Cable Car',
    location: 'Engelberg, Switzerland',
    city: 'Switzerland',
    category: 'Nature',
    rating: 4.9,
    reviewsCount: 12500,
    price: 92,
    imageUrl: 'https://thumbs.dreamstime.com/b/engelberg-switzerland-december-outside-views-infrastructure-ski-resort-december-popular-66304968.jpg?w=768',
    isPopular: true,
    description: 'Experience the ultimate winter wonderland at Mount Titlis. Ride the worlds first revolving cable car, Titlis Rotair, to the summit at 3,020 meters. Walk across the Cliff Walk, Europes highest suspension bridge, and explore the Glacier Cave.',
    highlights: [
      'Ride the Titlis Rotair revolving cable car',
      'Walk across the Cliff Walk suspension bridge',
      'Explore the magical Glacier Cave',
      'Stunning 360-degree views of the Swiss Alps'
    ],
    included: [
      'Round-trip cable car ride from Engelberg',
      'Access to Titlis Cliff Walk',
      'Entrance to Glacier Cave',
      'Ice Flyer chairlift (seasonal)'
    ],
    knowBeforeYouGo: [
      'Dress warmly even in summer.',
      'Average temperature at the summit is around 0°C.',
      'The experience takes at least 4-5 hours.',
      'Check the weather forecast before booking.'
    ],
    whatToBring: [
      'Warm jacket and layers',
      'Sunglasses and sunscreen',
      'Sturdy shoes',
      'Camera'
    ],
    duration: '5-6 hours',
    galleryUrls: [
      'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&q=85&w=1200',
      'https://images.unsplash.com/photo-1517400508447-f8dd518b86db?auto=format&fit=crop&q=85&w=1200',
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=85&w=1200'
    ],
    cancellationPolicy: 'Free cancellation up to 48 hours in advance',
  },
  {
    id: 'ams-heineken',
    name: 'Heineken Experience: Standard Entrance',
    location: 'Amsterdam, Netherlands',
    city: 'Amsterdam',
    category: 'Fun',
    rating: 4.6,
    reviewsCount: 12500,
    price: 23,
    imageUrl: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2f/b9/02/65/heineken-experience-in.jpg?w=900&h=-1&s=1',
    isPopular: true,
  },
  {
    id: 'ams-canal',
    name: '1-Hour Amsterdam Canal Cruise',
    location: 'Amsterdam, Netherlands',
    city: 'Amsterdam',
    category: 'Cruise',
    rating: 4.7,
    reviewsCount: 25000,
    price: 16,
    imageUrl: 'https://staybook.in/_next/image?url=https%3A%2F%2Fcdn-imgix.headout.com%2Fmedia%2Fimages%2Fffed293228727b6542b6c20a637fd237-9731-amsterdam-1-hour-sightseeing-cruise-in-amsterdam-11.jpg%3Fw%3D1120%26h%3D630%26crop%3Dfaces%26auto%3Dcompress%252Cformat%26fit%3Dmin&w=1080&q=75',
    isPopular: true,
  },
  {
    id: 'ams-keukenhof',
    name: 'Keukenhof Gardens Entrance Ticket',
    location: 'Lisse, Netherlands',
    city: 'Amsterdam',
    category: 'Nature',
    rating: 4.8,
    reviewsCount: 32000,
    price: 19.50,
    imageUrl: 'https://denhaag.com/sites/default/files/styles/og_image/public/2020-01/Keukenhof.jpg?h=3ec75680&itok=v2pdc0tg',
    isPopular: true,
  },
  {
    id: 'ams-madame-tussauds',
    name: 'Madame Tussauds Amsterdam',
    location: 'Amsterdam, Netherlands',
    city: 'Amsterdam',
    category: 'Entertainment',
    rating: 4.5,
    reviewsCount: 9800,
    price: 24,
    imageUrl: 'https://media1.thrillophilia.com/filestore/nfkvecfczbso18qu73ubc0sdor8w_shutterstock_1917972083.jpg?w=400&dpr=2',
    isPopular: true,
  },
  {
    id: 'ams-efteling',
    name: 'Efteling Theme Park Ticket',
    location: 'Kaatsheuvel, Amsterdam Surroundings',
    city: 'Amsterdam',
    category: 'Fun',
    rating: 4.9,
    reviewsCount: 45000,
    price: 48,
    imageUrl: 'https://staybook.in/_next/image?url=https%3A%2F%2Fcdn-imgix.headout.com%2Fmedia%2Fimages%2F6bdeae1f5858869e1c1b2af9b3d19c63-3128-amsterdam-priority-admission-ticket-to-efteling-theme-park-01.jpg%3Fw%3D1120%26h%3D630%26crop%3Dfaces%26auto%3Dcompress%252Cformat%26fit%3Dmin&w=1080&q=75',
    isPopular: true,
  },
  {
    id: 'paris-orsay',
    name: 'Musée d\'Orsay: Skip-the-line Admission',
    location: 'Paris, France',
    city: 'Paris',
    category: 'Museum',
    rating: 4.8,
    reviewsCount: 14200,
    price: 16,
    imageUrl: 'https://www.hotellesdamesdupantheon.com/uploads/images/monuments/musee.jpg',
    isPopular: true,
    description: 'Breathtaking collections of Impressionist and Post-Impressionist masterpieces housed in a grand former railway station.',
    highlights: [
      'See Van Gogh\'s self-portraits',
      'Admire Monet\'s Blue Water Lilies',
      'Explore the stunning Beaux-Arts station architecture',
      'Gaze through the iconic clock windows'
    ],
    included: [
      'Skip-the-line admission ticket',
      'Access to permanent collections',
      'Access to temporary exhibitions'
    ],
    duration: '2-3 hours',
    openingHours: 'Tue-Sun: 09:30 - 18:00 (Thu until 21:45)'
  },
  {
    id: 'par-disney',
    name: 'Disneyland® Paris: 1-Day Ticket',
    location: 'Marne-la-Vallée, France',
    city: 'Paris',
    category: 'Fun',
    rating: 4.7,
    reviewsCount: 85400,
    price: 62,
    imageUrl: 'https://news.disneylandparis.com//app/uploads/2022/04/N037009-scaled.jpg',
    isPopular: true,
    description: 'Experience the magic of Disney with world-class rides, spectacular parades, and meet-and-greets with your favorite characters.',
    highlights: [
      'Explore Disneyland Park and Walt Disney Studios',
      'Ride the iconic Big Thunder Mountain',
      'Watch the magical Disney Illuminations show',
      'Meet Mickey Mouse and his friends'
    ],
    included: [
      '1-day admission ticket',
      'Access to attractions and shows'
    ],
    duration: 'Full day',
    openingHours: 'Daily: 09:30 - 21:00'
  },
  {
    id: 'par-eiffel',
    name: 'Eiffel Tower: Second Floor or Summit Access',
    location: 'Paris, France',
    city: 'Paris',
    category: 'Landmark',
    rating: 4.8,
    reviewsCount: 125000,
    price: 18,
    discountPrice: 14,
    imageUrl: 'https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    isPopular: true,
    description: 'The global icon of France and one of the most recognizable structures in the world, offering unparalleled views of Paris.',
    highlights: [
      'Ascend to the second floor for panoramic views',
      'Optional summit access for the highest vantage point',
      'Learn about Gustave Eiffel\'s masterpiece',
      'Walk on the transparent glass floor'
    ],
    included: [
      'Admission ticket',
      'Elevator access'
    ],
    duration: '2 hours',
    openingHours: 'Daily: 09:30 - 23:45'
  },
  {
    id: 'par-sainte-pantheon',
    name: 'Sainte-Chapelle, Conciergerie & Panthéon Combo',
    location: 'Paris, France',
    city: 'Paris',
    category: 'History',
    rating: 4.9,
    reviewsCount: 22000,
    price: 35,
    imageUrl: 'https://www.franceguide.info/wp-content/uploads/sites/18/paris-saint-chapelle-stained-glass-hd.jpg',
    isPopular: true,
    description: 'Explore three of Paris\'s most significant historical monuments with this combined experience.',
    highlights: [
      'Marvel at the stained glass of Sainte-Chapelle',
      'Visit Marie Antoinette\'s prison at the Conciergerie',
      'Pay respects to legends at the Panthéon',
      'See Foucault\'s Pendulum in action'
    ],
    included: [
      'Combined admission ticket',
      'Digital audio guides'
    ],
    duration: '4-5 hours',
    openingHours: 'Varies by monument (typically 10:00 - 18:00)'
  },
  {
    id: 'par-orangerie',
    name: 'Musée de l\'Orangerie: Water Lilies Ticket',
    location: 'Paris, France',
    city: 'Paris',
    category: 'Museum',
    rating: 4.9,
    reviewsCount: 12000,
    price: 13,
    imageUrl: 'https://staybook.in/_next/image?url=https%3A%2F%2Fcdn-imgix.headout.com%2Fmedia%2Fimages%2F1cf8859b431abf187a6f11b0fc8a65fe-8002-Paris-TicketstoOrangerieMuseum-07.jpeg%3Fw%3D1120%26h%3D630%26crop%3Dfaces%26auto%3Dcompress%252Cformat%26fit%3Dmin&w=1080&q=75',
    isPopular: true,
    description: 'The permanent home of Claude Monet\'s monumental Water Lilies series, located in a former orangery.',
    highlights: [
      'Immerse yourself in Monet\'s circular galleries',
      'See masterpieces from the Walter-Guillaume Collection',
      'View works by Picasso, Matisse, and Renoir',
      'Enjoy the tranquility of the Tuileries Garden'
    ],
    included: [
      'Admission ticket',
      'Access to permanent and temporary exhibitions'
    ],
    duration: '1.5 hours',
    openingHours: 'Wed-Mon: 09:00 - 18:00 (Closed Tuesdays)'
  },
  {
    id: 'par-rodin',
    name: 'Musée Rodin: Entrance Ticket',
    location: 'Paris, France',
    city: 'Paris',
    category: 'Museum',
    rating: 4.8,
    reviewsCount: 15000,
    price: 14,
    imageUrl: 'https://accidentallywesanderson.com/wp-content/uploads/2020/04/Musee_Rodin.jpeg',
    isPopular: true,
    description: 'Dedicated to the sculpture of Auguste Rodin, housed in the beautiful Hôtel Biron and its magnificent gardens.',
    highlights: [
      'See "The Thinker" in the sculpture garden',
      'Explore "The Gates of Hell"',
      'Visit the artist\'s former studio',
      'Wander through the peaceful rose gardens'
    ],
    included: [
      'Admission to the museum and gardens'
    ],
    duration: '2 hours',
    openingHours: 'Tue-Sun: 10:00 - 18:30 (Closed Mondays)'
  },
  {
    id: 'par-aquarium',
    name: 'Aquarium de Paris: Entrance Ticket',
    location: 'Paris, France',
    city: 'Paris',
    category: 'Entertainment',
    rating: 4.5,
    reviewsCount: 8200,
    price: 26,
    imageUrl: 'https://kimini.fr/wp-content/uploads/2024/07/aquarium-de-paris-1.webp',
    isPopular: true,
    description: 'Explore the wonders of the ocean in the heart of Paris, featuring the largest shark tank in France.',
    highlights: [
      'See over 10,000 fish and invertebrates',
      'Walk through the shark tunnel',
      'Touch pools and interactive workshops',
      'Located directly opposite the Eiffel Tower'
    ],
    included: [
      'Admission ticket',
      'Access to all exhibits and shows'
    ],
    duration: '2 hours',
    openingHours: 'Daily: 10:00 - 19:00'
  },
  {
    id: 'ams-moco',
    name: 'Moco Museum Amsterdam',
    location: 'Amsterdam, Netherlands',
    city: 'Amsterdam',
    category: 'Museum',
    rating: 4.7,
    reviewsCount: 8500,
    price: 19.50,
    imageUrl: 'https://dutchwannabe.com/wp-content/uploads/2019/05/moco-museum.jpg',
    isPopular: true,
  },
  {
    id: 'ams-nemo',
    name: 'NEMO Science Museum',
    location: 'Amsterdam, Netherlands',
    city: 'Amsterdam',
    category: 'Museum',
    rating: 4.6,
    reviewsCount: 11000,
    price: 17.50,
    imageUrl: 'https://www.amsterdamtips.com/news/wp-content/uploads/2019/01/nemo-science-museum.jpg',
    isPopular: true,
  },
  {
    id: 'ams-palace',
    name: 'Royal Palace Amsterdam',
    location: 'Amsterdam, Netherlands',
    city: 'Amsterdam',
    category: 'Landmark',
    rating: 4.7,
    reviewsCount: 9200,
    price: 12.50,
    imageUrl: 'https://www.historyhit.com/app/uploads/2020/11/Royal-Palace.jpg',
    isPopular: true,
  },
  {
    id: 'ams-anne-frank',
    name: 'Anne Frank House',
    location: 'Amsterdam, Netherlands',
    city: 'Amsterdam',
    category: 'History',
    rating: 4.9,
    reviewsCount: 45000,
    price: 16,
    imageUrl: 'https://media.cntraveler.com/photos/55e0aedcf073f4db6484912a/16:9/w_2560%2Cc_limit/anne-frank-house-cr-alamy.jpg',
    isPopular: true,
  },
  {
    id: 'lis-oceanarium',
    name: 'Lisbon Oceanarium: Entry Ticket',
    location: 'Lisbon, Portugal',
    city: 'Lisbon',
    category: 'Nature',
    rating: 4.8,
    reviewsCount: 32100,
    price: 25,
    imageUrl: 'https://d3w13n53foase7.cloudfront.net/medium_https%3A//live.staticflickr.com/8806/16505924243_9294b1f883_b.jpg_image.jpg',
    isPopular: true,
    description: 'Explore the spectacular Lisbon Oceanarium, one of the world’s largest and most acclaimed aquariums, featuring a central tank with diverse global marine life.',
    highlights: [
      'See thousands of marine species across 4 habitats',
      'Marvel at the giant, 5 million-liter central aquarium tank',
      'Observe sea otters, penguins, and fascinating sunfish',
      'Explore temporary interactive exhibits'
    ],
    included: [
      'Admission ticket to the permanent exhibition',
      'Access to global habitats and oceans'
    ],
    duration: '2-3 hours',
    openingHours: 'Daily: 10:00 - 20:00'
  },
  {
    id: 'ath-acropolis',
    name: 'Acropolis of Athens: Fast Track Ticket',
    location: 'Athens, Greece',
    city: 'Athens',
    category: 'History',
    rating: 4.8,
    reviewsCount: 48900,
    price: 20,
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/6/65/Parthenon_east_side_Acropolis_Athens%2C_Greece.jpg',
    isPopular: true,
    description: 'Travel back in time to Ancient Greece and explore the world-famous Acropolis hill, featuring the Parthenon, the Temple of Athena Nike, and spectacular views of Athens.',
    highlights: [
      'Skip the line to explore the world-famous Parthenon',
      'Discover the Temple of Athena Nike and Erechtheion',
      'Enjoy majestic 360-degree views and photography of Athens',
      'Learn about Hellenic history with an optional audio guide'
    ],
    included: [
      'Skip-the-line entrance ticket to the Acropolis',
      'Access to the surrounding archaeological sites'
    ],
    duration: '2 hours',
    openingHours: 'Daily: 08:00 - 20:00'
  },
  {
    id: 'flo-accademia',
    name: 'Accademia Gallery Florence: Skip-the-line Ticket',
    location: 'Florence, Italy',
    city: 'Florence',
    category: 'Arts',
    rating: 4.8,
    reviewsCount: 22400,
    price: 21,
    imageUrl: 'https://www.througheternity.com/wp-content/uploads/2025/10/florence_accademia_gallery_3-768x614.jpg',
    isPopular: true,
    description: "Marvel at Michelangelo's iconic masterwork, David, along with other iconic Renaissance sculptures and paintings at the renowned Accademia Gallery in Florence.",
    highlights: [
      'Skip-the-line fast-track entry to Accademia Gallery',
      'Admire Michelangelo\'s original "David" sculpture up close',
      'Discover masterpieces by Botticelli and Ghirlandaio',
      'See unfinished works including Michelangelo\'s "Slaves"'
    ],
    included: [
      'Fast-track admission ticket',
      'Access to all temporary exhibitions'
    ],
    duration: '1.5 hours',
    openingHours: 'Tue-Sun: 08:15 - 18:50 (Closed Mondays)'
  },
  {
    id: 'dxb-miracle',
    name: 'Dubai Miracle Garden Admission Ticket',
    location: 'Dubai, UAE',
    city: 'Dubai',
    category: 'Nature',
    rating: 4.7,
    reviewsCount: 16500,
    price: 22,
    imageUrl: 'https://i.ytimg.com/vi/nEjr5xlZ6OU/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLD2KQGGgdRoN9A8acRIer5bZonamg',
    isPopular: true,
    description: 'Explore the Dubai Miracle Garden, the world’s largest natural flower garden, boasting over 150 million blooming flowers arranged in colorful, breathtaking structures.',
    highlights: [
      'Explore 150+ million blooming flowers in full color',
      'Marvel at the flower-studded life-sized Emirates A380 display',
      'Walk under romantic floral tunnels and hearts arches',
      'Enjoy whimsical structures and cartoon-inspired characters'
    ],
    included: [
      'General admission ticket to Dubai Miracle Garden'
    ],
    duration: '2-3 hours',
    openingHours: 'Daily: 09:00 - 21:00'
  },
  {
    id: 'sin-zoo',
    name: 'Singapore Zoo Tickets with Tram Ride',
    location: 'Mandai Wildlife Reserve, Singapore',
    city: 'Singapore',
    category: 'Nature',
    rating: 4.8,
    reviewsCount: 19800,
    price: 32,
    imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKKB32azMHznB_lzpBBW9Zh5C4Cghk8E5SLA&s',
    isPopular: true,
    description: 'Visit the world-acclaimed open-concept Singapore Zoo, featuring lush rainforest environments housing over 4,200 animals of 300 diverse species.',
    highlights: [
      'Explore raw open-concept habitats like Fragile Forest and Wild Africa',
      'Enjoy a relaxed and informative unlimited tram ride',
      'Witness adorable live animal shows and splash play zones',
      'See endangered species like white tigers and orangutans'
    ],
    included: [
      'One-day admission ticket to Singapore Zoo',
      'Unlimited standard hop-on tram ride with audio'
    ],
    duration: '3-4 hours',
    openingHours: 'Daily: 08:30 - 18:00'
  },
  {
    id: 'ny-summit',
    name: 'SUMMIT One Vanderbilt Admission Ticket',
    location: 'New York, USA',
    city: 'New York',
    category: 'Observation Deck',
    rating: 4.8,
    reviewsCount: 26300,
    price: 43,
    imageUrl: 'https://antisocialtourist.com/wp-content/uploads/2023/01/What-to-Expect-at-SUMMIT-One-Vanderbilt-Tickets.jpg',
    isPopular: true,
    description: 'Step into a multi-sensory immersive experience designed by Kenzo Digital that completely redefines the New York City viewing platform.',
    highlights: [
      'Walk through the multi-level "Air" mirror installation',
      'View unparalleled, epic vistas of Manhattan',
      'Play with floating silver balloons in a glass-walled room',
      'Stand over Madison Avenue on glass-ledges'
    ],
    included: [
      'Timed entry admission ticket',
      'Access to all immersive observation decks'
    ],
    duration: '2 hours',
    openingHours: 'Daily: 09:00 - 00:00'
  },
];

export const DESTINATIONS: Destination[] = [
  {
    id: 'tokyo',
    name: 'Tokyo, Japan',
    attractionsCount: 321,
    imageUrl: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 'osaka',
    name: 'Osaka, Japan',
    attractionsCount: 148,
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/Osaka_Castle_03bs3200.jpg/1280px-Osaka_Castle_03bs3200.jpg',
  },
  {
    id: 'paris',
    name: 'Paris, France',
    attractionsCount: 457,
    imageUrl: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'rome',
    name: 'Rome, Italy',
    attractionsCount: 283,
    imageUrl: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'istanbul',
    name: 'Istanbul, Turkey',
    attractionsCount: 194,
    imageUrl: 'https://losadventuros.com/wp-content/uploads/2023/03/14-16-places-to-see-in-istanbul-2-1024x682.jpg',
  },
  {
    id: 'nyc',
    name: 'New York City, USA',
    attractionsCount: 512,
    imageUrl: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'london',
    name: 'London, UK',
    attractionsCount: 390,
    imageUrl: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&q=80&w=1200',
  },
  {
    id: 'barcelona',
    name: 'Barcelona, Spain',
    attractionsCount: 216,
    imageUrl: 'https://images.unsplash.com/photo-1511527661048-7fe73d85e9a4?auto=format&fit=crop&q=80&w=1200',
  },
  {
    id: 'amsterdam',
    name: 'Amsterdam, Netherlands',
    attractionsCount: 175,
    imageUrl: 'https://i.natgeofe.com/n/e2f26e6b-8255-4391-84be-4b0919d4c0d8/20240626-0349-Jonathan%20Irish-NGCW-CITI-AA-Amsterdam-_7R52855.jpg',
  },
  {
    id: 'lisbon',
    name: 'Lisbon, Portugal',
    attractionsCount: 124,
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/Lisboa_-_Portugal_%2852597836992%29.jpg/330px-Lisboa_-_Portugal_%2852597836992%29.jpg',
  },
  {
    id: 'dubai',
    name: 'Dubai, UAE',
    attractionsCount: 156,
    imageUrl: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&q=80&w=1200',
  },
  {
    id: 'singapore',
    name: 'Singapore',
    attractionsCount: 199,
    imageUrl: 'https://images.unsplash.com/photo-1525596662741-e94ff9f26de1?auto=format&fit=crop&q=80&w=1200',
  },
  {
    id: 'sydney',
    name: 'Sydney, Australia',
    attractionsCount: 142,
    imageUrl: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&q=80&w=1200',
  },
  {
    id: 'bangkok',
    name: 'Bangkok, Thailand',
    attractionsCount: 234,
    imageUrl: 'https://images.unsplash.com/photo-1505003005845-8167f9dbe4e4?auto=format&fit=crop&q=80&w=1200',
  },
  {
    id: 'zurich',
    name: 'Zurich, Switzerland',
    attractionsCount: 86,
    imageUrl: 'https://images.unsplash.com/photo-1515488764276-beab7607c1e6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
  }
];
