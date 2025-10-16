# Medifree Homepage Page Builder Components

This document describes the new Sanity page builder components that were created for the Medifree homepage sections.

## Overview

The following homepage sections have been converted into reusable page builder components:

1. **Hero Section** - Image carousel with heading, subheading, badge, and optional book button
2. **Quote Section** - Inspirational quote with optional author attribution  
3. **Therapist Section** - Display therapists with option to show all or selected ones
4. **Video Section** - Embedded video content with customizable playback options
5. **Services Carousel Section** - Carousel of services with filtering options
6. **How It Works Section** - Step-by-step process with customizable steps
7. **Calendar Section** - Booking calendar interface
8. **Social Connect Section** - Social media links and connection info
9. **Contact Section** - Contact form with GDPR compliance

## Usage

### In Sanity Studio

1. Navigate to the Pages section in Sanity Studio
2. Create a new page or edit an existing one
3. Use the Page Builder field to add sections
4. The sections will appear in a grid view with thumbnail previews
5. Configure each section using the available fields

### Schema Structure

Each component includes the following configurable options:

#### Hero Section
- `heading` - Main title text
- `subheading` - Subtitle/description text
- `badge` - Small badge label
- `images` - Array of background images for carousel
- `showBookButton` - Toggle to show/hide booking button

#### Quote Section  
- `quote` - The quote text
- `author` - Quote attribution (optional)
- `backgroundColor` - Section background color

#### Therapist Section
- `title` - Section title (default: "O nás")
- `showAllTherapists` - Auto-include all therapist documents
- `selectedTherapists` - Manually select specific therapists
- `backgroundColor` - Section background color

#### Video Section
- `video` - Reference to video document
- `autoplay` - Enable autoplay when in view
- `showControls` - Show/hide video controls
- `loop` - Enable video looping

#### Services Carousel Section
- `title` - Section title
- `subtitle` - Section subtitle
- `badge` - Badge text
- `showAllServices` - Auto-include all homepage services
- `selectedServices` - Manually select specific services
- `backgroundColor` - Section background color

#### How It Works Section
- `badge` - Badge text (default: "Jak to funguje?")
- `title` - Section title (default: "Náš postup")
- `steps` - Array of steps with title and description
- `backgroundColor` - Section background color

#### Calendar Section
- `title` - Section title
- `subtitle` - Section subtitle
- `badge` - Badge text
- `description` - Rich text description
- `backgroundColor` - Section background color
- `showBookButton` - Toggle booking button

#### Social Connect Section
- `title` - Section title
- `subtitle` - Section subtitle
- `badge` - Badge text
- `description` - Rich text description
- `socialLinks` - Array of social media links
- `backgroundColor` - Section background color

#### Contact Section
- `title` - Section title
- `subtitle` - Section subtitle
- `badge` - Badge text
- `description` - Rich text description
- `showContactForm` - Toggle contact form
- `gdprDocument` - Reference to GDPR document
- `backgroundColor` - Section background color

## Implementation Details

### File Structure
```
studio/src/schemaTypes/objects/
├── heroSection.ts
├── quoteSection.ts
├── therapistSection.ts
├── videoSection.ts
├── servicesCarouselSection.ts
├── howItWorksSection.ts
├── calendarSection.ts
├── socialConnectSection.ts
└── contactSection.ts

nextjs-app/app/components/sanity/sections/
├── HeroSection.tsx
├── QuoteSection.tsx
├── TherapistSection.tsx
├── VideoSection.tsx
├── ServicesCarouselSection.tsx
├── HowItWorksSection.tsx
├── CalendarSection.tsx
├── SocialConnectSection.tsx
└── ContactSection.tsx
```

### React Components

Each React component follows this pattern:
- Accepts a `block` prop with the section configuration
- Provides sensible defaults for all optional fields
- Wraps or reuses existing homepage section components where possible
- Supports customizable styling through `backgroundColor` prop

### Queries

The page query has been updated to include all necessary data for each section type, including:
- Image assets with URLs
- Referenced documents (therapists, videos, services, GDPR docs)
- Rich text content for descriptions

## Migration

To migrate the existing hardcoded homepage to use the page builder:

1. Create a new page in Sanity Studio called "Homepage"
2. Add the desired sections using the page builder
3. Configure each section with the appropriate content
4. Update the homepage route to fetch and render the page builder content
5. Replace the hardcoded section components with the PageBuilder component

## Benefits

- **Content Management**: Non-technical users can easily modify homepage content
- **Flexibility**: Sections can be reordered, added, or removed without code changes
- **Reusability**: Sections can be used on other pages beyond the homepage
- **Consistency**: Standardized interface for managing all homepage sections
- **Scalability**: Easy to add new section types in the future

## Thumbnails

Placeholder thumbnails have been created for the page builder interface. To customize these:

1. Replace the files in `studio/static/page-builder-thumbnails/`
2. Use the naming convention: `{sectionType}.webp`
3. Recommended size: 300x200px