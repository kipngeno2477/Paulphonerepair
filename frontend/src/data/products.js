import samsungA14 from '../assets/electronics/samsung-a14.jpg';
import samsungA07 from '../assets/electronics/samsung-a07.jpg';
import redmiNote11SE from '../assets/electronics/redmi-note-11se.jpg';
import jblFlip6 from '../assets/electronics/jbl-flip-6.jpg';
import jblTone760 from '../assets/electronics/jbl-tone-760.jpg';
import oraimoWatch from '../assets/electronics/oraimo-watch.jpg';
import nokia106 from '../assets/electronics/nokia-106.jpg';
import jblBoombox from '../assets/electronics/jbl-boombox-4.jpg';

// Newly added WhatsApp images for shop products (Car audio, custom sound consoles & amplifiers)
import waSoundRigGreen from '../assets/WhatsApp Image 2026-10-16 at 22.38.51.jpeg';
import waSoundRigPurple from '../assets/WhatsApp Image 2026-10-16 at 22.38.52.jpeg';
import waMediaDeckAmp from '../assets/WhatsApp Image 2026-10-16 at 22.38.53.jpeg';

export const products = [
  {
    id: "PPC-1009",
    name: "Njuguna Sounds - Pioneer Stereo & Boschmann Equalizer Custom Rig (Green LED)",
    category: "Sound Systems & Car Audio",
    price: 9500,
    originalPrice: 12000,
    description: "Custom-built car audio stereo & sound box featuring DV-Pioneer DK player (Bluetooth A2DP, USB, FM, TF card, MP3) with Boschmann graphic equalizer, multi-channel sound controls, and vibrant green illumination. Built and tuned at Langas Studio.",
    image: waSoundRigGreen,
    inStock: true,
    rating: 5.0,
    reviews: 18,
    featured: true
  },
  {
    id: "PPC-1010",
    name: "Njuguna Sounds - Pioneer Bluetooth Stereo & Pro Equalizer (Purple Neon)",
    category: "Sound Systems & Car Audio",
    price: 9500,
    originalPrice: 14000,
    description: "High-performance custom audio console with Pioneer media receiver and Boschmann graphic equalizer. Features multi-color neon illumination, front USB/SD/Bluetooth input, RCA output, and deep bass tuning. Call/WhatsApp 0743220999.",
    image: waSoundRigPurple,
    inStock: true,
    rating: 4.9,
    reviews: 23,
    featured: true
  },
  {
    id: "PPC-1011",
    name: "DV-Pioneer DK Custom Bluetooth Media Deck & Amplifier System",
    category: "Sound Systems & Car Audio",
    price: 7500,
    originalPrice: 11500,
    description: "Custom workshop-engineered Bluetooth audio amplifier station with MP3/USB/TF/FM module, front RCA input ports, multi-potentiometer audio gain and frequency knobs. Ideal for home audio, matatus, shops, or car setups.",
    image: waMediaDeckAmp,
    inStock: true,
    rating: 4.8,
    reviews: 14,
    featured: true
  },
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
  "Sound Systems & Car Audio",
  "Smartphones",
  "Speakers",
  "Headphones & Earphones",
  "Smart Watches",
  "Laptops",
  "TVs",
  "Chargers & Cables",
  "Power Banks",
  "Computer Accessories",
  "Gaming Accessories",
  "Phone Accessories"
];
