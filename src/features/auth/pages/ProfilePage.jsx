import React, { useState, useRef } from "react";
import { Box, Fade, useTheme, useMediaQuery } from "@mui/material";
import { StyledContainer } from "../components/profilePage/StyledComponents";
import { getUserInfo } from "../components/profilePage/data";
import ProfileHeader from "../components/profilePage/ProfileHeader";
import ProfileStats from "../components/profilePage/ProfileStats";
import ProfileTabs from "../components/profilePage/ProfileTabs";
import PhotoDialog from "../components/profilePage/PhotoDialog";

const ProfilePage = () => {
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"));
  const userInfo = getUserInfo();
  const [userData, setUserData] = useState(userInfo);
  const [photoDialog, setPhotoDialog] = useState(false);
  const [currentTab, setCurrentTab] = useState(0);
  const [editMode, setEditMode] = useState(false);

  const personalInfoRef = useRef(null);

  return (
    <StyledContainer maxWidth="lg">
      <Fade in timeout={800}>
        <Box>
          <ProfileHeader
            userData={userData}
            isSmall={isSmall}
            theme={theme}
            handelEditForm={() => setEditMode(true)}
            setPhotoDialog={setPhotoDialog}
          />
          <ProfileStats isSmall={isSmall} theme={theme} />
          <ProfileTabs
            currentTab={currentTab}
            setCurrentTab={setCurrentTab}
            userData={userData}
            setUserData={setUserData}
            editMode={editMode}
            setEditMode={setEditMode}
            isSmall={isSmall}
            personalInfoRef={personalInfoRef}
          />
          <PhotoDialog open={photoDialog} setOpen={setPhotoDialog} isSmall={isSmall} />
        </Box>
      </Fade>
    </StyledContainer>
  );
};

export default ProfilePage;
