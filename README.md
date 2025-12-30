# Paraf Product Page - Interview Project

A e-commerce product page built with Next.js 15, featuring a complete shopping cart system.

## 🚀 Quick Start

### Installation & Running

```bash
# Install dependencies
pnpm install

# Run development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📍 Available Pages

### Homepage: `/`
- Displays all available products
- Click any product card to view details
- Direct links provided for easy navigation

### Product Pages:
- `/product/iphone-15-pro-256` - iPhone 15 Pro 256GB

## ✨ Key Features

### 🛒 Shopping Cart System
- **Global State Management**: Zustand for cart state
- **Persistent Storage**: Cart data saved in localStorage
- **Real-time Updates**: Live cart badge in header
- **Quantity Control**: Increment/decrement before adding to cart
- **Dynamic Pricing**: Automatic total calculation

### 🎨 Design & UI
- **Custom Components**: Reusable Badge, Button, Input, Separator
- **shadcn/ui Integration**: Custom UI components
- **Tailwind CSS**: Custom design tokens for consistent styling

### ♿ Accessibility
- Semantic HTML5 structure
- ARIA labels and landmarks
- Keyboard navigation support
- Screen reader friendly

### 🏗️ Architecture
- **Next.js 15**: App Router with TypeScript
- **Component Structure**: Feature-based organization
- **Type Safety**: Full TypeScript coverage
- **Error Handling**: Error boundaries and loading states

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── page.tsx           # Homepage with product listing
│   └── product/[slug]/    # Dynamic product pages
├── components/
│   ├── elements/          # Custom reusable components
│   ├── layout/            # Header, navigation
│   └── ui/                # shadcn/ui components
├── feature/product/       # Product feature module
│   ├── components/        # Product-specific components
│   ├── mocks/            # Sample product data
│   └── types/            # TypeScript types
├── store/                # Zustand stores
│   └── cartStore.ts      # Shopping cart state
└── lib/                  # Utilities and helpers
```

## 🛠️ Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 4
- **State Management**: Zustand 5
- **UI Components**: Radix UI, shadcn/ui
- **Icons**: Lucide React
- **Package Manager**: pnpm

## 💡 Implementation Highlights

### Cart Flow
1. User views product page
2. Adjusts quantity using +/- controls
3. Sees real-time price calculation
4. Clicks "Add to Cart" button
5. Cart badge updates in header
6. Cart persists across page refreshes

### Component Design
- **AddToCartCounter**: Controlled component with callbacks
- **ProductPurchase**: Manages local quantity state
- **Header**: Displays live cart count with badge
- **Badge**: Flexible, reusable component with className merging

## 📝 Notes for Reviewers

This project demonstrates:
- Modern React patterns (hooks, controlled components)
- State management best practices
- Accessible, semantic HTML
- TypeScript for type safety
- code organization

## 🔗 Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Zustand Documentation](https://zustand-demo.pmnd.rs/)
- [Tailwind CSS](https://tailwindcss.com)
- [shadcn/ui](https://ui.shadcn.com/)

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
