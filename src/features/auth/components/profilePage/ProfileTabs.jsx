import React from 'react';
import { Tabs, Tab, Box } from '@mui/material';
import TabPanel from './TabPanel';
import PersonalInfoForm from './PersonalInfoForm';
import RecentActivity from './RecentActivity';
import AccountSettings from './AccountSettings';
import { useTranslation } from 'react-i18next';

const ProfileTabs = ({ currentTab, setCurrentTab, userData, setUserData, editMode, setEditMode, isSmall, personalInfoRef }) => {
  const { t } = useTranslation();

  return (
    <Box>
      <Tabs value={currentTab} onChange={(e, val) => setCurrentTab(val)} centered>
        <Tab label={t("auth.profile.profile_tabs.personal_info")} />
        <Tab label={t("auth.profile.profile_tabs.activity")} />
        <Tab label={t("auth.profile.profile_tabs.settings")} />
      </Tabs>

      <TabPanel value={currentTab} index={0}>
        <PersonalInfoForm
          userData={userData}
          setUserData={setUserData}
          editMode={editMode}
          setEditMode={setEditMode}
          personalInfoRef={personalInfoRef}
        />
      </TabPanel>

      <TabPanel value={currentTab} index={1}>
        <RecentActivity />
      </TabPanel>

      <TabPanel value={currentTab} index={2}>
        <AccountSettings />
      </TabPanel>
    </Box>
  );
};

export default ProfileTabs;
