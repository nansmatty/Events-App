import classes from "./event-content.module.css";

function EventContent(props) {
	return (
		<div>
			<section className={classes.content}>
				{props.children}
			</section>
		</div>
	);
}

export default EventContent;
