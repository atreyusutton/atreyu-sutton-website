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
    description: 'Complete vehicle restoration featuring engine swap, custom fabrication, and suspension engineering.',
    fullDescription: 'A comprehensive automotive engineering project involving powertrain integration, suspension geometry optimization, and structural fabrication. Demonstrates hands-on mechanical engineering skills including engine swapping, custom exhaust fabrication, suspension tuning, and systems integration—all critical experience for motorsports and vehicle development work.',
    image: '/1985-toyota-4runner/hero.jpeg',
    images: [
      '/1985-toyota-4runner/hero.jpeg',
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
    tags: ['Welding', 'Fabrication', 'Mechanical', 'Automotive'],
    category: 'personal'
  },
  {
    id: 'ducati-s2r-build',
    title: 'Ducati S2R Build',
    description: 'Custom motorcycle build with electrical system redesign and fabrication work.',
    fullDescription: 'Complete electrical system redesign and custom fabrication project. Involved rewiring the entire electrical harness, integrating custom lighting systems, fabricating mounting brackets, and optimizing weight distribution. Demonstrates proficiency in electrical systems, wire harness design, fabrication techniques, and vehicle dynamics—skills directly applicable to motorsports and EV development.',
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
    tags: ['Electrical', 'Fabrication', 'Mechanical', 'Automotive'],
    category: 'personal'
  },
  {
    id: 'net-zero-home',
    title: 'Net Zero Home',
    description: 'Sustainable energy system design with renewable integration and power management.',
    fullDescription: 'Energy systems engineering project focused on renewable energy integration, battery storage optimization, and power management. Designed complete electrical system including solar array sizing, battery bank calculations, and load balancing. Demonstrates understanding of energy systems, electrical engineering, and sustainable technology—directly relevant to EV battery management and renewable energy applications in racing.',
    image: '/net-zero-home/zero-home-1-hero.jpeg',
    images: [
      '/net-zero-home/zero-home-1-hero.jpeg',
      '/net-zero-home/zero-home-2.jpeg'
    ],
    date: 'August 2019',
    tags: ['CAD', 'Energy Systems', 'Electrical', 'Design'],
    category: 'personal'
  },
  {
    id: 'brown-creek-designs',
    title: 'Brown Creek Designs',
    description: 'Product design and fabrication with CAD modeling and prototyping.',
    fullDescription: 'Product design and prototyping work involving CAD modeling, iterative design processes, and hands-on fabrication. Created functional prototypes from concept through production, utilizing both digital design tools and traditional fabrication methods. Demonstrates skills in design iteration, material selection, and manufacturing processes applicable to racing component development.',
    image: '/brown-creek-designs/brown-creek-1-hero.png',
    images: [
      '/brown-creek-designs/brown-creek-1-hero.png',
      '/brown-creek-designs/brown-creek-2.png',
      '/brown-creek-designs/brown-creek-3.png',
      '/brown-creek-designs/brown-creek-4.png',
      '/brown-creek-designs/brown-creek-5.png'
    ],
    date: 'July 2020',
    tags: ['CAD', 'Fabrication', 'Design', 'Prototyping'],
    category: 'personal'
  },
  {
    id: 'risd-car-designs',
    title: 'RISD Car Designs',
    description: 'Automotive design work with CAD modeling and vehicle dynamics focus.',
    fullDescription: 'Automotive design and engineering coursework focusing on vehicle architecture, aerodynamics, and aesthetic integration with functional requirements. Work includes conceptual design, rendering, and technical consideration of vehicle dynamics and packaging. Demonstrates understanding of automotive design principles, aerodynamics, and the intersection of form and function in motorsports.',
    image: '/risd-project-car/risd-car-1-hero.jpeg',
    images: [
      '/risd-project-car/risd-car-1-hero.jpeg',
      '/risd-project-car/risd-car-2.jpeg',
      '/risd-project-car/risd-car-3.jpeg',
      '/risd-project-car/risd-car-4.jpeg'
    ],
    date: 'June 2019',
    tags: ['CAD', 'Design', 'Automotive', 'Aerodynamics'],
    category: 'personal'
  },
  // {
  //   id: 'green-burial-pitch',
  //   title: 'Green Burial Pitch',
  //   description: 'Proposal for eco-friendly burial and land stewardship.',
  //   fullDescription: 'The Green Burial Pitch is a concept presentation for sustainable end-of-life practices. The idea reimagines burial sites as restorative community spaces, integrating natural decomposition with land preservation. It aims to reduce environmental impact while providing a more meaningful, connected alternative to traditional cemetery models.',
  //   image: '/green-burial-pitch/burial-pitch-1-hero.png',
  //   images: [
  //     '/green-burial-pitch/burial-pitch-1-hero.png',
  //     '/green-burial-pitch/burial-pitch-2.png',
  //     '/green-burial-pitch/burial-pitch-3.png',
  //     '/green-burial-pitch/burial-pitch-4.png'
  //   ],
  //   date: 'May 2023',
  //   tags: ['Design'],
  //   category: 'personal'
  // },
  // {
  //   id: 'photography-highlights',
  //   title: 'Photography Highlights',
  //   description: 'Selected shots of cars, landscapes, and lifestyle work.',
  //   fullDescription: 'My Photography Highlights portfolio curates some of my best work behind the lens, with a focus on cars, outdoor landscapes, and candid lifestyle moments. Each image is captured with an eye for composition, lighting, and storytelling. Photography serves as both documentation of my projects and a creative outlet in its own right.',
  //   image: '/photography-highlights/africa-1-hero.jpeg',
  //   images: [
  //     '/photography-highlights/africa-1-hero.jpeg',
  //     '/photography-highlights/africa-2.jpeg',
  //     '/photography-highlights/africa-3.jpeg',
  //     '/photography-highlights/africa-4.jpeg',
  //     '/photography-highlights/africa-5.jpeg',
  //     '/photography-highlights/africa-6.jpeg',
  //     '/photography-highlights/africa-7.jpeg',
  //     '/photography-highlights/africa-8.jpeg',
  //     '/photography-highlights/africa-9.jpeg',
  //     '/photography-highlights/africa-10.jpeg',
  //     '/photography-highlights/africa-11.jpeg',
  //     '/photography-highlights/africa-12.jpeg',
  //     '/photography-highlights/africa-13.jpeg',
  //     '/photography-highlights/africa-14.jpeg',
  //     '/photography-highlights/africa-15.jpeg',
  //     '/photography-highlights/africa-16.jpeg',
  //     '/photography-highlights/africa-17.jpeg',
  //     '/photography-highlights/africa-18.jpeg',
  //     '/photography-highlights/africa-19.jpeg',
  //     '/photography-highlights/africa-20.jpeg',
  //     '/photography-highlights/africa-21.jpeg',
  //     '/photography-highlights/africa-22.jpeg',
  //     '/photography-highlights/africa-23.jpeg',
  //     '/photography-highlights/africa-24.jpeg',
  //     '/photography-highlights/africa-25.jpeg',
  //     '/photography-highlights/africa-26.jpeg',
  //     '/photography-highlights/africa-27.jpeg',
  //     '/photography-highlights/africa-28.jpeg',
  //     '/photography-highlights/africa-29.jpeg',
  //     '/photography-highlights/africa-30.jpeg',
  //     '/photography-highlights/africa-31.jpeg',
  //     '/photography-highlights/africa-32.jpeg',
  //     '/photography-highlights/africa-33.jpeg',
  //     '/photography-highlights/africa-34.jpeg',
  //     '/photography-highlights/africa-35.jpeg',
  //     '/photography-highlights/africa-36.jpeg',
  //     '/photography-highlights/africa-37.jpeg',
  //     '/photography-highlights/africa-38.jpeg',
  //     '/photography-highlights/africa-39.jpeg',
  //     '/photography-highlights/africa-40.jpeg',
  //     '/photography-highlights/africa-41.jpeg',
  //     '/photography-highlights/africa-42.jpeg',
  //     '/photography-highlights/africa-43.jpeg',
  //     '/photography-highlights/africa-44.jpeg',
  //     '/photography-highlights/africa-45.jpeg',
  //     '/photography-highlights/africa-46.jpeg'
  //   ],
  //   date: 'June 2016 - Present',
  //   tags: ['Art'],
  //   category: 'personal'
  // },
  {
    id: 'pilots-license',
    title: 'Pilot\'s License',
    description: 'FAA pilot certification demonstrating systems thinking and technical precision.',
    fullDescription: 'Aviation training focused on complex systems management, technical precision, and real-time decision-making under pressure. Coursework covers aerodynamics, meteorology, navigation systems, and aircraft systems operation. The discipline required in aviation—systematic troubleshooting, safety protocols, and performance optimization—translates directly to motorsports team environments and vehicle systems management.',
    image: '/pilots-license/pilots-license-1-hero.jpeg',
    images: [
      '/pilots-license/pilots-license-1-hero.jpeg',
      '/pilots-license/pilots-license-2.jpeg',
      '/pilots-license/pilots-license-3.jpeg',
      '/pilots-license/pilots-license-4.jpeg'
    ],
    date: 'September 2024 - In Progress',
    tags: ['Systems', 'Technical', 'Aerodynamics'],
    category: 'personal'
  },
  // {
  //   id: 'fucking-awesome-skis',
  //   title: 'Fucking Awesome Skis',
  //   description: 'Bold experimental ski design project.',
  //   fullDescription: 'Fucking Awesome Skis is an experimental product design concept that pushes boundaries in both aesthetics and performance. The project explores ski construction, material selection, and visual identity with the goal of creating something unapologetically unique. It\'s a blend of engineering, sport, and art—made for riders who want their gear to make a statement.',
  //   image: '/fucking-awesome-skis/skis-build-1-hero.jpeg',
  //   images: [
  //     '/fucking-awesome-skis/skis-build-1-hero.jpeg',
  //     '/fucking-awesome-skis/skis-build-2.jpeg',
  //     '/fucking-awesome-skis/skis-build-3.jpeg',
  //     '/fucking-awesome-skis/skis-build-4.jpeg',
  //     '/fucking-awesome-skis/skis-build-5.jpeg'
  //   ],
  //   date: 'February 2023',
  //   tags: ['Design', 'Fabrication'],
  //   category: 'personal'
  // },

  // Professional/Client Work
  {
    id: 'nest-messages',
    title: 'Nest Messages',
    description: 'Full-stack web application with database integration and scheduling systems.',
    fullDescription: 'Full-stack web application built with modern frameworks, featuring database architecture, automated scheduling systems, and responsive UI design. Demonstrates proficiency in software development, system architecture, and deployment—skills applicable to telemetry systems, data acquisition, and race management software used in motorsports.',
    image: '/nest-messages/nest-messages-1-hero.png',
    date: 'March 2024 - In Progress',
    tags: ['Software', 'Web Development', 'Full-Stack'],
    href: 'https://nest-messages.pages.dev/',
    external: true,
    category: 'professional'
  },
  {
    id: 'classic-motor-market',
    title: 'Classic Motor Market',
    description: 'E-commerce platform with custom backend and database architecture.',
    fullDescription: 'Custom e-commerce platform for automotive marketplace featuring complex database architecture, user authentication systems, and content management. Built with modern web technologies and optimized for performance. Demonstrates full-stack development skills, API integration, and system design—applicable to race team management software and telemetry platforms.',
    image: '/classic-motor-market/classic-motor-1-hero.png',
    date: 'January 2025 - In Progress',
    tags: ['Software', 'Web Development', 'Database'],
    href: 'https://rileyshucks.com',
    external: true,
    category: 'professional'
  },
  // {
  //   id: 'the-real-estate-collaborative',
  //   title: 'The Real Estate Collaborative',
  //   description: 'Branding and web presence for a boutique real estate team.',
  //   fullDescription: 'The Real Estate Collaborative needed a brand identity and digital home that reflected its high-touch service and sophisticated clientele. From logo design to a responsive website, the project combined sleek visuals, easy navigation, and MLS integration to showcase luxury properties while conveying professionalism and approachability.',
  //   image: '/the-real-estate-collaborative/real-estate-1-hero.png',
  //   date: 'September 2023',
  //   tags: ['Web', 'Work'],
  //   href: 'https://trecprojects.com',
  //   external: true,
  //   category: 'professional'
  // },
  {
    id: 'resume-maker',
    title: 'Resume Maker',
    description: 'Web application with PDF generation and template rendering engine.',
    fullDescription: 'Web application featuring dynamic PDF generation, template rendering system, and client-side data processing. Built with modern JavaScript frameworks and optimized algorithms for document generation. Demonstrates software engineering skills in algorithm design, UI/UX implementation, and client-side optimization.',
    image: '/resume-maker/resume-1-hero.png',
    date: 'September 2025',
    tags: ['Software', 'Web Development', 'JavaScript'],
    href: 'https://resume-maker-dlc.pages.dev/',
    external: true,
    category: 'professional'
  },
  {
    id: 'sutton-web-solutions',
    title: 'Sutton Web Solutions',
    description: 'Software engineering consultancy specializing in full-stack development and AI integration.',
    fullDescription: 'Independent software engineering consultancy delivering full-stack applications, AI/ML integration, and automation systems. Work includes complex system architecture, API development, database optimization, and machine learning implementation. Demonstrates advanced programming skills, system design, and problem-solving—directly applicable to data analysis, telemetry processing, and autonomous systems in racing.',
    image: '/sutton-web-solutions/sutton-web-1-hero.png',
    date: 'January 2023 - Present',
    tags: ['Software', 'AI/ML', 'Full-Stack', 'Systems'],
    href: 'https://suttonwebsolutions.com',
    external: true,
    category: 'professional'
  },
  {
    id: 'ute-pass-vacation-rentals',
    title: 'Ute Pass Vacation Rentals',
    description: 'Booking platform with calendar integration and payment processing systems.',
    fullDescription: 'Custom booking platform featuring calendar synchronization, payment processing integration, and automated email systems. Built with responsive design and optimized for performance across devices. Demonstrates skills in API integration, payment systems, and user experience design relevant to race registration and team management platforms.',
    image: '/ute-pass-vacation-rentals/ute-pass-1-hero.png',
    date: 'June 2023',
    tags: ['Software', 'Web Development', 'API Integration'],
    href: 'https://utepassvacationrentals.com',
    external: true,
    category: 'professional'
  },
  // {
  //   id: 'valdra-outside',
  //   title: 'Valdra Outside',
  //   description: 'Outdoor gear brand with a first-aid line launching in 2026.',
  //   fullDescription: 'Valdra Outdoors is a brand in development, dedicated to creating rugged, functional gear for adventurers. Its first major product line—a reimagined first-aid system—aims to launch in 2026, blending compact design with usability in backcountry and urban settings alike. The project reflects a long-term vision of building gear that empowers people to explore while staying safe.',
  //   image: '/valdra-outside/valdra-outside-1-hero.png',
  //   date: 'July 2025 - In Development',
  //   tags: ['Web', 'In Progress'],
  //   href: 'https://valdraoutside.com',
  //   external: true,
  //   category: 'professional'
  // },

  // Future Projects
  // {
  //   id: 'building-an-e-bike',
  //   title: 'Building an E-Bike',
  //   description: 'Custom high-performance fat-tire e-bike project.',
  //   fullDescription: 'This project is focused on designing and fabricating a fat-tire electric bike built for versatility across Colorado\'s mountains, snow, sand, and city streets. With an emphasis on torque, range, and durability, the build explores battery technology, motor integration, and custom frame design. It\'s part engineering exercise, part lifestyle experiment.',
  //   image: '/e-bike-build/e-bike-1-hero.png',
  //   date: 'In Progress',
  //   tags: ['Fabrication', 'Design', 'In Progress'],
  //   category: 'future'
  // },
  {
    id: 'building-a-computer-case',
    title: 'Building a Computer Case',
    description: 'Custom machined chassis with CAD design and CNC fabrication.',
    fullDescription: 'Custom computer chassis project involving CAD modeling, material selection, and precision machining. Design optimizes thermal management, structural integrity, and manufacturing efficiency. Demonstrates proficiency in CAD software, machining processes, material properties, and mechanical design—skills directly transferable to race car component design and fabrication.',
    image: '/computer-case-build/computer-case-1-hero.png',
    date: 'In Progress',
    tags: ['CAD', 'Machining', 'Fabrication', 'Design'],
    category: 'future'
  }
]

export const allTags = Array.from(new Set(projects.flatMap(p => p.tags))).sort()
