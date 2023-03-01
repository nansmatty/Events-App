import EventContent from "../../components/event-detail/event-content";
import EventLogistics from "../../components/event-detail/event-logistics";
import EventSummary from "../../components/event-detail/event-summary";
import ErrorAlert from "../../components/ui/error-alert";
// import {
// 	getAllEvents,
// 	getEventById,
// 	getFeaturedEvents,
// } from "../../helpers/api-utils";

import {
	getEventById,
	getFeaturedEvents,
} from "../../dummy_data";

const EventDetailPage = ({ event }) => {
	if (!event) {
		return (
			<>
				<ErrorAlert>
					<p>No event found</p>
				</ErrorAlert>
			</>
		);
	}

	return (
		<>
			<EventSummary title={event.title} />
			<EventLogistics
				date={event.date}
				address={event.location}
				image={event.image}
				imageAlt={event.title}
			/>
			<EventContent>
				<p>{event.description}</p>
			</EventContent>
		</>
	);
};

// Increament Site Regeneration

export async function getStaticProps(context) {
	const eventId = context.params.eventId;
	const event = await getEventById(eventId);

	return {
		props: {
			event: event,
		},
		revalidate: 30,
	};
}

export async function getStaticPaths() {
	const events = await getFeaturedEvents();

	const paths = events.map((event) => ({
		params: { eventId: event.id },
	}));

	return {
		paths: paths,
		fallback: "blocking",
	};
}

export default EventDetailPage;
