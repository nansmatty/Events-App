import { useRouter } from "next/router";
import EventList from "../../components/events/EventList";
import EventSearch from "../../components/events/EventSearch";
import { getAllEvents } from "../../helpers/api-utils";
// import { getAllEvents } from "../../dummy_data";

const AllEvents = ({ events }) => {
	// const events = getAllEvents();

	const router = useRouter();

	const findEventsHandler = (year, month) => {
		const fullPath = `/events/${year}/${month}`;

		router.push(fullPath);
	};

	return (
		<div>
			<EventSearch onSearch={findEventsHandler} />
			<EventList items={events} />
		</div>
	);
};

export async function getStaticProps() {
	const events = await getAllEvents();

	return {
		props: {
			events: events,
		},
		revalidate: 60,
	};
}

export default AllEvents;
