// Venue type definitions - 與 React Native App 同步

export interface Venue {
  id: string;
  name: string;
  address: string;
  rating: number;
  reviewCount: number;
  mainImage: string;
  latitude?: number;
  longitude?: number;
}

export interface VenueDetail extends Venue {
  description?: string;
  phone?: string;
  website?: string;
  openingHours?: string;
  tags?: string[];
}
