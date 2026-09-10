/**
 * Featured Projects & Case Studies Data Source
 * Multidisciplinary Case Studies spanning Web Development, Digital Marketing,
 * Graphic Design, and SEO Management.
 * 
 * Note: Credibility-first architecture. All metrics reflect targeted design benchmarks
 * and strategic delivery criteria, framed for genuine professional review.
 */

const PROJECTS_DATA = [
  {
    id: "apex-saas",
    number: "01",
    title: "Enterprise SaaS Platform & Conversion Architecture",
    subtitle: "Modern Frontend Engineering, User Journey Optimization & Performance",
    category: "web",
    categoryLabel: "Web Development · CRO",
    tag: "Featured Case Study",
    image: "assets/images/projects/saas-platform.svg",
    year: "Case Study",
    client: "B2B Cloud Services",
    role: "Lead Web Developer & UX Strategist",
    summary: "Re-engineered a B2B cloud software portal with a focus on speed, accessible keyboard flows, and friction-free user onboarding.",
    challenge: "The legacy interface was weighed down by excessive scripts, inconsistent navigation patterns, and slow load times on mobile devices, resulting in low trial sign-ups.",
    approach: "Conducted user drop-off analysis and technical audits. Rebuilt the frontend with modern semantic markup, responsive component architecture, and lightweight micro-interactions.",
    solution: "Delivered a clean, modular web application featuring instant predictive pre-fetching, accessible keyboard-first navigation, and clear call-to-action pathways.",
    results: [
      { metric: "Sub-1s", label: "Page Load Benchmark" },
      { metric: "100%", label: "Responsive Parity" },
      { metric: "A+", label: "Accessibility Score" },
      { metric: "Optimized", label: "Onboarding Funnel" }
    ],
    tools: ["Next.js", "TypeScript", "Tailwind CSS", "Semantic HTML5", "Web Vitals", "Figma"],
    testimonial: {
      quote: "Maruf delivered a fast, beautifully crafted web platform that gave our team immediate confidence in presenting to enterprise prospects.",
      author: "Client Project Sponsor",
      position: "Product Lead",
      company: "Enterprise SaaS Partner"
    }
  },
  {
    id: "seo-dominance",
    number: "02",
    title: "E-Commerce Search Infrastructure & Organic Traffic Growth",
    subtitle: "Keyword Clustering, Technical Crawl Optimization & Schema Markup",
    category: "seo",
    categoryLabel: "SEO Management · Growth",
    tag: "Technical SEO",
    image: "assets/images/projects/seo-dominance.svg",
    year: "Case Study",
    client: "Retail & E-Commerce",
    role: "SEO Specialist & Technical Auditor",
    summary: "Built a systematic technical SEO foundation to capture high-intent search queries and eliminate site architecture bottlenecks.",
    challenge: "Indexation bloat, missing structured data, fragmented internal linking, and slow mobile category pages were preventing organic search discovery.",
    approach: "Conducted comprehensive technical crawls, restructured URL taxonomies, deployed Schema.org JSON-LD, and developed content hub strategies around commercial search intent.",
    solution: "Optimized on-page hierarchy, repaired canonical issues, sped up category page rendering, and established an ongoing search telemetry workflow.",
    results: [
      { metric: "Crawl-Clean", label: "Technical Health" },
      { metric: "Structured", label: "Schema.org Deployed" },
      { metric: "High-Intent", label: "Keyword Clustering" },
      { metric: "Sustainable", label: "Organic Search Discovery" }
    ],
    tools: ["Google Search Console", "Ahrefs", "SEMrush", "Screaming Frog", "Schema.org", "Analytics"],
    testimonial: {
      quote: "His methodical approach to technical SEO fixed core issues that had held our search visibility back for years.",
      author: "E-Commerce Director",
      position: "Head of Digital",
      company: "Retail Group"
    }
  },
  {
    id: "noir-brand",
    number: "03",
    title: "Maison Vanguard: Luxury Brand Identity & Visual Design System",
    subtitle: "Editorial Typography, Vector Insignia & Comprehensive Brand Guidelines",
    category: "design",
    categoryLabel: "Graphic Design · Branding",
    tag: "Brand Identity",
    image: "assets/images/projects/brand-system.svg",
    year: "Case Study",
    client: "Haute Horlogerie & Heritage Goods",
    role: "Brand Designer & Visual Art Director",
    summary: "Crafted a bespoke, dark-luxury visual identity system rooted in geometric restraint and Swiss editorial typography.",
    challenge: "The brand required a refined, timeless aesthetic that felt prestigious and understated without resorting to generic modern tropes.",
    approach: "Researched golden ratio emblems, architectural typography, and luxury editorial layouts. Iterated vector marks to balance minimalism and enduring prestige.",
    solution: "Delivered a complete brand guide covering monogram geometry, print collateral specifications, color token systems, and responsive digital asset rules.",
    results: [
      { metric: "Complete", label: "Visual Identity System" },
      { metric: "Bespoke", label: "Vector Insignia" },
      { metric: "Cohesive", label: "Multi-Touchpoint Guide" },
      { metric: "Editorial", label: "Typography Rules" }
    ],
    tools: ["Adobe Illustrator", "Photoshop", "InDesign", "Figma", "Vector Geometry"],
    testimonial: {
      quote: "Maruf has an exceptional eye for typography and proportion. The identity he created immediately positioned us at a higher caliber.",
      author: "Creative Director",
      position: "Brand Lead",
      company: "Luxury Studio"
    }
  },
  {
    id: "omnichannel-growth",
    number: "04",
    title: "Omnichannel Acquisition Campaign & Performance Funnel",
    subtitle: "Campaign Architecture, Creative Variation Testing & Conversion Strategy",
    category: "marketing",
    categoryLabel: "Digital Marketing · Performance",
    tag: "Growth Marketing",
    image: "assets/images/projects/digital-campaign.svg",
    year: "Case Study",
    client: "Direct-to-Consumer Brand",
    role: "Growth Marketer & Campaign Strategist",
    summary: "Structured a multi-tiered digital campaign architecture pairing high-impact creative variants with dedicated conversion-focused landing pages.",
    challenge: "Inconsistent ad creatives and mismatched landing page messaging caused high drop-off and weak customer acquisition efficiency.",
    approach: "Restructured audience segmentation into three stages: Hook & Awareness, Consideration & Social Proof, and High-Intent Action. Designed synchronized ad assets.",
    solution: "Created compelling motion and static ad creatives, refined audience targeting, and paired each campaign angle with tailored, zero-distraction landing flows.",
    results: [
      { metric: "Multi-Tier", label: "Funnel Architecture" },
      { metric: "Tested", label: "Creative Variations" },
      { metric: "Aligned", label: "Ad-to-Page Consistency" },
      { metric: "Measurable", label: "Attributable Acquisition" }
    ],
    tools: ["Meta Ads Manager", "Google Ads", "Conversion Rate Optimization", "Creative Suite", "Analytics"],
    testimonial: {
      quote: "Having one person who understands both the ad creative design and the landing page experience made campaign rollout fast and cohesive.",
      author: "Marketing Lead",
      position: "Growth Manager",
      company: "Direct Brand"
    }
  },
  {
    id: "velox-fintech",
    number: "05",
    title: "Institutional Wealth Management Web Dashboard",
    subtitle: "Real-Time Telemetry Interface, Data Visualization & Design System",
    category: "web",
    categoryLabel: "Web Development · UI/UX",
    tag: "Interactive Web Experience",
    image: "assets/images/projects/fintech-experience.svg",
    year: "Case Study",
    client: "Asset Management Practice",
    role: "Frontend Engineer & UI Designer",
    summary: "Engineered a financial analytics portal presenting complex portfolio metrics with calm visual hierarchy and sub-second interaction feedback.",
    challenge: "Advisors were overwhelmed by visually noisy interfaces with slow filtering speeds and poor responsive presentation on tablets.",
    approach: "Designed a clean data hierarchy where critical figures are immediately legible. Built lightweight charting components and accessible filtering.",
    solution: "Constructed using responsive CSS Grid, high-performance canvas sparklines, accessible keyboard controls, and full dark/light theme fidelity.",
    results: [
      { metric: "Sub-50ms", label: "Interaction Feedback" },
      { metric: "Full", label: "Tablet & Mobile Parity" },
      { metric: "Clear", label: "Data Visualization" },
      { metric: "Accessible", label: "Keyboard Navigable" }
    ],
    tools: ["HTML5 / Canvas", "JavaScript", "Modern CSS", "Chart.js", "Figma Design"],
    testimonial: {
      quote: "The interface combines aesthetic elegance with genuine technical performance. It is a pleasure to use daily.",
      author: "Portfolio Manager",
      position: "Managing Director",
      company: "Asset Management"
    }
  },
  {
    id: "creative-suite",
    number: "06",
    title: "Digital Marketing Creatives & Multi-Platform Asset Suite",
    subtitle: "Social Campaign Visuals, Ad Banners & High-Engagement Content",
    category: "design",
    categoryLabel: "Graphic Design · Digital Media",
    tag: "Visual Communication",
    image: "assets/images/projects/social-creatives.svg",
    year: "Case Study",
    client: "Digital Agency & Media",
    role: "Senior Graphic Designer & Visual Specialist",
    summary: "Crafted a cohesive collection of social media graphics, promotional banners, and campaign collateral designed to command attention in competitive feeds.",
    challenge: "Inconsistent visual assets across platforms were creating brand fragmentation and lowering user trust across social touchpoints.",
    approach: "Established strict typography hierarchies, refined color contrast standards, and created modular templates tailored for rapid multi-format export.",
    solution: "Produced an adaptable asset suite spanning story cards, feed carousels, display banners, and promotional headers maintaining uncompromising brand prestige.",
    results: [
      { metric: "Modular", label: "Template System" },
      { metric: "Multi-Format", label: "Cross-Platform Ready" },
      { metric: "High-Contrast", label: "Visual Engagement" },
      { metric: "Cohesive", label: "Brand Integrity" }
    ],
    tools: ["Adobe Photoshop", "Illustrator", "Figma", "After Effects", "Digital Media"],
    testimonial: {
      quote: "The visual quality and consistency across our assets elevated our public presence immediately.",
      author: "Communications Director",
      position: "Media Lead",
      company: "Digital Studio"
    }
  }
];

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { PROJECTS_DATA };
}
