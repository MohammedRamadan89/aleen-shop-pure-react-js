import React, { useRef, useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  CardContent,
  Chip,
  Divider,
  TextField,
  FormControl,
  Select,
  MenuItem,
  Switch,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemSecondaryAction,
  Tab,
  useTheme,
  useMediaQuery,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Fade,
  Slide
} from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
import {
  Edit,
  Camera,
  Verified,
  StarBorder,
  Star,
  Email,
  Phone,
  LocationOn,
  CalendarToday,
  ShoppingBag,
  FavoriteBorder,
  Security,
  Notifications,
  Language,
  Palette,
  Save,
  Cancel,
  EmojiEvents,
  TrendingUp,
  LocalOffer,
  CardGiftcard,
  AccountCircle,
  PhotoCamera,
  Delete
} from '@mui/icons-material';
import {StyledContainer ,ProfileCard ,ProfileAvatar , StatsCard, ActionButton, CustomTabs, MobileOptimizedBox } from '../components/profilePage/StyledComponents'
import {getUserInfo ,getStatsData ,getRecentActivity } from '../components/profilePage/data';

const ProfilePage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isSmall = useMediaQuery(theme.breakpoints.down('sm'));
  const [currentTab, setCurrentTab] = useState(0);
  const [editMode, setEditMode] = useState(false);
  const [photoDialog, setPhotoDialog] = useState(false);
  const personalInfoRef = useRef(null);
  
  const statsData = getStatsData();
  const recentActivity = getRecentActivity();
    const userInfo = getUserInfo();
  // Mock user data
  const [userData, setUserData] = useState(userInfo);


  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue);
  };

  const handleSave = () => {
    setEditMode(false);
    // TODO: Save data to backend
    console.log('Saving profile data:', userData);
  };

  const handleCancel = () => {
    setEditMode(false);
    // TODO: Reset to original data
  };

  const handleInputChange = (field, value) => {
    setUserData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handelEditForm = () => {
    setEditMode(true);
    setCurrentTab(0); // الانتقال إلى تبويب المعلومات الشخصية
    setTimeout(() => {
      personalInfoRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  }

  const handlePreferenceChange = (field, value) => {
    setUserData(prev => ({
      ...prev,
      preferences: {
        ...prev.preferences,
        [field]: value
      }
    }));
  };

  const TabPanel = ({ children, value, index }) => (
    <div hidden={value !== index}>
      {value === index && <Box sx={{ py: { xs: 2, md: 3 } }}>{children}</Box>}
    </div>
  );

  return (
    <StyledContainer maxWidth="lg">
      <Fade in timeout={800}>
        <Box>
          {/* Header Section */}
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
                      عضو منذ {userData.joinDate}
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

          {/* Stats Cards */}
          <Grid container spacing={{ xs: 1.5, md: 3 }} sx={{ mb: { xs: 2, md: 4 } }}>
            {statsData.map((stat, index) => (
              <Grid size={{ xs: 6, sm: 3 }} key={index}>
                <StatsCard>
                  <CardContent sx={{ 
                    textAlign: 'center', 
                    py: { xs: 2, md: 3 },
                    px: { xs: 1, md: 2 }
                  }}>
                    <stat.icon
                      sx={{
                        fontSize: { xs: '2rem', md: '3rem' },
                        color: theme.palette[stat.color].main,
                        mb: { xs: 1, md: 2 }
                      }}
                    />
                    <Typography 
                      variant={isSmall ? "h6" : "h4"} 
                      sx={{ 
                        fontWeight: 800, 
                        mb: { xs: 0.5, md: 1 }, 
                        color: theme.palette.text.primary,
                        fontSize: { xs: '1.25rem', sm: '1.5rem', md: '2.125rem' }
                      }}
                    >
                      {stat.value}
                    </Typography>
                    <Typography 
                      variant="body2" 
                      color="text.secondary" 
                      sx={{ 
                        fontWeight: 600,
                        fontSize: { xs: '0.75rem', md: '0.875rem' },
                        lineHeight: 1.2
                      }}
                    >
                      {stat.label}
                    </Typography>
                  </CardContent>
                </StatsCard>
              </Grid>
            ))}
          </Grid>

          {/* Tabs Section */}
          <ProfileCard ref={personalInfoRef}>
            <CustomTabs 
              value={currentTab} 
              onChange={handleTabChange} 
              variant={isMobile ? 'scrollable' : 'standard'}
              scrollButtons={isMobile ? 'auto' : false}
              allowScrollButtonsMobile
            >
              <Tab label="المعلومات الشخصية" />
              <Tab label="النشاط الأخير" />
              <Tab label="الإعدادات" />
            </CustomTabs>

            <TabPanel value={currentTab} index={0}>
              <Grid container spacing={{ xs: 2, md: 3 }}>
                <Grid size={{ xs: 12, md: 6 }}>
                  <TextField
                    fullWidth
                    label="الاسم الكامل"
                    value={userData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    disabled={!editMode}
                    size={isSmall ? "small" : "medium"}
                    sx={{ mb: { xs: 2, md: 3 } }}
                  />
                  <TextField
                    fullWidth
                    label="البريد الإلكتروني"
                    value={userData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    disabled={!editMode}
                    size={isSmall ? "small" : "medium"}
                    sx={{ mb: { xs: 2, md: 3 } }}
                  />
                  <TextField
                    fullWidth
                    label="رقم الهاتف"
                    value={userData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    disabled={!editMode}
                    size={isSmall ? "small" : "medium"}
                    sx={{ mb: { xs: 2, md: 3 } }}
                  />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <TextField
                    fullWidth
                    label="الموقع"
                    value={userData.location}
                    onChange={(e) => handleInputChange('location', e.target.value)}
                    disabled={!editMode}
                    size={isSmall ? "small" : "medium"}
                    sx={{ mb: { xs: 2, md: 3 } }}
                  />
                  <TextField
                    fullWidth
                    label="نبذة شخصية"
                    multiline
                    rows={{ xs: 3, md: 4 }}
                    value={userData.bio}
                    onChange={(e) => handleInputChange('bio', e.target.value)}
                    disabled={!editMode}
                    size={isSmall ? "small" : "medium"}
                    sx={{ mb: { xs: 2, md: 3 } }}
                  />
                </Grid>
              </Grid>

              {editMode && (
                <MobileOptimizedBox sx={{ mt: { xs: 2, md: 3 } }}>
                  <ActionButton 
                    variant="contained" 
                    startIcon={<Save />} 
                    onClick={handleSave}
                    fullWidth={isSmall}
                    size={isSmall ? "small" : "medium"}
                  >
                    حفظ التغييرات
                  </ActionButton>
                  <ActionButton 
                    variant="outlined" 
                    startIcon={<Cancel />} 
                    onClick={handleCancel}
                    fullWidth={isSmall}
                    size={isSmall ? "small" : "medium"}
                  >
                    إلغاء
                  </ActionButton>
                </MobileOptimizedBox>
              )}
            </TabPanel>

            <TabPanel value={currentTab} index={1}>
              <Typography 
                variant={isSmall ? "h6" : "h6"} 
                sx={{ 
                  mb: { xs: 2, md: 3 }, 
                  fontWeight: 700,
                  fontSize: { xs: '1.125rem', md: '1.25rem' }
                }}
              >
                النشاط الأخير
              </Typography>
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
            </TabPanel>

            <TabPanel value={currentTab} index={2}>
              <Typography 
                variant={isSmall ? "h6" : "h6"} 
                sx={{ 
                  mb: { xs: 2, md: 3 }, 
                  fontWeight: 700,
                  fontSize: { xs: '1.125rem', md: '1.25rem' }
                }}
              >
                إعدادات الحساب
              </Typography>
              <List sx={{ p: 0 }}>
                <ListItem sx={{ 
                  px: { xs: 0, md: 2 },
                  py: { xs: 1, md: 1.5 }
                }}>
                  <ListItemIcon sx={{ minWidth: { xs: 40, md: 56 } }}>
                    <Notifications 
                      color="primary" 
                      sx={{ fontSize: { xs: '1.25rem', md: '1.5rem' } }}
                    />
                  </ListItemIcon>
                  <ListItemText 
                    primary="الإشعارات" 
                    secondary="تلقي إشعارات الطلبات والعروض"
                    primaryTypographyProps={{
                      fontSize: { xs: '0.875rem', md: '1rem' },
                      fontWeight: 600
                    }}
                    secondaryTypographyProps={{
                      fontSize: { xs: '0.75rem', md: '0.875rem' }
                    }}
                  />
                  <ListItemSecondaryAction>
                    <Switch
                      checked={userData.preferences.notifications}
                      onChange={(e) => handlePreferenceChange('notifications', e.target.checked)}
                      color="primary"
                      size={isSmall ? "small" : "medium"}
                    />
                  </ListItemSecondaryAction>
                </ListItem>
                <Divider />
                <ListItem sx={{ 
                  px: { xs: 0, md: 2 },
                  py: { xs: 1, md: 1.5 }
                }}>
                  <ListItemIcon sx={{ minWidth: { xs: 40, md: 56 } }}>
                    <Email 
                      color="primary" 
                      sx={{ fontSize: { xs: '1.25rem', md: '1.5rem' } }}
                    />
                  </ListItemIcon>
                  <ListItemText 
                    primary="النشرة البريدية" 
                    secondary="تلقي العروض والأخبار عبر البريد الإلكتروني"
                    primaryTypographyProps={{
                      fontSize: { xs: '0.875rem', md: '1rem' },
                      fontWeight: 600
                    }}
                    secondaryTypographyProps={{
                      fontSize: { xs: '0.75rem', md: '0.875rem' }
                    }}
                  />
                  <ListItemSecondaryAction>
                    <Switch
                      checked={userData.preferences.newsletter}
                      onChange={(e) => handlePreferenceChange('newsletter', e.target.checked)}
                      color="primary"
                      size={isSmall ? "small" : "medium"}
                    />
                  </ListItemSecondaryAction>
                </ListItem>
                <Divider />
                <ListItem sx={{ 
                  px: { xs: 0, md: 2 },
                  py: { xs: 1, md: 1.5 }
                }}>
                  <ListItemIcon sx={{ minWidth: { xs: 40, md: 56 } }}>
                    <Language 
                      color="primary" 
                      sx={{ fontSize: { xs: '1.25rem', md: '1.5rem' } }}
                    />
                  </ListItemIcon>
                  <ListItemText 
                    primary="اللغة" 
                    secondary="اختيار لغة التطبيق"
                    primaryTypographyProps={{
                      fontSize: { xs: '0.875rem', md: '1rem' },
                      fontWeight: 600
                    }}
                    secondaryTypographyProps={{
                      fontSize: { xs: '0.75rem', md: '0.875rem' }
                    }}
                  />
                  <ListItemSecondaryAction>
                    <FormControl size={isSmall ? "small" : "medium"} sx={{ minWidth: { xs: 100, md: 120 } }}>
                      <Select
                        value={userData.preferences.language}
                        onChange={(e) => handlePreferenceChange('language', e.target.value)}
                        sx={{ fontSize: { xs: '0.875rem', md: '1rem' } }}
                      >
                        <MenuItem value="ar">العربية</MenuItem>
                        <MenuItem value="en">English</MenuItem>
                      </Select>
                    </FormControl>
                  </ListItemSecondaryAction>
                </ListItem>
              </List>
            </TabPanel>
          </ProfileCard>
        </Box>
      </Fade>

      {/* Photo Upload Dialog */}
      <Dialog
        open={photoDialog}
        onClose={() => setPhotoDialog(false)}
        TransitionComponent={Slide}
        TransitionProps={{ direction: 'up' }}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: { xs: 2, md: 3 },
            m: { xs: 2, md: 4 }
          }
        }}
      >
        <DialogTitle sx={{ textAlign: 'center', pb: 1, pt: { xs: 2, md: 3 } }}>
          <Typography 
            variant="h6" 
            sx={{ 
              fontWeight: 700,
              fontSize: { xs: '1.125rem', md: '1.25rem' }
            }}
          >
            تغيير الصورة الشخصية
          </Typography>
        </DialogTitle>
        <DialogContent sx={{ 
          textAlign: 'center', 
          py: { xs: 2, md: 4 },
          px: { xs: 2, md: 3 }
        }}>
          <Box sx={{ mb: { xs: 2, md: 3 } }}>
            <input type="file" accept="image/*" style={{ display: 'none' }} id="photo-upload" />
            <label htmlFor="photo-upload">
              <ActionButton 
                variant="contained" 
                component="span" 
                startIcon={<Camera />} 
                sx={{ 
                  mb: { xs: 1, md: 2 }, 
                  mr: { xs: 0, sm: 1 },
                  width: { xs: '100%', sm: 'auto' }
                }}
                size={isSmall ? "small" : "medium"}
              >
                اختيار صورة
              </ActionButton>
            </label>
            <Box sx={{ mt: { xs: 1, sm: 0 } }}>
              <ActionButton 
                variant="outlined" 
                startIcon={<Delete />} 
                color="error"
                size={isSmall ? "small" : "medium"}
                sx={{ width: { xs: '100%', sm: 'auto' } }}
              >
                حذف الصورة
              </ActionButton>
            </Box>
          </Box>
          <Typography 
            variant="body2" 
            color="text.secondary"
            sx={{ fontSize: { xs: '0.875rem', md: '1rem' } }}
          >
            اختر صورة بحجم أقصى 5MB وبصيغة JPG أو PNG
          </Typography>
        </DialogContent>
        <DialogActions sx={{ 
          justifyContent: 'center', 
          pb: { xs: 2, md: 3 },
          px: { xs: 2, md: 3 }
        }}>
          <ActionButton 
            variant="outlined" 
            onClick={() => setPhotoDialog(false)}
            size={isSmall ? "small" : "medium"}
            sx={{ minWidth: { xs: 120, md: 140 } }}
          >
            إلغاء
          </ActionButton>
        </DialogActions>
      </Dialog>
    </StyledContainer>
  );
};

export default ProfilePage;