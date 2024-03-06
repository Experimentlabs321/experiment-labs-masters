import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const CustomCircularProgressWithLabel = (props) => {
  const { value, label } = props;

  return (
    <Box sx={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
    <CircularProgress size={60} variant="determinate" value={value} />
    <Typography
      variant="body2"
      component="p"
      className="text-sm font-semibold"
      sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)', // Center text
      }}
    >
      {value}%
    </Typography>
  </Box>
  );
};

export default CustomCircularProgressWithLabel;