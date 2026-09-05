import * as React from "react";
import Box from "@mui/material/Box";
import Breadcrumbs, { breadcrumbsClasses } from "@mui/material/Breadcrumbs";
import Container from "@mui/material/Container";
import MuiLink from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import NavigateNextRoundedIcon from "@mui/icons-material/NavigateNextRounded";
import Link from "next/link";

export default function PageContainer({
  children,
  breadcrumbs,
  title,
  actions = null,
  extraActions = null,
}) {
  return (
    <Container sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
      <Stack sx={{ flex: 1, my: 2 }} spacing={2}>
        <Stack>
          <Breadcrumbs
            aria-label="breadcrumb"
            separator={<NavigateNextRoundedIcon fontSize="small" />}
            sx={{
              margin: [1, 0],
              [`& .${breadcrumbsClasses.separator}`]: {
                color: "var(--mui-palette-action-disabled)",
                margin: 1,
              },
              [`& .${breadcrumbsClasses.ol}`]: {
                alignItems: "center",
              },
            }}
          >
            {breadcrumbs
              ? breadcrumbs.map((breadcrumb, index) => {
                  return breadcrumb.path ? (
                    <MuiLink
                      key={index}
                      component={Link}
                      underline="hover"
                      color="inherit"
                      href={breadcrumb.path}
                    >
                      {breadcrumb.title}
                    </MuiLink>
                  ) : (
                    <Typography
                      key={index}
                      sx={{ color: "text.primary", fontWeight: 600 }}
                    >
                      {breadcrumb.title}
                    </Typography>
                  );
                })
              : null}
          </Breadcrumbs>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              gap: 2,
            }}
          >
            {title ? <Typography variant="h4">{title}</Typography> : null}
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                gap: 1,
                marginLeft: "auto",
              }}
            >
              <Stack direction="row" sx={{ alignItems: "center", gap: 1 }}>
                {actions}
              </Stack>
            </Box>
          </Box>
          {extraActions && (
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                gap: 1,
                marginTop: 2,
                marginRight: "auto",
              }}
            >
              <Stack direction="row" sx={{ alignItems: "center", gap: 1 }}>
                {extraActions}
              </Stack>
            </Box>
          )}
        </Stack>
        <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
          {children}
        </Box>
      </Stack>
    </Container>
  );
}
