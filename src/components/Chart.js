import React, { useEffect, useState } from 'react';


// Charts import
import { Bar } from 'react-chartjs-2'








export default function Chart({ url }) {

	// For Charts
	const [chartData, setChartData] = useState({})

	const [data, setData] = useState();
	const [isLoading, setLoading] = useState(false)



	// For Charts
	const chart = () => {
		setChartData({
			labels: ['Total', 'Recovered', 'Deaths'],
			datasets: [
				{
					label: 'level of thickness',
					data: [(data && data.confirmed.value), (data && data.recovered.value), (data && data.deaths.value)],
					backgroundColor: [
						'rgba(75, 192, 192, 0.6)',
						'lightgreen',
						'red'
					],
					borderWidth: 4
				}
			]
		})
	}



	useEffect(() => {
		async function fetchCountryData() {
			setLoading(true);
			const apiResult = await fetch(url);
			const DATA = await apiResult.json();
			setData(DATA);


			chart();
			setLoading(false);
		}

		fetchCountryData();
	}, [])


	if (isLoading)
		return (
			<div>
				<h3>loading...</h3>
			</div>
		)
	return (
		<Bar data={chartData} />


	)
}


