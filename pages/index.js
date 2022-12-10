import React from "react";
import EventList from "../components/events/EventList";
import { getFeaturedEvents } from "../dummy_data";

const HomePage = () => {
	const featuredEvents = getFeaturedEvents();

	return (
		<div>
			<ul>
				<EventList items={featuredEvents} />
			</ul>
		</div>
	);
};

export default HomePage;
