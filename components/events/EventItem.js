import Link from "next/link";
import React from "react";
import AddressIcon from "../icons/address-icon";
import ArrowRightIcon from "../icons/arrow-right-icon";
import DateIcon from "../icons/date-icon";
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
						<DateIcon />
						<time>{humanReadableDate}</time>
					</div>
					<div className={styles.address}>
						<AddressIcon />
						<address>{formattedAddress}</address>
					</div>
				</div>
				<div className={styles.actions}>
					<Button link={exploreLink}>
						<strong>Explore Event</strong>
						<span className={styles.icon}>
							<ArrowRightIcon />
						</span>
					</Button>
				</div>
			</div>
		</li>
	);
};

export default EventItem;
