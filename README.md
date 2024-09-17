# Embeddable Code Test - PokeCharts

## [Christopher Buecheler](https://closebrace.com)

### How to run

1. Clone this repo
2. `cd embeddable-test`
3. `npm i`
4. `npm start`
5. A browser window should open automatically for you, but if not, navigate to [http://localhost:5173/](http://localhost:5173/)

### Reasoning / Approach

#### Vite

I used Vite to scaffold the React app because it's quick and easy, its server is faster than most other options, it's not as complex as Next.js&mdash;which felt like overkill for this particular project&mdash;and because it supports TypeScript out of the box.

#### Routing

I opted not to spend time setting up React Router and instead implemented an extremely simple component switcher via `useState` mainly just to make the app look a little more fleshed out.

#### Fetch

In a larger application I'd probably use something like [SWR](https://swr.vercel.app/) for data fetching since it provides caching and mutation while eliminating the need for `useEffect`, but in this instance I wanted to show that I was comfortable with the browser Fetch API, so I went that direction instead.

#### Mantine

I've worked extensively with a variety of design libraries, including Material-UI, Reactstrap, and more. [Mantine](https://mantine.dev/) is my current favorite, and the one I've most recently worked with, so I went with that for speed.

#### Chart.js

I went with Chart.js for DataVis because my understanding is that Embeddable works with it pretty regularly, and I figured it made sense to show I could manipulate it.

#### Prettier

I use Prettier for code formatting. I have it set to my particular defaults (justification below) but am happy to work within whatever formatting conventions Embeddable prefers.

- _"arrowParens": "always"_ - Makes it quicker to add additional params to arrow functions
- _"printWidth": 100_ - A good width for modern resolutions while still keeping code readable
- _"semi": true_ - Avoids rare edge case issues where JS semi insertion works improperly
- _"singleQuote": true_ - I like double quotes for React JSX, single quotes everywhere else
- _"tabWidth": 2_ - I find 4-space tabs too chunky
- _"trailingComma": "all",_ - Makes it quicker to add additional properties to objects
- _"useTabs": true_ - Tabs are more accessibility-friendly than spaces, as they can be adjusted by the individual with no impact on the actual code.

### Issues / Challenges

The first challenge I encountered was that I was hammering the PokeAPI. I noted that 3rd party modules exists to get around this, but I wanted to stick with rolling my own, so I added some quick caching to the initial lookup and the individual Pokémon lookups to take care of that. No real reason for this particular app to get the date more than once.

The next challenge was just getting Chart.js to work, as I hadn't used it before. Turned out to be pretty straightforward, although I did borrow a 3rd party library to implement it in React because I didn't want to get too into the weeds componentizing Chart.js itself. This wasn't particularly difficult to get running, so I went ahead and implemented the percent toggle on it. The hardest part there was figuring out the syntax to change the axis and tooltip data, but again &hellip; not too rough.

I cleaned things up, added some titles, made things pretty, and then set about tackling the filtering task. It didn't seem like it'd be very useful to apply the filtering to the charts themselves, so I instead created a quick data table with Mantine down below the charts and then added filtering to that.
