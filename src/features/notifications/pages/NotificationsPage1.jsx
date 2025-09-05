import React, { useState, useMemo } from 'react';
import {
  Box,
  Container,
  Typography,
  IconButton,
  TextField,
  InputAdornment,
  Chip,
  Button,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  ListItemSecondaryAction,
  Divider,
  Menu,
  MenuItem,
  Pagination,
  Switch,
  FormControlLabel,
  Skeleton
} from '@mui/material';
import {
  Search as SearchIcon,
  MoreVert as MoreVertIcon,
  DoneAll as DoneAllIcon,
  Notifications as NotificationsIcon,
  NotificationsNone as NotificationsNoneIcon,
  MarkEmailRead as MarkEmailReadIcon,
  ClearAll as ClearAllIcon
} from '@mui/icons-material';
import { formatDistanceToNow } from 'date-fns';

// Mock data generator
const sampleNotifications = () => {
  const now = Date.now();
  return Array.from({ length: 28 }).map((_, i) => ({
    id: i + 1,
    title: `Notification title #${i + 1}`,
    body:
      i % 3 === 0
        ? 'Action required — please check the order details and confirm.'
        : 'Informational update about your account or recent activity.',
    time: new Date(now - (i * 3600 + (i % 5) * 60) * 1000).toISOString(),
    unread: i % 4 !== 0,
    tag: i % 5 === 0 ? 'Security' : i % 3 === 0 ? 'Orders' : 'General'
  }));
};

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState(sampleNotifications());
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('all'); // 'all' | 'unread' | 'read'
  const [anchorEl, setAnchorEl] = useState(null);
  const [activeMenuId, setActiveMenuId] = useState(null);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(8);
  const [showOnlyTagged, setShowOnlyTagged] = useState('');
  const [loading] = useState(false);

  const filtered = useMemo(() => {
    let list = notifications.slice();
    if (filter === 'unread') list = list.filter((n) => n.unread);
    if (filter === 'read') list = list.filter((n) => !n.unread);
    if (showOnlyTagged) list = list.filter((n) => n.tag === showOnlyTagged);
    if (query.trim()) {
      const q = query.trim().toLowerCase();
      list = list.filter(
        (n) => n.title.toLowerCase().includes(q) || n.body.toLowerCase().includes(q)
      );
    }
    return list;
  }, [notifications, filter, query, showOnlyTagged]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / pageSize));
  const currentPageItems = filtered.slice((page - 1) * pageSize, page * pageSize);

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
  };

  const toggleRead = (id) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, unread: false } : n)));
  };

  const removeNotification = (id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const handleMenuOpen = (e, id) => {
    setAnchorEl(e.currentTarget);
    setActiveMenuId(id);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setActiveMenuId(null);
  };

  const uniqueTags = useMemo(() => {
    return Array.from(new Set(notifications.map((n) => n.tag))).filter(Boolean);
  }, [notifications]);

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Box display="flex" alignItems="center" justifyContent="space-between" mb={3}>
        <Box display="flex" alignItems="center">
          <Avatar sx={{ mr: 2, bgcolor: 'primary.main' }}>
            <NotificationsIcon />
          </Avatar>
          <div>
            <Typography variant="h5">Notifications</Typography>
            <Typography variant="body2" color="text.secondary">
              Recent updates and alerts about your account
            </Typography>
          </div>
        </Box>

        <Box display="flex" alignItems="center" gap={1}>
          <Button
            variant="outlined"
            startIcon={<DoneAllIcon />}
            onClick={markAllRead}
            aria-label="Mark all as read"
          >
            Mark all read
          </Button>
          <IconButton onClick={() => setNotifications([])} title="Clear all">
            <ClearAllIcon />
          </IconButton>
        </Box>
      </Box>

      <Box
        mb={2}
        display="flex"
        gap={2}
        flexDirection={{ xs: 'column', sm: 'row' }}
        alignItems={{ sm: 'center' }}
      >
        <TextField
          size="small"
          placeholder="Search notifications"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            )
          }}
          sx={{ minWidth: 220, flex: 1 }}
        />

        <Box display="flex" gap={1} alignItems="center" flexWrap="wrap">
          <Chip
            label="All"
            clickable
            color={filter === 'all' ? 'primary' : 'default'}
            onClick={() => setFilter('all')}
          />
          <Chip
            label="Unread"
            clickable
            color={filter === 'unread' ? 'primary' : 'default'}
            onClick={() => setFilter('unread')}
          />
          <Chip
            label="Read"
            clickable
            color={filter === 'read' ? 'primary' : 'default'}
            onClick={() => setFilter('read')}
          />

          <FormControlLabel
            control={
              <Switch
                checked={!!showOnlyTagged}
                onChange={(e) => setShowOnlyTagged(e.target.checked ? uniqueTags[0] || '' : '')}
              />
            }
            label="Tag filter"
            sx={{ ml: 1 }}
          />

          {uniqueTags.map((t) => (
            <Chip
              key={t}
              label={t}
              variant={showOnlyTagged === t ? 'filled' : 'outlined'}
              onClick={() => setShowOnlyTagged((prev) => (prev === t ? '' : t))}
            />
          ))}
        </Box>
      </Box>

      <Divider />

      <Box mt={2}>
        {loading ? (
          Array.from({ length: 4 }).map((_, i) => (
            <Box key={i} display="flex" gap={2} alignItems="center" mb={2}>
              <Skeleton variant="circular" width={40} height={40} />
              <Box sx={{ flex: 1 }}>
                <Skeleton width="30%" />
                <Skeleton width="80%" />
              </Box>
            </Box>
          ))
        ) : notifications.length === 0 ? (
          <Box textAlign="center" py={6}>
            <NotificationsNoneIcon sx={{ fontSize: 48, mb: 1 }} color="disabled" />
            <Typography variant="h6">No notifications</Typography>
            <Typography color="text.secondary">You're all caught up.</Typography>
          </Box>
        ) : (
          <List disablePadding>
            {currentPageItems.map((n) => (
              <React.Fragment key={n.id}>
                <ListItem
                  alignItems="flex-start"
                  sx={{
                    bgcolor: n.unread ? 'action.selected' : 'background.paper',
                    borderRadius: 1,
                    mb: 1
                  }}
                >
                  <ListItemAvatar>
                    <Avatar>{n.tag?.charAt(0) ?? 'N'}</Avatar>
                  </ListItemAvatar>

                  <ListItemText
                    primary={
                      <Box display="flex" alignItems="center" gap={1}>
                        <Typography variant="subtitle1">{n.title}</Typography>
                        <Chip label={n.tag} size="small" />
                      </Box>
                    }
                    secondary={<Typography variant="body2">{n.body}</Typography>}
                  />

                  <ListItemSecondaryAction>
                    <Typography variant="caption" display="block" textAlign="right">
                      {formatDistanceToNow(new Date(n.time), { addSuffix: true })}
                    </Typography>

                    <Box display="flex" flexDirection="column" alignItems="flex-end" mt={1}>
                      <IconButton
                        size="small"
                        onClick={() => toggleRead(n.id)}
                        title="Mark as read"
                      >
                        <MarkEmailReadIcon fontSize="small" />
                      </IconButton>

                      <IconButton
                        size="small"
                        onClick={(e) => handleMenuOpen(e, n.id)}
                        aria-controls={activeMenuId === n.id ? 'notif-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={activeMenuId === n.id ? 'true' : undefined}
                      >
                        <MoreVertIcon />
                      </IconButton>
                    </Box>
                  </ListItemSecondaryAction>
                </ListItem>

                <Menu
                  id="notif-menu"
                  anchorEl={anchorEl}
                  open={activeMenuId === n.id}
                  onClose={handleMenuClose}
                >
                  <MenuItem
                    onClick={() => {
                      toggleRead(n.id);
                      handleMenuClose();
                    }}
                  >
                    Mark as read
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      removeNotification(n.id);
                      handleMenuClose();
                    }}
                  >
                    Delete
                  </MenuItem>
                </Menu>
              </React.Fragment>
            ))}
          </List>
        )}
      </Box>

      <Box mt={3} display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="body2" color="text.secondary">
          Showing {filtered.length} notifications
        </Typography>

        <Pagination
          count={pageCount}
          page={page}
          onChange={(_, value) => setPage(value)}
          color="primary"
        />
      </Box>
    </Container>
  );
}
