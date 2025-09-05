import React from 'react';
import { Grid, Card, Typography } from '@mui/material';
import { getStatsData } from './data';

const ProfileStats = ({ isSmall, theme }) => {
  const statsData = getStatsData();
  return (
    <Grid container spacing={2} sx={{ mb: { xs: 2, md: 4 } }}>
      {statsData.map((stat, i) => (
        <Grid size={{xs:12 ,sm:6 , md:3 }} key={i}>
          <Card sx={{
            textAlign: 'center',
            p: { xs: 2, md: 3 },
            borderRadius: 3,
            background: theme.palette.background.paper,
            boxShadow: theme.shadows[2],
          }}>
            <Typography variant={isSmall ? "h6" : "h5"} sx={{ fontWeight: 700 }}>
              {stat.value}
            </Typography>
            <Typography variant="body2" color="text.secondary">{stat.label}</Typography>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default ProfileStats;
