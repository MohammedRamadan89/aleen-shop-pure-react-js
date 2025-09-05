import React from "react";
import { Box, Typography, Chip } from "@mui/material";
import { AccountCircle, StarBorder } from "@mui/icons-material";
import { StyledAvatar, UserSection as UserBox } from "./StyledComponents";

const UserSection = ({ userData }) => {
  return (
    <UserBox>
      <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
        <StyledAvatar online={userData.isOnline} sx={{ width: 48, height: 48, mr: 2 }}>
          {userData.avatar ? (
            <img src={userData.avatar} alt={userData.name} />
          ) : (
            <AccountCircle sx={{ fontSize: 24, color: "white" }} />
          )}
        </StyledAvatar>

        <Box sx={{ flex: 1 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 0.5 }}>
            <Typography variant="h6" sx={{ fontWeight: 700, fontSize: "1.1rem" }}>
              {userData.name}
            </Typography>
            {userData.membershipLevel && (
              <Chip
                label={userData.membershipLevel}
                size="small"
                icon={<StarBorder sx={{ fontSize: 14 }} />}
              />
            )}
          </Box>

          <Typography variant="body2" color="text.secondary">
            {userData.email}
          </Typography>
        </Box>
      </Box>
    </UserBox>
  );
};

export default UserSection;
