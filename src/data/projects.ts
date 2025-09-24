export interface Project {
  id: string
  title: string
  description: string
  fullDescription: string
  image: string
  images?: string[]
  date: string
  tags: string[]
  href?: string
  external?: boolean
  category: 'personal' | 'professional' | 'future'
}

export const projects: Project[] = [
  // Personal/Creative Projects
  {
    id: 'toyota-4runner-build',
    title: 'Toyota 4Runner Build',
    description: 'Restoring and upgrading a classic \'85 Toyota 4Runner.',
    fullDescription: 'My 1985 Toyota 4Runner build is a hands-on passion project that blends restoration with performance upgrades. Featuring a modern engine swap, suspension tuning, and custom fabrication, the build highlights my love for classic off-road rigs and mechanical problem-solving. It\'s both a rolling showcase of craftsmanship and a constant test bed for new ideas.',
    image: '/1985-toyota-4runner/hero.png',
    images: [
      '/1985-toyota-4runner/hero.png',
      '/1985-toyota-4runner/toyota-build-1.jpeg',
      '/1985-toyota-4runner/toyota-build-2.jpeg',
      '/1985-toyota-4runner/toyota-build-3.jpeg',
      '/1985-toyota-4runner/toyota-build-4.jpeg',
      '/1985-toyota-4runner/toyota-build-5.jpeg',
      '/1985-toyota-4runner/toyota-build-6.jpeg',
      '/1985-toyota-4runner/toyota-build-7.jpeg',
      '/1985-toyota-4runner/toyota-build-8.jpeg',
      '/1985-toyota-4runner/toyota-build-9.jpeg',
      '/1985-toyota-4runner/toyota-build-10.jpeg',
      '/1985-toyota-4runner/toyota-build-11.jpeg',
      '/1985-toyota-4runner/toyota-build-12.jpeg',
      '/1985-toyota-4runner/toyota-build-13.jpeg',
      '/1985-toyota-4runner/toyota-build-14.jpeg',
      '/1985-toyota-4runner/toyota-build-15.jpeg',
      '/1985-toyota-4runner/toyota-build-16.jpeg',
      '/1985-toyota-4runner/toyota-build-17.jpeg',
      '/1985-toyota-4runner/toyota-build-18.jpeg',
      '/1985-toyota-4runner/toyota-build-19.jpeg',
      '/1985-toyota-4runner/toyota-build-20.jpeg'
    ],
    date: 'May 2024',
    tags: ['Fabrication'],
    category: 'personal'
  },
  {
    id: 'ducati-s2r-build',
    title: 'Ducati S2R Build',
    description: 'Custom streetfighter-style Ducati Monster S2R.',
    fullDescription: 'The Ducati S2R build is a creative motorcycle project that transforms a factory Monster into a unique, aggressive streetfighter. From rewiring the electrical system to redesigning the lighting and body accents, every step reflects a balance between engineering precision and aesthetic vision. The result is a raw, stripped-down machine that\'s both functional and artful.',
    image: '/2006-ducati-s2r/ducati-2-hero.jpeg',
    images: [
      '/2006-ducati-s2r/ducati-2-hero.jpeg',
      '/2006-ducati-s2r/ducati-1.jpeg',
      '/2006-ducati-s2r/ducati-3.jpeg',
      '/2006-ducati-s2r/ducati-4.jpeg',
      '/2006-ducati-s2r/ducati-5.jpeg',
      '/2006-ducati-s2r/ducati-6.jpeg',
      '/2006-ducati-s2r/ducati-7.jpeg',
      '/2006-ducati-s2r/ducati-8.jpeg',
      '/2006-ducati-s2r/ducati-9.jpeg'
    ],
    date: 'August 2024',
    tags: ['Fabrication'],
    category: 'personal'
  },
  {
    id: 'net-zero-home',
    title: 'Net Zero Home',
    description: 'Concept for a sustainable, energy-independent home.',
    fullDescription: 'The Net Zero Home project explores how design and technology can work together to achieve sustainable living. The concept integrates renewable energy systems, efficient construction materials, and smart home technology to create a residence that generates as much energy as it consumes. It\'s a forward-looking design exercise in environmental responsibility and independence.',
    image: '/net-zero-home/zero-home-1-hero.jpeg',
    images: [
      '/net-zero-home/zero-home-1-hero.jpeg',
      '/net-zero-home/zero-home-2.jpeg'
    ],
    date: 'August 2019',
    tags: ['Design'],
    category: 'personal'
  },
  {
    id: 'brown-creek-designs',
    title: 'Brown Creek Designs',
    description: 'Small creative brand for furniture and product design.',
    fullDescription: 'Brown Creek Designs is a creative workshop brand dedicated to making functional and beautiful objects. From furniture prototypes to small product experiments, the project combines woodworking, fabrication, and design thinking. Each piece is crafted with an emphasis on simplicity, utility, and lasting style.',
    image: '/brown-creek-designs/brown-creek-1-hero.png',
    images: [
      '/brown-creek-designs/brown-creek-1-hero.png',
      '/brown-creek-designs/brown-creek-2.png',
      '/brown-creek-designs/brown-creek-3.png',
      '/brown-creek-designs/brown-creek-4.png',
      '/brown-creek-designs/brown-creek-5.png'
    ],
    date: 'July 2020',
    tags: ['Design'],
    category: 'personal'
  },
  {
    id: 'risd-car-designs',
    title: 'RISD Car Designs',
    description: 'Automotive sketches and concepts developed at RISD.',
    fullDescription: 'The RISD Car Designs project showcases conceptual automotive sketches and renderings created during coursework at Rhode Island School of Design. These designs blend fine-arts techniques with engineering sensibilities, exploring new forms and aesthetics in vehicle design. It represents an early exploration of my passion for cars as both machines and works of art.',
    image: '/risd-project-car/risd-car-1-hero.jpeg',
    images: [
      '/risd-project-car/risd-car-1-hero.jpeg',
      '/risd-project-car/risd-car-2.jpeg',
      '/risd-project-car/risd-car-3.jpeg',
      '/risd-project-car/risd-car-4.jpeg'
    ],
    date: 'June 2019',
    tags: ['Art', 'Design'],
    category: 'personal'
  },
  {
    id: 'green-burial-pitch',
    title: 'Green Burial Pitch',
    description: 'Proposal for eco-friendly burial and land stewardship.',
    fullDescription: 'The Green Burial Pitch is a concept presentation for sustainable end-of-life practices. The idea reimagines burial sites as restorative community spaces, integrating natural decomposition with land preservation. It aims to reduce environmental impact while providing a more meaningful, connected alternative to traditional cemetery models.',
    image: '/green-burial-pitch/burial-pitch-1-hero.png',
    images: [
      '/green-burial-pitch/burial-pitch-1-hero.png',
      '/green-burial-pitch/burial-pitch-2.png',
      '/green-burial-pitch/burial-pitch-3.png',
      '/green-burial-pitch/burial-pitch-4.png'
    ],
    date: 'May 2023',
    tags: ['Design'],
    category: 'personal'
  },
  {
    id: 'photography-highlights',
    title: 'Photography Highlights',
    description: 'Selected shots of cars, landscapes, and lifestyle work.',
    fullDescription: 'My Photography Highlights portfolio curates some of my best work behind the lens, with a focus on cars, outdoor landscapes, and candid lifestyle moments. Each image is captured with an eye for composition, lighting, and storytelling. Photography serves as both documentation of my projects and a creative outlet in its own right.',
    image: '/photography-highlights/africa-1-hero.jpeg',
    images: [
      '/photography-highlights/africa-1-hero.jpeg',
      '/photography-highlights/africa-2.jpeg',
      '/photography-highlights/africa-3.jpeg',
      '/photography-highlights/africa-4.jpeg',
      '/photography-highlights/africa-5.jpeg',
      '/photography-highlights/africa-6.jpeg',
      '/photography-highlights/africa-7.jpeg',
      '/photography-highlights/africa-8.jpeg',
      '/photography-highlights/africa-9.jpeg',
      '/photography-highlights/africa-10.jpeg',
      '/photography-highlights/africa-11.jpeg',
      '/photography-highlights/africa-12.jpeg',
      '/photography-highlights/africa-13.jpeg',
      '/photography-highlights/africa-14.jpeg',
      '/photography-highlights/africa-15.jpeg',
      '/photography-highlights/africa-16.jpeg',
      '/photography-highlights/africa-17.jpeg',
      '/photography-highlights/africa-18.jpeg',
      '/photography-highlights/africa-19.jpeg',
      '/photography-highlights/africa-20.jpeg',
      '/photography-highlights/africa-21.jpeg',
      '/photography-highlights/africa-22.jpeg',
      '/photography-highlights/africa-23.jpeg',
      '/photography-highlights/africa-24.jpeg',
      '/photography-highlights/africa-25.jpeg',
      '/photography-highlights/africa-26.jpeg',
      '/photography-highlights/africa-27.jpeg',
      '/photography-highlights/africa-28.jpeg',
      '/photography-highlights/africa-29.jpeg',
      '/photography-highlights/africa-30.jpeg',
      '/photography-highlights/africa-31.jpeg',
      '/photography-highlights/africa-32.jpeg',
      '/photography-highlights/africa-33.jpeg',
      '/photography-highlights/africa-34.jpeg',
      '/photography-highlights/africa-35.jpeg',
      '/photography-highlights/africa-36.jpeg',
      '/photography-highlights/africa-37.jpeg',
      '/photography-highlights/africa-38.jpeg',
      '/photography-highlights/africa-39.jpeg',
      '/photography-highlights/africa-40.jpeg',
      '/photography-highlights/africa-41.jpeg',
      '/photography-highlights/africa-42.jpeg',
      '/photography-highlights/africa-43.jpeg',
      '/photography-highlights/africa-44.jpeg',
      '/photography-highlights/africa-45.jpeg',
      '/photography-highlights/africa-46.jpeg'
    ],
    date: 'June 2016 - Present',
    tags: ['Art'],
    category: 'personal'
  },
  {
    id: 'pilots-license',
    title: 'Pilot\'s License',
    description: 'Ongoing journey to becoming an FAA-certified pilot.',
    fullDescription: 'Pursuing a pilot\'s license has been a disciplined and rewarding personal challenge. From ground school study to logged flight hours, the process demands technical precision, quick decision-making, and calm under pressure. It reflects my passion for aviation and my commitment to mastering new skill sets.',
    image: '/pilots-license/pilots-license-1-hero.jpeg',
    images: [
      '/pilots-license/pilots-license-1-hero.jpeg',
      '/pilots-license/pilots-license-2.jpeg',
      '/pilots-license/pilots-license-3.jpeg',
      '/pilots-license/pilots-license-4.jpeg'
    ],
    date: 'September 2024 - In Progress',
    tags: ['In Progress'],
    category: 'personal'
  },
  {
    id: 'fucking-awesome-skis',
    title: 'Fucking Awesome Skis',
    description: 'Bold experimental ski design project.',
    fullDescription: 'Fucking Awesome Skis is an experimental product design concept that pushes boundaries in both aesthetics and performance. The project explores ski construction, material selection, and visual identity with the goal of creating something unapologetically unique. It\'s a blend of engineering, sport, and art—made for riders who want their gear to make a statement.',
    image: '/fucking-awesome-skis/skis-build-1-hero.jpeg',
    images: [
      '/fucking-awesome-skis/skis-build-1-hero.jpeg',
      '/fucking-awesome-skis/skis-build-2.jpeg',
      '/fucking-awesome-skis/skis-build-3.jpeg',
      '/fucking-awesome-skis/skis-build-4.jpeg',
      '/fucking-awesome-skis/skis-build-5.jpeg'
    ],
    date: 'February 2023',
    tags: ['Design', 'Fabrication'],
    category: 'personal'
  },

  // Professional/Client Work
  {
    id: 'nest-messages',
    title: 'Nest Messages',
    description: 'A platform sending uplifting daily messages to support youth mental health.',
    fullDescription: 'Nest Messages is a digital initiative designed to reach young people where they are—on their phones and online—with short, impactful notes of encouragement. Built with a focus on accessibility and empathy, the platform leverages web-based tools to provide daily reminders that promote resilience, emotional balance, and community connection.',
    image: '/nest-messages/nest-messages-1-hero.png',
    date: 'March 2024 - In Progress',
    tags: ['Web', 'Work', 'In Progress'],
    href: 'https://nest-messages.pages.dev/',
    external: true,
    category: 'professional'
  },
  {
    id: 'fuelfed-motor-market',
    title: 'Fuelfed Motor Market',
    description: 'An online marketplace for vintage 4x4s and enthusiast vehicles.',
    fullDescription: 'Fuelfed Motor Market is a curated listing platform created for the passionate automotive community. Focusing on vintage 4x4s, off-road rigs, and unique enthusiast vehicles, the site combines sharp branding with clean design to highlight each vehicle\'s story. Built to feel like a cross between a boutique marketplace and a car enthusiast magazine, it brings trust and character back to buying and selling classics.',
    image: '/fuelfed-motor-market/fuelfed-1-hero.png',
    date: 'January 2025 - In Progress',
    tags: ['Web', 'Work', 'In Progress'],
    href: 'https://rileyshucks.com',
    external: true,
    category: 'professional'
  },
  {
    id: 'the-real-estate-collaborative',
    title: 'The Real Estate Collaborative',
    description: 'Branding and web presence for a boutique real estate team.',
    fullDescription: 'The Real Estate Collaborative needed a brand identity and digital home that reflected its high-touch service and sophisticated clientele. From logo design to a responsive website, the project combined sleek visuals, easy navigation, and MLS integration to showcase luxury properties while conveying professionalism and approachability.',
    image: '/the-real-estate-collaborative/real-estate-1-hero.png',
    date: 'September 2023',
    tags: ['Web', 'Work'],
    href: 'https://trecprojects.com',
    external: true,
    category: 'professional'
  },
  {
    id: 'resume-maker',
    title: 'Resume Maker',
    description: 'A simple tool to generate polished resumes instantly.',
    fullDescription: 'Resume Maker is a lightweight web app that helps job-seekers create clean, modern resumes in minutes. Designed for ease of use, the tool generates formatted documents based on quick form inputs and offers multiple style templates. Its goal is to make professional presentation accessible to everyone without the need for advanced design skills.',
    image: '/resume-maker/resume-1-hero.png',
    date: 'September 2025',
    tags: ['Web'],
    href: 'https://resume-maker-dlc.pages.dev/',
    external: true,
    category: 'professional'
  },
  {
    id: 'sutton-web-solutions',
    title: 'Sutton Web Solutions',
    description: 'Consultancy offering web development, AI solutions, and creative tech.',
    fullDescription: 'Sutton Web Solutions is my personal consultancy, specializing in building digital products that combine design, engineering, and business strategy. Projects range from AI-driven automation systems to full-stack web applications and creative branding solutions. The consultancy has helped real estate businesses generate over $10M in revenue while also exploring experimental work at the intersection of design and technology.',
    image: '/sutton-web-solutions/sutton-web-1-hero.png',
    date: 'January 2023 - Present',
    tags: ['Web', 'Work'],
    href: 'https://suttonwebsolutions.com',
    external: true,
    category: 'professional'
  },
  {
    id: 'ute-pass-vacation-rentals',
    title: 'Ute Pass Vacation Rentals',
    description: 'Website and booking system for Colorado mountain rentals.',
    fullDescription: 'Ute Pass Vacation Rentals is a streamlined booking platform for short-term rental properties in Colorado\'s scenic mountain corridor. The site features rich photography, property details, and direct booking capabilities, helping owners reduce reliance on third-party platforms while offering guests a polished, trustworthy experience.',
    image: '/ute-pass-vacation-rentals/ute-pass-1-hero.png',
    date: 'June 2023',
    tags: ['Web', 'Work'],
    href: 'https://utepassvacationrentals.com',
    external: true,
    category: 'professional'
  },
  {
    id: 'valdra-outside',
    title: 'Valdra Outside',
    description: 'Outdoor gear brand with a first-aid line launching in 2026.',
    fullDescription: 'Valdra Outdoors is a brand in development, dedicated to creating rugged, functional gear for adventurers. Its first major product line—a reimagined first-aid system—aims to launch in 2026, blending compact design with usability in backcountry and urban settings alike. The project reflects a long-term vision of building gear that empowers people to explore while staying safe.',
    image: '/valdra-outside/valdra-outside-1-hero.png',
    date: 'July 2025 - In Development',
    tags: ['Web', 'In Progress'],
    href: 'https://valdraoutside.com',
    external: true,
    category: 'professional'
  },

  // Future Projects
  {
    id: 'building-an-e-bike',
    title: 'Building an E-Bike',
    description: 'Custom high-performance fat-tire e-bike project.',
    fullDescription: 'This project is focused on designing and fabricating a fat-tire electric bike built for versatility across Colorado\'s mountains, snow, sand, and city streets. With an emphasis on torque, range, and durability, the build explores battery technology, motor integration, and custom frame design. It\'s part engineering exercise, part lifestyle experiment.',
    image: '/e-bike-build/e-bike-1-hero.png',
    date: 'In Progress',
    tags: ['Fabrication', 'Design', 'In Progress'],
    category: 'future'
  },
  {
    id: 'building-a-computer-case',
    title: 'Building a Computer Case',
    description: 'Machined-metal open-air PC case build.',
    fullDescription: 'The custom computer case project takes inspiration from industrial design and minimalism. Crafted as an open-air chassis with machined metal construction, the case emphasizes airflow, clean lines, and durability. It\'s a functional piece of design that blurs the line between performance hardware and aesthetic statement.',
    image: '/computer-case-build/computer-case-1-hero.png',
    date: 'In Progress',
    tags: ['Fabrication', 'Design', 'In Progress'],
    category: 'future'
  }
]

export const allTags = Array.from(new Set(projects.flatMap(p => p.tags))).sort()
