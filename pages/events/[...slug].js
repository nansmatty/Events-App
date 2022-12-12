import { useRouter } from "next/router";
import EventList from "../../components/events/EventList";
import { getFilteredEvents } from "../../dummy_data";

const FilteredEventPage = () => {
	const router = useRouter();

	const filterData = router.query.slug;

	if (!filterData) {
		return <p className='center'>Loading...</p>;
	}

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
		return (
			<p className='center'>
				<strong>
					Invalid Filter. Please adjust your
					values!
				</strong>
			</p>
		);
	}

	const filteredEvents = getFilteredEvents({
		year: numYear,
		month: numMonth,
	});

	if (
		!filteredEvents ||
		filteredEvents.length === 0
	) {
		return (
			<p className='center'>
				No events found for the chosen filter!
			</p>
		);
	}

	return (
		<>
			<EventList items={filteredEvents} />
		</>
	);
};

export default FilteredEventPage;
