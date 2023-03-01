import classes from "./event-summary.module.css";

function EventSummary(props) {
	const { title } = props;

	return (
		<div>
			<section className={classes.summary}>
				<h1>{title}</h1>
			</section>
		</div>
	);
}

export default EventSummary;
