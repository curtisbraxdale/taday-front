# Taday - Minimalist Productivity App

A Windows 98-inspired productivity application built with React, TypeScript, and Tailwind CSS, connected to a backend API for managing events and todos.

## Features

- **Authentication**: Secure login with JWT tokens and refresh token support
- **Events Management**: Create, edit, delete, and view events with priority levels and tags
- **Todos Management**: Track tasks with due dates and descriptions
- **Tags System**: Organize events with custom tags and colors
- **Time Period Filtering**: View events by day, week, month, or year
- **Windows 98 UI**: Retro-styled interface with pixel art icons and authentic styling
- **Real-time Updates**: Connected to backend API for persistent data storage

## API Integration

The application is fully integrated with the Taday API (`http://taday-api.fly.dev`) featuring:

- **Cookie-based Authentication**: Secure HttpOnly cookies for access and refresh tokens
- **Automatic Token Refresh**: Seamless token renewal for uninterrupted sessions
- **Error Handling**: Comprehensive error handling with user-friendly messages
- **Data Transformation**: Automatic conversion between API and frontend data formats
- **Loading States**: Visual feedback during API operations

## Tech Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS
- **UI Components**: Radix UI primitives with custom Windows 98 styling
- **State Management**: Custom hooks for API integration
- **Icons**: Custom pixel art icons in Windows 98 style
- **Date Handling**: date-fns for date manipulation
- **Build Tool**: Vite for fast development and building

## Getting Started

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start development server**:
   ```bash
   npm run dev
   ```

3. **Build for production**:
   ```bash
   npm run build
   ```

## API Endpoints

The application integrates with the following API endpoints:

### Authentication
- `POST /login` - User authentication
- `POST /logout` - User logout
- `POST /refresh` - Refresh access token
- `POST /revoke` - Revoke refresh token

### Events
- `GET /events` - Get user events (with filtering)
- `POST /events` - Create new event
- `GET /events/{id}` - Get specific event
- `PUT /events/{id}` - Update event
- `DELETE /events/{id}` - Delete event

### Todos
- `GET /todos` - Get user todos
- `POST /todos` - Create new todo
- `GET /todos/{id}` - Get specific todo
- `PUT /todos/{id}` - Update todo
- `DELETE /todos/{id}` - Delete todo

### Tags
- `GET /tags` - Get user tags
- `POST /tags` - Create new tag
- `PUT /tags/{id}` - Update tag
- `DELETE /tags/{id}` - Delete tag

### Event Tags
- `GET /events/{id}/tags` - Get event tags
- `POST /events/{id}/tags` - Add tag to event
- `DELETE /events/{id}/tags/{tag_id}` - Remove tag from event

## Project Structure

```
src/
├── components/          # React components
│   ├── auth/           # Authentication components
│   ├── dashboard/      # Dashboard components
│   ├── events/         # Event management components
│   ├── todos/          # Todo management components
│   ├── layout/         # Layout components
│   ├── icons/          # Custom pixel art icons
│   └── ui/             # Reusable UI components
├── hooks/              # Custom React hooks
│   ├── useAuth.ts      # Authentication hook
│   ├── useEvents.ts    # Events management hook
│   ├── useTodos.ts     # Todos management hook
│   └── useValidation.ts # Form validation hook
├── lib/                # Utility libraries
│   ├── api.ts          # API service layer
│   ├── transformers.ts # Data transformation utilities
│   ├── utils.ts        # General utilities
│   └── win98-toast.ts  # Toast notification system
├── types/              # TypeScript type definitions
└── styles/             # CSS and styling
```

## Key Features

### Windows 98 Aesthetic
- Authentic retro styling with inset/outset borders
- Custom pixel art icons
- Monospace fonts (Space Mono, JetBrains Mono)
- Classic button and input styling
- Retro color palette

### Data Management
- Real-time synchronization with backend API
- Optimistic updates for better UX
- Comprehensive error handling
- Loading states and feedback
- Data transformation between API and frontend formats

### User Experience
- Typewriter text animations
- Smooth transitions and hover effects
- Responsive design for all screen sizes
- Intuitive navigation and interactions
- Toast notifications for user feedback

## Development

The application uses modern React patterns with TypeScript for type safety. Custom hooks manage API integration and state, while the component architecture follows separation of concerns principles.

Key development features:
- Hot module replacement with Vite
- TypeScript for type safety
- ESLint for code quality
- Tailwind CSS for styling
- Custom component library

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.