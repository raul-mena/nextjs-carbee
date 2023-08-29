"use client";

import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { AppoinmentModal } from '../../interfaces/Appoinment';
import dayjs from 'dayjs';
import { Divider } from '@mui/material';

/**
 * 
 * @param param0 
 * @returns appointment card view
 */
export default function AppoinmentCard({node: {
  scheduledTime,
  workOrder,
  status,
}}: AppoinmentModal) {
  return (
    <Box className="appoinment-card">
      <Card variant="outlined">
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            {dayjs(scheduledTime).format('YYYY-MM-DD hh:mm A')}
          </Typography>
          <Divider /><br />
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            {status}
          </Typography>
          <Typography variant="body2">
            {workOrder.service}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}
