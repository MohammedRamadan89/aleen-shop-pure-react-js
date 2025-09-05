import React, { useRef, useState } from 'react';
import {
  Box,
  Container,
  Paper,
  Avatar,
  Button,
  Card,
  Tabs,
} from '@mui/material';
import { styled, alpha } from '@mui/material/styles';

export const StyledContainer = styled(Container)(({ theme }) => ({
  minHeight: '100vh',
  background: `linear-gradient(135deg, 
    ${alpha(theme.palette.primary.main, 0.05)} 0%, 
    ${alpha(theme.palette.secondary.main, 0.05)} 50%, 
    ${alpha(theme.palette.primary.main, 0.02)} 100%)`,
  paddingTop: theme.spacing(2),
  paddingBottom: theme.spacing(4),
  position: 'relative',
  [theme.breakpoints.up('md')]: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(6),
  },
  '&::before': {
    content: '""',
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    height: '150px',
    background: `linear-gradient(180deg, 
      ${alpha(theme.palette.primary.main, 0.1)} 0%, 
      transparent 100%)`,
    zIndex: -1,
    [theme.breakpoints.up('md')]: {
      height: '200px',
    }
  }
}));

export const ProfileCard = styled(Paper)(({ theme }) => ({
  background: `linear-gradient(145deg, 
    ${theme.palette.background.paper} 0%, 
    ${alpha(theme.palette.primary.main, 0.02)} 100%)`,
  backdropFilter: 'blur(20px)',
  border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
  borderRadius: theme.spacing(2),
  padding: theme.spacing(2),
  boxShadow: `0 8px 32px ${alpha(theme.palette.common.black, 0.08)}`,
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  position: 'relative',
  overflow: 'hidden',
  [theme.breakpoints.up('md')]: {
    borderRadius: theme.spacing(3),
    padding: theme.spacing(4),
    boxShadow: `0 20px 60px ${alpha(theme.palette.common.black, 0.1)}`,
  },
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '3px',
    background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
    [theme.breakpoints.up('md')]: {
      height: '4px',
    }
  }
}));

export const ProfileAvatar = styled(Avatar)(({ theme }) => ({
  width: 80,
  height: 80,
  background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
  border: `3px solid ${theme.palette.background.paper}`,
  boxShadow: `0 4px 20px ${alpha(theme.palette.primary.main, 0.25)}`,
  fontSize: '2rem',
  color: theme.palette.common.white,
  position: 'relative',
  margin: '0 auto',
  [theme.breakpoints.up('md')]: {
    width: 120,
    height: 120,
    border: `4px solid ${theme.palette.background.paper}`,
    boxShadow: `0 8px 32px ${alpha(theme.palette.primary.main, 0.3)}`,
    fontSize: '3rem',
    margin: 0,
  },
  '& .edit-overlay': {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: alpha(theme.palette.common.black, 0.6),
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 0,
    transition: 'opacity 0.3s ease',
    cursor: 'pointer',
    '&:hover': {
      opacity: 1,
    }
  }
}));

export const StatsCard = styled(Card)(({ theme }) => ({
  background: `linear-gradient(135deg, 
    ${alpha(theme.palette.primary.main, 0.05)}, 
    ${alpha(theme.palette.secondary.main, 0.05)})`,
  border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
  borderRadius: theme.spacing(1.5),
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  height: '100%',
  [theme.breakpoints.up('md')]: {
    borderRadius: theme.spacing(2),
    '&:hover': {
      transform: 'translateY(-4px)',
      boxShadow: `0 12px 40px ${alpha(theme.palette.primary.main, 0.15)}`,
    }
  }
}));

export const ActionButton = styled(Button)(({ theme, variant }) => ({
  borderRadius: theme.spacing(1.5),
  padding: theme.spacing(1, 2),
  fontWeight: 600,
  textTransform: 'none',
  minHeight: 36,
  fontSize: '0.875rem',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  [theme.breakpoints.up('md')]: {
    borderRadius: theme.spacing(2),
    padding: theme.spacing(1.5, 3),
    fontWeight: 700,
    minHeight: 44,
    fontSize: '1rem',
  },
  ...(variant === 'contained' && {
    background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
    boxShadow: `0 4px 15px ${alpha(theme.palette.primary.main, 0.25)}`,
    [theme.breakpoints.up('md')]: {
      boxShadow: `0 8px 25px ${alpha(theme.palette.primary.main, 0.3)}`,
    },
    '&:hover': {
      background: `linear-gradient(135deg, ${theme.palette.primary.dark}, ${theme.palette.primary.main})`,
      transform: 'translateY(-1px)',
      boxShadow: `0 6px 20px ${alpha(theme.palette.primary.main, 0.35)}`,
      [theme.breakpoints.up('md')]: {
        transform: 'translateY(-2px)',
        boxShadow: `0 12px 35px ${alpha(theme.palette.primary.main, 0.4)}`,
      }
    }
  }),
  ...(variant === 'outlined' && {
    border: `2px solid ${alpha(theme.palette.primary.main, 0.3)}`,
    color: theme.palette.primary.main,
    background: alpha(theme.palette.primary.main, 0.05),
    '&:hover': {
      border: `2px solid ${theme.palette.primary.main}`,
      background: alpha(theme.palette.primary.main, 0.1),
      transform: 'translateY(-1px)',
    }
  })
}));

export const CustomTabs = styled(Tabs)(({ theme }) => ({
  '& .MuiTabs-indicator': {
    background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
    height: 3,
    borderRadius: '3px 3px 0 0',
  },
  '& .MuiTab-root': {
    textTransform: 'none',
    fontWeight: 600,
    fontSize: '0.875rem',
    color: theme.palette.text.secondary,
    minHeight: 48,
    padding: theme.spacing(1, 2),
    [theme.breakpoints.up('md')]: {
      fontSize: '1rem',
      padding: theme.spacing(1.5, 3),
    },
    '&.Mui-selected': {
      color: theme.palette.primary.main,
    }
  },
  '& .MuiTabs-scrollButtons': {
    '&.Mui-disabled': {
      opacity: 0.3,
    }
  }
}));

export const MobileOptimizedBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
      justifyContent:'space-between',
  gap: theme.spacing(1),
  [theme.breakpoints.up('sm')]: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing(2),
  }
}));