# Embeddable Code Test - PokeCharts

## [Christopher Buecheler](https://closebrace.com)

_September 18th, 2024_

### How to run

1. Clone this repo
2. `cd embeddable-test`
3. `npm i`
4. `npm run dev`
5. A browser window should open automatically for you, but if not, navigate to [http://localhost:5173/](http://localhost:5173/)

### Reasoning / Approach

#### Vite

I used Vite to scaffold the React app because it's quick and easy, its server is faster than most other options, it's not as complex as Next.js&mdash;which felt like overkill for this particular project&mdash;and it supports TypeScript out of the box.

#### State

I'm opting to just use component state and not set up a store with something like [Redux](https://redux.js.org/) / [Mobx State Tree](https://github.com/mobxjs/mobx-state-tree) / [Zustand](https://github.com/pmndrs/zustand). I'm not against using app state but you can do a lot in modern React without it, and particularly given that our entire app is two pages (and one of them is just this readme), something more complex isn't needed here.

#### Routing

I opted not to spend time setting up React Router and instead implemented an extremely simple component switcher via `useState` mainly just to make the app look a little more fleshed out. Most of the time I'd be using an out-of-the-box router like Next.js's.

#### Fetch

In a larger application I'd probably use something like [SWR](https://swr.vercel.app/) for data fetching since it provides caching and mutation while eliminating the need for `useEffect`, but in this instance I wanted to show that I was comfortable with the browser Fetch API, so I went that direction instead.

#### Mantine

I've worked extensively with a variety of design libraries, including Material-UI, Reactstrap, and Foundation, among others. [Mantine](https://mantine.dev/) is my current favorite, and the one I've most recently worked with, so I went with that for speed.

#### Chart.js

I went with Chart.js for DataVis because my understanding is that Embeddable works with it pretty regularly, and I figured it made sense to show I could manipulate it.

#### Prettier

I use Prettier for code formatting. I have it set to my particular defaults (justifications below) but am happy to work within whatever formatting conventions Embeddable prefers.

- **"arrowParens": "always"** - Makes it quicker to add additional params to arrow functions
- **"printWidth": 100** - A good width for modern resolutions while still keeping code readable
- **"semi": true** - Avoids rare edge case issues where JS semi insertion works improperly
- **"singleQuote": true** - I like double quotes for JSX, single quotes everywhere else
- **"tabWidth": 2** - 2-space width is the default in the JS/TS landscape
- **"trailingComma": "all",** - Makes it quicker to add additional properties to objects
- **"useTabs": true** - Tabs are more accessibility-friendly than spaces, as they can be adjusted by the individual with no impact on the actual code.

### Issues / Challenges

The first challenge I encountered was that I was hammering the PokeAPI. I noted that 3rd party modules exist to get around this, but I wanted to stick with rolling my own, so I added some quick caching to the initial lookup and the individual Pokémon lookups to take care of that. No real reason for this particular app to get the date more than once.

The next challenge was just getting Chart.js to work, as I hadn't used it before. Turned out to be pretty straightforward, although I did borrow a 3rd party library to implement it in React because I didn't want to get too into the weeds componentizing Chart.js itself. This wasn't particularly difficult to get running, so I went ahead and implemented the percent toggle on it. The hardest part there was figuring out the syntax to change the axis and tooltip data, but again &hellip; not too rough. I cleaned things up, added some titles, and made things pretty.

Once I had the bar graph working, getting the pie chart working was super easy. Again, added some logic for percents, cleaned it up and made it look nice, and then set about tackling the filtering task. It didn't seem like it'd be very useful to apply the filtering to the charts themselves, so I instead created a quick table with Mantine down below the charts and then added filtering to that. It's a pretty straightforward filter since we're only going by name.
