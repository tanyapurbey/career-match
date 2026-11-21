const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting CareerMatch Database Seeding...');

  // 1. Seed Skills (35 categorized skills)
  const skillData = [
    // Programming Languages
    { name: 'JavaScript', category: 'Programming Languages' },
    { name: 'Python', category: 'Programming Languages' },
    { name: 'Java', category: 'Programming Languages' },
    { name: 'C++', category: 'Programming Languages' },
    { name: 'TypeScript', category: 'Programming Languages' },
    { name: 'Go', category: 'Programming Languages' },
    { name: 'SQL', category: 'Programming Languages' },
    { name: 'HTML/CSS', category: 'Programming Languages' },

    // Frameworks & Libraries
    { name: 'React', category: 'Frameworks' },
    { name: 'Node.js', category: 'Frameworks' },
    { name: 'Express.js', category: 'Frameworks' },
    { name: 'Spring Boot', category: 'Frameworks' },
    { name: 'Django', category: 'Frameworks' },
    { name: 'FastAPI', category: 'Frameworks' },
    { name: 'Tailwind CSS', category: 'Frameworks' },
    { name: 'Next.js', category: 'Frameworks' },

    // Databases
    { name: 'PostgreSQL', category: 'Databases' },
    { name: 'MongoDB', category: 'Databases' },
    { name: 'MySQL', category: 'Databases' },
    { name: 'Redis', category: 'Databases' },
    { name: 'SQLite', category: 'Databases' },

    // Tools & DevOps
    { name: 'Git', category: 'Tools' },
    { name: 'Docker', category: 'Tools' },
    { name: 'Kubernetes', category: 'Tools' },
    { name: 'Linux', category: 'Tools' },
    { name: 'AWS', category: 'Tools' },
    { name: 'Postman', category: 'Tools' },
    { name: 'CI/CD', category: 'Tools' },

    // Other & Core CS
    { name: 'Data Structures & Algorithms', category: 'Other' },
    { name: 'REST APIs', category: 'Other' },
    { name: 'System Design', category: 'Other' },
    { name: 'Machine Learning', category: 'Other' },
    { name: 'Pandas', category: 'Other' },
    { name: 'TensorFlow', category: 'Other' },
    { name: 'Microservices', category: 'Other' }
  ];

  console.log(`Inserting ${skillData.length} skills...`);
  const skillsMap = {};
  for (const s of skillData) {
    const skill = await prisma.skill.upsert({
      where: { name: s.name },
      update: { category: s.category },
      create: s
    });
    skillsMap[skill.name] = skill.id;
  }

  // 2. Seed Demo Student
  console.log('Seeding Demo Student...');
  const student = await prisma.student.upsert({
    where: { email: 'tanya.sharma@example.edu' },
    update: {
      fullName: 'Tanya Sharma',
      phone: '+91 98765 43210',
      college: 'National Institute of Technology',
      degree: 'B.Tech',
      branch: 'Computer Science and Engineering',
      graduationYear: 2026,
      cgpa: 8.65,
      availableHoursPerWeek: 18.0
    },
    create: {
      fullName: 'Tanya Sharma',
      email: 'tanya.sharma@example.edu',
      phone: '+91 98765 43210',
      college: 'National Institute of Technology',
      degree: 'B.Tech',
      branch: 'Computer Science and Engineering',
      graduationYear: 2026,
      cgpa: 8.65,
      availableHoursPerWeek: 18.0
    }
  });

  // Assign Student Skills
  const studentSkillNames = [
    { name: 'Java', level: 'Advanced' },
    { name: 'Python', level: 'Advanced' },
    { name: 'JavaScript', level: 'Intermediate' },
    { name: 'SQL', level: 'Advanced' },
    { name: 'React', level: 'Intermediate' },
    { name: 'Node.js', level: 'Intermediate' },
    { name: 'Data Structures & Algorithms', level: 'Advanced' },
    { name: 'Git', level: 'Advanced' },
    { name: 'REST APIs', level: 'Advanced' },
    { name: 'PostgreSQL', level: 'Intermediate' },
    { name: 'Docker', level: 'Beginner' }
  ];

  for (const item of studentSkillNames) {
    if (skillsMap[item.name]) {
      await prisma.studentSkill.upsert({
        where: {
          studentId_skillId: {
            studentId: student.id,
            skillId: skillsMap[item.name]
          }
        },
        update: { proficiencyLevel: item.level },
        create: {
          studentId: student.id,
          skillId: skillsMap[item.name],
          proficiencyLevel: item.level
        }
      });
    }
  }

  // Assign Student Preferences
  await prisma.studentPreference.upsert({
    where: { studentId: student.id },
    update: {
      preferredLocations: 'Bengaluru, Hyderabad, Pune, Remote',
      preferredJobTypes: 'Internship, Graduate Program',
      preferredWorkModes: 'Remote, Hybrid',
      preferredRoles: 'Software Engineer Intern, Backend Developer, Full Stack Developer',
      minimumSalary: 35000,
      maximumApplicationsPerWeek: 8
    },
    create: {
      studentId: student.id,
      preferredLocations: 'Bengaluru, Hyderabad, Pune, Remote',
      preferredJobTypes: 'Internship, Graduate Program',
      preferredWorkModes: 'Remote, Hybrid',
      preferredRoles: 'Software Engineer Intern, Backend Developer, Full Stack Developer',
      minimumSalary: 35000,
      maximumApplicationsPerWeek: 8
    }
  });

  // 3. Seed 52 Realistic Synthetic Job Postings
  console.log('Seeding 52 Job Postings across 18 companies...');

  const jobsData = [
    {
      title: 'Backend Developer Intern',
      companyName: 'Razorpay',
      companyLogo: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=100&auto=format&fit=crop&q=60',
      description: 'Join our Core Payments engineering team to build scalable microservices handling millions of financial transactions per second.',
      responsibilities: 'Design RESTful APIs, optimize PostgreSQL queries, write unit and integration tests, collaborate with senior architects on high-throughput distributed systems.',
      location: 'Bengaluru',
      workMode: 'Hybrid',
      jobType: 'Internship',
      salaryMin: 45000,
      salaryMax: 60000,
      salaryCurrency: 'INR',
      requiredSkills: 'Java, Spring Boot, SQL, REST APIs, Git',
      preferredSkills: 'Docker, Redis, Microservices, AWS',
      minimumCGPA: 7.5,
      eligibleDegrees: 'B.Tech, B.E., MCA, M.Tech',
      eligibleGraduationYears: '2025, 2026',
      requiredExperience: 0,
      applicationDeadline: new Date(Date.now() + 15 * 86400000),
      estimatedApplicationMinutes: 45
    },
    {
      title: 'Software Engineer Intern - Full Stack',
      companyName: 'Swiggy',
      companyLogo: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=100&auto=format&fit=crop&q=60',
      description: 'Work with the consumer tech pod to build engaging, snappy frontend experiences and robust backend order-dispatch engines.',
      responsibilities: 'Develop user-facing features in React, build Node.js and Express backend services, optimize page load metrics and caching strategies.',
      location: 'Bengaluru',
      workMode: 'Remote',
      jobType: 'Internship',
      salaryMin: 50000,
      salaryMax: 70000,
      salaryCurrency: 'INR',
      requiredSkills: 'JavaScript, React, Node.js, REST APIs, Git',
      preferredSkills: 'TypeScript, Tailwind CSS, Redis, PostgreSQL',
      minimumCGPA: 7.0,
      eligibleDegrees: 'B.Tech, B.E., BCA, MCA',
      eligibleGraduationYears: '2025, 2026, 2027',
      requiredExperience: 0,
      applicationDeadline: new Date(Date.now() + 8 * 86400000),
      estimatedApplicationMinutes: 50
    },
    {
      title: 'Java Developer Intern',
      companyName: 'Infosys',
      companyLogo: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=100&auto=format&fit=crop&q=60',
      description: 'Part of the Enterprise Digital Services team creating mission-critical enterprise platforms for banking and logistics clients.',
      responsibilities: 'Develop backend modules using Java and Spring Boot, interact with relational databases, write clean algorithmic code following enterprise design patterns.',
      location: 'Pune',
      workMode: 'Hybrid',
      jobType: 'Internship',
      salaryMin: 25000,
      salaryMax: 35000,
      salaryCurrency: 'INR',
      requiredSkills: 'Java, Data Structures & Algorithms, SQL, Git',
      preferredSkills: 'Spring Boot, Linux, HTML/CSS',
      minimumCGPA: 6.5,
      eligibleDegrees: 'B.Tech, B.E., MCA, B.Sc',
      eligibleGraduationYears: '2025, 2026',
      requiredExperience: 0,
      applicationDeadline: new Date(Date.now() + 25 * 86400000),
      estimatedApplicationMinutes: 30
    },
    {
      title: 'Python Developer Intern',
      companyName: 'CRED',
      companyLogo: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=100&auto=format&fit=crop&q=60',
      description: 'Design algorithmic reward verification systems, fraud detection pipelines, and high-performance financial data parsers.',
      responsibilities: 'Write idiomatic Python and FastAPI services, build data pipelines with Pandas, integrate asynchronous messaging queues.',
      location: 'Bengaluru',
      workMode: 'On-site',
      jobType: 'Internship',
      salaryMin: 60000,
      salaryMax: 80000,
      salaryCurrency: 'INR',
      requiredSkills: 'Python, Data Structures & Algorithms, SQL, REST APIs',
      preferredSkills: 'FastAPI, Docker, Redis, PostgreSQL',
      minimumCGPA: 8.0,
      eligibleDegrees: 'B.Tech, B.E., M.Tech',
      eligibleGraduationYears: '2025, 2026',
      requiredExperience: 0,
      applicationDeadline: new Date(Date.now() + 5 * 86400000),
      estimatedApplicationMinutes: 60
    },
    {
      title: 'Associate Software Engineer',
      companyName: 'Atlassian',
      companyLogo: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=100&auto=format&fit=crop&q=60',
      description: 'Join Jira and Confluence cloud platform teams to build team collaboration software used by 250,000+ businesses worldwide.',
      responsibilities: 'Collaborate with cross-functional product managers, build resilient microservices in Java/Kotlin or React, write comprehensive end-to-end tests.',
      location: 'Remote',
      workMode: 'Remote',
      jobType: 'Graduate Program',
      salaryMin: 90000,
      salaryMax: 130000,
      salaryCurrency: 'INR',
      requiredSkills: 'Java, Data Structures & Algorithms, React, SQL',
      preferredSkills: 'Docker, AWS, Microservices, CI/CD',
      minimumCGPA: 8.0,
      eligibleDegrees: 'B.Tech, B.E., M.Tech',
      eligibleGraduationYears: '2025, 2026',
      requiredExperience: 0,
      applicationDeadline: new Date(Date.now() + 12 * 86400000),
      estimatedApplicationMinutes: 75
    },
    {
      title: 'Frontend Developer Intern',
      companyName: 'PhonePe',
      companyLogo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=100&auto=format&fit=crop&q=60',
      description: 'Develop next-generation mobile-responsive web interfaces for consumer merchant dashboards and payment gateways.',
      responsibilities: 'Build interactive dashboards in React and Tailwind CSS, optimize render speeds, ensure accessible and clean UI components.',
      location: 'Pune',
      workMode: 'Remote',
      jobType: 'Internship',
      salaryMin: 40000,
      salaryMax: 55000,
      salaryCurrency: 'INR',
      requiredSkills: 'JavaScript, React, HTML/CSS, Tailwind CSS, Git',
      preferredSkills: 'TypeScript, Next.js, REST APIs',
      minimumCGPA: 7.0,
      eligibleDegrees: 'B.Tech, B.E., BCA, MCA',
      eligibleGraduationYears: '2025, 2026, 2027',
      requiredExperience: 0,
      applicationDeadline: new Date(Date.now() + 18 * 86400000),
      estimatedApplicationMinutes: 40
    },
    {
      title: 'Cloud & DevOps Intern',
      companyName: 'Amazon',
      companyLogo: 'https://images.unsplash.com/photo-1523474253246-64e46d2290c5?w=100&auto=format&fit=crop&q=60',
      description: 'Support AWS customer solution architectures, infrastructure automation, container orchestration, and telemetry monitoring.',
      responsibilities: 'Automate build pipelines using CI/CD, create Docker containers, manage cloud provisioning scripts in Python and Linux shell.',
      location: 'Hyderabad',
      workMode: 'Hybrid',
      jobType: 'Internship',
      salaryMin: 65000,
      salaryMax: 85000,
      salaryCurrency: 'INR',
      requiredSkills: 'Linux, Git, Python, Docker, AWS',
      preferredSkills: 'Kubernetes, CI/CD, Go, System Design',
      minimumCGPA: 7.5,
      eligibleDegrees: 'B.Tech, B.E., MCA, M.Tech',
      eligibleGraduationYears: '2025, 2026',
      requiredExperience: 0,
      applicationDeadline: new Date(Date.now() + 10 * 86400000),
      estimatedApplicationMinutes: 60
    },
    {
      title: 'Data Analyst Intern',
      companyName: 'Flipkart',
      companyLogo: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=100&auto=format&fit=crop&q=60',
      description: 'Empower retail category managers with algorithmic price modeling, customer behavior insights, and inventory forecasting.',
      responsibilities: 'Extract queries from data warehouses via SQL, build statistical exploratory analysis in Python/Pandas, generate visual executive dashboards.',
      location: 'Bengaluru',
      workMode: 'Hybrid',
      jobType: 'Internship',
      salaryMin: 35000,
      salaryMax: 50000,
      salaryCurrency: 'INR',
      requiredSkills: 'SQL, Python, Pandas',
      preferredSkills: 'Data Structures & Algorithms, Machine Learning, PostgreSQL',
      minimumCGPA: 7.0,
      eligibleDegrees: 'B.Tech, B.E., B.Sc, BCA, MCA',
      eligibleGraduationYears: '2025, 2026',
      requiredExperience: 0,
      applicationDeadline: new Date(Date.now() + 20 * 86400000),
      estimatedApplicationMinutes: 35
    },
    {
      title: 'AI/ML Engineering Intern',
      companyName: 'Microsoft',
      companyLogo: 'https://images.unsplash.com/photo-1642543492481-44e81e3914a7?w=100&auto=format&fit=crop&q=60',
      description: 'Work on cutting-edge natural language processing and computer vision model evaluations within Microsoft Azure Cognitive Services.',
      responsibilities: 'Benchmark ML models, implement algorithmic data tokenizers, fine-tune transformer models using Python and PyTorch/TensorFlow.',
      location: 'Hyderabad',
      workMode: 'Hybrid',
      jobType: 'Internship',
      salaryMin: 80000,
      salaryMax: 100000,
      salaryCurrency: 'INR',
      requiredSkills: 'Python, Machine Learning, Data Structures & Algorithms',
      preferredSkills: 'TensorFlow, Pandas, Docker, Git',
      minimumCGPA: 8.5,
      eligibleDegrees: 'B.Tech, B.E., M.Tech',
      eligibleGraduationYears: '2025, 2026',
      requiredExperience: 0,
      applicationDeadline: new Date(Date.now() + 7 * 86400000),
      estimatedApplicationMinutes: 80
    },
    {
      title: 'Senior Backend Engineer (Ineligible - Exp Req)',
      companyName: 'Uber',
      companyLogo: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=100&auto=format&fit=crop&q=60',
      description: 'Lead geospatial driver-rider matching algorithm development for Uber Mobility globally.',
      responsibilities: 'Scale high-throughput routing graph systems, optimize latency critical dispatch algorithms.',
      location: 'Bengaluru',
      workMode: 'Hybrid',
      jobType: 'Full-time',
      salaryMin: 180000,
      salaryMax: 250000,
      salaryCurrency: 'INR',
      requiredSkills: 'Go, Java, System Design, Microservices, Redis',
      preferredSkills: 'Kubernetes, Docker, PostgreSQL',
      minimumCGPA: 7.0,
      eligibleDegrees: 'B.Tech, B.E.',
      eligibleGraduationYears: '2020, 2021, 2022',
      requiredExperience: 4, // Student has 0 -> Ineligible!
      applicationDeadline: new Date(Date.now() + 30 * 86400000),
      estimatedApplicationMinutes: 90
    },
    {
      title: 'Junior Go Developer Intern',
      companyName: 'Zomato',
      companyLogo: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=100&auto=format&fit=crop&q=60',
      description: 'Build backend event streams and real-time delivery rider tracking services using Go and Redis.',
      responsibilities: 'Write performant concurrent Go routines, profile memory allocations, maintain REST and gRPC endpoints.',
      location: 'Gurugram',
      workMode: 'On-site',
      jobType: 'Internship',
      salaryMin: 40000,
      salaryMax: 55000,
      salaryCurrency: 'INR',
      requiredSkills: 'Go, Data Structures & Algorithms, REST APIs, Git',
      preferredSkills: 'Redis, Docker, PostgreSQL',
      minimumCGPA: 7.2,
      eligibleDegrees: 'B.Tech, B.E., MCA',
      eligibleGraduationYears: '2025, 2026',
      requiredExperience: 0,
      applicationDeadline: new Date(Date.now() + 14 * 86400000),
      estimatedApplicationMinutes: 45
    },
    {
      title: 'Full Stack Web Developer Intern',
      companyName: 'Zoho',
      companyLogo: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=100&auto=format&fit=crop&q=60',
      description: 'Develop features for Zoho Creator and Zoho CRM with an emphasis on low-latency, modular single-page web applications.',
      responsibilities: 'Develop frontend views, write clean server-side Java and JavaScript controllers, implement database schemas.',
      location: 'Chennai',
      workMode: 'On-site',
      jobType: 'Internship',
      salaryMin: 28000,
      salaryMax: 40000,
      salaryCurrency: 'INR',
      requiredSkills: 'Java, JavaScript, HTML/CSS, SQL',
      preferredSkills: 'React, Node.js, Git',
      minimumCGPA: 6.8,
      eligibleDegrees: 'B.Tech, B.E., MCA, B.Sc',
      eligibleGraduationYears: '2025, 2026',
      requiredExperience: 0,
      applicationDeadline: new Date(Date.now() + 28 * 86400000),
      estimatedApplicationMinutes: 35
    },
    {
      title: 'Graduate Software Engineer - Core Platforms',
      companyName: 'Oracle',
      companyLogo: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=100&auto=format&fit=crop&q=60',
      description: 'Build high-availability cloud database services and multi-tenant telemetry dashboards.',
      responsibilities: 'Contribute to core storage engine maintenance, design database connectors, automate testing suites.',
      location: 'Bengaluru',
      workMode: 'Hybrid',
      jobType: 'Graduate Program',
      salaryMin: 85000,
      salaryMax: 110000,
      salaryCurrency: 'INR',
      requiredSkills: 'C++, Java, Data Structures & Algorithms, SQL, Linux',
      preferredSkills: 'PostgreSQL, Docker, System Design',
      minimumCGPA: 7.5,
      eligibleDegrees: 'B.Tech, B.E., M.Tech',
      eligibleGraduationYears: '2025, 2026',
      requiredExperience: 0,
      applicationDeadline: new Date(Date.now() + 22 * 86400000),
      estimatedApplicationMinutes: 65
    },
    {
      title: 'Systems & Network Software Intern',
      companyName: 'Cisco',
      companyLogo: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=100&auto=format&fit=crop&q=60',
      description: 'Develop networking protocol analyzers, enterprise router firmware modules, and automated packet telemetry tools.',
      responsibilities: 'Write high performance C++ and Python testing harnesses, analyze socket traffic, debug Linux kernel network drivers.',
      location: 'Bengaluru',
      workMode: 'Hybrid',
      jobType: 'Internship',
      salaryMin: 55000,
      salaryMax: 70000,
      salaryCurrency: 'INR',
      requiredSkills: 'C++, Python, Linux, Data Structures & Algorithms',
      preferredSkills: 'Git, Docker, CI/CD',
      minimumCGPA: 7.5,
      eligibleDegrees: 'B.Tech, B.E., M.Tech',
      eligibleGraduationYears: '2025, 2026',
      requiredExperience: 0,
      applicationDeadline: new Date(Date.now() + 19 * 86400000),
      estimatedApplicationMinutes: 50
    },
    {
      title: 'Web & Creative Cloud Intern',
      companyName: 'Adobe',
      companyLogo: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=100&auto=format&fit=crop&q=60',
      description: 'Build browser-based vector graphic rendering tools and collaborative canvas editing modules.',
      responsibilities: 'Write modular TypeScript and React code, optimize WebGL rendering performance, implement accessible components.',
      location: 'Noida',
      workMode: 'Hybrid',
      jobType: 'Internship',
      salaryMin: 70000,
      salaryMax: 95000,
      salaryCurrency: 'INR',
      requiredSkills: 'JavaScript, React, TypeScript, HTML/CSS, Git',
      preferredSkills: 'Tailwind CSS, Next.js, Data Structures & Algorithms',
      minimumCGPA: 8.0,
      eligibleDegrees: 'B.Tech, B.E., M.Tech',
      eligibleGraduationYears: '2025, 2026',
      requiredExperience: 0,
      applicationDeadline: new Date(Date.now() + 11 * 86400000),
      estimatedApplicationMinutes: 60
    },
    {
      title: 'High CGPA Research Intern (Ineligible - CGPA Req)',
      companyName: 'Google Research',
      companyLogo: 'https://images.unsplash.com/photo-1572021335469-31706a17aaef?w=100&auto=format&fit=crop&q=60',
      description: 'Research algorithmic fairness and large language model quantization algorithms.',
      responsibilities: 'Run empirical experiments on distributed GPU clusters, document algorithmic proofs and complexity analyses.',
      location: 'Bengaluru',
      workMode: 'On-site',
      jobType: 'Internship',
      salaryMin: 110000,
      salaryMax: 140000,
      salaryCurrency: 'INR',
      requiredSkills: 'Python, Machine Learning, Data Structures & Algorithms',
      preferredSkills: 'TensorFlow, C++',
      minimumCGPA: 9.5, // Student has 8.65 -> Ineligible!
      eligibleDegrees: 'B.Tech, B.E., M.Tech',
      eligibleGraduationYears: '2025, 2026',
      requiredExperience: 0,
      applicationDeadline: new Date(Date.now() + 6 * 86400000),
      estimatedApplicationMinutes: 90
    }
  ];

  // Dynamically generate the remaining 36 varied jobs to satisfy the "At least 50 job opportunities" requirement
  const companies = [
    'Microsoft', 'Google', 'Amazon', 'Flipkart', 'Infosys', 'TCS', 'Razorpay',
    'Swiggy', 'Zomato', 'CRED', 'PhonePe', 'Uber', 'Adobe', 'Oracle', 'Cisco', 'Zoho', 'Atlassian', 'Deloitte'
  ];
  const rolePrefixes = [
    'Software Engineer Intern', 'Backend Developer Intern', 'Frontend Developer Intern',
    'Full Stack Developer Intern', 'Data Analyst Intern', 'Python Developer Intern',
    'Cloud Intern', 'DevOps Intern', 'AI/ML Intern', 'QA Automation Intern',
    'Graduate Software Engineer', 'Junior Database Administrator'
  ];
  const cities = ['Bengaluru', 'Gurugram', 'Delhi', 'Hyderabad', 'Pune', 'Mumbai', 'Noida', 'Chennai', 'Remote'];
  const modes = ['Remote', 'Hybrid', 'On-site'];
  const types = ['Internship', 'Full-time', 'Part-time', 'Contract', 'Graduate Program'];
  const skillPool = [
    ['Java', 'Spring Boot', 'SQL', 'REST APIs'],
    ['Python', 'FastAPI', 'PostgreSQL', 'Docker'],
    ['JavaScript', 'React', 'Tailwind CSS', 'Node.js'],
    ['Data Structures & Algorithms', 'C++', 'Linux', 'Git'],
    ['SQL', 'Python', 'Pandas', 'PostgreSQL'],
    ['AWS', 'Docker', 'Linux', 'CI/CD'],
    ['TypeScript', 'Next.js', 'React', 'REST APIs'],
    ['Go', 'Redis', 'Docker', 'Microservices']
  ];

  for (let i = 17; i <= 52; i++) {
    const comp = companies[i % companies.length];
    const role = rolePrefixes[i % rolePrefixes.length];
    const loc = cities[i % cities.length];
    const mode = modes[i % modes.length];
    const type = types[i % types.length];
    const skills = skillPool[i % skillPool.length];
    const daysOffset = (i % 25) + 3;
    const baseSalary = 20000 + (i % 15) * 5000;
    const minCgpa = (6.0 + (i % 5) * 0.5).toFixed(1);

    jobsData.push({
      title: `${role} - ${comp}`,
      companyName: comp,
      companyLogo: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=100&auto=format&fit=crop&q=60',
      description: `Opportunity at ${comp} for aspiring engineers interested in building high-impact technology solutions. Join our fast-paced cross-functional squad.`,
      responsibilities: 'Write robust and maintainable code, actively participate in sprint planning and peer code reviews, optimize algorithmic time and space complexity.',
      location: loc,
      workMode: mode,
      jobType: type,
      salaryMin: baseSalary,
      salaryMax: baseSalary + 15000,
      salaryCurrency: 'INR',
      requiredSkills: skills.join(', '),
      preferredSkills: 'Git, REST APIs, Docker',
      minimumCGPA: parseFloat(minCgpa),
      eligibleDegrees: 'B.Tech, B.E., MCA, B.Sc, M.Tech',
      eligibleGraduationYears: '2024, 2025, 2026, 2027',
      requiredExperience: i % 10 === 0 ? 2 : 0,
      applicationDeadline: new Date(Date.now() + daysOffset * 86400000),
      estimatedApplicationMinutes: 30 + (i % 5) * 15
    });
  }

  // Insert or update jobs
  const createdJobs = [];
  for (const job of jobsData) {
    // Upsert by title + company
    const existing = await prisma.job.findFirst({
      where: { title: job.title, companyName: job.companyName }
    });

    let saved;
    if (existing) {
      saved = await prisma.job.update({
        where: { id: existing.id },
        data: job
      });
    } else {
      saved = await prisma.job.create({
        data: job
      });
    }
    createdJobs.push(saved);
  }

  console.log(`✅ Seeded ${createdJobs.length} jobs.`);

  // 4. Seed Saved Jobs & Applications for the student
  console.log('Seeding Student Applications & Saved Jobs...');

  // Save 3 jobs
  for (let i = 0; i < Math.min(4, createdJobs.length); i++) {
    await prisma.savedJob.upsert({
      where: {
        studentId_jobId: {
          studentId: student.id,
          jobId: createdJobs[i].id
        }
      },
      update: {},
      create: {
        studentId: student.id,
        jobId: createdJobs[i].id
      }
    });
  }

  // Create 6 Applications across different statuses: Saved, Applied, OA, Interview, Offer, Rejected
  const appStatuses = ['Applied', 'OA', 'Interview', 'Offer', 'Applied', 'Rejected'];
  for (let i = 0; i < appStatuses.length && i < createdJobs.length; i++) {
    const jobIndex = (i + 2) % createdJobs.length;
    await prisma.jobApplication.upsert({
      where: {
        studentId_jobId: {
          studentId: student.id,
          jobId: createdJobs[jobIndex].id
        }
      },
      update: {
        status: appStatuses[i],
        notes: `Application round note for ${createdJobs[jobIndex].companyName}`,
        interviewDate:
          appStatuses[i] === 'Interview'
            ? new Date(Date.now() + 3 * 86400000)
            : null
      },
      create: {
        studentId: student.id,
        jobId: createdJobs[jobIndex].id,
        status: appStatuses[i],
        notes: `Application round note for ${createdJobs[jobIndex].companyName}`,
        interviewDate:
          appStatuses[i] === 'Interview'
            ? new Date(Date.now() + 3 * 86400000)
            : null
      }
    });
  }

  console.log('🎉 CareerMatch Database Seed Complete!');
}

main()
  .catch(e => {
    console.error('Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
