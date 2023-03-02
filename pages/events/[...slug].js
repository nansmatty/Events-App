import { useRouter } from "next/router";
import EventList from "../../components/events/EventList";
import ResultsTitle from "../../components/events/results-title";
import Button from "../../components/ui/button";
import ErrorAlert from "../../components/ui/error-alert";
import { getFilteredEvents } from "../../helpers/api-utils";
// import { getFilteredEvents } from "../../dummy_data";

const FilteredEventPage = async (props) => {
	const router = useRouter();

	// const filterData = router.query.slug;

	// if (!filterData) {
	// 	return <p className='center'>Loading...</p>;
	// }

	// const filteredYear = filterData[0];
	// const filteredMonth = filterData[1];

	// const numYear = +filteredYear;
	// const numMonth = +filteredMonth;

	if (props.hasError) {
		return (
			<>
				<ErrorAlert>
					<p>
						Invalid Filter. Please adjust your
						values!
					</p>
				</ErrorAlert>
				<div className='center'>
					<Button link='/events'>
						Show All Events
					</Button>
				</div>
			</>
		);
	}

	const filteredEvents = props.events;
	if (
		!filteredEvents ||
		filteredEvents.length === 0
	) {
		return (
			<>
				<ErrorAlert>
					<p>
						No events found for the chosen filter!
					</p>
				</ErrorAlert>
				<div className='center'>
					<Button link='/events'>
						{" "}
						Show All Events
					</Button>
				</div>
			</>
		);
	}

	const date = new Date(numYear, numMonth - 1);

	return (
		<>
			<ResultsTitle date={date} />
			<EventList items={filteredEvents} />
		</>
	);
};

export async function getServerSideProps(
	context
) {
	const { params } = context;

	const filterData = params.slug;

	const filteredYear = filterData[0];
	const filteredMonth = filterData[1];

	const numYear = +filteredYear;
	const numMonth = +filteredMonth;

	if (
		isNaN(numYear) ||
		isNaN(numMonth) ||
		numYear > 2030 ||
		numYear < 2020 ||
		numMonth < 1 ||
		numMonth > 12 ||
		filterData.length > 2
	) {
		return {
			props: {
				hasError: true,
			},
			notFound: true,
		};
	}

	const filteredEvents = await getFilteredEvents({
		year: numYear,
		month: numMonth,
	});

	return {
		props: {
			events: filteredEvents,
		},
	};
}

export default FilteredEventPage;
