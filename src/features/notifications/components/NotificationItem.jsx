import React from "react";
import {
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  ListItemSecondaryAction,
  Typography,
  Box,
  IconButton,
  Chip,
  Menu,
  MenuItem,
} from "@mui/material";
import {
  MoreVert as MoreVertIcon,
  MarkEmailRead as MarkEmailReadIcon,
} from "@mui/icons-material";
import { formatDistanceToNow } from "date-fns";
import { useTranslation } from "react-i18next";

const NotificationItem = ({
  n,
  toggleRead,
  handleMenuOpen,
  handleMenuClose,
  removeNotification,
  activeMenuId,
  anchorEl,
}) => {
  const { t } = useTranslation();

  return (
    <>
      <ListItem
        alignItems="flex-start"
        sx={{
          bgcolor: n.unread ? "action.selected" : "background.paper",
          borderRadius: 1,
          mb: 1,
        }}
      >
        <ListItemAvatar>
          <Avatar>{n.tag?.charAt(0) ?? "N"}</Avatar>
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
              title={t("notifications.item.mark_as_read")}
            >
              <MarkEmailReadIcon fontSize="small" />
            </IconButton>

            <IconButton
              size="small"
              onClick={(e) => handleMenuOpen(e, n.id)}
              aria-controls={activeMenuId === n.id ? "notif-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={activeMenuId === n.id ? "true" : undefined}
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
          {t("notifications.item.mark_as_read")}
        </MenuItem>
        <MenuItem
          onClick={() => {
            removeNotification(n.id);
            handleMenuClose();
          }}
        >
          {t("notifications.item.delete")}
        </MenuItem>
      </Menu>
    </>
  );
};

export default NotificationItem;
