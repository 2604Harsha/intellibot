export const themeConfig = {
  name: "IntelliBot PRO",
  tagline: "Intelligence that anticipates your needs.",
  audience: "Professionals & Developers",
  description: "A world-class, GPT-powered AI assistant featuring real-time voice, cinematic UI, and seamless intelligence.",
  
  // API settings
  apiBaseUrl: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000",
  
  // Design tokens
  colors: {
    background: "#05060A", // Deep near-black
    textPrimary: "#ECECF1",
    textSecondary: "#A1A1AA",
    accentPrimary: "#5436DA", // Electric Violet
    accentSecondary: "#00E5FF", // Cyan
  },
  
  // Intro Copy
  intro: {
    lines: [
      "Every great idea starts as a question.",
      "Humans have always searched for answers.",
      "Now, answers search for you."
    ]
  },
  
  links: {
    github: "https://github.com/yourusername/intellibot",
    twitter: "https://twitter.com/intellibot",
  }
};
