import Link from "next/link";
import React from "react";
import Button from "../ui/button";
import styles from "./event-item.module.css";

const EventItem = ({
	title,
	image,
	date,
	location,
	id,
}) => {
	const humanReadableDate = new Date(
		date
	).toLocaleDateString("en-US", {
		day: "numeric",
		month: "long",
		year: "numeric",
	});

	const formattedAddress = location.replace(
		", ",
		"\n"
	);

	const exploreLink = `/events/${id}`;

	return (
		<li className={styles.item}>
			<img src={"/" + image} alt={title} />
			<div className={styles.content}>
				<div>
					<h2>{title}</h2>
					<div className={styles.date}>
						<time>{humanReadableDate}</time>
					</div>
					<div className={styles.address}>
						<address>{formattedAddress}</address>
					</div>
				</div>
				<div className={styles.actions}>
					<Button link={exploreLink}>
						<strong>Explore Event</strong>
					</Button>
				</div>
			</div>
		</li>
	);
};

export default EventItem;
