import React from "react";
import EventList from "../components/events/EventList";
import { getFeaturedEvents } from "../helpers/api-utils";

const HomePage = ({ events }) => {
	return (
		<div>
			<ul>
				<EventList items={events} />
			</ul>
		</div>
	);
};

// Static generation

export async function getStaticProps() {
	const featuredEvents =
		await getFeaturedEvents();

	return {
		props: {
			events: featuredEvents,
		},
	};
}

export default HomePage;
