import React from 'react';
import { Box, Grid, Typography, Chip } from '@mui/material';
import { AccountCircle, Verified, Edit, Security, Email, Phone, PhotoCamera, LocationOn, StarBorder, CalendarToday } from '@mui/icons-material';
import { ProfileCard, ProfileAvatar, ActionButton, MobileOptimizedBox } from './StyledComponents';
import { useTranslation } from 'react-i18next';

const ProfileHeader = ({ userData, isSmall, theme, handelEditForm, setPhotoDialog }) => {
  const { t } = useTranslation();

  return (
    <ProfileCard sx={{ mb: { xs: 2, md: 4 } }}>
      <Grid container spacing={{ xs: 2, md: 4 }} alignItems="center">
        <Grid size={{ xs: 12, md: 4 }} sx={{ textAlign: 'center' }}>
          <Box sx={{
            position: 'relative',
            display: 'inline-block',
            mb: { xs: 2, md: 0 }
          }}>
            <ProfileAvatar>
              {userData.avatar ? (
                <img src={userData.avatar} alt={userData.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              ) : (
                <AccountCircle sx={{ fontSize: { xs: '2.5rem', md: '4rem' } }} />
              )}
              <Box className="edit-overlay" onClick={() => setPhotoDialog(true)}>
                <PhotoCamera sx={{ fontSize: { xs: '1.5rem', md: '2rem' }, color: 'white' }} />
              </Box>
            </ProfileAvatar>
            {userData.isVerified && (
              <Verified
                sx={{
                  position: 'absolute',
                  bottom: { xs: 4, md: 8 },
                  right: { xs: 4, md: 8 },
                  color: theme.palette.primary.main,
                  background: theme.palette.background.paper,
                  borderRadius: '50%',
                  fontSize: { xs: '1.5rem', md: '2rem' }
                }}
              />
            )}
          </Box>
        </Grid>

        <Grid size={{ xs: 12, md: 8 }}>
          <Box sx={{
            mb: { xs: 1.5, md: 2 },
            display: 'flex',
            alignItems: 'center',
            gap: { xs: 1, md: 2 },
            flexWrap: 'wrap',
            justifyContent: 'center',
            [theme.breakpoints.up('md')]: {
              justifyContent: 'flex-start',
            }
          }}>
            <Typography
              variant={isSmall ? "h5" : "h4"}
              sx={{
                fontWeight: 800,
                color: theme.palette.text.primary,
                textAlign: { xs: 'center', md: 'left' },
                fontSize: { xs: '1.5rem', sm: '2rem', md: '2.125rem' }
              }}
            >
              {userData.name}
            </Typography>
            {userData.membershipLevel && (
              <Chip
                label={userData.membershipLevel}
                icon={<StarBorder />}
                size={isSmall ? "small" : "medium"}
                sx={{
                  background: `linear-gradient(135deg, ${theme.palette.warning.main}, ${theme.palette.warning.light})`,
                  color: theme.palette.warning.contrastText,
                  fontWeight: { xs: 600, md: 700 },
                  fontSize: { xs: '0.75rem', md: '0.875rem' }
                }}
              />
            )}
          </Box>

          <Box sx={{
            mb: { xs: 2, md: 3 },
            display: 'flex',
            flexDirection: 'column',
            gap: { xs: 0.5, md: 1 },
            alignItems: { xs: 'center', md: 'flex-start' }
          }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Email fontSize="small" color="action" />
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ fontSize: { xs: '0.875rem', md: '1rem' } }}
              >
                {userData.email}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Phone fontSize="small" color="action" />
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ fontSize: { xs: '0.875rem', md: '1rem' } }}
              >
                {userData.phone}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <LocationOn fontSize="small" color="action" />
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ fontSize: { xs: '0.875rem', md: '1rem' } }}
              >
                {userData.location}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <CalendarToday fontSize="small" color="action" />
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ fontSize: { xs: '0.875rem', md: '1rem' } }}
              >
               {userData.joinDate}
              </Typography>
            </Box>
          </Box>

          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              mb: { xs: 2, md: 3 },
              lineHeight: 1.6,
              textAlign: { xs: 'center', md: 'left' },
              fontSize: { xs: '0.875rem', md: '1rem' },
              px: { xs: 1, md: 0 }
            }}
          >
            {userData.bio}
          </Typography>

          <MobileOptimizedBox>
            <ActionButton
              variant="contained"
              startIcon={<Edit />}
              onClick={handelEditForm}
              fullWidth={isSmall}
              size={isSmall ? "small" : "medium"}
            >
              تعديل الملف الشخصي
            </ActionButton>
            <ActionButton
              variant="outlined"
              startIcon={<Security />}
              fullWidth={isSmall}
              size={isSmall ? "small" : "medium"}
            >
              إعدادات الأمان
            </ActionButton>
          </MobileOptimizedBox>
        </Grid>
      </Grid>
    </ProfileCard>

  );
};

export default ProfileHeader;
