# VoxCivis - Sauti ya Wananchi

A modern civic engagement platform built with Next.js, React, and TypeScript. VoxCivis provides a comprehensive solution for community reporting and civic participation.

##  Features

- **Interactive Map Interface**: Built with Leaflet and React-Leaflet for geographic data visualization
- **Modern UI/UX**: Beautiful interface using Radix UI components and Tailwind CSS
- **Mobile Responsive**: Optimized for both desktop and mobile devices
- **Report Submission**: Integrated Google Forms for community reporting
- **Real-time Updates**: Dynamic filtering and data visualization
- **Accessibility**: Built with accessibility in mind using Radix UI primitives

##  Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS with custom animations
- **UI Components**: Radix UI primitives with custom styling
- **Maps**: Leaflet with React-Leaflet
- **Forms**: React Hook Form with Zod validation
- **Mobile**: Capacitor for mobile app capabilities
- **Package Manager**: pnpm

##  Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/GIOVESS/vox-civis.git
   cd vox-civis
   ```

2. **Install dependencies**:
   ```bash
   pnpm install
   ```

3. **Set up environment variables** (if needed):
   ```bash
   cp .env.example .env.local
   ```

4. **Run the development server**:
   ```bash
   pnpm dev
   ```

5. **Open your browser** and navigate to `http://localhost:3000`

##  Project Structure

```
vox-civis/
├── app/                    # Next.js app directory
│   ├── about/             # About page
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # Reusable components
│   ├── ui/               # UI components (Radix-based)
│   ├── filters.tsx       # Report filters
│   ├── header.tsx        # Navigation header
│   └── map-*.tsx         # Map-related components
├── hooks/                # Custom React hooks
├── lib/                  # Utility libraries
├── types/                # TypeScript type definitions
└── public/               # Static assets
```

##  Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint

##  Civic Engagement Features

### Map Interface
- Interactive geographic visualization
- Real-time data filtering
- Community report locations
- Mobile-optimized map controls

### Report Submission
- Integrated Google Forms for easy reporting
- Mobile-friendly submission process
- Community-driven data collection

### Accessibility
- WCAG compliant components
- Keyboard navigation support
- Screen reader friendly
- High contrast mode support

## 📱 Mobile Support

This project includes Capacitor configuration for potential mobile app deployment:

```bash
# Build for mobile
pnpm build
npx cap add android
npx cap add ios
```

## 🤝 Contributing

We welcome contributions! Please feel free to submit issues and pull requests.

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- UI components from [Radix UI](https://www.radix-ui.com/)
- Styling with [Tailwind CSS](https://tailwindcss.com/)
- Maps powered by [Leaflet](https://leafletjs.com/)

---

**VoxCivis** - Empowering communities through civic technology. 🏛️ 
