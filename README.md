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

