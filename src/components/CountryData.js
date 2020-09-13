import React, { useEffect, useState } from 'react';
// Material UI
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
//typography
import Typography from '@material-ui/core/Typography';




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

// for typography
const useTypographyStyles = makeStyles({
  root: {
    width: '100%',
    maxWidth: 500,
  },
});






export default function CountryData({ url }) {
  // Material UI
  const classes = useStyles();
  // Typography
  const typographyClasses = useTypographyStyles();

  const [data, setData] = useState();
  const [isLoading, setLoading] = useState(false);
  const loading = "Loading...";

  useEffect(() => {
    async function fetchCountryData() {
      setLoading(true);
      const apiResult = await fetch(url);
      const DATA = await apiResult.json();
      setLoading(false);
      setData(DATA);
    }

    fetchCountryData();
  }, [url])

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
              {data && data.confirmed.value}
              </Typography>
          </Paper>
        </Grid>
        <Grid item xs>
          <Paper className={classes.paper}>
          <Typography variant="h6" style={{ color: 'green'}} gutterBottom>
                Recovered
              </Typography>
              <Typography variant="subtitle1" style={{ color: 'green'}} gutterBottom>
              {data && data.recovered.value}
              </Typography>
          </Paper>
        </Grid>
        <Grid item xs>
          <Paper className={classes.paper}>
          <Typography variant="h6" style={{ color: 'red'}} gutterBottom>
                Deaths
              </Typography>
              <Typography variant="subtitle1" style={{ color: 'red'}} gutterBottom>
              {data && data.deaths.value}
              </Typography>
          </Paper>
        </Grid>
      </Grid>
    </div>
  )
}
