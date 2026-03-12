
import type { Project } from "@/lib/types";
import { PlaceHolderImages } from "@/lib/placeholder-images";

export const projectsData: Project[] = [
  {
    id: "proj-1",
    slug: "campus-assistant",
    title: "Campus Assistant",
    category: "app",
    description: "A comprehensive education app for university students, featuring course management, campus info, and notifications.",
    longDescription: "Campus Assistant is a multi-platform application designed to be a one-stop solution for university students. It helps them manage their academic life by providing easy access to course materials, real-time campus notifications, and essential university information.",
    keyFeatures: ["Course Management & Schedule", "Real-time Notifications", "Campus Information Hub", "Student Profile Management"],
    role: "Lead Flutter Developer",
    challenges: "The main challenge was integrating with various university data sources and ensuring real-time notification delivery across both Android and web platforms efficiently.",
    imageUrl: PlaceHolderImages.find((img) => img.id === "project-1-screenshot")?.imageUrl || "https://picsum.photos/seed/campus1/800/600",
    imageHint: "education app",
    tags: ["Flutter", "Firebase", "Figma", "Android", "Web"],
    playStoreLink: "https://play.google.com/store/apps/details?id=com.sofolit.campusassistant",
    repoLink: "https://github.com/sofolitltd/campusassistant",
    liveLink: "https://campusassistant.web.app/",
    results: ["Unified 5 disparate data sources", "Automated student notification engine", "Cross-platform consistency achieved"],
    metrics: [
      { label: "Status", value: "Live & Scaling" },
      { label: "Platform", value: "Multi-OS" },
      { label: "Reliability", value: "99.9%" }
    ]
  },
  {
    id: "proj-2",
    slug: "the-forge",
    title: "The Forge",
    category: "website",
    description: "A high-performance digital presence built for a creative powerhouse, focusing on immersive visual storytelling.",
    longDescription: "The Forge needed a digital flagship that matched their creative intensity. We built an ultra-fast, visually immersive platform that prioritizes high-resolution work and seamless user journeys.",
    keyFeatures: ["Immersive Project Showcase", "Ultra-fast Next.js Frame", "Seamless Content Management", "Responsive Narrative Design"],
    role: "Full-Stack Strategy & Dev",
    challenges: "The challenge was delivering 4K visual content without sacrificing performance. We implemented a sophisticated asset pipeline to ensure instant loading.",
    imageUrl: PlaceHolderImages.find((img) => img.id === "project-2-screenshot")?.imageUrl || "https://picsum.photos/seed/forge1/800/600",
    imageHint: "luxury agency website",
    tags: ["Next.js", "Sanity CMS", "Vercel", "Performance"],
    liveLink: "https://theforgebd.vercel.app/",
    results: ["Instant page loads achieved", "SEO optimization optimized", "Mobile-first experience perfected"],
    metrics: [
      { label: "Performance", value: "Grade A" },
      { label: "Experience", value: "Seamless" },
      { label: "Visibility", value: "Indexed" }
    ]
  },
  {
    id: "proj-3",
    slug: "petelements-bd",
    title: "Petelements BD",
    category: "website",
    description: "A robust e-commerce engine powering a thriving local brand, from inventory to checkout.",
    longDescription: "We transformed Petelements' manual operations into a fully automated e-commerce powerhouse, handling complex inventory and local delivery logistics at scale.",
    keyFeatures: ["Real-time Inventory Sync", "Secure Payment Integration", "Optimized Mobile Checkout", "Logistics Routing"],
    role: "E-commerce Architect",
    challenges: "Building a bridge between physical store inventory and the digital storefront to ensure 100% order accuracy.",
    imageUrl: PlaceHolderImages.find((img) => img.id === "project-3-screenshot")?.imageUrl || "https://picsum.photos/seed/pet1/800/600",
    imageHint: "thriving pet e-commerce",
    tags: ["WordPress", "E-commerce", "WooCommerce", "Sales"],
    liveLink: "https://www.petelementsbd.com/",
    results: ["Operations fully automated", "Reduced checkout friction", "Zero inventory mismatches"],
    metrics: [
      { label: "Scale", value: "Thriving" },
      { label: "Accuracy", value: "100%" },
      { label: "Support", value: "Priority" }
    ]
  },
  {
    id: "proj-4",
    slug: "wellbeing-clinic",
    title: "Wellbeing Clinic",
    category: "app",
    description: "A secure, HIPAA-ready telehealth platform designed for sensitive mental health consultations.",
    longDescription: "Focused on privacy and trust, this platform connects patients with specialists through an encrypted, intuitive interface that removes barriers to care.",
    keyFeatures: ["Encrypted Consultations", "Secure Health Records", "Automated Scheduling", "Patient Trust Portal"],
    role: "Lead Platform Engineer",
    challenges: "Implementing a multi-layer security architecture while keeping the user interface extremely simple for patients.",
    imageUrl: PlaceHolderImages.find((img) => img.id === "project-4-screenshot")?.imageUrl || "https://picsum.photos/seed/well1/800/600",
    imageHint: "secure health platform",
    tags: ["HIPAA", "Encryption", "Flutter", "HealthTech"],
    liveLink: "https://wellbeingclinic.web.app/",
    repoLink: "https://github.com/sofolitltd/wellbeing-clinic",
    playStoreLink: "https://play.google.com/store/apps/details?id=com.sofolit.wellbeingclinic",
    results: ["Zero-knowledge security", "Seamless booking flow", "Accessible care platform"],
    metrics: [
      { label: "Security", value: "Bank-Grade" },
      { label: "Compliance", value: "Verified" },
      { label: "Access", value: "Instant" }
    ]
  },
  {
    id: "proj-5",
    slug: "blood-finder-app",
    title: "Blood Finder App",
    category: "app",
    description: "A life-critical emergency network built for rapid, real-time response when every second counts.",
    longDescription: "Using geolocation and high-availability messaging, we built a network that alerts potential donors instantly during emergencies.",
    keyFeatures: ["Geo-fenced Alerts", "Instant Notifications", "Live Donor Database", "Emergency Response Hub"],
    role: "Systems Architect",
    challenges: "Ensuring near-zero latency for push notifications across various network strengths and device types.",
    imageUrl: PlaceHolderImages.find((img) => img.id === "project-5-screenshot")?.imageUrl || "https://picsum.photos/seed/blood1/800/600",
    imageHint: "life-saving tech",
    tags: ["Firebase", "GeoLocation", "Real-Time"],
    liveLink: "https://bloodfinder.web.app/",
    repoLink: "https://github.com/sofolitltd/bloodfinder",
    playStoreLink: "https://play.google.com/store/apps/details?id=com.sofolit.bloodfinder",
    results: ["Real-time alerts active", "Sub-second sync", "Massive donor network"],
    metrics: [
      { label: "Response", value: "Instant" },
      { label: "Network", value: "Verified" },
      { label: "Availability", value: "24/7" }
    ]
  },
  {
    id: "proj-6",
    slug: "certificate-generator",
    title: "Certificate Generator",
    category: "app",
    description: "An automated credentialing engine built for high-volume, tamper-proof document generation.",
    longDescription: "We solved the bottleneck of manual certifications by building a batch PDF engine that generates thousands of documents with professional accuracy.",
    keyFeatures: ["Batch Processing Engine", "Custom Template System", "High-Fidelity PDF Output", "Email Automation"],
    role: "Backend Engineer",
    challenges: "Optimizing server-side PDF rendering for massive document batches without hitting memory limits.",
    imageUrl: PlaceHolderImages.find((img) => img.id === "project-6-screenshot")?.imageUrl || "https://picsum.photos/seed/cert1/800/600",
    imageHint: "automation tool",
    tags: ["Automation", "PDF Engine", "Performance"],
    repoLink: "https://github.com/sofolitltd/certificate-generator",
    results: ["Workflow fully automated", "Tamper-proof output", "Massive time savings"],
    metrics: [
      { label: "Manual Work", value: "Eliminated" },
      { label: "Output", value: "Precision" },
      { label: "Speed", value: "Batch" }
    ]
  },
  {
    id: "proj-7",
    slug: "priyo-banskhali",
    title: "Priyo Banskhali",
    category: "app",
    description: "A digital community heartbeat serving a hyper-local population with news and essential services.",
    longDescription: "This app serves as the central hub for a local region, bringing news, business listings, and emergency resources to a mobile-first audience.",
    keyFeatures: ["Curated Community Feed", "Verified Business Directory", "Regional Service Hub", "Local Resource Logic"],
    role: "Lead Developer",
    challenges: "Focusing on extreme accessibility for users with limited data and older mobile hardware.",
    imageUrl: PlaceHolderImages.find((img) => img.id === "project-7-screenshot")?.imageUrl || "https://picsum.photos/seed/priyo1/800/600",
    imageHint: "community tech",
    tags: ["Community", "Growth", "Accessibility"],
    repoLink: "https://github.com/sofolitltd/priyobanskhali",
    playStoreLink: "https://play.google.com/store/apps/details?id=com.sofolit.priyobanshkhali",
    results: ["Regional trust leader", "Hyper-local impact", "Verified directory"],
    metrics: [
      { label: "Trust", value: "High" },
      { label: "Uptime", value: "Rock Solid" },
      { label: "Impact", value: "Local" }
    ]
  },
  {
    id: "proj-8",
    slug: "abrar-shop",
    title: "Abrar Shop",
    category: "app",
    description: "A modern D2C commerce experience that brought professional credible shopping to mobile users.",
    longDescription: "Abrar Shop redefined their digital sales by moving from social selling to a dedicated, high-tier mobile application with integrated payments.",
    keyFeatures: ["Refined UI/UX Flow", "Seamless bKash Checkout", "Smart Order Management", "Direct Store Experience"],
    role: "Mobile Product Lead",
    challenges: "Integrating local payment gateways while maintaining a modern, high-tier app feel.",
    imageUrl: PlaceHolderImages.find((img) => img.id === "project-8-screenshot")?.imageUrl || "https://picsum.photos/seed/abrar1/800/600",
    imageHint: "d2c brand app",
    tags: ["D2C", "Growth", "Payments"],
    repoLink: "https://github.com/sofolitltd/abrar",
    playStoreLink: "https://play.google.com/store/apps/details?id=com.sofolit.abrar",
    results: ["Direct sales engine active", "Payment friction reduced", "Brand loyalty increased"],
    metrics: [
      { label: "Payments", value: "Verified" },
      { label: "Logic", value: "Stateful" },
      { label: "Growth", value: "Flagship" }
    ]
  }
];
