import { DestinationHighlight, BlogPost, UserReview } from '../types';

export const DESTINATION_HIGHLIGHTS: DestinationHighlight[] = [
  {
    id: 'dest-himachal',
    name: 'Himachal Pradesh',
    tagline: 'Snow-Capped Peaks, Pine Valleys & Adrenaline Escapes',
    region: 'North India (Western Himalayas)',
    image: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=1200&q=80',
    overview:
      'Known as the "Abode of Snow", Himachal Pradesh is Indoworld\'s flagship promotion destination since 2008. From colonial promenades in Shimla to the bohemian alpine vibe of Old Manali, high altitude desert moonscapes in Spiti, and the spiritual tranquility of Dharamshala, Himachal offers year-round escapades directly accessible by road from Delhi NCR.',
    bestTimeToVisit: 'March to June (Pleasant weather & flora) / December to February (Heavy snowfall & skiing)',
    topAttractions: [
      'Solang Valley & Atal Tunnel into Sissu Lahaul',
      'Rohtang Pass (13,058 ft snow crest)',
      'The Ridge & Mall Road, Shimla',
      'Hadimba Temple & Vashisht Hot Springs, Manali',
      'Kangra Fort & Dalai Lama Temple, McLeod Ganj',
      'Chitkul & Sangla Valley (Kinnaur border)',
    ],
    routeFromDelhiNCR:
      'Fast NH-44 corridor via Chandigarh & Himalayan Expressway. Vaishali to Shimla: ~345 km (7-8 hrs); Vaishali to Manali: ~530 km (11-12 hrs via Kiratpur-Nerchowk 4-lane). Direct pickup available from your doorstep in Vaishali/Ghaziabad.',
    popularFood: ['Himachali Siddu with Ghee', 'Kullu Trout Fish', 'Madra Curry', 'Tudkiya Bhath', 'Pahari Chai'],
    recommendedPackageIds: ['himachal-manali-shimla'],
    curatedTips: [
      'Pre-book Atal Tunnel and Solang excursions early during peak summer to bypass tourist convoy congestion.',
      'Always carry motion-sickness medication for the ghat curves between Swarghat and Mandi.',
      'Check local green cess permits if taking private vehicles; Indoworld cabs include all state taxes.',
    ],
  },
  {
    id: 'dest-uttarakhand',
    name: 'Uttarakhand (Devbhoomi & Char Dham)',
    tagline: 'Holy Ganga Confluences, Glacial Shrines & Garhwal Heights',
    region: 'North India (Garhwal & Kumaon)',
    image: 'https://images.unsplash.com/photo-1569949381669-ecf31ae8e613?auto=format&fit=crop&w=1200&q=80',
    overview:
      'Devbhoomi Uttarakhand holds India’s most revered spiritual sanctuaries—the sacred Char Dham (Yamunotri, Gangotri, Kedarnath, Badrinath)—alongside pristine hill retreats like Mussoorie, Nainital, and Rishikesh. Indoworld Tourism provides certified Yatra biometric registration, helicopter shuttle coordination, and seasoned mountain drivers for stress-free pilgrimages.',
    bestTimeToVisit: 'May to June & September to November for Char Dham; All year round for Rishikesh & Mussoorie',
    topAttractions: [
      'Shri Kedarnath Jyotirlinga & Mandakini Valley',
      'Shri Badrinath Temple & Mana Village',
      'Triveni Ghat & Parmarth Niketan Ganga Aarti, Rishikesh',
      'Naini Lake & Snow View Point, Nainital',
      'Valley of Flowers National Park (UNESCO World Heritage)',
      'Auli Ski Slopes & 360° Nanda Devi View',
    ],
    routeFromDelhiNCR:
      'Delhi-Meerut Expressway right from Vaishali/UP border cuts transit time to Haridwar down to just 3.5 hrs (~205 km) and Rishikesh to 4.5 hrs. Rishikesh-Badrinath All-Weather Highway connects onward to high Garhwal.',
    popularFood: ['Garhwali Kafuli', 'Chainsoo (Black Gram Stew)', 'Aloo ke Gutke', 'Jhangore ki Kheer', 'Singodi sweet'],
    recommendedPackageIds: ['char-dham-uttarakhand'],
    curatedTips: [
      'Compulsory state biometric registration is required for Char Dham; our Vaishali desk takes care of this prior to departure.',
      'Trek to Kedarnath requires warm thermal layers even in peak June due to unpredictable high-altitude weather.',
      'Book helicopter tickets through authorized IRCTC portal only; beware of fraudulent independent websites.',
    ],
  },
  {
    id: 'dest-rajasthan',
    name: 'Royal Rajasthan',
    tagline: 'Golden Sand Dunes, Palatial Fortresses & Regal Heritage',
    region: 'North-West India',
    image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1200&q=80',
    overview:
      'Step into the land of Maharajas where living palaces, desert fortresses, and vibrant folk traditions converge. From the pink courtyards of Jaipur and blue alleys of Jodhpur to the romantic mirrored waters of Lake Pichola in Udaipur and the golden dunes of Jaisalmer, Indoworld crafts bespoke luxury and heritage itineraries with private chauffeurs.',
    bestTimeToVisit: 'October to March (Crisp cool desert winters & royal festivals)',
    topAttractions: [
      'Amber Palace, Hawa Mahal & City Palace (Jaipur)',
      'Mehrangarh Fort & Jaswant Thada (Jodhpur)',
      'Lake Pichola Sunset Boat Cruise & Jagmandir (Udaipur)',
      'Sam Sand Dunes Camel Safari & Desert Camps (Jaisalmer)',
      'Sacred Brahma Temple & Ghats (Pushkar)',
      'Ranthambore National Park Tiger Safari',
    ],
    routeFromDelhiNCR:
      'Delhi-Mumbai Expressway (NE4) allows direct swift travel from NCR to Jaipur in under 3.5 hours (~260 km). Direct express trains and domestic flights from IGI Airport connect onwards to Jodhpur and Udaipur.',
    popularFood: ['Dal Baati Churma', 'Laal Maas', 'Gatte ki Sabzi', 'Ker Sangri', 'Pyaaz Kachori & Ghewar'],
    recommendedPackageIds: ['rajasthan-royal-heritage'],
    curatedTips: [
      'Opt for an early morning visit to Amber Fort to beat afternoon lines and enjoy gentle lighting on the Maota Lake.',
      'Stay at least one night in a verified heritage haveli for an authentic royal hospitality experience.',
      'Respect monument photography rules; hire official government-licensed guides arranged by our travel desk.',
    ],
  },
  {
    id: 'dest-kerala',
    name: 'God’s Own Country (Kerala)',
    tagline: 'Emerald Backwaters, Misty Tea Hills & Ayurvedic Rejuvenation',
    region: 'South India',
    image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1200&q=80',
    overview:
      'A tropical wonderland bordered by the Arabian Sea and the Western Ghats, Kerala captivates travelers with serene palm-fringed lagoons, sprawling green tea gardens of Munnar, wildlife reserves in Periyar, and world-class traditional Ayurvedic wellness retreats. Our private houseboat charters in Alleppey guarantee five-star onboard chef service.',
    bestTimeToVisit: 'September to March (Pleasant tropical weather) / June to August (Monsoon Ayurvedic treatments)',
    topAttractions: [
      'Alleppey & Kumarakom Backwaters Houseboat Cruise',
      'Munnar Tea Plantations & Eravikulam National Park',
      'Periyar Tiger Reserve & Spice Safaris (Thekkady)',
      'Fort Kochi Chinese Fishing Nets & Jewish Synagogue',
      'Athirappilly Waterfalls ("Niagara of India")',
      'Kovalam & Varkala Cliff Beaches',
    ],
    routeFromDelhiNCR:
      'Direct nonstop flights operate daily from IGI Airport Delhi to Cochin International Airport (COK) and Trivandrum (TRV) in approx. 3 hrs 15 mins. Indoworld handles seamless private cab pickups directly from Cochin terminal.',
    popularFood: ['Kerala Sadya on Banana Leaf', 'Karimeen Pollichathu', 'Appam with Stew', 'Malabar Biryani', 'Banana Chips'],
    recommendedPackageIds: ['kerala-backwaters-munnar'],
    curatedTips: [
      'Confirm air-conditioned houseboat bedrooms operate on full-time generators if traveling in warmer months.',
      'Buy authentic spices like green cardamom and black pepper directly from registered spice garden cooperatives in Kumily.',
      'Experience an evening Kathakali and Kalaripayattu performance in Cochin or Thekkady.',
    ],
  },
  {
    id: 'dest-andaman-asia',
    name: 'Andaman & Asian Escapes',
    tagline: 'Pristine Coral Atolls, Dubai Skylines & Tropical Shores',
    region: 'Island Territories & Asian Subcontinent',
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=80',
    overview:
      'From the azure waters and scuba diving paradises of Havelock & Neil Island in the Andaman archipelago to the futuristic luxury of Dubai, Abu Dhabi, and the cultural islands of Bali and Thailand. Indoworld Tourism has been a pioneer in Asian subcontinent tours for over 15 years, providing full visa assistance and international ticketing.',
    bestTimeToVisit: 'October to May for Andaman & Southeast Asia; November to March for Dubai & UAE',
    topAttractions: [
      'Radhanagar Beach & Elephant Beach Water Sports (Havelock)',
      'Historic Cellular Jail Light & Sound Show (Port Blair)',
      'Burj Khalifa At The Top & Dubai Fountain',
      'Desert Safari with BBQ Buffet & Dune Bashing (Dubai)',
      'Sheikh Zayed Grand Mosque (Abu Dhabi)',
      'Uluwatu Temple & Nusa Penida Island (Bali)',
    ],
    routeFromDelhiNCR:
      'Direct and 1-stop flights from Delhi IGI Airport to Port Blair (IXZ) in ~3.5-5 hrs. Nonstop flights to Dubai (DXB) in 3 hrs 40 mins. Complete visa verification and flight booking handled at our Vaishali office.',
    popularFood: ['Fresh Island Seafood Curries', 'Emirati Shawarma & Mandi', 'Nasi Goreng', 'Pad Thai', 'Baklava'],
    recommendedPackageIds: ['dubai-luxury-escapade'],
    curatedTips: [
      'Inter-island private catamaran ferries (Makruzz / Nautika) in Andaman must be reserved at least 3 weeks in advance.',
      'Ensure your passport has a minimum 6 months validity from the travel date for international holidays.',
      'Carry international multi-plug adapters and exchange initial forex or activate zero-forex cards before departure.',
    ],
  },
];

export const INITIAL_BLOG_POSTS: BlogPost[] = [
  {
    id: 'blog-mountain-guide',
    title: 'Himachal & Uttarakhand Travel Guide: Essential Packing, Mountain Driving & Permit Tips from Delhi NCR',
    slug: 'himachal-uttarakhand-travel-guide-from-delhi-ncr',
    category: 'Travel Tips',
    readTime: '5 min read',
    publishDate: 'February 28, 2025',
    author: 'Sanjay Rawat (Lead Tour Consultant, Indoworld Vaishali)',
    excerpt:
      'Planning a road trip from Vaishali or Delhi NCR to the hills? Here is your complete expert checklist for luggage, high-altitude permits, scenic highway routes, and vehicle precautions.',
    coverImage: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=1000&q=80',
    tags: ['Himachal', 'Uttarakhand', 'Road Trip', 'Travel Tips', 'Delhi NCR'],
    keyHighlights: [
      'Kiratpur-Manali 4-lane expressway cuts driving time by nearly 3 hours',
      'Mandatory Yatra biometric registration for Kedarnath & Badrinath',
      'Layered thermal clothing advice for unexpected high-altitude rain & snow',
    ],
    content: [
      {
        heading: '1. Smooth Route Planning from Delhi NCR',
        body: 'Leaving from Vaishali, Indirapuram, or East Delhi gives you a head start onto the Delhi-Meerut Expressway or GT Karnal Road (NH-44). For Himachal, the new Kiratpur-Nerchowk bypass and four-lane tunnel stretches have drastically reduced transit times between Chandigarh and Kullu. For Uttarakhand, the expressway to Meerut bypass allows you to touch Haridwar in just 3.5 hours. We always advise starting before 5:30 AM to bypass Delhi border truck freight queues.',
      },
      {
        heading: '2. High-Altitude Permits & Registrations',
        body: 'While general travel to Shimla, Manali, and Mussoorie does not require special entry permits, taking private tourist vehicles across Rohtang Pass requires an NGT green permit issued by HP Tourism. For Uttarakhand Char Dham (Kedarnath, Badrinath, Gangotri, Yamunotri), biometric Yatra registration is compulsory by state law. If you book through Indoworld Tourism, our Vaishali travel desk completes this registration on your behalf prior to departure.',
      },
      {
        heading: '3. Mountain Driving Discipline & Vehicle Health',
        body: 'If you are self-driving or choosing an outstation cab, ensure brake pads, coolant, tire treads, and wipers are in pristine condition. In the hills, always give right of way to ascending vehicles on narrow bends, avoid overtaking on blind curves, and rely on engine braking (lower gear) rather than continuous foot braking when descending ghats.',
      },
      {
        heading: '4. The Essential Mountain Packing Checklist',
        body: 'Even in summer (May-June), hill temperatures plummet rapidly after sunset. Pack a windproof fleece jacket, comfortable waterproof trekking shoes with solid grip, polarized sunglasses to protect against snow glare, a basic medical kit with motion sickness tablets (Avomine/Ondansetron), and power banks since cold temperatures deplete phone batteries twice as fast.',
      },
    ],
  },
  {
    id: 'blog-vaishali-local-attractions',
    title: 'Local Attractions & Heritage Near Vaishali & Ghaziabad: Top Weekend Spots for Families',
    slug: 'local-attractions-ghaziabad-vaishali-weekend-guide',
    category: 'Local Attractions',
    readTime: '4 min read',
    publishDate: 'February 15, 2025',
    author: 'Pooja Verma (Senior Travel Specialist)',
    excerpt:
      'Living in or visiting Sector 1, Vaishali? Discover peaceful eco-parks, waterparks, lakeside trails, and heritage connections just 10 to 45 minutes from Ansal Plaza.',
    coverImage: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1000&q=80',
    tags: ['Vaishali', 'Ghaziabad', 'Local Attractions', 'Family Fun', 'NCR Weekend'],
    keyHighlights: [
      'Hindon Elevated Road scenic drive and Hindon Eco Park',
      'Swarna Jayanti Park in Indirapuram for lush jogging trails & boating',
      'Drizzling Land Water & Amusement Park on Delhi-Meerut Road',
    ],
    content: [
      {
        heading: '1. Swarna Jayanti Park (Indirapuram)',
        body: 'Located just 3 km from Ansal Plaza Vaishali, Swarna Jayanti Park is the green lung of the Trans-Hindon area. Spanning sprawling acres with manicured Japanese gardens, a tranquil boating lake, walking tracks, and musical fountains, it is the quintessential morning rejuvenation spot for local residents and families.',
      },
      {
        heading: '2. Hindon River Eco-Park & City Forest Ghaziabad',
        body: 'Spanning over 175 acres along the Hindon riverbed, the Ghaziabad City Forest features two expansive artificial lakes, open meadows, bamboo groves, an adventure obstacle zone, and paddle boating. It offers a genuine nature respite from city bustle, easily accessible via the Hindon Elevated Road.',
      },
      {
        heading: '3. Drizzling Land Water & Amusement Park',
        body: 'Situated on the Delhi-Meerut Highway (NH-58), Drizzling Land is the top family day-trip attraction in Ghaziabad. Featuring massive wave pools, multi-lane water slides, roller coasters, and rain dance floors, it is the premier weekend destination for cooling off during summer months.',
      },
      {
        heading: '4. Cultural & Architectural Landmarks',
        body: 'Vaishali’s strategic position on the Blue Line Metro puts world-class cultural heritage within 20 minutes. Akshardham Temple with its grand boat ride and water show is only 4 metro stations away. Closer home, the historic Dudheshwar Nath Temple in old Ghaziabad dates back centuries and draws devout pilgrims during Mahashivratri.',
      },
    ],
  },
  {
    id: 'blog-cultural-events-calendar',
    title: 'Cultural Festivals & Sacred Pilgrimage Calendar: Char Dham Opening Dates, Pushkar & Kullu Dussehra',
    slug: 'cultural-festivals-sacred-pilgrimage-calendar-india',
    category: 'Cultural Events',
    readTime: '6 min read',
    publishDate: 'January 20, 2025',
    author: 'Indoworld Editorial Team',
    excerpt:
      'Plan your annual travels around India’s vibrant seasonal festivals and spiritual openings. From Kedarnath temple gates to desert camel fairs and royal folk spectacles.',
    coverImage: 'https://images.unsplash.com/photo-1569949381669-ecf31ae8e613?auto=format&fit=crop&w=1000&q=80',
    tags: ['Char Dham', 'Cultural Events', 'Festivals', 'Pilgrimage', 'Spiritual Tourism'],
    keyHighlights: [
      'Char Dham temples reopen annually on auspicious Akshaya Tritiya (April/May)',
      'Pushkar Camel Fair: World’s largest livestock & desert cultural extravaganza in November',
      'Kullu International Dussehra: Seven-day congregation of mountain deities in Himachal',
    ],
    content: [
      {
        heading: '1. Shri Kedarnath & Badrinath Dham Opening Windows',
        body: 'Every year, the portals (Kapat) of Kedarnath Ji and Badrinath Ji reopen to millions of devotees in late April or early May, coinciding with Akshaya Tritiya, after remaining snowbound for six months. Opening ceremonies involve grand doli processions carrying the Utsav Murti from Ukhimath and Joshimath. Indoworld begins advance registrations from February to secure verified hotel rooms and helicopter shuttle slots.',
      },
      {
        heading: '2. The Magical Pushkar Camel Fair (Rajasthan)',
        body: 'Held on the banks of Pushkar Lake during the auspicious Kartik Purnima (typically November), the Pushkar Fair is an unforgettable fusion of color, commerce, and devotion. Thousands of decorated camels, Rajasthani folk musicians, turban-tying competitions, and hot air balloon flights make this one of the most photographed festivals on earth.',
      },
      {
        heading: '3. Kullu Dussehra: The Himalayan Festival of Gods',
        body: 'Unlike standard Dussehra celebrations across North India, the 300-year-old Kullu Dussehra commences on the day when festivities elsewhere conclude. Hundreds of local Devtas (village deities) are carried on ornate wooden palanquins down to the Dhalpur Maidan in Kullu to pay homage to Lord Raghunath Ji. It is a spectacle of traditional horn instruments, Pahari dance, and rich mountain folklore.',
      },
      {
        heading: '4. International Seasonal Highlights: Dubai Shopping Festival',
        body: 'For travelers seeking international festivities, the annual Dubai Shopping Festival (DSF) transforms the UAE from December through January with citywide concerts, daily drone shows, fireworks over Dubai Creek, and luxury raffles. Our Vaishali desk crafts specialized 4-night and 5-night flight-inclusive itineraries for families.',
      },
    ],
  },
];

export const INITIAL_USER_REVIEWS: UserReview[] = [
  {
    id: 'rev-1',
    packageId: 'kashmir-paradise',
    tripName: 'Jewels of Kashmir & Dal Lake Houseboat',
    authorName: 'Virendra Sharma & Family',
    locality: 'Sector 4, Vaishali, Ghaziabad',
    rating: 5,
    reviewText:
      'Indoworld Tourism handled our complete Kashmir trip with supreme care. Being our neighbor agency in Vaishali, we visited their office in Ansal Plaza. The Dal Lake houseboat was immaculate, and the chauffeur in Srinagar was exceptionally polite. Transparent pricing with zero hidden shocks!',
    travelMonth: 'February 2025',
    verifiedTraveler: true,
    createdAt: '2025-02-18',
  },
  {
    id: 'rev-2',
    packageId: 'dubai-luxury-escapade',
    tripName: 'Dazzling Dubai & Abu Dhabi Grandeur',
    authorName: 'Ananya & Rohit Mathur',
    locality: 'Ahinsa Khand 2, Indirapuram',
    rating: 5,
    reviewText:
      'We booked our first international trip to Dubai through Indoworld Tourism Services. From visa approval in just 3 days to private desert safari and Burj Khalifa prime time tickets, everything went like clockwork. Truly professional team!',
    travelMonth: 'January 2025',
    verifiedTraveler: true,
    createdAt: '2025-01-24',
  },
  {
    id: 'rev-3',
    packageId: 'char-dham-uttarakhand',
    tripName: 'Divine Uttarakhand: Kedarnath & Badrinath (Do Dham)',
    authorName: 'Col. (Retd.) R. K. Joshi',
    locality: 'Sector 1, Vaishali, Ghaziabad',
    rating: 5,
    reviewText:
      'For senior citizens like us, a Char Dham pilgrimage can be daunting. Indoworld organized comfortable night halts, registered our biometric passes, and arranged convenient pony options. Extremely thankful to the team for their dedicated coordination.',
    travelMonth: 'October 2024',
    verifiedTraveler: true,
    createdAt: '2024-10-30',
  },
  {
    id: 'rev-4',
    packageId: 'himachal-manali-shimla',
    tripName: 'Scenic Himachal: Shimla, Kullu & Manali',
    authorName: 'Sunil Aggarwal (Director, TechCorp)',
    locality: 'Kaushambi, Ghaziabad',
    rating: 5,
    reviewText:
      'Hired two 17-seater Tempo Travellers for our annual team offsite from Vaishali to Manali. Prompt departure at 5 AM, clean pushback seats, and skilled mountain drivers. Excellent B2B corporate service right here in Ghaziabad.',
    travelMonth: 'December 2024',
    verifiedTraveler: true,
    createdAt: '2024-12-14',
  },
  {
    id: 'rev-5',
    packageId: 'kerala-backwaters-munnar',
    tripName: 'God’s Own Country: Munnar, Thekkady & Alleppey',
    authorName: 'Dr. Meenakshi Sundaram',
    locality: 'Sector 9, Vasundhara',
    rating: 5,
    reviewText:
      'Wonderful 6 days across Munnar tea estates and Alleppey backwaters. The private houseboat arranged by Indoworld was five-star grade with authentic traditional Karimeen fish curry cooked by our personal chef. Flawless execution.',
    travelMonth: 'November 2024',
    verifiedTraveler: true,
    createdAt: '2024-11-20',
  },
  {
    id: 'rev-6',
    packageId: 'rajasthan-royal-heritage',
    tripName: 'Royal Rajasthan Heritage: Jaipur, Jodhpur & Udaipur',
    authorName: 'Manish & Deepa Singhal',
    locality: 'Sector 14, Kaushambi',
    rating: 5,
    reviewText:
      'The heritage havelis selected in Jaipur and Udaipur gave us a taste of true royalty. The chauffeur Mr. Dinesh was thoroughly courteous and knowledgeable about all the palace histories. Highly recommended travel agency in Vaishali!',
    travelMonth: 'January 2025',
    verifiedTraveler: true,
    createdAt: '2025-01-12',
  },
];
