/** @format */

import { Link } from "react-router-dom";
import "./style.css";

export default function ServiceCard({ service }) {
	const { id, name, retetings, price, details, url } = service;
	return (
		<div className='servicesCard'>
			<div className='parentdiv'>
				<div className='ditails'>
					<h5 className='packagecolor'>
						<i className='fa-solid fa-box'></i>
						<span style={{ color: "green" }}>PACKAGE</span>
					</h5>
					<h3>{name}</h3>
					<p className='packagecolor'>
						<i className='fa-solid fa-star'></i>
						<span>{retetings}</span>
					</p>
					<p>{price}</p>
				</div>
				<div className='smallimage'>
					<img
						//src='https://res.cloudinary.com/urbanclap/image/upload/t_high_res_template,q_auto:low,f_auto/images/growth/luminosity/1657100969960-ef6f74.png'
						src={url}
						alt=''
					/>
					<Link
						key={0}
						to={`/Service/${id}`}
					>
						<button className='add'>Book</button>
					</Link>
				</div>
			</div>
			<div className='seconddiv'>
				<div className='ditails'>
					{details ? details.map((d) => <p>{d}</p>) : <p>Loading...</p>}
				</div>
				<Link
					key={0}
					to={`/Service/${id}`}
				>
					<button className='edit'>view details</button>
				</Link>
			</div>
		</div>
	);
}
