# React Router 4

## SPAs

So far all of our React applications have been composed of a few components. As our applications grow, we will need to change the components on the page. Often the changes happen because of a link that was clicked or because of data that has been submitted.

Any client-side (JavaScript) application that transitions between pages without refreshing the page or rendering a new HTML file from the server is called a Single-Page Application. On a well-designed SPA, the user should feel like the page still functions just like a standard server-based web app.

### Specifically:

* The browser back button should still work.
* Adding a bookmark to a specific page should still work.
* Even the first page load should essentially work the same way.
* You've already been utilizing SPA concepts already! By clearing HTML and rendering something new in its place.

## Getting Started

Some frameworks like Angular and Ember come with a router, but since React is a much smaller library, it does not have its own router. To use client side routing with React, we're going to install a popular router called react-router. React Router has three separate packages:

* `react-router` (base dependency package, not installed directly)
* `react-router-dom` (this package is used for web development)
* `react-router-native` (this package is used for mobile development)

Note: We won't be installing `react-router` directly. It will be installed as a dependency of `react-router-dom`.

## First

First, go to to the `src/index.js` file inside of your repo. We are going to wrap the `App` component with a router. The code should look like this:

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App'
import { BrowserRouter } from 'react-router-dom';

import './styles/index.css';

ReactDOM.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>,
    document.getElementById('app')
);
```

* There are a few things to take note of here. First, we imported BrowserRouter. The BrowserRouter, as the name implies, is a router designed for building single page applications in the browser. We'll highlight other types of routers momentarily, but in this course, BrowserRouter is typically the one you'll need.

* Second, notice that our App component is now a child of BrowserRouter. It is important to take note that the router component we import from React Router expects exactly one child. Therefore whenever you use React Router, you will need to wrap your application in a router just like in the example above.

## HashRouter and BrowserRouter

The `BrowserRouter` component uses the HTML5 history API, and is the most commonly used high-level router when building SPAs for the browser with React and React Router.

The `HashRouter` is designed for support with older browsers that may not have access to the history API. In such cases, you can still get single-page type functionality by inserting an anchor (#) into the URL. However, this does not provide full backwards-compatibility: for this reason, the React Router documentation recommends BrowserRouter over HashRouter if possible.

## Add Some Routes

Let's add some routes to `App.js`.

```javascript
import React from 'react';
import { Route, Link } from 'react-router-dom';

const Home = () => {
    return <h1>Home</h1>;
}

const About = () => {
    return <h1>About</h1>;
}

const Contact = () => {
    return <h1>Contact Us</h1>;
}

const App = () => {
    return (
        <div>
            <h1>Hello, world!</h1>
            <ul>
                <li>Home</li>
                <li>About</li>
                <li>Contact Us</li>
            </ul>

            <Route exact path="/" component={Home} />
            <Route path="/about" component={About} />
            <Route path="/contact" component={Contact} />
        </div>
    );
};

export default App;
```

* Now if we start up our Dev Server and navigate to `/about` we see the about page. Same with `/contact`.

## Route

This component basically acts as a translation service between routes and components. You tell it what path to look for in the URL, and what component it should render when it detects a match to that path.

Notice that the Route for `path="/"` has the `exact` attribute. That tells react router that you only want to match the route exactly. Without the `exact` attribute, the content of the `Home` component will always show up, since / matches `/`, `/about`, and `/contact`.

## Link

* Our top unordered list is really just navigation, so let's make that its own component to be more declarative.
* Let's also add some links!

```javascript
const Navigation = () => {
    return (
        <ul>
            <li>
                <Link to="/">Home</Link>
            </li>
            <li>
                <Link to="/about">About</Link>
            </li>
            <li>
                <Link to="/contact">Contact Us</Link>
            </li>
        </ul>
    )
}

const App = () => {
    return (
        <div>
            <h1>Hello, world!</h1>
            <Navigation />

            <Route exact path="/" component={Home} />
            <Route path="/about" component={About} />
            <Route path="/contact" component={Contact} />
        </div>
    );
};
```

* The `Link` components you see are used as a replacement for the built-in anchor tag. If we're building a single-page application, anchor tags can't really be used, since they cause the page to reload. So when you're using React Router, you should be using `<Link>` instead of `<a>` to control links on the page.

* Try running the application and clicking on the links. Notice that the address bar in the browser is changing. If you open up your network tab in chrome developer tools and check for HTTP requests, you should see that nothing is happening on the network and that the browser is not reloading the page.

* So how does this work? Whenever you click on a Link component, react uses `window.history` to change the url in the address bar. The Route component renders the component specified in the component attribute whenever the current url path matches the path attribute.