import { createServer, Model, Factory, Response } from "miragejs";

// TypeScript interfaces
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
  applicationStatus?: "pending" | "reviewed" | "rejected"; // Optional status
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
export interface User{
  id:string;
  email:string
  password:string
  name:string
}

// --- SEARCH HELPER FUNCTION ---
// Helper to check if a job matches all search terms
function jobMatchesSearch(job: Job, searchTerm: string): boolean {
  if (!searchTerm) return true;
  
  const lowerSearchTerm = searchTerm.toLowerCase();
  const searchTerms = lowerSearchTerm.split(' ').filter(t => t); 

  return searchTerms.every(term => { 
    return (
      job.title.toLowerCase().includes(term) ||
      job.company.toLowerCase().includes(term) ||
      job.location.toLowerCase().includes(term) ||
      job.experience.toLowerCase().includes(term) ||
      job.skills.some((skill: string) => skill.toLowerCase().includes(term)) ||
      job.companyType.some((type: string) => type.toLowerCase().includes(term))
    );
  });
}

// makeServer({ environment: 'development' })

// export function makeServer({ environment = "development" } = {}) {
//   return
   createServer({
    //environment,

    models: {
      job: Model.extend<Partial<Job>>({}),
      application: Model.extend<Partial<Application>>({}),
      favorite: Model.extend<Partial<Favorite>>({}),
      user: Model.extend<Partial<User>>({}),
    },

    factories: {
      job: Factory.extend({
        title(i: number) {
          const titles = [
            "Senior Frontend Developer",
            "Engineering Manager",
            "Full Stack Developer",
            "DevOps Engineer",
            "UI/UX Designer",
            "Backend Developer",
            "Data Scientist",
            "Product Manager",
            "QA Engineer",
            "Cloud Architect",
          ];
          return titles[i % titles.length];
        },
        company(i: number) {
          const companies = [
            "Accelon",
            "Quidcash",
            "TechCorp",
            "InnoSoft",
            "DataVault",
            "CloudNine",
            "ByteWorks",
            "NexGen",
            "AgileMinds",
            "CoreStack",
          ];
          return companies[i % companies.length];
        },
        companyType() {
          const types = [
            ["Enterprise", "Product & Service", "B2B"],
            ["Startup", "Product", "B2C"],
            ["Enterprise", "Service", "B2B"],
            ["Startup", "Product", "B2B"],
          ];
          return types[Math.floor(Math.random() * types.length)];
        },
        stage() {
          const stages = ["Bootstrapped", "Pre-seed", "Seed", "Series A", "Series B"];
          return stages[Math.floor(Math.random() * stages.length)];
        },
        industry() {
          const industries = [
            "Software Development",
            "Fintech",
            "Healthcare",
            "E-commerce",
            "EdTech",
          ];
          return industries[Math.floor(Math.random() * industries.length)];
        },
        location(i: number) {
          const locations = [
            "Pune, Maharashtra, India",
            "Bangalore, Karnataka, India",
            "Mumbai, Maharashtra, India",
            "Hyderabad, Telangana, India",
            "Delhi, NCR, India",
          ];
          return locations[i % locations.length];
        },
        workMode() {
          const modes: Array<"Hybrid" | "On-site" | "Remote"> = ["Hybrid", "On-site", "Remote"];
          return modes[Math.floor(Math.random() * modes.length)];
        },
        employmentType() {
          return "Permanent" as const;
        },
        experience() {
          const exp = ["0-2 Years", "2-5 Years", "6-12 Years", "8-12 Years", "10+ Years"];
          return exp[Math.floor(Math.random() * exp.length)];
        },
        salary(i: number) {
          const salaries = [
            "₹ 24-34 Lacs PA",
            "₹ 40-60 Lacs PA",
            "₹ 15-25 Lacs PA",
            "₹ 30-45 Lacs PA",
            "₹ 50-70 Lacs PA",
          ];
          return salaries[i % salaries.length];
        },
        skills() {
          const allSkills = [
            "JavaScript",
            "TypeScript",
            "React.js",
            "Node.js",
            "Python",
            "Java",
            "AWS",
            "Docker",
            "Kubernetes",
            "MongoDB",
            "PostgreSQL",
            "GraphQL",
            "REST APIs",
            "CI/CD",
            "TensorFlow",
            "Machine Learning",
          ];
          const numSkills = Math.floor(Math.random() * 5) + 3;
          return [...allSkills].sort(() => 0.5 - Math.random()).slice(0, numSkills);
        },
        description() {
          return "We are looking for a talented professional to join our growing team. You will work on cutting-edge projects and collaborate with cross-functional teams to deliver high-quality solutions.";
        },
        requirements() {
          return [
            "Strong problem-solving skills",
            "Excellent communication abilities",
            "Experience with modern development practices",
            "Ability to work in a fast-paced environment",
          ];
        },
        postedDate() {
          const daysAgo = Math.floor(Math.random() * 30);
          const date = new Date();
          date.setDate(date.getDate() - daysAgo);
          return date.toISOString();
        },
        applicationCount() {
          return Math.floor(Math.random() * 50);
        },
        isActive() {
          return true;
        },
        applicationStatus: undefined, // Default to no status
      }),

       user: Factory.extend({
        id(i: number) {
          return `u${i+1}`;
        },
        email(i: number) {
          return `user${i+1}@test.com`;
        },
        password() {
          return "123"; // Simple password for testing
        },
        name(i: number) {
          const names = ["Alice", "Bob", "Charlie", "David"];
          return names[i % names.length];
        }
      })

    },

    seeds(server) {
      // Create 50 jobs
      server.createList("job", 50);
      server.create("user", { email: "user@test.com", name: "Test User", id: "u1" });

      // Seed some applications for our test user            ---new
      const jobs = server.schema.all("job").models;
      server.create("application", { jobId: jobs[0].id, userId: "u1", status: "pending", appliedDate: new Date().toISOString() });
      server.create("application", { jobId: jobs[2].id, userId: "u1", status: "reviewed", appliedDate: new Date().toISOString() });
      server.create("application", { jobId: jobs[4].id, userId: "u1", status: "rejected", appliedDate: new Date().toISOString() });
  
    },

    routes() {
      this.namespace = "api";
      this.timing = 800; // Simulate network delay

      // --- NEW: Login Route ---
      this.post("/login", (schema, request) => {
        const { email, password } = JSON.parse(request.requestBody);
        
        // Find user by email and password
        const foundUser = schema.all("user").models.find(
          (user: any) => user.email === email && user.password === password
        );
        
        if (!foundUser) {
          return new Response(401, {}, { message: "Invalid email or password" });
        }

        // Don't send the password back
        const { password: _, ...userWithoutPassword } = foundUser.attrs;

        return {
          user: userWithoutPassword,
          token: `fake-token-for-${foundUser.id}` // Send a fake token
        };
      });
      
      // //Get all jobs with filtering
      // this.get("/jobs", (schema, request) => {
      //   const { search, experience } = request.queryParams;
        
      //   let jobs = schema.all("job").models;


      //    // --- Handle Search Term ---
      //   // This now checks title, company, location, and skills
      //   const searchTerm = Array.isArray(search) ? search[0] : search;
      //   if (searchTerm) {
      //     const lowerSearchTerm = searchTerm.toLowerCase();
      //     const searchTerms = lowerSearchTerm.split(' ').filter(t => t); // Split query into individual words

      //     jobs = jobs.filter((job: any) => {
      //       // Check if *any* of the search terms match
      //       return searchTerms.every(term => {
      //         return (
      //           job.title.toLowerCase().includes(term) ||
      //           job.company.toLowerCase().includes(term) ||
      //           job.location.toLowerCase().includes(term) ||
      //           job.skills.some((skill: string) => skill.toLowerCase().includes(term)) ||
      //           job.companyType.some((type: string) => type.toLowerCase().includes(term))
      //           // ||
      //           // job.experience.some((yrs:string) => yrs.includes(term))
      //           //job.experience.toLowerCase().includes(term)
      //         );
      //       });
      //     });
      //   }

      //   return { jobs };
      // });

      // --- JOBS ---
      this.get("/jobs", (schema, request) => {
        const { search } = request.queryParams;
        let jobs = schema.all("job").models as Job[];
        const searchTerm = Array.isArray(search) ? search[0] : search;
        
        // Use the helper function for searching
        if (searchTerm) {
          jobs = jobs.filter((job: Job) => jobMatchesSearch(job, searchTerm));
        }
        
        return { jobs };
      });

      // Get single job
      this.get("/jobs/:id", (schema, request) => {
        const id = request.params.id;
        return schema.find("job", id);
      });


        // --- Application Routes (UPDATED) ---

      this.post("/jobs/:id/apply", (schema, request) => {          
        const jobId = request.params.id;
        const { userId } = JSON.parse(request.requestBody);

        if (!userId) {
          return new Response(401, {}, { error: "User not authenticated" });
        }

        const existingApplication = schema
          .all("application")
          .models.find(
            (app: any) => app.jobId === jobId && app.userId === userId
          );
        if (existingApplication) {
          return new Response(400, {}, { error: "Already applied to this job" });
        }
        const application = schema.create("application", {
          jobId,
          userId,
          status: "pending",
          appliedDate: new Date().toISOString(),
        });
        return application;
      });

      // this.get("/applications", (schema, request) => {
      
      //   const { userId } = request.queryParams;
      //   if (!userId) {
      //       return new Response(401, {}, { error: "User not specified" });
      //   }
      //   const applications = schema
      //     .all("application")
      //     .models.filter((app: any) => app.userId === userId);
      //   return { applications };
      // });

       // UPDATED /applications route
      this.get("/applications", (schema, request) => {
        const { userId, search } = request.queryParams;
        const searchTerm = Array.isArray(search) ? search[0] : search;
        if (!userId) {
          return new Response(401, {}, { error: "User not specified" });
        }

        // 1. Find all application models for the user
        const applications = schema.all("application").models.filter((app: any) => app.userId === userId);
        
         // Create a map of jobId -> status for quick lookup
        const appStatusMap = new Map<string, "pending" | "reviewed" | "rejected">();
        applications.forEach((app: any) => {
            appStatusMap.set(app.jobId, app.status);
        });

      //   // 2. Get the job IDs from those applications
      //   //const jobIds = applications.map((app: any) => app.jobId);
      //   const jobIds = Array.from(appStatusMap.keys());
        
      //   // 3. Find all jobs that match those IDs
      //   let appliedJobs = schema.all("job").models.filter((job: any) => jobIds.includes(job.id)) as Job[];
        
      //   // 4. (NEW) Filter these jobs by the search term
      //   if (searchTerm) {
      //     appliedJobs = appliedJobs.filter((job: Job) => jobMatchesSearch(job, searchTerm));
      //   }

      //  // return { jobs: appliedJobs }; // Return the filtered list of *jobs*
      //  // Add the applicationStatus to each job object before returning
      //   const appliedJobsWithStatus = appliedJobs.map(job => ({
      //       ...job.attrs,
      //       applicationStatus: appStatusMap.get(job.id)
      //   }));


       const jobIds = Array.from(appStatusMap.keys());
       // FIX 1: Remove the incorrect 'as Job[]' cast. 
        // 'appliedJobs' is now correctly typed as an array of Mirage Models.
        let appliedJobs = schema.all("job").models.filter((job: any) => jobIds.includes(job.id));
        
        if (searchTerm) {
          // FIX 2: Pass 'job.attrs' (the plain object) to the search function,
          // not the whole Mirage model.
          appliedJobs = appliedJobs.filter((job: any) => jobMatchesSearch(job.attrs as Job, searchTerm));
        }

        // Add the applicationStatus to each job object before returning
        // FIX 3: 'job' here is a Mirage Model, so we access 'job.attrs'
        const appliedJobsWithStatus = appliedJobs.map(job => ({
            ...job.attrs, // This now works!
            applicationStatus: appStatusMap.get(job.id || '') // job.id works on a model
        }));

        return { jobs: appliedJobsWithStatus }; 
      });




















      // --- Favorite Routes (UPDATED) ---

      this.post("/jobs/:id/favorite", (schema, request) => {
        const jobId = request.params.id;
        // UPDATED: Read userId from request body
        const { userId } = JSON.parse(request.requestBody);

        if (!userId) {
          return new Response(401, {}, { error: "User not authenticated" });
        }

        const existingFavorite = schema
          .all("favorite")
          .models.find(
            (fav: any) => fav.jobId === jobId && fav.userId === userId
          );
        if (existingFavorite) {
          return new Response(400, {}, { error: "Already in favorites" });
        }
        const favorite = schema.create("favorite", {
          jobId,
          userId,
          savedDate: new Date().toISOString(),
        });
        return favorite;
      });

      this.delete("/jobs/:id/favorite", (schema, request) => {
        const jobId = request.params.id;
         // UPDATED: Read userId from query params (or body, for DELETE)
         // Let's use query params for simplicity on DELETE
        const { userId } = request.queryParams;
        
        if (!userId) {
          return new Response(401, {}, { error: "User not authenticated" });
        }

        const favorite = schema
          .all("favorite")
          .models.find(
            (fav: any) => fav.jobId === jobId && fav.userId === userId
          );
        if (favorite) {
          favorite.destroy();
        }
        return new Response(204);
      });

      this.get("/favorites", (schema, request) => {
         // UPDATED: Filter by userId from query param
        const { userId } = request.queryParams;
        if (!userId) {
            return new Response(401, {}, { error: "User not specified" });
        }
        const favorites = schema
          .all("favorite")
          .models.filter((fav: any) => fav.userId === userId);
        return { favorites };
      });
  
      // // Apply to job
      // this.post("/jobs/:id/apply", (schema, request) => {
      //   const jobId = request.params.id;
      //   const userId = "user-1"; // Hardcoded for now

      //   // Check if already applied
      //   const existingApplication = schema
      //     .all("application")
      //     .models.find(
      //       (app: any) => app.jobId === jobId && app.userId === userId
      //     );

      //   if (existingApplication) {
      //     return new Response(400, {}, { error: "Already applied to this job" });
      //   }

      //   const application = schema.create("application", {
      //     jobId,
      //     userId,
      //     status: "pending",
      //     appliedDate: new Date().toISOString(),
      //   });

      //   return application;
      // });

      // // Get user's applications
      // this.get("/applications", (schema) => {
      //   const userId = "user-1";
      //   const applications = schema
      //     .all("application")
      //     .models.filter((app: any) => app.userId === userId);

      //   return { applications };
      // });

      // // Add to favorites
      // this.post("/jobs/:id/favorite", (schema, request) => {
      //   const jobId = request.params.id;
      //   const userId = "user-1";

      //   const existingFavorite = schema
      //     .all("favorite")
      //     .models.find(
      //       (fav: any) => fav.jobId === jobId && fav.userId === userId
      //     );

      //   if (existingFavorite) {
      //     return new Response(400, {}, { error: "Already in favorites" });
      //   }

      //   const favorite = schema.create("favorite", {
      //     jobId,
      //     userId,
      //     savedDate: new Date().toISOString(),
      //   });

      //   return favorite;
      // });

      // // Remove from favorites
      // this.delete("/jobs/:id/favorite", (schema, request) => {
      //   const jobId = request.params.id;
      //   const userId = "user-1";

      //   const favorite = schema
      //     .all("favorite")
      //     .models.find(
      //       (fav: any) => fav.jobId === jobId && fav.userId === userId
      //     );

      //   if (favorite) {
      //     favorite.destroy();
      //   }

      //   return new Response(204);
      // });

      // // Get user's favorites
      // this.get("/favorites", (schema) => {
      //   const userId = "user-1";
      //   const favorites = schema
      //     .all("favorite")
      //     .models.filter((fav: any) => fav.userId === userId);

      //   return { favorites };
      // });
    },
  });
//}