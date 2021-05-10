import { attributes } from 'structure';

const Refueling = attributes({
  id: Number,

  litres: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  pricePerLitre: {
    type: Number,
    required: true,
  },
  totalKilometers: {
    type: Number,
    required: false,
  },
  dayKilometers: {
    type: Number,
    required: false,
  },
  fullTank: {
    type: Boolean,
    required: true,
  },
  madeAt: {
    type: Date,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
})(
  class Refueling {
    litres: number;
    price: number;
    pricePerLitre: number;
    totalKilometers: number;
    dayKilometers: number;
    fullTank: boolean;
    madeAt: Date;
    userId: string;
    /**
     * Calculates the litre price based on the amount of litres and the total price
     */
    calcLitrePrice() {
      this.pricePerLitre = this.price / this.litres || 0;
    }

    /**
     * Calculates the litre price based on the price per litre and the total price
     */
    calcLitres() {
      this.litres = this.price / this.pricePerLitre || 0;
    }

    /**
     * Calculates the total price based on the price per litre and the amount of litres
     */
    calcPrice() {
      this.price = this.pricePerLitre * this.litres || 0;
    }
  }
);

export default Refueling;
