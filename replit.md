# Overview

UBverse is a comprehensive campus companion platform for international students at the University at Buffalo (UB). The platform integrates multiple features:
- **UB GlobalPal Chatbot**: AI-powered cultural assistance using Google Gemini
- **Language Translator**: Multi-language translation tool
- **Cultural Food Map**: Interactive map showing restaurants and cultural spots
- **Region Matcher**: Connect students from the same country/region
- **Mood Tracker**: Campus-wide mood tracking and visualization

With over 8,000 international students at UB, UBverse helps students navigate campus life, American culture, and connect with their community.

# User Preferences

Preferred communication style: Simple, everyday language.

# Recent Changes (November 2025)

- Reorganized project structure with `public/` directory for better code organization
- Fixed CSS path references for background images
- All HTML, CSS, and image assets moved to `/public` directory
- Server configured to serve static files from `/public`
- Added `.gitignore` for Node.js best practices
- All 5 features fully functional and integrated

# System Architecture

## Project Structure

```
/
├── public/                   # All static files served to users
│   ├── assets/               # Images and media files
│   │   ├── ub.jpg
│   │   ├── bg.jpg
│   │   ├── translate.jpg
│   │   ├── map.jpg
│   │   ├── region.jpg
│   │   └── mood.jpg
│   ├── index.html            # Homepage
│   ├── chat.html             # Chatbot interface
│   ├── translator.html       # Language translator
│   ├── map.html              # Cultural food map
│   ├── region.html           # Region matcher
│   ├── mood.html             # Mood tracker
│   └── styles.css            # Global styles
├── server.js                 # Express.js backend
├── package.json              # Dependencies
└── replit.md                 # This file
```

## Frontend Architecture

**Technology Stack**: HTML5, CSS3, Vanilla JavaScript

The frontend uses a traditional web architecture without modern frameworks, prioritizing simplicity and accessibility. This approach was chosen to:
- Minimize complexity and dependencies
- Ensure fast load times for users potentially on slower connections
- Make the codebase accessible to contributors with basic web development skills
- Reduce build tooling requirements

**Trade-offs**: While modern frameworks like React or Vue would provide better component reusability and state management, the vanilla JavaScript approach keeps the project lightweight and easier to maintain for a multi-page application.

## Backend Architecture

**Technology Stack**: Node.js with Express.js

The backend follows a standard Express.js server architecture, providing:
- RESTful API endpoints for chat interactions
- Server-side processing of user queries
- Integration layer with the AI service

**Design Pattern**: The backend likely uses a simple MVC or controller-based pattern common to Express applications, handling HTTP requests and orchestrating AI API calls.

**Rationale**: Express.js was selected for its:
- Minimal overhead and fast performance
- Large ecosystem and community support
- Straightforward routing and middleware capabilities
- Easy integration with AI services

## AI Integration

**AI Provider**: Google Gemini API (gemini-flash-2.0 model)

The application leverages Google's Gemini Flash model, which provides:
- Fast response times suitable for real-time chat
- Strong contextual understanding for cultural nuances
- Cost-effective API pricing for student-focused applications

**Architectural Decision**: The AI is pre-trained with UB-specific knowledge including:
- Campus locations and nicknames ("The Stampede," "Capen," "Timmies")
- Local dining options and international grocery stores
- Mental health resources and support services
- Cultural norms and etiquette (tipping, email formality, social customs)

**Context Management**: The system maintains conversation context to provide coherent, multi-turn dialogues and personalized recommendations.

## Data Architecture

**Current State**: Based on the README, the application does not explicitly mention a database layer.

**Likely Approach**: The system may operate statelessly or use in-memory session storage for maintaining conversation context during active chats.

**Future Consideration**: A database could be added for:
- Persistent conversation history
- User preferences and profiles
- Analytics on common questions
- Resource recommendation improvements

# External Dependencies

## AI Service

**Google Gemini API**: Core dependency for natural language processing and response generation
- Model: gemini-flash-2.0
- Purpose: Conversational AI, cultural translation, empathetic responses
- Integration: Server-side API calls from Node.js backend

## Runtime Environment

**Node.js**: JavaScript runtime for backend execution

**Express.js**: Web application framework for API routing and middleware

## Potential Additional Services

Given the application's features, the following integrations may exist or be beneficial:

- **UB Campus Resources**: Potential integration with official UB APIs or data sources for real-time information about dining halls, events, and services
- **Mental Health Resources**: Links or references to UB counseling services and crisis hotlines
- **Maps/Location Services**: For providing directions to recommended restaurants and campus locations