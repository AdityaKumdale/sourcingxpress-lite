export interface Job {
  id: string;
  title: string;
  company: string;
  companyType: string[]; // ["Enterprise", "Product & Service", "B2B"]
  stage: string; // "Bootstrapped", "Pre-seed", "Series A", etc.
  industry: string; // "Software Development", "Fintech", etc.
  location: string;
  workMode: "Hybrid" | "On-site" | "Remote";
  employmentType: "Permanent" | "Contract" | "Internship";
  experience: string; // "6-12 Years"
  salary: string; // "₹ 24-34 Lacs PA"
  skills: string[];
  description: string;
  requirements: string[];
  postedDate: string; // ISO date string
  applicationCount: number;
  isActive: boolean;
}

export interface Application {
  id: string;
  jobId: string;
  userId: string;
  status: "pending" | "reviewed" | "rejected";
  appliedDate: string;
}

export interface Favorite {
  id: string;
  jobId: string;
  userId: string;
  savedDate: string;
}
