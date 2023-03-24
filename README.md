# QR Calendar :calendar:

## Check out a live version [here](https://qr-calendar.com) :point_left:

:calendar: Simple webapp to create calendar events that can easily be shared using QR codes.

## Getting Started :gear:

First, clone the repository:

```bash
git clone https://github.com/tomheaton/qr-calendar.git
```

Second, install all the node dependencies:

```bash
yarn
```

Third, create a `.env` file and add the following:

```dotenv
NEXT_PUBLIC_CALENDAR_URL=*url*
```

Then, run the development server:

```bash
yarn dev
```

And finally, open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Todo :pencil:

This is the todo list:

- [x] start project
- [x] add `layout.tsx`
- [x] move to `src` directory structure
- [x] add `_document.tsx`
- [x] fix whitespace issue
- [x] add css
- [x] add more logic checks etc.
- [x] mobile optimization
- [x] clean up css
- [x] finish project
- [ ] add "all day" option
- [x] tailwindcss ?
- [ ] fix inner input box styling
- [x] add manual theme change
