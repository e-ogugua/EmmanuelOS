export type DemoCake = {
  id: string;
  name: string;
  slug: string;
  category: string;
  base_price: number;
  description?: string;
  image_url: string;
};

export const demoCakes: DemoCake[] = [
  {
    id: "7b7c8a3e-5d1c-4d86-91f7-0a2b0d11a001",
    name: "Vanilla Bliss",
    slug: "vanilla-bliss",
    category: "Birthday",
    base_price: 18000,
    description: "Classic vanilla sponge with silky buttercream.",
    image_url: "https://images.pexels.com/photos/291528/pexels-photo-291528.jpeg?auto=compress&cs=tinysrgb&w=1200&h=900&dpr=1",
  },
  {
    id: "7b7c8a3e-5d1c-4d86-91f7-0a2b0d11a002",
    name: "Chocolate Royale",
    slug: "chocolate-royale",
    category: "Birthday",
    base_price: 22000,
    description: "Rich chocolate layers with dark ganache.",
    image_url: "https://images.pexels.com/photos/533325/pexels-photo-533325.jpeg?auto=compress&cs=tinysrgb&w=1200&h=900&dpr=1",
  },
  {
    id: "7b7c8a3e-5d1c-4d86-91f7-0a2b0d11a003",
    name: "Red Velvet Dream",
    slug: "red-velvet-dream",
    category: "Wedding",
    base_price: 30000,
    description: "Velvety crumb with cream cheese frosting.",
    image_url: "https://images.pexels.com/photos/1998635/pexels-photo-1998635.jpeg?auto=compress&cs=tinysrgb&w=1200&h=900&dpr=1",
  },
  {
    id: "7b7c8a3e-5d1c-4d86-91f7-0a2b0d11a004",
    name: "Strawberry Delight",
    slug: "strawberry-delight",
    category: "Kids",
    base_price: 20000,
    description: "Fresh strawberries and vanilla cream.",
    image_url: "https://images.pexels.com/photos/1983056/pexels-photo-1983056.jpeg?auto=compress&cs=tinysrgb&w=1200&h=900&dpr=1",
  },
  {
    id: "7b7c8a3e-5d1c-4d86-91f7-0a2b0d11a005",
    name: "Lemon Zest",
    slug: "lemon-zest",
    category: "Seasonal",
    base_price: 19000,
    description: "Tangy lemon sponge with citrus glaze.",
    image_url: "https://images.pexels.com/photos/45202/cupcakes-dessert-cake-sweet-45202.jpeg?auto=compress&cs=tinysrgb&w=1200&h=900&dpr=1",
  },
  {
    id: "7b7c8a3e-5d1c-4d86-91f7-0a2b0d11a006",
    name: "Coconut Paradise",
    slug: "coconut-paradise",
    category: "Wedding",
    base_price: 28000,
    description: "Coconut cream with toasted flakes.",
    image_url: "https://images.pexels.com/photos/411000/pexels-photo-411000.jpeg?auto=compress&cs=tinysrgb&w=1200&h=900&dpr=1",
  },
  {
    id: "7b7c8a3e-5d1c-4d86-91f7-0a2b0d11a007",
    name: "Caramel Crunch",
    slug: "caramel-crunch",
    category: "Birthday",
    base_price: 24000,
    description: "Butterscotch sponge with caramel drizzle.",
    image_url: "https://images.pexels.com/photos/291528/pexels-photo-291528.jpeg?auto=compress&cs=tinysrgb&w=1200&h=900&dpr=1",
  },
  {
    id: "7b7c8a3e-5d1c-4d86-91f7-0a2b0d11a008",
    name: "Funfetti Party",
    slug: "funfetti-party",
    category: "Kids",
    base_price: 17000,
    description: "Rainbow sprinkles in fluffy vanilla cake.",
    image_url: "https://images.pexels.com/photos/291528/pexels-photo-291528.jpeg?auto=compress&cs=tinysrgb&w=1200&h=900&dpr=1",
  },
];
