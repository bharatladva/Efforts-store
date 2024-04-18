/** @format */

import React from "react";

const Annocument = () => {
	const mystyle = {
		minWidth: "500px",
		height: "340px",
	};
	const mystyle1 = {
		minWidth: "500px",
		height: "340px",
	};
	return (
		<>
			<section className='annocument background'>
				<div
					className='container d_flex'
					style={{
						display: "flex",
						flexWrap: "wrap",
					}}
				>
					<div
						className='img'
						style={mystyle}
					>
						<img
							src='https://res.cloudinary.com/drpsngpm1/image/upload/v1706261182/WhatsApp_Image_2023-12-29_at_9.55.54_AM_lfx7ep.jpg'
							width='100%'
							height='100%'
							alt=''
						/>
					</div>
					<div
						className='img'
						style={mystyle1}
					>
						<img
							src='./images/banner-2.png'
							width='100%'
							height='100%'
							alt=''
						/>
					</div>
				</div>
			</section>
		</>
	);
};

export default Annocument;
