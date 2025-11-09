# UBVerse - University at Buffalo Campus Companion

## Overview

UBVerse (also known as UB GlobalPal) is a web-based campus companion platform designed specifically for international students at the University of Buffalo. The application provides multiple tools to help students navigate cultural transitions, connect with peers, access mental health support, and discover local resources. Core features include an AI-powered chatbot for cultural questions, a language translator, an interactive map of cultural restaurants, a region-based student matcher, and a campus-wide mood tracker.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Multi-Page Static Web Application**: The frontend uses pure HTML5, CSS3, and vanilla JavaScript with no frontend frameworks. Each feature is implemented as a separate HTML page (`index.html`, `chat.html`, `translator.html`, `map.html`, `region.html`, `mood.html`) that shares a common navigation bar and styling system.

**Rationale**: This approach was chosen for simplicity, quick deployment, and minimal dependencies. It allows each feature to function independently while maintaining consistent branding through shared CSS variables and navigation components.

**Styling System**: Uses CSS custom properties (variables) defined in `styles.css` for theming (`--ub-blue`, `--nav-bg`, `--accent`, etc.) and the Inter font family from Google Fonts for consistent typography across all pages.

**Widget-Based Chat**: The chatbot is available both as a dedicated page (`chat.html`) and as a floating widget on the homepage. The widget implementation uses fixed positioning with z-index layering to overlay chat functionality without navigation.

### Backend Architecture

**Express.js REST API**: Single Node.js server (`server.js`) handles static file serving and AI chat endpoints. The server runs on a configurable port (defaults to 5000) and uses Express 5.1.0.

**Static File Serving**: All HTML, CSS, and client-side JavaScript files are served directly from the project root using `express.static()` with `path.join(__dirname)` for cross-platform compatibility.

**API Endpoint Design**: Single POST endpoint `/api/chat` accepts user messages and conversation history, returning AI-generated responses. The endpoint validates input and provides graceful error handling.

**CORS Configuration**: Enabled via the `cors` middleware to allow cross-origin requests, supporting flexible frontend deployment scenarios.

**Environment-Based Configuration**: Uses `dotenv` package for environment variable management, with fallback defaults for port configuration and validation for required API keys.

### AI Integration

**Google Gemini 2.0 Flash**: The chatbot uses Google's Generative AI SDK (`@google/generative-ai` v0.24.1) with the "gemini-2.0-flash" model for conversational responses.

**Conversation History Management**: Client-side history tracking allows the AI to maintain context across multiple messages. The history array is passed with each request to the `/api/chat` endpoint.

**Prompt Engineering**: All prompts are prefixed with "REPLY IN PLAIN TEXT, AND NOT MARKDOWN!" to ensure responses are formatted for direct display without additional parsing.

**Rationale**: Gemini 2.0 Flash was selected for its balance of response quality, speed, and cost-effectiveness for a student-facing application. The client-side history approach keeps the backend stateless and scalable.

### Data Storage

**Client-Side Storage Only**: The application currently uses no persistent backend database. All data (student registrations in Region Matcher, mood tracker votes) is stored in browser memory using JavaScript arrays and resets on page reload.

**Rationale**: This design choice prioritizes rapid prototyping and minimal infrastructure overhead. For production deployment, this would need to be replaced with a persistent database solution.

**Future Database Consideration**: The architecture is designed to easily integrate a database layer (likely PostgreSQL or MongoDB) for the Region Matcher and Mood Tracker features without significant refactoring.

### Feature-Specific Implementations

**Language Translator**: Client-side implementation that likely uses browser APIs or third-party translation services (implementation details not fully visible in provided files).

**Interactive Map**: Embeds Google Maps iframe with dynamic query updates based on selected cultural regions (East Asian, South Asian, Middle Eastern, etc.). Region filtering updates the iframe source URL.

**Region Matcher**: Simple form-based registration system storing student profiles (name, country, UBIT email, phone) in a client-side array with search functionality by country.

**Mood Tracker**: Five-level emotion tracking system (Amazing, Good, Okay, Not Great, Tough) with emoji indicators. Aggregates campus-wide mood data in browser memory.

## External Dependencies

### Third-Party Services

**Google Generative AI API**: Primary AI service requiring `GEMINI_API_KEY` environment variable. Handles all chatbot conversational logic through REST API calls to Google's servers.

**Google Maps Embed API**: Used in `map.html` for displaying cultural restaurant locations. Currently uses basic iframe embedding without API key requirements.

**Google Fonts**: Serves the Inter font family via CDN for consistent typography across the application.

### NPM Packages

- **express** (v5.1.0): Web server framework for routing and static file serving
- **@google/generative-ai** (v0.24.1): Official Google SDK for Gemini AI integration
- **cors** (v2.8.5): Cross-Origin Resource Sharing middleware
- **dotenv** (v17.2.3): Environment variable management from `.env` files
- **path** (v0.12.7): Cross-platform path utilities for file serving

### Environment Variables

**Required**:
- `GEMINI_API_KEY`: Google Generative AI API key for chatbot functionality

**Optional**:
- `PORT`: Server listening port (defaults to 5000)
- `NODE_ENV`: Environment designation for development/production modes

### Deployment Considerations

The application is configured for deployment on Replit's autoscale hosting platform. The server includes cache-control headers to prevent stale content serving and uses flexible port binding for cloud environments.
