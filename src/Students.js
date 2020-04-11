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
				<Link to="/students/name/craig">Craig</Link>
			</li>
			<li>
				<Link to="/students/name/marcel">Marcel</Link>
			</li>
			<li>
				<Link to="/students/name/ignacio">Ignacio</Link>
			</li>
		</ul>

		<Route path="/students/name/:name" component={Student} />
	</div>
);

export default Students;
