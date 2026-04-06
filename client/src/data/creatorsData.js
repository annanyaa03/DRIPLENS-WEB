export const creators = [
  { 
    id: 1, 
    name: "Alex Rivier", 
    role: "Cinematographer", 
    location: "Paris", 
    work: "Lifestyle Film", 
    img: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=800&q=80",
    qualifications: ["BA in Cinematic Arts", "5+ Years Adobe Premiere Mastery", "DaVinci Resolve Certified"],
    pastWork: ["Luxury Travel Campaigns", "Documentary Film 'Echoes'", "Fashion Week Highlight Reels"],
    workflow: [
      { step: "Concept", description: "Creative brainstorming and moodboarding." },
      { step: "Production", description: "High-end capture with RED/Arri equipment." },
      { step: "Post-Production", description: "Precision editing and color grading." },
      { step: "Delivery", description: "Multiple format exports for all social platforms." }
    ],
    brandDeals: ["Nike", "LVMH", "National Geographic", "Adobe"]
  },
  { 
    id: 2, 
    name: "Sarah Chen", 
    role: "Brand Identity", 
    location: "New York", 
    work: "Minimalist Branding", 
    img: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=800&q=80",
    qualifications: ["MFA in Visual Design", "AIGA Member", "Expert in Typography & Systems"],
    pastWork: ["Tech Startup Rebranding", "Eco-friendly Packaging Design", "Cultural Institution Identity"],
    workflow: [
      { step: "Strategy", description: "In-depth brand analysis and positioning." },
      { step: "Design", description: "Iterative visual development and systems." },
      { step: "Implementation", description: "Creating brand guidelines and assets." }
    ],
    brandDeals: ["Spotify", "Casper", "Warby Parker", "Airbnb"]
  },
  { 
    id: 3, 
    name: "Marcus Thorne", 
    role: "3D Motion Artist", 
    location: "London", 
    work: "Abstract Motion", 
    img: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80",
    qualifications: ["VFX Masterclass Graduate", "Houdini Specialist", "C4D Expert"],
    pastWork: ["Concert Visuals for Major Artists", "Product Launch Teasers", "NFT Series Collection"],
    workflow: [
      { step: "Pre-viz", description: "Storyboarding and layout in 3D space." },
      { step: "Sim & Animation", description: "Complex physics and character motion." },
      { step: "Rendering", description: "Octane/Redshift photorealistic output." }
    ],
    brandDeals: ["Apple", "Sony", "Nvidia", "Samsung"]
  },
  { 
    id: 4, 
    name: "Elena Rossi", 
    role: "Photographer", 
    location: "Milan", 
    work: "Portrait Series", 
    img: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
    qualifications: ["Fine Art Photography Degree", "Exhibited in Milan Gallery", "Master of Light & Texture"],
    pastWork: ["Vogue Italy Cover Feature", "High-Fashion Editorial", "Celebrity Portraiture"],
    workflow: [
      { step: "Shoot Prep", description: "Lighting setup and model direction." },
      { step: "The Capture", description: "Medium format high-resolution shooting." },
      { step: "Retouching", description: "Natural, high-end skin and color work." }
    ],
    brandDeals: ["Gucci", "Prada", "Vogue", "Zara"]
  },
  { 
    id: 5, 
    name: "David Kim", 
    role: "UI Designer", 
    location: "Seoul", 
    work: "Fintech App", 
    img: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80",
    qualifications: ["HCI Specialization", "Figma Guru", "User Research Specialist"],
    pastWork: ["Global Banking App Redesign", "Crypto Exchange Interface", "SaaS Dashboard Studio"],
    workflow: [
      { step: "Discovery", description: "Information architecture and user flows." },
      { step: "Design", description: "High-fidelity UI and prototyping." },
      { step: "handoff", description: "Detailed dev documentation and assets." }
    ],
    brandDeals: ["Samsung", "Kakao", "Line", "Revolut"]
  },
  { 
    id: 6, 
    name: "Emma Wilson", 
    role: "Illustrator", 
    location: "Berlin", 
    work: "Editorial Art", 
    img: "https://images.unsplash.com/photo-1454165833741-979e3d063004?auto=format&fit=crop&w=800&q=80",
    qualifications: ["Design University Berlin", "Wacom Ambassador", "Traditional & Digital Mastery"],
    pastWork: ["NYT Book Review Illustrations", "Indie Game Concept Art", "Global Mural Project"],
    workflow: [
      { step: "Sketch", description: "Rough thumbnails and character sheets." },
      { step: "Inking", description: "Defining line work and composition." },
      { step: "Color", description: "Vibrant palettes and atmospheric lighting." }
    ],
    brandDeals: ["New York Times", "Google", "Patagonia", "Netflix"]
  },
  // Adding default placeholders for any other creator IDs
];

export const getCreatorById = (id) => {
  const creator = creators.find(c => c.id === parseInt(id));
  if (creator) return creator;
  
  // Default fallback for dynamic/unknown/generated IDs
  return {
    id: parseInt(id),
    name: `Creator #${id}`,
    role: "Creative Specialst",
    location: "Global",
    work: "Featured Project",
    img: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=800&q=80",
    qualifications: ["Certified Expert", "Professional Portfolio", "Bespoke Service"],
    pastWork: ["Multiple Successul Collaborations", "High-Impact Project 2024", "Creative Directon Role"],
    workflow: [
      { step: "Consultation", description: "Deep dive into your project needs." },
      { step: "Execution", description: "High-quality production and refinement." },
      { step: "Delivery", description: "Final assets tailored for your brand." }
    ],
    brandDeals: ["Brand A", "Brand B", "Brand C"]
  };
};
