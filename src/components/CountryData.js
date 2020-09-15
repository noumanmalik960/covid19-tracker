import React, { useEffect, useState } from 'react';
// Material UI
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
// Typography
import Typography from '@material-ui/core/Typography';
// Charts import
import { Bar } from 'react-chartjs-2'







// Material UI

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

// For Typography
// const useTypographyStyles = makeStyles({
//   root: {
//     width: '100%',
//     maxWidth: 500,
//   },
// });






export default function CountryData({ url }) {
  // Material UI
  const classes = useStyles();
  // Typography
  // const typographyClasses = useTypographyStyles();

  const [data, setData] = useState();
  const [isLoading, setLoading] = useState(false);
  const loading = "Loading...";
	// For Charts
	const [chartData, setChartData] = useState({})

  useEffect(() => {
    async function fetchCountryData() {
      setLoading(true);
      const apiResult = await fetch(url);
      const DATA = await apiResult.json();
      chart();
      setLoading(false);
      setData(DATA);
    }

    fetchCountryData();
  }, [url])

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




  if (isLoading) {
    return (
      <div className={classes.root}>
        <Grid container spacing={3}>
          <Grid item xs>
            <Paper className={classes.paper}>
            <Typography variant="h6" style={{ color: 'black'}} gutterBottom>
                  Total
                </Typography>
                <Typography variant="subtitle1" style={{ color: 'black'}} gutterBottom>
                {loading}
                </Typography>
            </Paper>
          </Grid>
          <Grid item xs>
            <Paper className={classes.paper}>
            <Typography variant="h6" style={{ color: 'green'}} gutterBottom>
                  Recovered
                </Typography>
                <Typography variant="subtitle1" style={{ color: 'green'}} gutterBottom>
                {loading}
                </Typography>
            </Paper>
          </Grid>
          <Grid item xs>
            <Paper className={classes.paper}>
            <Typography variant="h6" style={{ color: 'red'}} gutterBottom>
                  Deaths
                </Typography>
                <Typography variant="subtitle1" style={{ color: 'red'}} gutterBottom>
                {loading}
                </Typography>
            </Paper>
          </Grid>
        </Grid>
        <h3>loading...</h3>
      </div>
    )
  }

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs>
          <Paper className={classes.paper}>
          <Typography variant="h6" style={{ color: 'black'}} gutterBottom>
                Total
              </Typography>
              <Typography variant="subtitle1" style={{ color: 'black'}} gutterBottom>
              {data && data.confirmed.value.toLocaleString()}
              
              </Typography>
          </Paper>
        </Grid>
        <Grid item xs>
          <Paper className={classes.paper}>
          <Typography variant="h6" style={{ color: 'green'}} gutterBottom>
                Recovered
              </Typography>
              <Typography variant="subtitle1" style={{ color: 'green'}} gutterBottom>
              {data && data.recovered.value.toLocaleString()}
              </Typography>
          </Paper>
        </Grid>
        <Grid item xs>
          <Paper className={classes.paper}>
          <Typography variant="h6" style={{ color: 'red'}} gutterBottom>
                Deaths
              </Typography>
              <Typography variant="subtitle1" style={{ color: 'red'}} gutterBottom>
              {data && data.deaths.value.toLocaleString()}
              </Typography>
          </Paper>
        </Grid>
      </Grid>
      <Bar data={chartData} />
    </div>
  )
}
