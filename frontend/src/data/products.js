import samsungA14 from '../assets/electronics/samsung-a14.jpg';
import samsungA07 from '../assets/electronics/samsung-a07.jpg';
import redmiNote11SE from '../assets/electronics/redmi-note-11se.jpg';
import jblFlip6 from '../assets/electronics/jbl-flip-6.jpg';
import jblTone760 from '../assets/electronics/jbl-tone-760.jpg';
import oraimoWatch from '../assets/electronics/oraimo-watch.jpg';
import nokia106 from '../assets/electronics/nokia-106.jpg';
import jblBoombox from '../assets/electronics/jbl-boombox-4.jpg';

export const products = [
  {
    id: "PPC-1001",
    name: "Samsung Galaxy A14",
    category: "Smartphones",
    price: 25000,
    originalPrice: 28000,
    description: "Great value smartphone with excellent battery life.",
    image: samsungA14,
    inStock: true,
    rating: 4.8,
    reviews: 12
  },
  {
    id: "PPC-1002",
    name: "Samsung Galaxy A07",
    category: "Smartphones",
    price: 18000,
    description: "Affordable Samsung quality with essential features.",
    image: samsungA07,
    inStock: true,
    rating: 4.5,
    reviews: 24
  },
  {
    id: "PPC-1003",
    name: "Redmi Note 11SE",
    category: "Smartphones",
    price: 23000,
    description: "FHD+ 90Hz display, Dimensity 700, 5000mAh battery.",
    image: redmiNote11SE,
    inStock: true,
    rating: 4.7,
    reviews: 18
  },
  {
    id: "PPC-1004",
    name: "JBL Flip 6",
    category: "Speakers",
    price: 15000,
    originalPrice: 18000,
    description: "Portable waterproof bluetooth speaker.",
    image: jblFlip6,
    inStock: true,
    rating: 4.9,
    reviews: 32
  },
  {
    id: "PPC-1005",
    name: "JBL TONE 760",
    category: "Headphones & Earphones",
    price: 8500,
    description: "High quality wireless headphones.",
    image: jblTone760,
    inStock: true,
    rating: 4.6,
    reviews: 45
  },
  {
    id: "PPC-1006",
    name: "Oraimo Watch ER",
    category: "Smart Watches",
    price: 4500,
    originalPrice: 5500,
    description: "Smartwatch with heartrate, blood oxygen monitor and IP68 waterproof rating.",
    image: oraimoWatch,
    inStock: true,
    rating: 4.6,
    reviews: 15
  },
  {
    id: "PPC-1007",
    name: "Nokia 106",
    category: "Smartphones",
    price: 2500,
    description: "Classic robust phone with long battery life.",
    image: nokia106,
    inStock: true,
    rating: 4.2,
    reviews: 8
  },
  {
    id: "PPC-1008",
    name: "JBL Boombox 4",
    category: "Speakers",
    price: 32000,
    description: "Massive sound and deepest bass with up to 24 hours of playtime.",
    image: jblBoombox,
    inStock: true,
    rating: 4.8,
    reviews: 21
  }
];

export const categories = [
  "All",
  "Smartphones",
  "Laptops",
  "TVs",
  "Headphones & Earphones",
  "Speakers",
  "Chargers & Cables",
  "Power Banks",
  "Smart Watches",
  "Computer Accessories",
  "Cameras",
  "Gaming Accessories",
  "Phone Accessories"
];
