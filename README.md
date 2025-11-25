# Svelte Base

A comprehensive SvelteKit starter template with authentication, database integration, internationalization, testing, and development tools pre-configured.

## Features

### 🔧 Core Stack
- **[SvelteKit](https://kit.svelte.dev/)** - Full-stack web framework
- **[Svelte 5](https://svelte.dev/)** - Latest version with runes and improved reactivity
- **[TypeScript](https://www.typescriptlang.org/)** - Type safety throughout the application
- **[Vite](https://vitejs.dev/)** - Fast build tool and dev server

### 🎨 Styling & UI
- **[Tailwind CSS 4.0](https://tailwindcss.com/)** - Utility-first CSS framework
- **[@tailwindcss/forms](https://github.com/tailwindlabs/tailwindcss-forms)** - Form styling plugin
- **[@tailwindcss/typography](https://github.com/tailwindlabs/tailwindcss-typography)** - Typography plugin

### 🔐 Authentication & Database
- **[Lucia Auth](https://lucia-auth.com/)** - Simple and flexible authentication
- **[Drizzle ORM](https://orm.drizzle.team/)** - TypeScript ORM with PostgreSQL support
- **[PostgreSQL](https://www.postgresql.org/)** - Robust relational database

### 🌍 Internationalization
- **[Inlang Paraglide](https://inlang.com/m/gerre34r/library-inlang-paraglideJs)** - Type-safe i18n solution
- Pre-configured for English, Japanese, Korean, and Vietnamese

### 📖 Documentation & Stories
- **[Storybook](https://storybook.js.org/)** - Component documentation and testing
- **[MDsveX](https://mdsvex.pngwn.io/)** - Markdown in Svelte components

### 🧪 Testing
- **[Vitest](https://vitest.dev/)** - Unit testing framework
- **[Playwright](https://playwright.dev/)** - End-to-end testing
- **[@vitest/browser](https://vitest.dev/guide/browser.html)** - Browser-based component testing

### 🔍 Code Quality
- **[ESLint](https://eslint.org/)** - JavaScript/TypeScript linting
- **[Prettier](https://prettier.io/)** - Code formatting
- **[TypeScript ESLint](https://typescript-eslint.io/)** - TypeScript-specific linting rules

## Quick Start

### Prerequisites
- Node.js 18+ 
- pnpm (recommended) or npm
- PostgreSQL database

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd svelte-base
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   Edit `.env` and add your PostgreSQL connection string:
   ```
   DATABASE_URL="postgres://user:password@host:port/db-name"
   ```

4. **Set up the database**
   ```bash
   pnpm db:push
   ```

5. **Start the development server**
   ```bash
   pnpm dev
   ```

   Open [http://localhost:5173](http://localhost:5173) in your browser.

## Available Scripts

### Development
- `pnpm dev` - Start development server
- `pnpm preview` - Preview production build locally
- `pnpm check` - Run Svelte type checking
- `pnpm check:watch` - Run type checking in watch mode

### Building
- `pnpm build` - Build for production
- `pnpm prepare` - Sync SvelteKit files

### Database
- `pnpm db:push` - Push database schema changes
- `pnpm db:generate` - Generate database migrations
- `pnpm db:migrate` - Run database migrations
- `pnpm db:studio` - Open Drizzle Studio (database GUI)

### Testing
- `pnpm test` - Run all tests (unit + e2e)
- `pnpm test:unit` - Run unit tests with Vitest
- `pnpm test:e2e` - Run end-to-end tests with Playwright

### Code Quality
- `pnpm lint` - Check code formatting and linting
- `pnpm format` - Format code with Prettier

### Storybook
- `pnpm storybook` - Start Storybook development server
- `pnpm build-storybook` - Build Storybook for production

## Project Structure

```
src/
├── app.html                 # HTML template
├── app.css                  # Global styles
├── hooks.ts                 # Client-side hooks
├── hooks.server.ts          # Server-side hooks
├── lib/
│   ├── index.ts            # Library exports
│   └── server/
│       ├── auth.ts         # Lucia authentication setup
│       └── db/             # Database configuration
├── routes/                 # SvelteKit routes
│   ├── +layout.svelte      # Root layout
│   ├── +page.svelte        # Home page
│   ├── demo/               # Demo pages
│   └── todos/              # Todo example with DB
└── stories/                # Storybook components

messages/                   # i18n message files
├── en.json                 # English translations
├── jp.json                 # Japanese translations
├── kr.json                 # Korean translations
└── vn.json                 # Vietnamese translations

e2e/                        # End-to-end tests
drizzle/                    # Database migrations
```

## Key Features Explained

### Authentication
The project uses Lucia Auth with PostgreSQL for session management. The authentication setup is in `src/lib/server/auth.ts` and includes:
- Session-based authentication
- User management with username and email
- Secure cookie handling

### Database Integration
- Drizzle ORM for type-safe database operations
- PostgreSQL as the primary database
- Migration system for schema changes
- Database studio for visual data management

### Internationalization
- Inlang Paraglide for compile-time i18n
- Support for multiple languages out of the box
- Type-safe translation keys

### Component Development
- Storybook for component isolation and documentation
- Accessibility testing with @storybook/addon-a11y
- Component testing with Vitest browser mode

## Deployment

The project uses `@sveltejs/adapter-auto` which automatically selects the appropriate adapter based on your deployment environment.

For specific platforms, you may need to install and configure a different [adapter](https://svelte.dev/docs/kit/adapters):

- **Vercel**: `@sveltejs/adapter-vercel`
- **Netlify**: `@sveltejs/adapter-netlify`
- **Node.js**: `@sveltejs/adapter-node`
- **Static**: `@sveltejs/adapter-static`

## Contributing

1. Follow the existing code style (enforced by Prettier and ESLint)
2. Write tests for new features
3. Update documentation as needed
4. Use conventional commit messages

## License

This project is licensed under the MIT License.

---

**Built with ❤️ using SvelteKit and modern web technologies**
