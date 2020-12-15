export interface Refueling {
  id: number;
  litres: number;
  price: number;
  pricePerLitre: number;
  totalKilometers: number;
  dayKilometers: number;
  fullTank: boolean;
  madeAt: Date;
}
