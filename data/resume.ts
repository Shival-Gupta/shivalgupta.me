/**
 * Resume data for Shival Gupta
 * Single source of truth for all portfolio content
 * Populated from: Shival-Gupta-Resume.pdf
 */

export interface ContactInfo {
  name: string
  phone: string
  email: string
  github: string
  linkedin: string
  website: string
}

export interface Skill {
  category: string
  items: string[]
}
export type ProjectCategory = "ai" | "iot" | "robotics" | "xr" | "games" | "web" | "systems"

export interface Project {
  id: string
  title: string
  subtitle?: string
  dateRange: string
  description: string[]
  technologies: string[]
  certificateUrl?: string
  githubUrl?: string
  demoUrl?: string
  videoUrl?: string
  featured?: boolean
  categories: ProjectCategory[]
}

export interface Experience {
  id: string
  role: string
  company: string
  location: string
  dateRange: string
  description: string[]
  certificateUrl?: string
}

export interface Education {
  id: string
  degree: string
  institution: string
  location?: string
  dateRange: string
  grade: string
  gradeType: "CGPA" | "Percentage"
}

export interface Extracurricular {
  name: string
  icon?: string
}

// ============================================
// CONTACT INFORMATION
// ============================================
export const contact: ContactInfo = {
  name: "Shival Gupta",
  phone: "+91 7091041542",
  email: "sgupta.5545@gmail.com",
  github: "https://github.com/shival-gupta",
  linkedin: "https://linkedin.com/in/shival-gupta",
  website: "https://shivalgupta.me",
}

// ============================================
// TECHNICAL SKILLS
// ============================================
export const skills: Skill[] = [
  {
    category: "Languages",
    items: ["Java", "Python", "C", "C++", "C#", "SQL"],
  },
  {
    category: "Web Development",
    items: ["Next.js", "Tailwind CSS", "Clerk.js", "Prisma ORM", "PostgreSQL", "WebSockets"],
  },
  {
    category: "AI, Robotics & IoT",
    items: ["Agentic AI", "RAG", "ROS", "Arduino", "Jetson Nano"],
  },
  {
    category: "Tools",
    items: ["Docker", "Blender", "Unity", "OpenXR (VR)"],
  },
]

// ============================================
// PROJECTS
// ============================================
export const projects: Project[] = [
  {
    id: "omni-wheel-robot",
    title: "Autonomous Omni-Wheel Library Robot",
    subtitle: "Capstone Project",
    dateRange: "Jan 2025 – Apr 2025",
    description: [
      "Integrated Jetson Nano with Arduino motor control and AI navigation.",
      "Implemented ROS-based LiDAR mapping and IR-guided line following.",
    ],
    technologies: ["Jetson Nano", "ROS", "Arduino", "Python", "C++"],
    featured: true,
    categories: ["ai", "iot", "robotics"],
  },
  {
    id: "smart-home-automation",
    title: "Smart Home Automation",
    subtitle: "Samsung PRISM Worklet",
    dateRange: "Sep 2024 – Jun 2025",
    description: [
      "Built 3D smart home simulation in Unity as a testbed for AI agents.",
      "Connected AI backend with real-time device orchestration via WebSocket/HTTP.",
      "Developed control dashboard for monitoring and agent-based interaction.",
    ],
    technologies: ["Unity", "crewAI", "WebSockets", "Next.js"],
    certificateUrl: "#",
    featured: true,
    categories: ["ai", "iot", "web"],
  },
  {
    id: "healthcare-platform",
    title: "Enterprise Healthcare Platform",
    subtitle: "Full Stack Management System",
    dateRange: "Dec 2024",
    description: [
      "Architected a Dockerized healthcare platform with separate portals for Admins, Patients, and Providers.",
      "Designed a scalable backend using TypeScript to handle modular production-ready deployments.",
      "Implemented secure role-based authentication and database management.",
    ],
    technologies: ["TypeScript", "Docker", "PostgreSQL", "Node.js"], 
    githubUrl: "https://github.com/Shival-Gupta/healthcare",
    featured: false,
    categories: ["web", "systems"], // <--- Updated to include "systems"
  },
  {
    id: "drones-sim-suite",
    title: "Drone Simulation Suite",
    subtitle: "Automated Robotics Environment",
    dateRange: "Dec 2024",
    description: [
      "Created an automated framework provisioning PX4, ArduPilot, and Gazebo for drone SITL testing.",
      "Integrated MAVROS and QGroundControl for rapid UAV development on Ubuntu/WSL.",
    ],
    technologies: ["Shell", "Gazebo", "PX4", "ROS"],
    githubUrl: "https://github.com/Shival-Gupta/drones-workshop",
    featured: false,
    categories: ["ai", "robotics"],
  },
  {
    id: "samsung-store-xr",
    title: "Samsung Store XR",
    subtitle: "Samsung PRISM Challenge, Winner",
    dateRange: "Feb 2024 – Jul 2024",
    description: [
      "Built VR prototype of Samsung's store for Meta Quest and other VR devices.",
      "Added teleportation, interactive product showcase, and cart system.",
    ],
    technologies: ["Unity", "OpenXR", "Blender"],
    certificateUrl: "#",
    featured: true,
    categories: ["xr"],
  },
  {
    id: "doofus-adventure",
    title: "Doofus Adventure",
    subtitle: "3D Survival Platformer",
    dateRange: "2024",
    description: [
      "Built a 3D survival game in Unity where players navigate dynamically disappearing platforms.",
      "Implemented procedural generation algorithms for randomized platform timing and placement.",
      "Developed custom visual effects using ShaderLab and handled physics-based movement in C#.",
    ],
    technologies: ["Unity", "C#", "ShaderLab", "HLSL"],
    githubUrl: "https://github.com/Shival-Gupta/Doofus-Adventure-Game",
    featured: false,
    categories: ["games"], 
  },
  {
    id: "fps-shooter",
    title: "FPS Shooter Game",
    subtitle: "CS:GO Style Prototype",
    dateRange: "Dec 2024",
    description: [
      "Developed a first-person shooter mechanic with raycast shooting and enemy AI.",
      "Implemented custom shaders in ShaderLab for visual effects.",
    ],
    technologies: ["Unity", "C#", "ShaderLab"],
    githubUrl: "https://github.com/Shival-Gupta/FPS-Shooter-Game",
    categories: ["games"],
  },
]

// ============================================
// WORK EXPERIENCE
// ============================================
export const experience: Experience[] = [
  {
    id: "satorixr",
    role: "XR Developer Intern",
    company: "SatoriXR",
    location: "Chennai, India",
    dateRange: "Feb 2025 – Jun 2025",
    description: [
      "Led a team of 4 developers and a 3D artist on a defense-focused VR simulation.",
      "Processed DEMs and satellite imagery into interactive Unity terrains.",
      "Implemented missile trajectory modeling and Google Earth–style tools.",
      "Helped hosting OpenProject (OpenSource Jira alternative) on Azure.",
    ],
    certificateUrl: "#",
  },
  {
    id: "airtel",
    role: "Software Developer Intern",
    company: "Airtel Payments Bank",
    location: "New Delhi",
    dateRange: "Sep 2023 – Nov 2023",
    description: [
      "Worked in Agile/Scrum workflows for fintech app development.",
      "Built a secure full-stack B2B SaaS prototype for transactions.",
      "Implemented Next.js + Prisma + PostgreSQL stack with encryption.",
      "Integrated third-party auth (Clerk.js) and modern UI (Tailwind + shadcn).",
    ],
    certificateUrl: "#",
  },
]

// ============================================
// EDUCATION
// ============================================
export const education: Education[] = [
  {
    id: "vit",
    degree: "B.Tech in Computer Science and Engineering with Specialization in AI and Robotics",
    institution: "Vellore Institute of Technology",
    location: "Chennai",
    dateRange: "2021 – 2025 (Graduated)",
    grade: "7.84",
    gradeType: "CGPA",
  },
  {
    id: "school-12",
    degree: "Senior Secondary (XII) - CBSE",
    institution: "St. Karen's High School",
    location: "Patna",
    dateRange: "2020",
    grade: "62.17%",
    gradeType: "Percentage",
  },
  {
    id: "school-10",
    degree: "Secondary (X) - CBSE",
    institution: "St. Karen's High School",
    location: "Patna",
    dateRange: "2018",
    grade: "75.67%",
    gradeType: "Percentage",
  },
]

// ============================================
// EXTRACURRICULAR ACTIVITIES
// ============================================
export const extracurriculars: Extracurricular[] = [
  { name: "Piano", icon: "music" },
  { name: "Skating", icon: "activity" },
  { name: "Badminton", icon: "activity" },
  { name: "Photography", icon: "camera" },
  { name: "Videography", icon: "video" },
]

// ============================================
// SITE METADATA
// ============================================
export const siteMetadata = {
  title: "Shival Gupta | AI, Robotics & XR Developer",
  description:
    "Portfolio of Shival Gupta – Building intelligent systems at the intersection of AI, Robotics, IoT, and Extended Reality.",
  keywords: [
    "AI Developer",
    "Robotics Engineer",
    "XR Developer",
    "VR Developer",
    "Full Stack Developer",
    "Next.js",
    "Unity",
    "ROS",
    "Machine Learning",
  ],
  author: contact.name,
  siteUrl: contact.website,
  ogImage: "/og-image.png",
}

// ============================================
// HERO SECTION CONTENT
// ============================================
export const heroContent = {
  greeting: "Hi, I'm",
  name: "Shival Gupta",
  tagline: "Building intelligent systems at the intersection of",
  highlights: ["AI", "Robotics", "IoT", "XR"],
  description:
    "I craft autonomous robots, immersive VR experiences, and intelligent IoT systems. Fresh B.Tech graduate from VIT Chennai, specializing in AI and Robotics.",
  cta: {
    primary: { text: "View Projects", href: "/projects" },
    secondary: { text: "Download Resume", href: "https://resume.shivalgupta.me/" },
  },
}
