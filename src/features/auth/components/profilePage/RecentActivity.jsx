import React from "react";
import { List, ListItem, ListItemIcon, ListItemText, Divider } from "@mui/material";
import { getRecentActivity } from "./data";
import { useTranslation } from "react-i18next";


const RecentActivity = () => {
  const { t } = useTranslation();
  const recentActivity = getRecentActivity();
  return (
    <List sx={{ p: 0 }}>
      {recentActivity.map((activity, index) => (
        <React.Fragment key={index}>
          <ListItem sx={{
            px: { xs: 0, md: 2 },
            py: { xs: 1, md: 1.5 }
          }}>
            <ListItemIcon sx={{ minWidth: { xs: 40, md: 56 } }}>
              <activity.icon
                color={activity.color}
                sx={{ fontSize: { xs: '1.25rem', md: '1.5rem' } }}
              />
            </ListItemIcon>
            <ListItemText
              primary={activity.text}
              secondary={activity.time}
              primaryTypographyProps={{
                fontWeight: 600,
                fontSize: { xs: '0.875rem', md: '1rem' }
              }}
              secondaryTypographyProps={{
                fontSize: { xs: '0.75rem', md: '0.875rem' }
              }}
            />
          </ListItem>
          {index < recentActivity.length - 1 && <Divider />}
        </React.Fragment>
      ))}
    </List>
  );
};

export default RecentActivity;
