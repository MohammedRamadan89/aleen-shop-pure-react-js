import { Person, ShoppingBag, FavoriteBorder, NotificationsNone, Settings } from "@mui/icons-material";

export const menuItems = [
  {
    icon: Person,
    labelKey: "navBar.menu.profile.label",
    descriptionKey: "navBar.menu.profile.description",
    path: "/profile"
  },
  {
    icon: ShoppingBag,
    labelKey: "navBar.menu.orders.label",
    descriptionKey: "navBar.menu.orders.description",
    path: "/orders",
    badge: 2
  },
  {
    icon: FavoriteBorder,
    labelKey: "navBar.menu.favorites.label",
    descriptionKey: "navBar.menu.favorites.description",
    path: "/favorites"
  },
];

export const secondaryItems = [
  {
    icon: NotificationsNone,
    labelKey: "navBar.menu.notifications.label",
    descriptionKey: "navBar.menu.notifications.description",
    path: "/notifications",
    badge: 5
  },
  {
    icon: Settings,
    labelKey: "navBar.menu.settings.label",
    descriptionKey: "navBar.menu.settings.description",
    path: "/settings"
  },
];

