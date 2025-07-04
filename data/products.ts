
export type Product = {
  id: string;
  name: string;
  category: "vegetables" | "fruits" | "dairy" | "grains";
  price: number;
  image: string;
  shortDescription: string;
  fullDescription: string;
  seller: {
    name: string;
    location: string;
    id: string;
  };
  stock: number;
  unit: string;
};

export const products: Product[] = [
  {
    id: "1",
    name: "Organic Apples",
    category: "fruits",
    price: 3.99,
    image: "https://images.unsplash.com/photo-1579613832125-5d34a13ffe2a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    shortDescription: "Fresh, locally grown organic apples",
    fullDescription: "These delicious organic apples are grown without pesticides on our family farm. They're crisp, sweet, and perfect for eating fresh or using in your favorite recipes. Our apples are harvested at peak ripeness to ensure the best flavor and nutritional content.",
    seller: {
      name: "Green Valley Orchards",
      location: "Appleville, CA",
      id: "s1"
    },
    stock: 100,
    unit: "lb"
  },
  {
    id: "2",
    name: "Fresh Carrots",
    category: "vegetables",
    price: 2.49,
    image: "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
    shortDescription: "Sweet, crunchy carrots perfect for snacking or cooking",
    fullDescription: "Our fresh carrots are harvested daily to ensure maximum freshness and nutrition. They're grown using sustainable farming practices and are perfect for snacking, cooking, or juicing. Each bunch contains 5-6 medium-sized carrots with their greens still attached.",
    seller: {
      name: "Root Farm",
      location: "Vegetable Valley, OR",
      id: "s2"
    },
    stock: 75,
    unit: "bunch"
  },
  {
    id: "3",
    name: "Artisanal Goat Cheese",
    category: "dairy",
    price: 6.99,
    image: "https://images.unsplash.com/photo-1559561853-08451507cbe7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    shortDescription: "Creamy, tangy goat cheese made from pasture-raised goats",
    fullDescription: "Our artisanal goat cheese is handcrafted in small batches using milk from our own pasture-raised goats. The cheese has a creamy texture and a mild, tangy flavor that pairs perfectly with crackers, fruit, or in your favorite recipes. Each package contains 8 oz of fresh goat cheese.",
    seller: {
      name: "Hill Creek Dairy",
      location: "Goatville, VT",
      id: "s3"
    },
    stock: 30,
    unit: "8 oz package"
  },
  {
    id: "4",
    name: "Organic Quinoa",
    category: "grains",
    price: 5.99,
    image: "https://images.unsplash.com/photo-1612207157912-90813d3f1300?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2076&q=80",
    shortDescription: "Nutrient-rich organic quinoa grown sustainably",
    fullDescription: "Our organic quinoa is grown sustainably without synthetic pesticides or fertilizers. This versatile, gluten-free grain is packed with protein, fiber, and essential nutrients. It cooks quickly and can be used in salads, bowls, or as a nutritious side dish. Each package contains 16 oz of premium organic quinoa.",
    seller: {
      name: "Grain Collective",
      location: "Harvest Fields, MT",
      id: "s4"
    },
    stock: 50,
    unit: "16 oz package"
  },
  {
    id: "5",
    name: "Fresh Strawberries",
    category: "fruits",
    price: 4.99,
    image: "https://images.unsplash.com/photo-1464965911861-746a04b4bca6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    shortDescription: "Sweet, juicy strawberries picked at peak ripeness",
    fullDescription: "Our strawberries are hand-picked at peak ripeness to ensure maximum sweetness and flavor. They're grown using sustainable farming practices and are perfect for eating fresh, adding to desserts, or making jams. Each package contains 16 oz of fresh, plump strawberries.",
    seller: {
      name: "Berry Good Farm",
      location: "Fruitland, WA",
      id: "s5"
    },
    stock: 40,
    unit: "16 oz package"
  },
  {
    id: "6",
    name: "Organic Baby Spinach",
    category: "vegetables",
    price: 3.49,
    image: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2072&q=80",
    shortDescription: "Tender organic baby spinach leaves",
    fullDescription: "Our organic baby spinach is grown without synthetic pesticides or fertilizers. The leaves are tender and flavorful, perfect for salads, smoothies, or cooking. Each package is carefully washed and dried to ensure freshness and convenience. Contains 5 oz of organic baby spinach.",
    seller: {
      name: "Greens & More",
      location: "Leafy Acres, CA",
      id: "s6"
    },
    stock: 60,
    unit: "5 oz package"
  },
  {
    id: "7",
    name: "Grass-Fed Butter",
    category: "dairy",
    price: 5.49,
    image: "https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    shortDescription: "Rich, creamy butter from grass-fed cows",
    fullDescription: "Our grass-fed butter is made from the cream of cows that graze on open pastures. It has a rich flavor and deep yellow color due to the high beta-carotene content from the grass diet. This butter is perfect for cooking, baking, or spreading on your favorite bread. Each package contains 8 oz of grass-fed butter.",
    seller: {
      name: "Meadow Dairy",
      location: "Butter Valley, WI",
      id: "s7"
    },
    stock: 25,
    unit: "8 oz package"
  },
  {
    id: "8",
    name: "Organic Brown Rice",
    category: "grains",
    price: 4.29,
    image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    shortDescription: "Wholesome organic brown rice grown sustainably",
    fullDescription: "Our organic brown rice is grown using sustainable farming practices without synthetic pesticides or fertilizers. This whole grain rice retains its bran layer, giving it a nutty flavor and chewy texture. It's a good source of fiber and essential nutrients. Each package contains 32 oz of organic brown rice.",
    seller: {
      name: "Grain Collective",
      location: "Harvest Fields, MT",
      id: "s4"
    },
    stock: 45,
    unit: "32 oz package"
  }
];
