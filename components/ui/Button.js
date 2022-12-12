import Link from "next/link";
import styles from "./button.module.css";

const Button = (props) => {
	return (
		<>
			{props.link ? (
				<Link
					className={styles.btn}
					href={props.link}>
					{props.children}
				</Link>
			) : (
				<button
					className={styles.btn}
					onClick={props.onClick}>
					{props.children}
				</button>
			)}
		</>
	);
};

export default Button;
