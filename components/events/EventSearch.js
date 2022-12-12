import { useRef } from "react";
import Button from "../ui/button";
import styles from "./event-search.module.css";

const EventSearch = (props) => {
	const yearInputRef = useRef();
	const monthInputRef = useRef();

	const submitHandler = (event) => {
		event.preventDefault();

		const selectedYear =
			yearInputRef.current.value;
		const selectedMonth =
			monthInputRef.current.value;

		props.onSearch(selectedYear, selectedMonth);
	};

	return (
		<form
			onSubmit={submitHandler}
			className={styles.form}>
			<div className={styles.controls}>
				<div className={styles.control}>
					<label htmlFor='year'>Year</label>
					<select id='year' ref={yearInputRef}>
						<option value='2025'>2025</option>
						<option value='2024'>2024</option>
						<option value='2023'>2023</option>
						<option value='2022'>2022</option>
						<option value='2021'>2021</option>
					</select>
				</div>
				<div className={styles.control}>
					<label htmlFor='month'>Month</label>
					<select id='month' ref={monthInputRef}>
						<option value='1'>January</option>
						<option value='2'>Febuary</option>
						<option value='3'>March</option>
						<option value='4'>April</option>
						<option value='5'>May</option>
						<option value='6'>June</option>
						<option value='7'>July</option>
						<option value='8'>August</option>
						<option value='9'>September</option>
						<option value='10'>October</option>
						<option value='11'>November</option>
						<option value='12'>December</option>
					</select>
				</div>
			</div>
			<Button>
				<strong>Find Events</strong>
			</Button>
		</form>
	);
};

export default EventSearch;
