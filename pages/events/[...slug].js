import {
	Fragment,
	useEffect,
	useState,
} from "react";
import useSWR from "swr";
import { useRouter } from "next/router";
import EventList from "../../components/events/EventList";
import ResultsTitle from "../../components/events/results-title";
import Button from "../../components/ui/button";
import ErrorAlert from "../../components/ui/error-alert";
import { getFilteredEvents } from "../../helpers/api-utils";

const FilteredEventPage = async (props) => {
	const [loadedEvents, setLoadedEvents] =
		useState();

	const router = useRouter();

	const filterData = router.query.slug;

	const fetcher = (url) =>
		fetch(url).then((res) => res.json());

	const { data, error } = useSWR(
		"https://nextjs-learning-project-2023-default-rtdb.firebaseio.com/events.json",
		fetcher
	);

	console.log("Log Data: " + data);

	useEffect(() => {
		if (data) {
			const events = [];

			for (const key in data) {
				events.push({
					id: key,
					...data[key],
				});
			}

			console.log("Filtered Event Log" + events);

			setLoadedEvents(events);
		}
	}, [data]);

	if (!loadedEvents) {
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
		numYear < 2021 ||
		numMonth < 1 ||
		numMonth > 12 ||
		error
	) {
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

	const filteredEvents = loadedEvents.filter(
		(event) => {
			const eventDate = new Date(event.date);
			return (
				eventDate.getFullYear() === numYear &&
				eventDate.getMonth() === numMonth - 1
			);
		}
	);

	if (
		!filteredEvents ||
		filteredEvents.length === 0
	) {
		return (
			<Fragment>
				<ErrorAlert>
					<p>
						No events found for the chosen filter!
					</p>
				</ErrorAlert>
				<div className='center'>
					<Button link='/events'>
						Show All Events
					</Button>
				</div>
			</Fragment>
		);
	}

	const date = new Date(numYear, numMonth - 1);

	return (
		<Fragment>
			<ResultsTitle date={date} />
			<EventList items={filteredEvents} />
		</Fragment>
	);
};

// export async function getServerSideProps(
// 	context
// ) {
// 	const { params } = context;

// 	const filterData = params.slug;

// 	const filteredYear = filterData[0];
// 	const filteredMonth = filterData[1];

// 	const numYear = +filteredYear;
// 	const numMonth = +filteredMonth;

// 	if (
// 		isNaN(numYear) ||
// 		isNaN(numMonth) ||
// 		numYear > 2030 ||
// 		numYear < 2020 ||
// 		numMonth < 1 ||
// 		numMonth > 12 ||
// 		filterData.length > 2
// 	) {
// 		return {
// 			props: {
// 				hasError: true,
// 			},
// 			notFound: true,
// 		};
// 	}

// 	const filteredEvents = await getFilteredEvents({
// 		year: numYear,
// 		month: numMonth,
// 	});

// 	return {
// 		props: {
// 			events: filteredEvents,
// 			date: {
// 				year: numYear,
// 				month: numMonth,
// 			},
// 		},
// 	};
// }

export default FilteredEventPage;
