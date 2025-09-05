// src/pages/components/EmptyState.jsx
import { Paper, Typography } from "@mui/material";
import { Search as SearchIcon } from "@mui/icons-material";

const EmptyState = () => (
  <Paper
    elevation={0}
    sx={{
      textAlign: 'center',
      py: 8,
      borderRadius: 4,
      border: '3px dashed',
      borderColor: 'divider',
      bgcolor: 'background.paper'
    }}
  >
    <SearchIcon sx={{ fontSize: 64, color: 'text.disabled', mb: 2 }} />
    <Typography variant="h5" color="text.secondary" gutterBottom>
      No products found
    </Typography>
    <Typography color="text.secondary">
      Try adjusting your search or filter criteria
    </Typography>
  </Paper>
);

export default EmptyState;
