export interface ApiV1NewRefuelingRequest {
  litres: number;
  price: number;
  pricePerLitre: number;
  totalKilometers?: number;
  dayKilometers?: number;
  fullTank?: boolean;
  [k: string]: unknown;
}
