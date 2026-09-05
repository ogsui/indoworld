export interface TourPackage {
  id: string;
  title: string;
  category: 'domestic' | 'international' | 'spiritual' | 'weekend';
  duration: string;
  days: number;
  nights: number;
  startingPrice: number;
  originalPrice?: number;
  destination: string;
  region: string;
  image: string;
  rating: number;
  reviewsCount: number;
  badge?: string;
  highlights: string[];
  inclusions: string[];
  exclusions: string[];
  itinerary: {
    day: number;
    title: string;
    description: string;
  }[];
  bestTimeToVisit: string;
}

export interface HotelService {
  id: string;
  name: string;
  city: string;
  country: string;
  starRating: number;
  pricePerNight: number;
  image: string;
  tag: string;
  amenities: string[];
  proximity: string;
}

export interface CabVehicle {
  id: string;
  name: string;
  category: 'Sedan' | 'SUV' | 'Luxury MUV' | 'Tempo Traveller';
  capacity: string;
  luggage: string;
  perKmRate: string;
  dailyAllowance: string;
  idealFor: string;
  image: string;
  features: string[];
}

export interface Testimonial {
  id: string;
  author: string;
  locality: string;
  trip: string;
  rating: number;
  comment: string;
  date: string;
}

export interface InquiryFormData {
  name: string;
  phone: string;
  email: string;
  destination: string;
  travelDate: string;
  travelers: number;
  packageTier: 'Standard' | 'Deluxe' | 'Luxury';
  serviceType: 'Tour Package' | 'Hotel Booking' | 'Flight Ticket' | 'Visa Assistance' | 'Custom Itinerary' | 'Spiritual Yatra';
  message: string;
}

export interface BookingPassenger {
  fullName: string;
  age: number;
  gender: 'male' | 'female' | 'other';
}

export interface BookingRecord {
  id: string;
  packageId: string;
  packageTitle: string;
  destination: string;
  travelDate: string;
  passengers: BookingPassenger[];
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  pickupAddress?: string;
  specialRequests?: string;
  baseAmount: number;
  gstAmount: number;
  totalAmount: number;
  advancePaid: number;
  paymentMethod: 'upi' | 'card' | 'netbanking';
  paymentStatus: 'completed' | 'pending';
  transactionRef: string;
  bookingDate: string;
  emailSentTo: string;
}

export interface UserReview {
  id: string;
  packageId?: string;
  tripName: string;
  authorName: string;
  locality: string;
  rating: number;
  reviewText: string;
  travelMonth: string;
  verifiedTraveler: boolean;
  createdAt: string;
}

export interface DestinationHighlight {
  id: string;
  name: string;
  tagline: string;
  image: string;
  region: string;
  overview: string;
  bestTimeToVisit: string;
  topAttractions: string[];
  routeFromDelhiNCR: string;
  popularFood: string[];
  recommendedPackageIds: string[];
  curatedTips: string[];
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  category: 'Travel Tips' | 'Local Attractions' | 'Cultural Events';
  readTime: string;
  publishDate: string;
  author: string;
  excerpt: string;
  coverImage: string;
  content: {
    heading?: string;
    body: string;
  }[];
  tags: string[];
  keyHighlights?: string[];
}

export interface CustomItineraryDay {
  day: number;
  title: string;
  morning: string;
  afternoon: string;
  evening: string;
  stay: string;
  transportTip: string;
}

export interface CustomItinerary {
  title: string;
  destination: string;
  duration: string;
  vibe?: string;
  departureCity?: string;
  overview: string;
  bestTimeToVisit?: string;
  visaNotes?: string;
  estimatedBudget: {
    economy: string;
    standard: string;
    luxury: string;
  };
  days: CustomItineraryDay[];
  insiderTips: string[];
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: string;
}
