# Overview

UBverse is a comprehensive campus companion web application designed specifically for international students at the University of Buffalo (UB). The platform addresses the challenges faced by over 8,000 international students by providing five integrated features: an AI-powered cultural assistant chatbot (UB GlobalPal), a multi-language translator, an interactive cultural food map, a region-based student matcher, and a campus-wide mood tracker. The application helps students navigate American culture, find community connections, and access resources in a non-judgmental, accessible format.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture

**Multi-Page Application (MPA) Pattern**: The application uses a traditional multi-page architecture with separate HTML files for each feature rather than a single-page application framework. Each page (`index.html`, `chat.html`, `translator.html`, `map.html`, `region.html`, `mood.html`) functions independently while sharing common styling and navigation components.

**Rationale**: This approach prioritizes simplicity and eliminates the need for build tools, bundlers, or complex state management. It allows rapid development and deployment without JavaScript frameworks, making the codebase accessible and maintainable for students or junior developers.

**Technology Stack**: Pure HTML5, CSS3, and vanilla JavaScript with no frontend frameworks or libraries. The design uses CSS custom properties for theming and is mobile-first responsive.

**Styling Strategy**: A consistent dark mode design system centered around UB's brand color (`--ub-blue: #005bbb`) with CSS variables for maintainability. A sticky navigation bar appears across all pages with active state indicators. Background images are stored in `/public/assets/` and referenced relatively.

**Pros**: Fast initial load times, no build process, easy deployment, minimal dependencies, simple debugging.

**Cons**: Code duplication across HTML pages (navigation component repeated), no client-side routing, potential for inconsistent state management across features.

## Backend Architecture

**RESTful API with Static File Serving**: Express.js v5.1.0 serves as both the API backend and static file server. The server runs on Node.js 18+ (required by Google Gemini AI SDK).

**Stateless API Design**: The backend provides two primary endpoints:
- `POST /api/chat` - Processes AI chatbot conversations with Google Gemini
- `POST /api/register` and `POST /api/students` - Student registration and region matching
- `POST /api/mood` and `GET /api/moods` - Mood tracking submission and retrieval

**Rationale**: A simple Express server handles both static assets and API requests, avoiding the complexity of separate frontend/backend deployments. The stateless design allows easy horizontal scaling.

**Static File Serving**: The `/public` directory contains all frontend assets (HTML, CSS, images) and is served via `express.static()` middleware. The server explicitly handles the root route (`/`) to serve `index.html`.

**Pros**: Single deployment artifact, simplified CORS handling, reduced operational complexity.

**Cons**: Tight coupling between frontend and backend, limited separation of concerns.

## AI Integration

**Google Gemini API**: The chatbot feature uses Google's Generative AI SDK (`@google/generative-ai` v0.24.1) with the `gemini-2.0-flash` model for conversational AI.

**Conversation Management**: Chat history is maintained client-side and sent with each request to provide context-aware responses. The backend starts a new chat session for each request using the provided history.

**Response Formatting**: Messages are explicitly instructed to respond in plain text rather than Markdown to ensure consistent formatting in the chat UI.

**Authentication**: API key stored in environment variables (`GEMINI_API_KEY`) and loaded via dotenv.

**Rationale**: Google Gemini provides a balance of performance, cost-effectiveness, and cultural understanding necessary for supporting international students with diverse backgrounds.

**Alternatives Considered**: OpenAI GPT models were considered but Gemini was chosen for its free tier and multilingual capabilities.

## Database Layer

**PostgreSQL with pg Driver**: The application uses PostgreSQL for persistent data storage with the native `pg` driver (v8.16.3) via connection pooling.

**Schema Design**: Two primary tables:
- `students` - Stores student registration data (name, country, UBIT email, phone, timestamp)
- `moods` - Records mood submissions with timestamps for campus-wide tracking

**Database Initialization**: The server automatically creates tables if they don't exist on startup using `CREATE TABLE IF NOT EXISTS` statements.

**Connection Strategy**: Uses `pg.Pool` for connection pooling with SSL support in production environments. The connection string is read from `DATABASE_URL` environment variable.

**Rationale**: PostgreSQL was chosen for its reliability, ACID compliance, and strong support for complex queries needed for region-based student matching and mood aggregation.

**Alternatives Considered**: Could use Drizzle ORM for type safety and migrations, but direct SQL queries were chosen for simplicity in this educational project.

# External Dependencies

## Third-Party Services

**Google Generative AI (Gemini)**: Primary AI service powering the UB GlobalPal chatbot. Requires `GEMINI_API_KEY` environment variable. Used for natural language understanding, cultural explanations, and conversational support.

**Google Maps Embed API**: Used in the cultural food map feature (`map.html`) to display restaurant locations in Buffalo. Embedded via iframe with dynamic query parameters based on selected regions.

## NPM Packages

**Core Backend**:
- `express` (v5.1.0) - Web server framework
- `cors` (v2.8.5) - Cross-origin resource sharing middleware
- `pg` (v8.16.3) - PostgreSQL database driver
- `dotenv` (v17.2.3) - Environment variable management

**AI Integration**:
- `@google/generative-ai` (v0.24.1) - Google Gemini SDK (requires Node.js 18+)

**Utilities**:
- `path` (v0.12.7) - File path utilities for static file serving

## Environment Variables Required

- `GEMINI_API_KEY` - Google AI API key for chatbot functionality
- `DATABASE_URL` - PostgreSQL connection string (format: `postgresql://user:password@host:port/database`)
- `PORT` - Server port (defaults to 5000)
- `NODE_ENV` - Environment indicator for SSL configuration (production/development)

## Browser APIs Used

- **Fetch API**: Client-side HTTP requests to backend endpoints
- **LocalStorage**: Potential client-side caching (inferred from chat history management)
- **Geolocation API**: Not currently used but could enhance map feature
