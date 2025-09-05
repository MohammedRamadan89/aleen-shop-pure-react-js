import React, { useState, useMemo } from "react";
import { Container, Box, Divider, Typography, Pagination } from "@mui/material";
import { formatDistanceToNow } from "date-fns";

import NotificationsHeader from "../components/NotificationsHeader";
import NotificationsFilters from "../components/NotificationsFilters";
import NotificationsList from "../components/NotificationList";
import NotificationSkeleton from "../components/NotificationSkeleton";
import EmptyState from "../components/EmptyState";
import { useTranslation } from "react-i18next";

// Mock data generator
const sampleNotifications = () => {
  const { t } = useTranslation();
  const now = Date.now();

  return Array.from({ length: 28 }).map((_, i) => ({
    id: i + 1,
    title: t("notifications.page.sample.title", { number: i + 1 }),
    body:
      i % 3 === 0
        ? t("notifications.page.sample.body_action_required")
        : t("notifications.page.sample.body_info_update"),
    time: new Date(now - (i * 3600 + (i % 5) * 60) * 1000).toISOString(),
    unread: i % 4 !== 0,
    tag:
      i % 5 === 0
        ? t("notifications.page.sample.tags.security")
        : i % 3 === 0
        ? t("notifications.page.sample.tags.orders")
        : t("notifications.page.sample.tags.general")
  }));
};

export default function NotificationsPage() {
  const { t } = useTranslation();

  const [notifications, setNotifications] = useState(sampleNotifications());
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("all"); // 'all' | 'unread' | 'read'
  const [anchorEl, setAnchorEl] = useState(null);
  const [activeMenuId, setActiveMenuId] = useState(null);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(8);
  const [showOnlyTagged, setShowOnlyTagged] = useState("");
  const [loading] = useState(false);

  const filtered = useMemo(() => {
    let list = notifications.slice();
    if (filter === "unread") list = list.filter((n) => n.unread);
    if (filter === "read") list = list.filter((n) => !n.unread);
    if (showOnlyTagged) list = list.filter((n) => n.tag === showOnlyTagged);
    if (query.trim()) {
      const q = query.trim().toLowerCase();
      list = list.filter(
        (n) =>
          n.title.toLowerCase().includes(q) || n.body.toLowerCase().includes(q)
      );
    }
    return list;
  }, [notifications, filter, query, showOnlyTagged]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / pageSize));
  const currentPageItems = filtered.slice(
    (page - 1) * pageSize,
    page * pageSize
  );

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
  };

  const toggleRead = (id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, unread: false } : n))
    );
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
    <Container maxWidth="md" sx={{ py: 4, mt: 5 }}>
      {/* Header */}
      <NotificationsHeader
        markAllRead={markAllRead}
        clearAll={() => setNotifications([])}
      />

      {/* Filters */}
      <NotificationsFilters
        query={query}
        setQuery={setQuery}
        filter={filter}
        setFilter={setFilter}
        uniqueTags={uniqueTags}
        showOnlyTagged={showOnlyTagged}
        setShowOnlyTagged={setShowOnlyTagged}
      />

      <Divider />

      {/* Notifications List / Loading / Empty */}
      <Box mt={2}>
        {loading ? (
          <NotificationSkeleton count={4} />
        ) : notifications.length === 0 ? (
          <EmptyState />
        ) : (
          <NotificationsList
            items={currentPageItems}
            toggleRead={toggleRead}
            handleMenuOpen={handleMenuOpen}
            handleMenuClose={handleMenuClose}
            removeNotification={removeNotification}
            activeMenuId={activeMenuId}
            anchorEl={anchorEl}
          />
        )}
      </Box>

      {/* Pagination */}
      <Box
        mt={3}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Typography variant="body2" color="text.secondary">
          {t("notifications.page.showing", { count: filtered.length })}
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
