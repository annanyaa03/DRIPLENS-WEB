export const brands = [
  {
    id: 1,
    name: "Nike",
    domain: "nike.com",
    logo: "https://upload.wikimedia.org/wikipedia/commons/a/a6/Logo_NIKE.svg",
    sector: "Sportswear & Lifestyle",
    location: "Beaverton, Oregon",
    description: "Nike is the world's leading designer, marketer, and distributor of authentic athletic footwear, apparel, equipment, and accessories for a wide variety of sports and fitness activities.",
    mission: "To bring inspiration and innovation to every athlete* in the world.",
    briefs: [
      {
        id: "n-01",
        title: "Summer 2024 Motion Campaign",
        type: "Videography",
        budget: "$15,000 - $25,000",
        description: "Seeking a high-energy cinematographer to capture the 'Move to Zero' sustainability collection. Focus on urban environments and raw, authentic human movement.",
        tags: ["SUSTAINABILITY", "URBAN", "ACTION"],
        requirements: ["Experience with Arri/RED systems", "Strong portfolio in sports lifestyle", "Available for travel"]
      }
    ]
  },
  {
    id: 2,
    name: "Apple",
    domain: "apple.com",
    logo: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg",
    sector: "Consumer Electronics",
    location: "Cupertino, California",
    description: "Apple designs, manufactures, and markets smartphones, personal computers, tablets, wearables, and accessories, and sells a variety of related services.",
    mission: "To bring the best user experience to its customers through its innovative hardware, software, and services.",
    briefs: [
      {
        id: "a-01",
        title: "Spatial Computing Interface Concepts",
        type: "3D Motion Design",
        budget: "$20,000 - $35,000",
        description: "We are looking for visionary 3D artists to explore new interaction paradigms for spatial computing. Work directly with our design team to visualize the future of OS interface.",
        tags: ["NEUMORPHISM", "SPATIAL", "PREMIUM"],
        requirements: ["Mastery of Houdini/C4D", "Deep understanding of UX/UI", "NDA required"]
      }
    ]
  },


  {
    id: 5,
    name: "Spotify",
    domain: "spotify.com",
    logo: "https://upload.wikimedia.org/wikipedia/commons/1/19/Spotify_logo_without_text.svg",
    sector: "Audio Streaming",
    location: "Stockholm, Sweden",
    description: "Spotify is the world’s most popular audio streaming subscription service with a community of more than 500 million users.",
    mission: "To unlock the potential of human creativity by giving a million creative artists the opportunity to live off their art.",
    briefs: [
      {
        id: "s-01",
        title: "Creator Portal UI/UX Redesign",
        type: "Product Design",
        budget: "$25,000 - $40,000",
        description: "Collaborate with our product team to overhaul the Spotify for Artists analytics dashboard. Focus on accessible data visualization and mobile-first interactions.",
        tags: ["DATA VIS", "B2B", "ACCESSIBILITY"],
        requirements: ["Expert Figma skills", "Background in B2B SaaS", "User research experience"]
      }
    ]
  },
  {
    id: 6,
    name: "Tesla",
    domain: "tesla.com",
    logo: "https://upload.wikimedia.org/wikipedia/commons/b/bd/Tesla_Motors.svg",
    sector: "Automotive & Energy",
    location: "Austin, Texas",
    description: "Tesla's mission is to accelerate the world's transition to sustainable energy through electric vehicles and renewable energy solutions.",
    mission: "To accelerate the world’s transition to sustainable energy.",
    briefs: [
      {
        id: "t-01",
        title: "Energy Ecosystem Illustrations",
        type: "Illustration",
        budget: "$8,000 - $12,000",
        description: "We need a series of technical yet artistic illustrations explaining the flow of energy between Solar Roof, Powerwall, and Tesla vehicles for our annual report.",
        tags: ["TECHNICAL", "CLEAN", "ENERGY"],
        requirements: ["Vector mastery", "Ability to simplify complex systems", "Clean, minimalist aesthetic"]
      }
    ]
  },


  {
    id: 9,
    name: "Google",
    domain: "google.com",
    logo: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
    sector: "Technology & AI",
    location: "Mountain View, California",
    description: "Google's mission is to organize the world's information and make it universally accessible and useful.",
    mission: "To organize the world's information and make it universally accessible and useful.",
    briefs: [
      {
        id: "g-01",
        title: "Gemini AI Interface Motion",
        type: "Motion Design",
        budget: "$25,000 - $40,000",
        description: "Visualizing the fluidity and intelligence of our latest AI models through abstract motion graphics.",
        tags: ["AI", "FLUID", "TECH"],
        requirements: ["Proficiency in After Effects", "Experience with AI visuals", "Modern aesthetic"]
      }
    ]
  },
  {
    id: 10,
    name: "Microsoft",
    domain: "microsoft.com",
    logo: "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg",
    sector: "Software & Cloud",
    location: "Redmond, Washington",
    description: "Microsoft enables digital transformation for the era of an intelligent cloud and an intelligent edge.",
    mission: "To empower every person and every organization on the planet to achieve more.",
    briefs: [
      {
        id: "ms-01",
        title: "Surface Pro Lifestyle Series",
        type: "Photography",
        budget: "$15,000 - $22,000",
        description: "Capturing the versatility of Surface Pro in diverse professional environments.",
        tags: ["LIFESTYLE", "WORK", "MINIMAL"],
        requirements: ["Natural light expertise", "Professional gear", "Modern style"]
      }
    ]
  },
  {
    id: 11,
    name: "Amazon",
    domain: "amazon.com",
    logo: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg",
    sector: "E-commerce & Cloud",
    location: "Seattle, Washington",
    description: "Amazon is guided by four principles: customer obsession, passion for invention, commitment to operational excellence, and long-term thinking.",
    mission: "To be Earth’s most customer-centric company.",
    briefs: [
      {
        id: "am-01",
        title: "AWS Infrastructure Doc",
        type: "Videography",
        budget: "$40,000 - $60,000",
        description: "A cinematic look into the scale of our global data center network.",
        tags: ["SCALE", "TECH", "CINEMATIC"],
        requirements: ["Industrial filming experience", "Global travel", "Security clearance"]
      }
    ]
  },

];

export const getBrandById = (id) => brands.find(b => b.id === parseInt(id));
