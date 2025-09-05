// src/data/profileData.js
import {
  Star,
  ShoppingBag,
  FavoriteBorder,
  EmojiEvents,
} from '@mui/icons-material';
import { useTranslation } from 'react-i18next';

export const getUserInfo = () => {
  const { t } = useTranslation();

  return {
    name: 'Jawad Ramadan',
    email: 'jawadram89@gmail.com',
    phone: '+966 50 123 4567',
    location: t('auth.profile.userInfo.location', { country: 'Syria', city: 'Homs' }),
    joinDate: t('auth.profile.userInfo.joinDate', { month: t('auth.profile.months.january'), year: 2022 }),
    avatar: '',
    bio: t('auth.profile.userInfo.bio'),
    isVerified: true,
    membershipLevel: t('auth.profile.userInfo.membershipLevel.VIP'),
    preferences: {
      notifications: true,
      newsletter: false,
      language: 'ar',
      theme: 'light'
    }
  };
};

// إحصائيات المستخدم
export const getStatsData = () => {
  const { t } = useTranslation();

  return [
    { icon: ShoppingBag, label: t('auth.profile.stats.totalOrders'), value: '24', color: 'primary' },
    { icon: FavoriteBorder, label: t('auth.profile.stats.favorites'), value: '8', color: 'secondary' },
    { icon: Star, label: t('auth.profile.stats.points'), value: '1,250', color: 'warning' },
    { icon: EmojiEvents, label: t('auth.profile.stats.achievements'), value: '5', color: 'success' },
  ];
};

// النشاطات الأخيرة
export const getRecentActivity = () => {
  const { t } = useTranslation();

  return [
    {
      icon: ShoppingBag,
      text: t('auth.profile.activity.newOrder', { orderId: 'ORD-001' }),
      time: t('auth.profile.activity.daysAgo', { count: 2 }),
      color: 'primary'
    },
    {
      icon: Star,
      text: t('auth.profile.activity.earnedPoints', { points: 50 }),
      time: t('auth.profile.activity.daysAgo', { count: 3 }),
      color: 'warning'
    },
    {
      icon: FavoriteBorder,
      text: t('auth.profile.activity.addedFavorite'),
      time: t('auth.profile.activity.weeksAgo', { count: 1 }),
      color: 'secondary'
    },
    {
      icon: EmojiEvents,
      text: t('auth.profile.activity.newAchievement'),
      time: t('auth.profile.activity.weeksAgo', { count: 2 }),
      color: 'success'
    }
  ];
};
