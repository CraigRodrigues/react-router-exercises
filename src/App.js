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