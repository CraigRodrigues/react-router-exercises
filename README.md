# React Router 4

## SPAs

* So far all of our React applications have been composed of a few components. As our applications grow, we will need to change the components on the page. Often the changes happen because of a link that was clicked or because of data that has been submitted.

* Any client-side (JavaScript) application that transitions between pages without refreshing the page or rendering a new HTML file from the server is called a Single-Page Application. On a well-designed SPA, the user should feel like the page still functions just like a standard server-based web app.

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
* Note: We won't be installing `react-router` directly. It will be installed as a dependency of `react-router-dom`.

## First

Go to to the `src/index.js` file inside of your repo. We are going to wrap the `App` component with a router. The code should look like this:

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

const Home = () => (
    <h1>Home</h1>
);

const About = () => (
    <h1>About</h1>
);

const Contact = () => (
    <h1>Contact Us</h1>
);

const App = () => (
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

export default App;
```

* Now if we start up our Dev Server and navigate to `/about` we see the about page. Same with `/contact`.

## Route

This component basically acts as a translation service between routes and components. You tell it what path to look for in the URL, and what component it should render when it detects a match to that path.

Notice that the Route for `path="/"` has the `exact` attribute. That tells react router that you only want to match the route exactly. Without the `exact` attribute, the content of the `Home` component will always show up, since / matches `/`, `/about`, and `/contact`.

## Link

* Our top unordered list is really just navigation, so let's make that its own component to be more declarative.
* Let's also add some links!

```jsx
const Navigation = () => (
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
);

const App = () => (
    <div>
        <h1>Hello, world!</h1>
        <Navigation />

        <Route exact path="/" component={Home} />
        <Route path="/about" component={About} />
        <Route path="/contact" component={Contact} />
    </div>
);
```

* The `Link` components you see are used as a replacement for the built-in anchor tag. If we're building a single-page application, anchor tags can't really be used, since they cause the page to reload. So when you're using React Router, you should be using `<Link>` instead of `<a>` to control links on the page.

* Try running the application and clicking on the links. Notice that the address bar in the browser is changing. If you open up your network tab in chrome developer tools and check for HTTP requests, you should see that nothing is happening on the network and that the browser is not reloading the page.

* So how does this work? Whenever you click on a Link component, react uses `window.history` to change the url in the address bar. The Route component renders the component specified in the component attribute whenever the current url path matches the path attribute.

## Route Props

* In our example above, none of the components we wrote (Home, About, Contact) have any props. However, when you pass a component to Route, the component you pass automatically gets access to three props: `match, location, and history`.

* These props provide you with information about the route, the query string, and give you the ability to mutate the history. (P.S. You can see these props more explicitly by using the React tab in the Chrome dev tools if you have that installed).

* Alternatively, you can also display the props on the component directly. For example, suppose you modify the Eat component as follows:

```jsx
const Contact = (props) => (
  <div>
    <h1>Contact Us</h1>
    <pre>{JSON.stringify(props, null, 4)}</pre>
  </div>
);
```

* Now when you go to `/contact`, you should be able to see all of the props on the page.

## URL Parameters

* Once common use case for the route props is working with URL parameters. In order to access these parameters, we use the `match` object given to us by React Router. More specifically, the any URL parameters will live inside of the `match.params` object as key-value pairs. We can access values in the query string using the `location` object given to us by React Router as well.

* Let's see what that looks like. First, create a new file called `src/Students.js`. Inside of `src/App.js`, import the new component we will build and create a link to it in our nav bar.

```jsx
    <li>
        <Link to="/students">Students</Link>
    </li>
```

## Students

In the `src/Students.js` add the following:

```jsx
import React from "react";
import { Route, Link } from "react-router-dom";

const Student = ({ match, location }) => {
  // this should match whatever was put into :name!
  const { name } = match.params;

  return (
    <div>
      <h3>Student Info For {name ? name : "No One"}</h3>
      <h4>
        What's in match? <pre>{JSON.stringify(match, null, 4)}</pre>
      </h4>
      <h4>
        What's in location? <pre>{JSON.stringify(location, null, 4)}</pre>
      </h4>
    </div>
  );
};

const Students = () => (
  <div>
    <h2>Students:</h2>
    <ul>
      <li>
        <Link to="/name/craig">Craig</Link>
      </li>
      <li>
        <Link to="/name/marcel">Marcel</Link>
      </li>
      <li>
        <Link to="/name/ignacio">Ignacio</Link>
      </li>
    </ul>

    <Route path="/name/:name" component={Student} />
  </div>
);

export default Students;
```

* Notice here how we use `:name` in `<Route path="/name/:name" component={Student} />`.
* Whatever is after the `:` will be passed into the component in the params object in the props.match of the component. You can see how it changes as we insert different student names.

## Passing Props to a Route

* What if we want our components to have access to other props as well, not just those coming from the router?
* One way is to use `render` instead of `component`. Let's see what that looks like:

```jsx
    <Route
      exact
      path="/"
      render={(props) => <Home {...props} extra={yourExtraStuffHere} />}
    />
```

* **Notice we are using `render=` and not `component=`!**
* You need to pass in the props into your component as an anonymous function here so you still have access to the params and location objects!

## Switch

* Import the `Switch` component from `react-router-dom`
* Change your Routes to show the following and see what happens if you go to `/about`

```jsx
<Route exact path="/" component={Home} />
<Route path="/about" component={About} />
<Route path="/about/goodmorning" render={() => <h1>Good Morning!</h1> } />
<Route path="/contact" component={Contact} />
```

* Using Switch, we can avoid what happens if we have two paths that have the same origin and do not use `exact`. Switch will pick only the first matching Route. Only the first route that matches `/about` is rendered.

```jsx
<Switch>
    <Route exact path="/" component={Home} />
    <Route path="/about" component={About} />
    <Route path="/about/goodmorning" render={() => <h1>Good Morning!</h1> } />
    <Route path="/books" component={Books} />
</Switch>
```

* Furthermore, Switch allows us to specify a route to render if the URL matches no location, such as a 404 error. For that route, leave the path prop empty.

```jsx
<Route component={NotFound} />
```

In summary Switch will do the following:

1. Avoid inclusive route rendering.
1. Allow you to include a catch-all Route at the bottom of the Switch container.