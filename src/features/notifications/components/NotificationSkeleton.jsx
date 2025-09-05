import React from "react";
import { Box, Skeleton } from "@mui/material";

const NotificationSkeleton = ({ count = 4 }) =>
  Array.from({ length: count }).map((_, i) => (
    <Box key={i} display="flex" gap={2} alignItems="center" mb={2}>
      <Skeleton variant="circular" width={40} height={40} />
      <Box sx={{ flex: 1 }}>
        <Skeleton width="30%" />
        <Skeleton width="80%" />
      </Box>
    </Box>
  ));

export default NotificationSkeleton;
