export async function getAllEvents() {
	// const response = await fetch(
	// 	"https://nextjs-learning-project-default-rtdb.firebaseio.com/events.json"
	// );

	const response = await fetch(
		"https://nextjs-learning-project-2023-default-rtdb.firebaseio.com/events.json"
	);
	const data = await response.json();

	const events = [];

	for (const key in data) {
		events.push({
			id: key,
			...data[key],
		});
	}

	console.log(events);

	return events;
}

export async function getFeaturedEvents() {
	const allEvents = await getAllEvents();
	return allEvents.filter(
		(event) => event.isFeatured
	);
}

export async function getEventById(id) {
	const allEvents = await getAllEvents();
	return allEvents.find(
		(event) => event.id === id
	);
}
