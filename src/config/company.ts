/**
 * Central company configuration — edit this file to update branding,
 * contact details, stats, testimonials, and service catalogue.
 */
export const company = {
  name: "HR Staff Outsourcing Services Ltd.",
  shortName: "HR Staff",
  tagline: "Reliable Staff. Right on Time.",
  description:
    "Professional staffing, manpower outsourcing and recruitment for homes, offices and businesses across Pakistan.",
  location: {
    city: "Lahore",
    country: "Pakistan",
    area: "Lahore & surrounding cities",
  },
  contact: {
    /** Live WhatsApp number (country code, no + or spaces) */
    whatsapp: "923204556419",
    phone: "+92 320 4556419",
    phoneDisplay: "0320 4556419",
    email: "hello@hrstaffoutsourcing.com",
    address: "Lahore, Punjab, Pakistan",
  },
  social: {
    facebook: "https://facebook.com",
    instagram: "https://instagram.com",
    youtube: "https://youtube.com",
  },
  /** PLACEHOLDER STATS — replace with real figures before launch */
  stats: [
    {
      id: "staff",
      value: 500,
      suffix: "+",
      label: { en: "Staff Placed", ur: "Staff Placed" },
      placeholder: true,
    },
    {
      id: "clients",
      value: 200,
      suffix: "+",
      label: { en: "Happy Clients", ur: "Khush Clients" },
      placeholder: true,
    },
    {
      id: "categories",
      value: 6,
      suffix: "+",
      label: { en: "Service Categories", ur: "Service Categories" },
      placeholder: true,
    },
    {
      id: "response",
      value: 24,
      suffix: "h",
      label: { en: "Average Response", ur: "Average Response" },
      placeholder: true,
    },
  ],
  trustChips: [
    { en: "Verified Staff", ur: "Verified Staff" },
    { en: "Same-Day Availability", ur: "Same-Day Availability" },
    { en: "Daily / Monthly / Contract", ur: "Daily / Monthly / Contract" },
  ],
  marqueeItems: [
    "Homes",
    "Offices",
    "Hotels",
    "Factories",
    "Call Centers",
    "Restaurants",
    "Schools",
    "Clinics",
  ],
  engagementModels: ["Daily", "Monthly", "Contract"] as const,
  cities: [
    "Lahore",
    "Islamabad",
    "Rawalpindi",
    "Faisalabad",
    "Multan",
    "Karachi",
    "Gujranwala",
    "Sialkot",
    "Other",
  ],
} as const;

export type EngagementModel = (typeof company.engagementModels)[number];

export const services = [
  {
    id: "cleaning",
    icon: "Sparkles",
    audience: ["home", "business"] as const,
    title: {
      en: "Cleaning Staff & Sweepers",
      ur: "Cleaning Staff & Sweepers",
    },
    description: {
      en: "Spotless homes, offices and floors — trained cleaners who show up on time and get the job done right.",
      ur: "Ghar, office aur floors ke liye trained cleaners — time pe aate hain, kaam saaf-suthra karte hain.",
    },
    bases: ["Daily", "Monthly", "Contract"] as const,
  },
  {
    id: "office-boys",
    icon: "Coffee",
    audience: ["business"] as const,
    title: {
      en: "Office Boys & Tea Boys",
      ur: "Office Boys & Tea Boys",
    },
    description: {
      en: "Reliable support staff for reception, pantry, errands and day-to-day office hospitality.",
      ur: "Reception, pantry, errands aur office hospitality ke liye reliable support staff.",
    },
    bases: ["Daily", "Monthly", "Contract"] as const,
  },
  {
    id: "housemaids",
    icon: "Home",
    audience: ["home"] as const,
    title: {
      en: "Housemaids & Domestic Staff",
      ur: "Housemaids & Domestic Staff",
    },
    description: {
      en: "Trusted domestic help for cleaning, laundry, childcare support and full household care.",
      ur: "Cleaning, laundry, bachchon ki madad aur poori ghar ki care ke liye trusted domestic staff.",
    },
    bases: ["Daily", "Monthly", "Contract"] as const,
  },
  {
    id: "trades",
    icon: "Wrench",
    audience: ["home", "business"] as const,
    title: {
      en: "Plumbers, Electricians & Carpenters",
      ur: "Plumbers, Electricians & Carpenters",
    },
    description: {
      en: "Skilled tradespeople for repairs, installations and urgent maintenance — homes and commercial sites.",
      ur: "Repairs, installations aur urgent maintenance ke liye skilled tradespeople — ghar aur commercial sites.",
    },
    bases: ["Daily", "Contract"] as const,
  },
  {
    id: "painters",
    icon: "Paintbrush",
    audience: ["home", "business"] as const,
    title: {
      en: "Painters & Maintenance Workers",
      ur: "Painters & Maintenance Workers",
    },
    description: {
      en: "Fresh paint, touch-ups and facility maintenance crews ready for short or long engagements.",
      ur: "Fresh paint, touch-ups aur facility maintenance teams — short ya long engagement.",
    },
    bases: ["Daily", "Monthly", "Contract"] as const,
  },
  {
    id: "personal",
    icon: "ChefHat",
    audience: ["home"] as const,
    title: {
      en: "Cooks, Washers & Personal Staff",
      ur: "Cooks, Washers & Personal Staff",
    },
    description: {
      en: "Home cooks, washermen and personal attendants screened for reliability and household fit.",
      ur: "Home cooks, washermen aur personal attendants — reliability aur household fit ke liye screened.",
    },
    bases: ["Daily", "Monthly", "Contract"] as const,
  },
  {
    id: "corporate",
    icon: "Building2",
    audience: ["business"] as const,
    title: {
      en: "Corporate Hiring & Staff Supply",
      ur: "Corporate Hiring & Staff Supply",
    },
    description: {
      en: "Bulk and ongoing staffing for HR firms, offices, hotels, factories and call centers.",
      ur: "HR firms, offices, hotels, factories aur call centers ke liye bulk aur ongoing staffing.",
    },
    bases: ["Monthly", "Contract"] as const,
  },
] as const;

export type ServiceId = (typeof services)[number]["id"];

export const industries = [
  {
    id: "offices",
    label: { en: "Offices", ur: "Offices" },
    roles: {
      en: [
        "Office boys & tea boys",
        "Reception & front-desk support",
        "Cleaners & janitorial staff",
        "Drivers & messengers",
      ],
      ur: [
        "Office boys & tea boys",
        "Reception & front-desk support",
        "Cleaners & janitorial staff",
        "Drivers & messengers",
      ],
    },
    benefits: {
      en: "Keep your workplace running smoothly with screened support staff on flexible terms.",
      ur: "Flexible terms pe screened support staff ke sath workplace smoothly chalaein.",
    },
  },
  {
    id: "hotels",
    label: { en: "Hotels", ur: "Hotels" },
    roles: {
      en: [
        "Housekeeping & room attendants",
        "Kitchen helpers & stewards",
        "Bellboys & lobby support",
        "Maintenance helpers",
      ],
      ur: [
        "Housekeeping & room attendants",
        "Kitchen helpers & stewards",
        "Bellboys & lobby support",
        "Maintenance helpers",
      ],
    },
    benefits: {
      en: "Scale hospitality teams for peak seasons, events and new property openings.",
      ur: "Peak seasons, events aur new properties ke liye hospitality teams scale karein.",
    },
  },
  {
    id: "industry",
    label: { en: "Industry", ur: "Industry" },
    roles: {
      en: [
        "Factory helpers & loaders",
        "Warehouse & packing staff",
        "Cleaners & sweepers",
        "Security support (as available)",
      ],
      ur: [
        "Factory helpers & loaders",
        "Warehouse & packing staff",
        "Cleaners & sweepers",
        "Security support (as available)",
      ],
    },
    benefits: {
      en: "Dependable manpower for shifts, production peaks and facility upkeep.",
      ur: "Shifts, production peaks aur facility upkeep ke liye dependable manpower.",
    },
  },
  {
    id: "call-centers",
    label: { en: "Call Centers", ur: "Call Centers" },
    roles: {
      en: [
        "Pantry & office boys",
        "Facility cleaners",
        "Floor support staff",
        "On-demand temporary cover",
      ],
      ur: [
        "Pantry & office boys",
        "Facility cleaners",
        "Floor support staff",
        "On-demand temporary cover",
      ],
    },
    benefits: {
      en: "Support high-density floors with reliable back-office and facility staffing.",
      ur: "High-density floors ke liye reliable back-office aur facility staffing.",
    },
  },
  {
    id: "hr-companies",
    label: { en: "HR Companies", ur: "HR Companies" },
    roles: {
      en: [
        "Overflow candidate supply",
        "Domestic & skilled trades pool",
        "Temp-to-perm pipelines",
        "White-label staffing support",
      ],
      ur: [
        "Overflow candidate supply",
        "Domestic & skilled trades pool",
        "Temp-to-perm pipelines",
        "White-label staffing support",
      ],
    },
    benefits: {
      en: "Partner with us to fill demand spikes and expand your fulfilment capacity.",
      ur: "Demand spikes fill karne aur fulfilment capacity expand karne ke liye partner banein.",
    },
  },
] as const;

/** SAMPLE TESTIMONIALS — replace with real client quotes before launch */
export const testimonials = [
  {
    id: "1",
    name: "Ayesha Khan",
    role: { en: "Homeowner, DHA Lahore", ur: "Homeowner, DHA Lahore" },
    quote: {
      en: "We needed a reliable housemaid within two days. They shortlisted three verified options and the one we chose has been with us for months.",
      ur: "Hamein do din mein reliable housemaid chahiye thi. Unhone teen verified options shortlist kiye — jo select kiya, woh months se hamare sath hai.",
    },
    rating: 5,
    sample: true,
  },
  {
    id: "2",
    name: "Bilal Ahmed",
    role: { en: "Operations Manager, Mid-size Office", ur: "Operations Manager, Mid-size Office" },
    quote: {
      en: "Our office boys and cleaners arrive on time every day. Replacement support when someone was sick made all the difference.",
      ur: "Hamare office boys aur cleaners roz time pe aate hain. Jab koi sick hota hai, replacement support se kaam rukta nahi.",
    },
    rating: 5,
    sample: true,
  },
  {
    id: "3",
    name: "Sara Malik",
    role: { en: "Hotel Supervisor", ur: "Hotel Supervisor" },
    quote: {
      en: "We scaled housekeeping for a wedding weekend with zero drama. Clear communication and staff who knew what they were doing.",
      ur: "Wedding weekend ke liye housekeeping scale ki — zero drama. Clear communication aur staff jo apna kaam jaante the.",
    },
    rating: 5,
    sample: true,
  },
  {
    id: "4",
    name: "Usman Raza",
    role: { en: "Factory Admin, Faisalabad", ur: "Factory Admin, Faisalabad" },
    quote: {
      en: "Contract helpers for packing season arrived screened and ready. Flexible numbers when demand shifted.",
      ur: "Packing season ke contract helpers screened aur ready aaye. Demand change hone pe numbers flexible rahe.",
    },
    rating: 4,
    sample: true,
  },
] as const;

export const faqs = [
  {
    id: "1",
    question: {
      en: "How quickly can you provide staff?",
      ur: "Aap kitni jaldi staff de sakte hain?",
    },
    answer: {
      en: "Many roles can be shortlisted the same day in Lahore. Complex or bulk requests typically get options within 24–48 hours, depending on requirements.",
      ur: "Lahore mein kai roles same day shortlist ho sakte hain. Complex ya bulk requests ke liye usually 24–48 hours mein options milte hain.",
    },
  },
  {
    id: "2",
    question: {
      en: "Are staff verified and background-checked?",
      ur: "Kya staff verified aur background-checked hota hai?",
    },
    answer: {
      en: "Yes. We screen candidates, verify identity where possible, and match them to your requirements before introduction. You always approve before anyone starts.",
      ur: "Haan. Hum candidates ko screen karte hain, identity verify karte hain jahan possible ho, aur aapki requirements se match karte hain. Start se pehle aap approve karte hain.",
    },
  },
  {
    id: "3",
    question: {
      en: "What if the staff member doesn’t work out?",
      ur: "Agar staff theek na rahe to?",
    },
    answer: {
      en: "We offer replacement support under our engagement terms. Tell us the issue and we will shortlist alternatives so your work doesn’t stall.",
      ur: "Hamari engagement terms ke mutabiq replacement support milta hai. Masla batayein — alternatives shortlist karenge taake aapka kaam na ruke.",
    },
  },
  {
    id: "4",
    question: {
      en: "Do you work on daily, monthly and contract basis?",
      ur: "Kya aap daily, monthly aur contract pe kaam karte hain?",
    },
    answer: {
      en: "Absolutely. Choose daily for short needs, monthly for ongoing household or office roles, or contract for projects and bulk corporate supply.",
      ur: "Bilkul. Short needs ke liye daily, ongoing roles ke liye monthly, aur projects/bulk corporate ke liye contract choose karein.",
    },
  },
  {
    id: "5",
    question: {
      en: "Which cities do you cover?",
      ur: "Aap kin cities mein available hain?",
    },
    answer: {
      en: "We are Lahore-based with strong coverage locally, and we support requests across major Pakistani cities depending on role and availability.",
      ur: "Hum Lahore-based hain, local coverage strong hai, aur major Pakistani cities mein role aur availability ke hisaab se support karte hain.",
    },
  },
  {
    id: "6",
    question: {
      en: "How do I request staff?",
      ur: "Staff kaise request karun?",
    },
    answer: {
      en: "Chat on WhatsApp, use the Find My Staff wizard, or submit the contact form. Share the role, timing and location — we’ll handle the rest.",
      ur: "WhatsApp pe chat karein, Find My Staff wizard use karein, ya contact form bhejein. Role, timing aur location batayein — baqi hum sambhalte hain.",
    },
  },
] as const;

export const whyUs = [
  {
    id: "verified",
    icon: "ShieldCheck",
    title: { en: "Verified & Background-checked", ur: "Verified & Background-checked" },
    description: {
      en: "Every candidate is screened so you meet people who match the role — not random walk-ins.",
      ur: "Har candidate screen hota hai taake aap role ke mutabiq log milen — random walk-ins nahi.",
    },
  },
  {
    id: "replacement",
    icon: "RefreshCw",
    title: { en: "Quick Replacement", ur: "Quick Replacement" },
    description: {
      en: "If someone doesn’t fit or can’t continue, we move fast to shortlist a replacement.",
      ur: "Agar koi fit na ho ya continue na kar sake, hum jaldi replacement shortlist karte hain.",
    },
  },
  {
    id: "flexible",
    icon: "CalendarDays",
    title: { en: "Flexible Plans", ur: "Flexible Plans" },
    description: {
      en: "Daily, monthly or contract — engage staff the way your home or business actually needs.",
      ur: "Daily, monthly ya contract — jis tarah aapke ghar ya business ko zaroorat ho.",
    },
  },
  {
    id: "trained",
    icon: "GraduationCap",
    title: { en: "Trained Staff", ur: "Trained Staff" },
    description: {
      en: "We prioritise people with relevant experience and clear expectations for the job.",
      ur: "Hum relevant experience wale logon ko priority dete hain, job expectations clear rakhti hain.",
    },
  },
  {
    id: "pricing",
    icon: "BadgeCheck",
    title: { en: "Transparent Pricing", ur: "Transparent Pricing" },
    description: {
      en: "No vague quotes. We discuss scope upfront so you know what you’re committing to.",
      ur: "Vague quotes nahi. Scope pehle clear — aapko pata hota hai aap kya commit kar rahe hain.",
    },
  },
  {
    id: "support",
    icon: "Headset",
    title: { en: "Dedicated Support", ur: "Dedicated Support" },
    description: {
      en: "A real human on WhatsApp and phone when you need updates, changes or urgent cover.",
      ur: "WhatsApp aur phone pe real human — updates, changes ya urgent cover ke liye.",
    },
  },
] as const;

export const howItWorks = [
  {
    step: 1,
    title: { en: "Tell us what you need", ur: "Bataiye kya chahiye" },
    description: {
      en: "Share the role, location, timing and whether it’s for home or business.",
      ur: "Role, location, timing aur home/business batayein.",
    },
  },
  {
    step: 2,
    title: { en: "We shortlist verified staff", ur: "Verified staff shortlist" },
    description: {
      en: "Our team matches screened candidates to your requirements and budget range.",
      ur: "Hamari team screened candidates ko aapki requirements se match karti hai.",
    },
  },
  {
    step: 3,
    title: { en: "You approve and interview", ur: "Aap approve aur interview" },
    description: {
      en: "Review profiles, speak with candidates, and only proceed when you’re comfortable.",
      ur: "Profiles dekhein, candidates se baat karein — jab comfortable hon tab aage badhein.",
    },
  },
  {
    step: 4,
    title: { en: "Staff starts — with backup", ur: "Staff start — backup ke sath" },
    description: {
      en: "They begin on the agreed basis, with replacement support if anything changes.",
      ur: "Agreed basis pe start — kuch change ho to replacement support available.",
    },
  },
] as const;

export const pricingModels = [
  {
    id: "daily",
    name: { en: "Daily Basis", ur: "Daily Basis" },
    summary: {
      en: "Ideal for one-off jobs, event cover and urgent short-term help.",
      ur: "One-off jobs, event cover aur urgent short-term help ke liye ideal.",
    },
    features: {
      en: [
        "Same-day or next-day options when available",
        "Clear day-rate discussion before confirmation",
        "Great for repairs, deep cleans and events",
        "No long-term commitment",
      ],
      ur: [
        "Available hone pe same-day ya next-day options",
        "Confirm se pehle clear day-rate discussion",
        "Repairs, deep cleans aur events ke liye behtareen",
        "Long-term commitment nahi",
      ],
    },
    cta: { en: "Request Daily Staff", ur: "Daily Staff Request Karein" },
  },
  {
    id: "monthly",
    name: { en: "Monthly Basis", ur: "Monthly Basis" },
    summary: {
      en: "Best for housemaids, cooks, office boys and ongoing domestic or office roles.",
      ur: "Housemaids, cooks, office boys aur ongoing roles ke liye best.",
    },
    features: {
      en: [
        "Stable staff for homes and offices",
        "Replacement support under engagement terms",
        "Predictable monthly arrangement",
        "Most popular for households",
      ],
      ur: [
        "Ghar aur office ke liye stable staff",
        "Engagement terms ke mutabiq replacement support",
        "Predictable monthly arrangement",
        "Households ke liye sab se popular",
      ],
    },
    cta: { en: "Request Monthly Staff", ur: "Monthly Staff Request Karein" },
    featured: true,
  },
  {
    id: "contract",
    name: { en: "Contract Basis", ur: "Contract Basis" },
    summary: {
      en: "Built for projects, bulk hiring and corporate outsourcing with defined terms.",
      ur: "Projects, bulk hiring aur corporate outsourcing ke liye — defined terms ke sath.",
    },
    features: {
      en: [
        "Bulk and multi-role supply",
        "Flexible duration and headcount",
        "Dedicated coordination for your account",
        "Suitable for hotels, industry & HR partners",
      ],
      ur: [
        "Bulk aur multi-role supply",
        "Flexible duration aur headcount",
        "Aapke account ke liye dedicated coordination",
        "Hotels, industry & HR partners ke liye suitable",
      ],
    },
    cta: { en: "Get a Contract Quote", ur: "Contract Quote Lein" },
  },
] as const;
