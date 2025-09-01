// src/components/Analytics.js
import React, { useEffect, useState } from "react";
import { Box, Card, CardContent, Typography, Grid } from "@mui/material";
import api from "../utils/api";

const Analytics = () => {
  const [stats, setStats] = useState({
    total: 0,
    averages: {},
    recent: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await api.get("/analytics");
        setStats(data);
      } catch (err) {
        alert("Error fetching analytics");
      }
    };
    fetchData();
  }, []);

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h6" gutterBottom>
        Analytics Dashboard
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h5">{stats.total}</Typography>
              <Typography>Total Students</Typography>
            </CardContent>
          </Card>
        </Grid>
        {stats?.averages.map((row) => (
          <Grid item xs={12} md={4} key={row.subject}>
            <Card>
              <CardContent>
                <Typography variant="h5">{row.avgGrade}</Typography>
                <Typography>Average - {row.subject}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Box sx={{ mt: 4 }}>
        <Typography variant="subtitle1">Recent Additions:</Typography>
        <Grid container spacing={2}>
          {stats.recent.map((s) => (
            <Grid item xs={12} md={3} key={s.id}>
              <Card sx={{ height: "100%", width: "100%" }}>
                <CardContent sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
                  <Typography variant="h6" noWrap>{s.name}</Typography>
                  <Typography>{s.subject} - {s.grade}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default Analytics;
