# Atreyu Sutton - Personal Website

A modern, responsive personal website built with Next.js 14, TypeScript, and Tailwind CSS.

## Features

- 🦅 **Clean Design**: Modern, minimalist interface with eagle favicon
- 🌙 **Dark/Light Mode**: Automatic theme switching with manual toggle
- 📱 **Fully Responsive**: Optimized for all devices and screen sizes
- ⚡ **Fast Performance**: Built with Next.js 14 and optimized images
- 🎨 **Interactive Components**: Smooth animations and transitions
- 📄 **5 Core Pages**: Home, Projects, About, Contact, and Resume

## Pages Structure

### Home Page
- Hero section with tagline: "Engineering the creative edge"
- Professional bio and photo
- Call-to-action buttons (View Projects, Contact, Download Resume)
- Featured projects showcase

### Projects Page
- Interactive tag filtering system
- Project cards with hero images
- External links for web projects
- Detailed project pages for non-web projects
- Categories: Web, Art, Fabrication, Design, Work, In Progress

### About Page
- Professional introduction
- Colorful skill bubbles organized by category:
  - Web/CS/AI
  - Fabrication
  - Design
- Timeline design for experience and education

### Contact Page
- Contact information with primary email
- Links to GitHub, LinkedIn, and Sutton Web Solutions
- Contact form that opens default mail client

### Resume Page
- Resume preview section
- Download button for PDF resume
- Quick statistics summary

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Animations**: Framer Motion
- **Theme**: next-themes for dark/light mode

## Getting Started

### Prerequisites
- Node.js 18.17 or later
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd atreyu-website
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Project Structure

```
src/
├── app/                    # App Router pages
│   ├── about/             # About page
│   ├── contact/           # Contact page
│   ├── projects/          # Projects page and individual project pages
│   ├── resume/            # Resume page
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   ├── not-found.tsx      # 404 page
│   └── page.tsx           # Home page
├── components/            # Reusable components
│   ├── Button.tsx         # Button component
│   ├── Navigation.tsx     # Navigation bar
│   ├── ProjectCard.tsx    # Project card component
│   ├── SkillBubble.tsx    # Skill bubble component
│   ├── ThemeProvider.tsx  # Theme provider
│   ├── ThemeToggle.tsx    # Theme toggle button
│   └── Timeline.tsx       # Timeline component
└── data/
    └── projects.ts        # Project data and configuration
```

## Customization

### Adding New Projects
Edit `src/data/projects.ts` to add new projects. Each project should include:
- `id`: Unique identifier
- `title`: Project name
- `description`: Short description
- `fullDescription`: Detailed description
- `image`: Hero image path
- `images`: Array of additional images (optional)
- `date`: Project date
- `tags`: Array of tags for filtering
- `category`: 'personal', 'professional', or 'future'
- `href`: External link (optional)
- `external`: Boolean for external links

### Updating Content
- **Bio and tagline**: Edit `src/app/page.tsx`
- **Skills**: Update arrays in `src/app/about/page.tsx`
- **Experience/Education**: Modify timeline items in `src/app/about/page.tsx`
- **Contact info**: Update `src/app/contact/page.tsx`

### Adding Images
Place images in the `public/` directory. The current structure organizes images by project folders.

## Deployment

The site is ready for deployment on platforms like Vercel, Netlify, or any hosting service that supports Next.js.

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically

### Other Platforms
1. Build the project: `npm run build`
2. Deploy the `.next` folder and other necessary files

## Performance Features

- **Image Optimization**: Next.js Image component with WebP/AVIF support
- **Code Splitting**: Automatic code splitting for optimal loading
- **SEO Optimized**: Proper meta tags and structured data
- **Responsive Images**: Multiple image sizes for different devices
- **Bundle Optimization**: Tree shaking and package optimization

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is for personal use. All content and design are proprietary.

---

Built with ❤️ by Atreyu Sutton