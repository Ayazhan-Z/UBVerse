# UBverse - University at Buffalo Campus Companion

## Overview

UBverse is a web-based campus companion application designed specifically for international students at the University of Buffalo. The platform provides multiple tools to help students navigate campus life, including real-time chat with AI assistance, language translation, cultural food discovery via maps, regional student matching, and campus mood tracking. The application is built as a multi-page web application with a Node.js/Express backend that integrates Google's Gemini AI for intelligent chat interactions.

## Recent Changes (November 2025)

**Chatbot Integration**: The UB GlobalPal chatbot has been successfully integrated into the UBverse platform:
- Created a dedicated chat page (`chat.html`) with the chatbot interface
- Merged chatbot server code into the main `server.js` file, adding the `/api/chat` endpoint
- Updated navigation across all pages to include the Chat link
- Installed required dependencies: `@google/generative-ai`, `cors`, and `dotenv`
- Configured deployment for autoscale hosting
- The chatbot maintains conversation history on the client side and provides context-aware responses using Google's Gemini 2.0 Flash model

**Mood Tracker Layout Fix** (November 9, 2025):
- Fixed CSS layout issue where mood buttons were wrapping to two rows instead of displaying in a single row
- Removed duplicate `.mood-row` and `.mood-row button` CSS selectors in `styles.css` that were overriding the intended layout with `flex-wrap: wrap`
- Increased `.mood-section.mood-box` container width to 850px to accommodate all 5 mood buttons side-by-side on desktop
- Updated button styling with optimized padding, font size, and flexbox properties for consistent sizing
- Added responsive media query (`@media (max-width: 768px)`) to allow wrapping on mobile devices for better usability
- Expected behavior: On desktop (>768px width), all 5 mood buttons display in a single horizontal row; on mobile/tablets (<768px width), buttons wrap naturally to multiple rows for better touch accessibility

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Technology Stack**: Pure HTML, CSS, and vanilla JavaScript with no frontend frameworks. The application uses a multi-page architecture where each feature is a separate HTML file with shared styling.

**Design Pattern**: The frontend follows a traditional multi-page application (MPA) pattern rather than a single-page application (SPA). Each feature (chat, translator, map, region matcher, mood tracker) is implemented as a standalone HTML page with client-side JavaScript for interactivity.

**Rationale**: This approach was chosen for simplicity and ease of deployment without build tools or complex state management. It allows each feature to function independently while maintaining consistent branding through shared CSS.

**Styling Strategy**: CSS custom properties (CSS variables) are used extensively for theming, with a dark mode design system centered around UB's brand colors (--ub-blue: #005bbb). The design is mobile-responsive with fixed viewport settings to prevent zooming issues on mobile devices.

**Navigation**: A sticky navigation bar component is repeated across all pages, providing consistent access to all features. The active page is indicated through an `.active` class that applies accent styling.

### Backend Architecture

**Server Framework**: Express.js v5.1.0 running on Node.js (minimum version 18.0.0 required by Gemini AI dependency).

**Design Pattern**: RESTful API with a single chat endpoint (`POST /api/chat`) that processes conversational AI requests. The server also functions as a static file server for the frontend assets.

**Core Components**:

1. **Static File Serving**: Express serves all HTML, CSS, and JavaScript files directly from the project root directory with cache-control headers disabled to ensure fresh content delivery during development.

2. **AI Chat Service**: Integration with Google's Gemini 2.0 Flash model via the `@google/generative-ai` SDK. The chat endpoint maintains conversation history on the client side and processes it server-side for context-aware responses.

3. **Error Handling**: Graceful degradation if the Gemini API key is missing - the server will start but log a warning that the chatbot won't work. This prevents complete application failure.

**Pros**: Simple architecture, minimal dependencies, easy to understand and modify, no database overhead for prototyping.

**Cons**: No data persistence (all data is client-side only), limited scalability for production use, no user authentication system.

### Data Storage

**Current Implementation**: Client-side only storage using JavaScript variables and browser memory. No persistent database is implemented.

**Student Matcher Feature**: Uses in-memory arrays (`let students = []`) that reset on page reload. Student registration data is not persisted across sessions.

**Mood Tracker**: Stores mood submissions locally in JavaScript without backend persistence.

**Alternative Considered**: A database solution (such as PostgreSQL with Drizzle ORM) would enable persistent storage for student profiles, mood tracking history, and chat logs. This was not implemented in the current version to minimize complexity.

**Rationale**: The application is designed as a proof-of-concept/prototype where data persistence is sacrificed for rapid development and zero infrastructure requirements beyond the Node.js server.

### External Dependencies

**Google Gemini AI API**:
- **Purpose**: Powers the intelligent chatbot feature with natural language understanding
- **Model**: gemini-2.0-flash (fast, efficient model suitable for conversational AI)
- **Authentication**: API key stored in environment variables (`.env` file) via `dotenv` package
- **Integration**: `@google/generative-ai` npm package v0.24.1
- **Special Instructions**: The system prompts the AI to respond in plain text rather than markdown to ensure clean rendering in the chat interface

**Google Maps Embed API**:
- **Purpose**: Displays cultural restaurants and places in Buffalo
- **Implementation**: iFrame embed with dynamic query parameters based on selected region
- **No Authentication Required**: Uses publicly accessible embed URLs

**CORS Middleware**:
- **Purpose**: Enables cross-origin requests for API endpoints
- **Package**: `cors` v2.8.5
- **Configuration**: Currently set to allow all origins (suitable for development, should be restricted in production)

**Environment Configuration**:
- **Package**: `dotenv` v17.2.3
- **Purpose**: Manages sensitive configuration (GEMINI_API_KEY)
- **Required Variables**:
  - `GEMINI_API_KEY`: Google Gemini API key for chatbot functionality
  - `PORT` (optional): Server port, defaults to 5000

**Frontend Assets**:
- **Google Fonts**: Inter font family loaded via CDN for consistent typography
- **No CSS Framework**: Custom CSS written from scratch for full design control

### Security Considerations

**Current State**: The application has minimal security measures as it's designed for local/prototype use:
- No user authentication or session management
- API key stored in environment variables (not committed to version control)
- No input validation or sanitization on user-submitted data
- No rate limiting on API endpoints

**Production Recommendations**: Would require addition of authentication, input validation, rate limiting, HTTPS enforcement, and restricted CORS policies.