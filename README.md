# Shival Gupta - Portfolio

A production-ready personal portfolio website showcasing AI, Robotics, IoT & XR work. Built with Next.js, TypeScript, Tailwind CSS, shadcn/ui, and React Three Fiber.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ (recommended: 20+)
- npm, pnpm, or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/shival-gupta/portfolio.git
cd portfolio

# Install dependencies
npm install
# or
pnpm install

# Run development server
npm run dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm run start
```

### Run Tests

```bash
npm run test
```

## 📁 Project Structure

```
├── app/
│   ├── layout.tsx          # Root layout with metadata
│   ├── page.tsx            # Homepage with Hero + 3D
│   ├── projects/page.tsx   # Filterable projects grid
│   ├── about/page.tsx      # Timeline + skills
│   ├── contact/page.tsx    # Contact form + socials
│   ├── privacy/page.tsx    # Privacy policy
│   ├── sitemap.ts          # Auto-generated sitemap
│   ├── robots.ts           # SEO robots.txt
│   └── globals.css         # Theme tokens + utilities
├── components/
│   ├── navigation.tsx      # Header with mobile menu
│   ├── footer.tsx          # Footer with links
│   ├── hero-section.tsx    # Hero with 3D placeholder
│   ├── hero-canvas.tsx     # React Three Fiber scene
│   ├── projects-grid.tsx   # Filterable project cards
│   ├── about-content.tsx   # Experience/education timeline
│   ├── contact-form.tsx    # Contact form component
│   └── ui/                 # shadcn/ui components
├── data/
│   └── resume.ts           # Single source of truth (from PDF)
└── lib/
    └── utils.ts            # Utility functions
```

## 🎨 Design System

- **Theme:** Futuristic Industrial / Clean SaaS
- **Colors:** Dark mode default with cyan/teal accent (`oklch(0.72 0.14 195)`)
- **Typography:** Geist Sans + Geist Mono
- **Components:** shadcn/ui (Radix primitives)

## 🌐 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import the repository on [Vercel](https://vercel.com/new)
3. Deploy automatically on push

Or use the Vercel CLI:

```bash
npm i -g vercel
vercel
```

### GitHub Pages (Static Export)

1. Update `next.config.mjs`:

```js
const nextConfig = {
  output: 'export',
  images: { unoptimized: true },
  basePath: '/portfolio', // your repo name
};
```

2. Build and deploy:

```bash
npm run build
# Deploy the `out` folder to gh-pages branch
```

## 📊 Resume Data Mapping

| Resume Section | Site Section | File |
|---------------|--------------|------|
| Contact Info | Header, Footer, Contact page | `data/resume.ts` |
| Technical Skills | Hero badges, About sidebar | `data/resume.ts` |
| Projects | Projects page grid | `data/resume.ts` |
| Experience | About page timeline | `data/resume.ts` |
| Education | About page timeline | `data/resume.ts` |
| Extracurriculars | About page sidebar | `data/resume.ts` |

## ✅ QA Checklist

- [x] Homepage renders with 3D canvas (lazy-loaded)
- [x] 3D disabled on mobile for performance
- [x] Projects filter works correctly
- [x] All navigation links functional
- [x] Contact form submits (simulated)
- [x] Dark mode default, theme toggle works
- [x] Mobile responsive design
- [x] SEO metadata configured
- [x] Sitemap and robots.txt generated
- [x] Accessibility: semantic HTML, ARIA labels

## 🔮 Next Tweaks (Recommended)

1. **Add real PDF resume** - Place `resume.pdf` in `/public`
2. **Connect contact form** - Integrate with Resend, SendGrid, or Formspree
3. **Add project images** - Replace placeholders with actual screenshots
4. **Analytics** - Vercel Analytics is pre-configured
5. **Blog section** - Consider adding MDX-powered blog
6. **Performance** - Add image optimization, consider Partytown for third-party scripts

## 📄 License

MIT License - feel free to use this as a template for your own portfolio!

---

Built by [Shival Gupta](https://shivalgupta.me) with ❤️
