/** @format */
import "./Timeline.css";

export default function Timeline({ steps }) {
	return (
		<div>
			<ul className='timeline'>
				{steps ? (
					steps.map((stap) => (
						<li className='timeline-event'>
							<label className='timeline-event-icon'></label>
							<div className='timeline-event-copy'>
								<h4>{stap.step}</h4>
								<p>{stap.explain}</p>
							</div>
						</li>
					))
				) : (
					<p>Loading...</p>
				)}
			</ul>
		</div>
	);
}
