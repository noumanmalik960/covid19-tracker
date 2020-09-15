import React, { useState, useEffect } from 'react';
import { NativeSelect, FormControl } from '@material-ui/core';
import CountryData from './CountryData';
import Chart from './Chart'



function CountryPicker() {
	let url = 'https://covid19.mathdro.id/api/countries';
	const [countries, setCountries] = useState();
	const [country, setCountry] = useState();
	const [currentUrl, setCurrentUrl] = useState(url + '/Afghanistan');


	useEffect(() => {
		async function fetchData() {
			let URL = 'https://covid19.mathdro.id/api/countries';

			const apiResponse = await fetch(URL)
			const { countries } = await apiResponse.json();
			setCountries(countries);

		}

		fetchData();
	}, [country])



	return (
		<>
			<FormControl>
				<NativeSelect onChange={(e) => {
					setCountry(e.target.value);
					setCurrentUrl(`${url}/${e.target.value}`);
				}
				}>
					{countries && countries.map((c, i) => <option key={i} value={c.name}>{c.name}</option>)}
				</NativeSelect>
			</FormControl>
			<br />
			<br />
			<CountryData url={currentUrl} />
		
			{/* <Chart url={currentUrl}/> */}
		</>
	)
}


export default CountryPicker;