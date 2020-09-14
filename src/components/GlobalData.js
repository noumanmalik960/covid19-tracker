import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        '& > *': {
            margin: theme.spacing(1),
            width: '100%',
            height: theme.spacing(16),
        },
    },
}));


export default function GlobalData() {
    const classes = useStyles();

    const [globalData, setGlobalData] = useState();
    const [isLoading, setLoading] = useState(false);
    const loading = "Loading...";


    useEffect(() => {
        async function fetchGlobalData() {
            setLoading(true);
            const apiResponse = await fetch('https://api.thevirustracker.com/free-api?global=stats');
            const dataFromAPI = await apiResponse.json();
            setLoading(false)
            setGlobalData(dataFromAPI)
        }
        fetchGlobalData();
    }, [])
  
    if(isLoading) {
        return (
            <div className={classes.root}>
                <Paper elevation={3} style={{ paddingTop: '20px' }}>
                    <Typography variant="h6" gutterBottom>
                        Global Cases
                </Typography>
                    <Typography variant="subtitle1" gutterBottom>
                        {loading}
                </Typography>
                </Paper>
                <Paper elevation={3} style={{ color: "orange", paddingTop: '20px' }}>
                    <Typography variant="h6" gutterBottom>
                        Active
                </Typography>
                    <Typography variant="subtitle1" gutterBottom>
                    {loading}
                </Typography>
                </Paper>
                <Paper elevation={3} style={{ color: "green", paddingTop: '20px' }}>
                    <Typography variant="h6" gutterBottom>
                        Healed
                </Typography>
                    <Typography variant="subtitle1" gutterBottom>
                    {loading}
                </Typography>
                </Paper>
                <Paper elevation={3} style={{ color: "red", paddingTop: '20px' }}>
                    <Typography variant="h6" gutterBottom>
                        Deaths
                </Typography>
                    <Typography variant="subtitle1" gutterBottom>
                    {loading}
                </Typography>
                </Paper>
            </div>
        );
    }



    return (
        <div className={classes.root}>
            <Paper elevation={3} style={{ paddingTop: '20px' }}>
                <Typography variant="h6" gutterBottom>
                    Global Cases
            </Typography>
                <Typography variant="subtitle1" gutterBottom>
                    {globalData && globalData.results[0].total_cases.toLocaleString()}
            </Typography>
            </Paper>
            <Paper elevation={3} style={{ color: "orange", paddingTop: '20px' }}>
                <Typography variant="h6" gutterBottom>
                    Active
            </Typography>
                <Typography variant="subtitle1" gutterBottom>
                {globalData && globalData.results[0].total_unresolved.toLocaleString()}
            </Typography>
            </Paper>
            <Paper elevation={3} style={{ color: "green", paddingTop: '20px' }}>
                <Typography variant="h6" gutterBottom>
                    Healed
            </Typography>
                <Typography variant="subtitle1" gutterBottom>
                {globalData && globalData.results[0].total_recovered.toLocaleString()}
            </Typography>
            </Paper>
            <Paper elevation={3} style={{ color: "red", paddingTop: '20px' }}>
                <Typography variant="h6" gutterBottom>
                    Deaths
            </Typography>
                <Typography variant="subtitle1" gutterBottom>
                {globalData && globalData.results[0].total_deaths.toLocaleString()}
            </Typography>
            </Paper>
        </div>
    );
}
