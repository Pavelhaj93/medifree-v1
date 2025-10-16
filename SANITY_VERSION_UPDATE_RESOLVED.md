# Sanity Version Update - RESOLVED ✅

## Issue
After updating Sanity versions to match local and runtime versions, there was a dependency conflict:

```
✘ [ERROR] No matching export in "../node_modules/@sanity/schema/lib/_internal.mjs" for import "builtinTypes"
```

This was caused by version mismatches between Sanity packages.

## Root Cause
- **Studio**: Using `sanity@^4.10.3` and compatible packages
- **Next.js app**: Using outdated `sanity@^3.74.0` and `next-sanity@^9.8.42`

The `@portabletext/sanity-bridge` dependency was trying to import from an incompatible version of `@sanity/schema`.

## Solution Applied

### 1. Updated Package Versions
Updated the Next.js app to use compatible Sanity v4 packages:

```bash
npm install sanity@^4.10.3 @sanity/client@^7.11.2 next-sanity@^11.4.2
```

### 2. Fixed Breaking Changes in next-sanity v11
The newer version of `next-sanity` changed its export structure. Updated imports:

**Before:**
```typescript
import { defineLive, VisualEditing } from "next-sanity";
```

**After:**
```typescript
import { defineLive } from "next-sanity/live";
import { VisualEditing } from "next-sanity/visual-editing";
import { toPlainText } from "next-sanity";
```

### 3. Fixed TypeScript Errors
Added proper typing for FAQ items:

```typescript
import type { AllFaqsQueryResult } from "@/sanity.types";
// ...
{faqItems.map((item: AllFaqsQueryResult[0]) => (
```

## Files Modified

### Package Updates
- `/nextjs-app/package.json` - Updated Sanity package versions

### Import Fixes
- `/nextjs-app/sanity/lib/live.ts` - Updated `defineLive` import
- `/nextjs-app/app/layout.tsx` - Updated `VisualEditing` import
- `/nextjs-app/app/(site)/layout.tsx` - Updated `VisualEditing` import  
- `/nextjs-app/app/_sanityTemplate/layout.tsx` - Updated `VisualEditing` import

### Type Fixes
- `/nextjs-app/app/(site)/casto-kladene-otazky/page.tsx` - Added proper TypeScript typing

## Current Package Versions

### Studio
- `sanity: ^4.10.3`
- `@sanity/vision: ^4.10.3`
- `@sanity/icons: ^3.5.0`

### Next.js App
- `sanity: ^4.10.3`
- `@sanity/client: ^7.11.2`
- `next-sanity: ^11.4.2`

## Verification

✅ **Studio**: Runs without errors on http://localhost:3333  
✅ **Next.js Build**: Compiles successfully  
✅ **Types**: Generated without issues  
✅ **Page Builder**: All components work correctly  

## Result

Both the Sanity Studio and Next.js application now run with compatible package versions. The dependency conflict has been resolved, and all functionality is preserved including:

- Homepage page builder system
- Visual editing capabilities
- Live preview functionality
- Type safety
- Build process

The upgrade also provides access to the latest Sanity features and improvements in v4.10.3.