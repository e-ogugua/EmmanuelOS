export type Product = { id: string; title: string; price: number; category: 'Fashion'|'Beauty'|'DIY Kit'; image: string };
export type BlogPost = { id: string; title: string; category: 'Family Life'|'Beauty'|'Business'|'Lifestyle'; image: string };
export type Tutorial = { id: string; title: string; difficulty: 'Easy'|'Medium'|'Hard'; image: string };
export type Course = { id: string; title: string; price: number; duration: string; image: string };

const img = (seed: string, w=1200, h=900) => `https://picsum.photos/seed/${encodeURIComponent(seed)}/${w}/${h}`;

export const products: Product[] = [
  { id: 'p1', title: 'Ankara Wrap Dress', price: 15000, category: 'Fashion', image: img('fashion') },
  { id: 'p2', title: 'Men’s Senator Outfit', price: 25000, category: 'Fashion', image: img('fashion2') },
  { id: 'p3', title: 'Afrocentric Tote Bag', price: 8000, category: 'Fashion', image: img('fashion3') },
  { id: 'p4', title: 'Organic Shea Butter Cream', price: 3500, category: 'Beauty', image: img('beauty') },
  { id: 'p5', title: 'Hibiscus Hair Growth Oil', price: 4200, category: 'Beauty', image: img('beauty2') },
  { id: 'p6', title: 'Charcoal Face Mask Kit', price: 2800, category: 'DIY Kit', image: img('diy1') },
  { id: 'p7', title: 'Lip Balm DIY Set', price: 3000, category: 'DIY Kit', image: img('diy2') },
  { id: 'p8', title: 'Beaded Jewelry Starter Pack', price: 5500, category: 'DIY Kit', image: img('diy3') },
  { id: 'p9', title: 'African Print Headwrap', price: 2200, category: 'Fashion', image: img('fashion4') },
  { id: 'p10', title: 'Bridal Glow Skincare Set', price: 18000, category: 'Beauty', image: img('beauty3') },
];

export const posts: BlogPost[] = [
  { id: 'b1', title: 'How We Built a Family Business in Lagos', category: 'Family Life', image: img('family-business-lagos') },
  { id: 'b2', title: 'Top 5 Natural Oils for Glowing Skin', category: 'Beauty', image: img('natural-oils-glow') },
  { id: 'b3', title: 'Turning Passion into Profit: Our Branding Journey', category: 'Business', image: img('branding-journey') },
  { id: 'b4', title: 'The Future of African Fashion Trends', category: 'Lifestyle', image: img('african-fashion-future') },
  { id: 'b5', title: 'Balancing Marriage, Parenting, and Entrepreneurship', category: 'Family Life', image: img('family-balance') },
];

export const tutorials: Tutorial[] = [
  { id: 't1', title: 'Make Your Own Hibiscus Hair Oil', difficulty: 'Easy', image: img('diy4') },
  { id: 't2', title: 'DIY Lip Balm with Coconut Oil', difficulty: 'Easy', image: img('diy5') },
  { id: 't3', title: 'Ankara Fabric Earrings', difficulty: 'Medium', image: img('diy6') },
  { id: 't4', title: 'Homemade Coffee Body Scrub', difficulty: 'Easy', image: img('diy7') },
  { id: 't5', title: 'Tie & Dye Basics for Cotton', difficulty: 'Medium', image: img('diy8') },
];

export const courses: Course[] = [
  { id: 'c1', title: 'Branding Your Fashion Line', price: 12000, duration: '4 Weeks', image: img('course1') },
  { id: 'c2', title: 'Mastering Your Personal Style', price: 8500, duration: '2 Weeks', image: img('course2') },
  { id: 'c3', title: 'Customer Service for Creative Entrepreneurs', price: 10000, duration: '3 Weeks', image: img('course3') },
];
