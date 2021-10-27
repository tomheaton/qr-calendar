# QR Calendar :calendar:

### Check out a live version [here](https://qr-calendar.vercel.app) :point_left:

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started :gear:

First, clone the repository:

```bash
git clone https://github.com/tomheaton/qr-calendar.git
```

Second, install all the node dependencies:
```bash
npm install
# or
yarn install
```

Third, create a `.env.local` file and add the following:

```dotenv
NEXT_PUBLIC_CALENDAR_URL=*url*
NEXT_PUBLIC_CALENDAR_NAME=*name*
NEXT_PUBLIC_CALENDAR_LOCATION=*location*
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
```

And finally, open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Todo :pencil:

This is the todo list:

- [x] start project 
- [x] add `layout.tsx`
- [x] move to `src` directory structure
- [ ] add `_document.tsx`
- [x] fix whitespace issue
- [x] add css
- [x] add more logic checks etc.
- [x] mobile optimization
- [x] clean up css
- [x] finish project
