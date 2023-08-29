This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

create your .env file with next variable: ``` API_URL ```

First, run the development server:

```bash
npm install
# or
yarn install
```
 and

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Project Reflection

### 1. Did you run into any “gotchas” along the way? If so, what were they and how did you address them?
 Proxi configuration, it was easy at the end but hard to understand how it works

### 2. How did you handle forms? In a largely formdriven project, would you do anything differently? If so, what?
i used formik, great library to works with forms and easy to add validations and events

### 3. How did you handle authorization? In your ideal FE/BE scenario,
what auth strategy would you use?
i created a context to save token and session storage to check if the user is auth

### 4. Is there anything you’d like to share about your project prior to my evaluating it?
found some issues on the api but funny to work with nextJS

### 5. How long did you spend on this exercise? If you had unlimited more time to spend on this, how would you spend it and how would you prioritize each item?
i did it arount 10 hrs because i did it on different days and if i have more time i would like to improve how i handle the protected routes, i fonund differents ways to do it and i would like to see whicj is the best option