// src/components/footer/footerData.js
export const useFooterData = () => {
  const quickLinks = [
    { textKey: "footer.quickLinks.home", href: "/" },
    { textKey: "footer.quickLinks.products", href: "/products" },
    { textKey: "footer.quickLinks.about", href: "/about" },
    { textKey: "footer.quickLinks.contact", href: "/contact" },
    { textKey: "footer.quickLinks.faq", href: "/faq" },
    { textKey: "footer.quickLinks.shipping", href: "/shipping" },
  ];

  const customerService = [
    { textKey: "footer.customerService.account", href: "/account" },
    { textKey: "footer.customerService.tracking", href: "/tracking" },
    { textKey: "footer.customerService.wishlist", href: "/wishlist" },
    { textKey: "footer.customerService.returns", href: "/returns" },
    { textKey: "footer.customerService.privacy", href: "/privacy" },
    { textKey: "footer.customerService.terms", href: "/terms" },
  ];

  return { quickLinks, customerService };
};
