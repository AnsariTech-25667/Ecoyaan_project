# Ecoyaan Checkout Flow (Frontend Assignment)

This project implements a simplified e-commerce checkout flow built using modern React and Next.js patterns.

## Features

- Cart page rendered using Server-Side Rendering
- Shipping address form with validation
- Global checkout state using React Context
- Payment confirmation page
- Simulated payment processing
- Order success page with order details

## Tech Stack

- **Next.js 14** (App Router)
- **React**
- **TypeScript**
- **Tailwind CSS**
- **Context API**

## Project Structure

```
app/
  cart/
  checkout/
  payment/
  success/
  api/

context/
  CheckoutContext.tsx

types/
  cart.ts
```

## Checkout Flow

```
Cart → Checkout → Payment → Success
```

## Server-Side Rendering

The cart page fetches cart data using a Next.js Server Component during rendering.

## State Management

Checkout state is stored using the React Context API.

This context stores:

- Cart items
- Shipping address
- Order totals

## Running the Project

Install dependencies:

```bash
npm install
```

Run development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Deployment

The project can be deployed using Vercel.

Steps:

1. Push repository to GitHub
2. Import project into Vercel
3. Deploy
