import React from "react";
import {
  Box,
  TextField,
  InputAdornment,
  Chip,
  Switch,
  FormControlLabel,
} from "@mui/material";
import { Search as SearchIcon } from "@mui/icons-material";
import { useTranslation } from "react-i18next";

const NotificationsFilters = ({
  query,
  setQuery,
  filter,
  setFilter,
  uniqueTags,
  showOnlyTagged,
  setShowOnlyTagged,
}) => {
  const { t } = useTranslation();

  return (
    <Box
      mb={2}
      display="flex"
      gap={2}
      flexDirection={{ xs: "column", sm: "row" }}
      alignItems={{ sm: "center" }}
    >
      <TextField
        size="small"
        placeholder={t("notifications.filters.search_placeholder")}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
        sx={{ minWidth: 220, flex: 1 }}
      />

      <Box display="flex" gap={1} alignItems="center" flexWrap="wrap">
        <Chip
          label={t("notifications.filters.all")}
          clickable
          color={filter === "all" ? "primary" : "default"}
          onClick={() => setFilter("all")}
        />
        <Chip
          label={t("notifications.filters.unread")}
          clickable
          color={filter === "unread" ? "primary" : "default"}
          onClick={() => setFilter("unread")}
        />
        <Chip
          label={t("notifications.filters.read")}
          clickable
          color={filter === "read" ? "primary" : "default"}
          onClick={() => setFilter("read")}
        />

        <FormControlLabel
          control={
            <Switch
              checked={!!showOnlyTagged}
              onChange={(e) =>
                setShowOnlyTagged(e.target.checked ? uniqueTags[0] || "" : "")
              }
            />
          }
          label={t("notifications.filters.tag_filter")}
          sx={{ ml: 1 }}
        />

        {uniqueTags.map((t) => (
          <Chip
            key={t}
            label={t}
            variant={showOnlyTagged === t ? "filled" : "outlined"}
            onClick={() =>
              setShowOnlyTagged((prev) => (prev === t ? "" : t))
            }
          />
        ))}
      </Box>
    </Box>
  );
};

export default NotificationsFilters;
