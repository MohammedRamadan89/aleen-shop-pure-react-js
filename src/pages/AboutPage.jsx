import React from "react";
import { Container, Typography, Box, Grid, Avatar } from "@mui/material";
import { useTranslation } from "react-i18next";

// بيانات فريق العمل (Placeholder / تجريبي)
const teamMembers = [
  { name: "أحمد خالد", role: "المدير التنفيذي", img: "https://picsum.photos/seed/ahmad/100" },
  { name: "سارة يوسف", role: "مديرة التسويق", img: "https://picsum.photos/seed/sarah/100" },
  { name: "رامي نصر", role: "مسؤول الدعم الفني", img: "https://picsum.photos/seed/rami/100" },
];

const AboutPage = () => {
  const { t } = useTranslation();

  return (
    <Container sx={{ py: 5 ,mt:5}}>
      <Typography variant="h4" gutterBottom align="center">
        {t("common.about.title")}
      </Typography>

      <Typography variant="body1" align="center" sx={{ mb: 2 }}>
        {t("common.about.description")}
      </Typography>

      <Typography variant="caption" display="block" align="center" sx={{ mb: 4 }}>
        {t("common.about.placeholderNote")}
      </Typography>

      <Typography variant="h5" gutterBottom>
        {t("common.about.team")}
      </Typography>

      <Grid container spacing={4}>
        {teamMembers.map((member, idx) => (
          <Grid size={{ xs:12, sm:4 }}  key={idx}>
            <Box display="flex" flexDirection="column" alignItems="center">
              <Avatar
                src={member.img}
                alt={member.name}
                sx={{ width: 100, height: 100, mb: 2 }}
              />
              <Typography variant="subtitle1">{member.name}</Typography>
              <Typography variant="body2" color="text.secondary">
                {member.role}
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default AboutPage;
