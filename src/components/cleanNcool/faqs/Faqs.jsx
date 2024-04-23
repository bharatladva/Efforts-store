/** @format */

import { useEffect, useRef } from "react";
import "./Faqs.css";

const Faqs = ({ faqs }) => {
	// Use useRef to keep track of all accordion buttons
	const accordionButtonsRef = useRef([]);

	useEffect(() => {
		const accordionButtons = accordionButtonsRef.current;

		// Function to add event listeners to each button
		const addEventListeners = () => {
			accordionButtons.forEach((button) => {
				button.addEventListener("click", toggleAccordion);
			});
		};

		// Function to remove event listeners from each button
		const removeEventListeners = () => {
			accordionButtons.forEach((button) => {
				if (button) {
					button.removeEventListener("click", toggleAccordion);
				}
			});
		};

		// After the component mounts, set up event listeners for each accordion button
		addEventListeners();

		// Cleanup function to remove event listeners when the component unmounts or before re-adding them
		return () => {
			removeEventListeners();
		};
	}, []); // Empty dependency array ensures this runs only on mount and unmount

	const toggleAccordion = (event) => {
		const itemToggle = event.currentTarget.getAttribute("aria-expanded");

		// Loop through all accordion buttons and set aria-expanded to false
		accordionButtonsRef.current.forEach((button) => {
			button.setAttribute("aria-expanded", "false");
		});

		// If the clicked button was not already expanded, expand it
		if (itemToggle === "false") {
			event.currentTarget.setAttribute("aria-expanded", "true");
		}
	};
	return (
		<div className='container'>
			<h2>Frequently Asked Questions</h2>
			<div className='accordion'>
				{faqs.map((question, index) => (
					<div
						key={index}
						className='accordion-item'
					>
						<button
							id={`accordion-button-${index + 1}`}
							aria-expanded='false'
							ref={(el) => {
								accordionButtonsRef.current[index] = el;
							}}
						>
							<span className='accordion-title'>{question.q}</span>
							<span
								className='icon'
								aria-hidden='true'
							></span>
						</button>
						<div className='accordion-content'>
							<p>{question.a}</p>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default Faqs;
