"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Avatar,
  Box,
  Collapse,
  Divider,
  Drawer,
  Grow,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  Paper,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import GroupIcon from "@mui/icons-material/Group";
import Diversity3Icon from "@mui/icons-material/Diversity3";
import DescriptionIcon from "@mui/icons-material/Description";
import GestureIcon from "@mui/icons-material/Gesture";

import DashboardSidebarContext from "@/contexts/DashboardSidebarContext";
import { DRAWER_WIDTH, MINI_DRAWER_WIDTH } from "@/constants";
import getDrawerSxTransitionMixin from "@/mixins";
import { matchPath } from "@/utils";

function HeaderItem({ children }) {
  const sidebarContext = React.useContext(DashboardSidebarContext);
  if (!sidebarContext) {
    throw new Error("Sidebar context was used without a provider.");
  }
  const {
    mini = false,
    fullyExpanded = true,
    hasDrawerTransitions,
  } = sidebarContext;

  return (
    <ListSubheader
      sx={[
        {
          fontSize: 12,
          fontWeight: "600",
          height: mini ? 0 : 36,
          px: 1.5,
          py: 0,
          minWidth: DRAWER_WIDTH,
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
          zIndex: 2,
        },
        hasDrawerTransitions
          ? getDrawerSxTransitionMixin(fullyExpanded, "height")
          : null,
      ]}
    >
      {children}
    </ListSubheader>
  );
}

function PageItem({
  id,
  title,
  icon,
  href,
  action,
  defaultExpanded = false,
  expanded = defaultExpanded,
  selected = false,
  disabled = false,
  nestedNavigation,
}) {
  const sidebarContext = React.useContext(DashboardSidebarContext);
  if (!sidebarContext) {
    throw new Error("Sidebar context was used without a provider.");
  }
  const {
    onPageItemClick,
    mini = false,
    fullyExpanded = true,
    fullyCollapsed = false,
  } = sidebarContext;

  const [isHovered, setIsHovered] = React.useState(false);

  const handleClick = React.useCallback(() => {
    if (onPageItemClick) {
      onPageItemClick(id, !!nestedNavigation);
    }
  }, [onPageItemClick, id, nestedNavigation]);

  let nestedNavigationCollapseSx = { display: "none" };
  if (mini && fullyCollapsed) {
    nestedNavigationCollapseSx = {
      fontSize: 18,
      position: "absolute",
      top: "41.5%",
      right: "2px",
      transform: "translateY(-50%) rotate(-90deg)",
    };
  } else if (!mini && fullyExpanded) {
    nestedNavigationCollapseSx = (theme) => ({
      ml: 0.5,
      fontSize: 20,
      transform: `rotate(${expanded ? 0 : -90}deg)`,
      transition: theme.transitions.create("transform", {
        easing: theme.transitions.easing.sharp,
        duration: 100,
      }),
    });
  }

  const hasExternalHref = href
    ? href.startsWith("http://") || href.startsWith("https://")
    : false;

  const LinkComponent = hasExternalHref ? "a" : Link;

  const miniNestedNavigationSidebarContextValue = React.useMemo(() => {
    return {
      onPageItemClick: onPageItemClick ?? (() => {}),
      mini: false,
      fullyExpanded: true,
      fullyCollapsed: false,
      hasDrawerTransitions: false,
    };
  }, [onPageItemClick]);

  return (
    <React.Fragment>
      <ListItem
        disablePadding
        {...(nestedNavigation && mini
          ? {
              onMouseEnter: () => {
                setIsHovered(true);
              },
              onMouseLeave: () => {
                setIsHovered(false);
              },
            }
          : {})}
        sx={{
          display: "block",
          py: 0,
          px: 1,
          overflowX: "hidden",
        }}
      >
        <ListItemButton
          selected={selected}
          disabled={disabled}
          sx={{
            height: mini ? 50 : "auto",
          }}
          {...(nestedNavigation && !mini
            ? {
                onClick: handleClick,
              }
            : {})}
          {...(!nestedNavigation
            ? {
                LinkComponent,
                ...(hasExternalHref
                  ? {
                      target: "_blank",
                      rel: "noopener noreferrer",
                    }
                  : {}),
                href,
                onClick: handleClick,
              }
            : {})}
        >
          {icon || mini ? (
            <Box
              sx={
                mini
                  ? {
                      position: "absolute",
                      left: "50%",
                      top: "calc(50% - 6px)",
                      transform: "translate(-50%, -50%)",
                    }
                  : {}
              }
            >
              <ListItemIcon
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: mini ? "center" : "auto",
                }}
              >
                {icon ?? null}
                {!icon && mini ? (
                  <Avatar
                    sx={{
                      fontSize: 10,
                      height: 16,
                      width: 16,
                    }}
                  >
                    {title
                      .split(" ")
                      .slice(0, 2)
                      .map((titleWord) => titleWord.charAt(0).toUpperCase())}
                  </Avatar>
                ) : null}
              </ListItemIcon>
              {mini ? (
                <Typography
                  variant="caption"
                  sx={{
                    position: "absolute",
                    bottom: -18,
                    left: "50%",
                    transform: "translateX(-50%)",
                    fontSize: 10,
                    fontWeight: 500,
                    textAlign: "center",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    maxWidth: MINI_DRAWER_WIDTH - 28,
                  }}
                >
                  {title}
                </Typography>
              ) : null}
            </Box>
          ) : null}
          {!mini ? (
            <ListItemText
              primary={title}
              sx={{
                whiteSpace: "nowrap",
                zIndex: 1,
              }}
            />
          ) : null}
          {action && !mini && fullyExpanded ? action : null}
          {nestedNavigation ? (
            <ExpandMoreIcon sx={nestedNavigationCollapseSx} />
          ) : null}
        </ListItemButton>
        {nestedNavigation && mini ? (
          <Grow in={isHovered}>
            <Box
              sx={{
                position: "fixed",
                left: MINI_DRAWER_WIDTH - 2,
                pl: "6px",
              }}
            >
              <Paper
                elevation={8}
                sx={{
                  pt: 0.2,
                  pb: 0.2,
                  transform: "translateY(-50px)",
                }}
              >
                <DashboardSidebarContext.Provider
                  value={miniNestedNavigationSidebarContextValue}
                >
                  {nestedNavigation}
                </DashboardSidebarContext.Provider>
              </Paper>
            </Box>
          </Grow>
        ) : null}
      </ListItem>
      {nestedNavigation && !mini ? (
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          {nestedNavigation}
        </Collapse>
      ) : null}
    </React.Fragment>
  );
}

function DividerItem() {
  const sidebarContext = React.useContext(DashboardSidebarContext);
  if (!sidebarContext) {
    throw new Error("Sidebar context was used without a provider.");
  }
  const { fullyExpanded = true, hasDrawerTransitions } = sidebarContext;

  return (
    <li>
      <Divider
        sx={[
          {
            borderBottomWidth: 1,
            my: 1,
            mx: -0.5,
          },
          hasDrawerTransitions
            ? getDrawerSxTransitionMixin(fullyExpanded, "margin")
            : null,
        ]}
      />
    </li>
  );
}

export default function Sidebar({
  expanded = true,
  setExpanded,
  disableCollapsibleSidebar = false,
  container,
  deliveries = [],
}) {
  const theme = useTheme();
  const pathname = usePathname();

  const [expandedItemIds, setExpandedItemIds] = React.useState(() => {
    switch (true) {
      case !!matchPath({ path: "/deliveries", end: false }, pathname):
        return ["deliveries"];
      default:
        return [];
    }
  });

  const isOverSmViewport = useMediaQuery(theme.breakpoints.up("sm"));
  const isOverMdViewport = useMediaQuery(theme.breakpoints.up("md"));
  const prefersReducedMotion = useMediaQuery(
    "(prefers-reduced-motion: reduce)",
  );
  const shouldReduceDrawerMotion =
    theme.motion.reducedMotion === "always" ||
    (theme.motion.reducedMotion === "system" && prefersReducedMotion);
  const drawerEnteringDuration = shouldReduceDrawerMotion
    ? 0
    : theme.transitions.duration.enteringScreen;
  const drawerLeavingDuration = shouldReduceDrawerMotion
    ? 0
    : theme.transitions.duration.leavingScreen;

  const [isFullyExpanded, setIsFullyExpanded] = React.useState(expanded);
  const [isFullyCollapsed, setIsFullyCollapsed] = React.useState(!expanded);

  const [, startTransition] = React.useTransition();

  React.useEffect(() => {
    if (expanded) {
      if (drawerEnteringDuration === 0) {
        startTransition(() => {
          setIsFullyExpanded(true);
        });
        return undefined;
      }

      const drawerWidthTransitionTimeout = setTimeout(() => {
        setIsFullyExpanded(true);
      }, drawerEnteringDuration);

      return () => clearTimeout(drawerWidthTransitionTimeout);
    }

    startTransition(() => {
      setIsFullyExpanded(false);
    });

    return undefined;
  }, [drawerEnteringDuration, expanded]);

  React.useEffect(() => {
    if (!expanded) {
      if (drawerLeavingDuration === 0) {
        startTransition(() => {
          setIsFullyCollapsed(true);
        });
        return undefined;
      }

      const drawerWidthTransitionTimeout = setTimeout(() => {
        setIsFullyCollapsed(true);
      }, drawerLeavingDuration);

      return () => clearTimeout(drawerWidthTransitionTimeout);
    }

    startTransition(() => {
      setIsFullyCollapsed(false);
    });

    return undefined;
  }, [drawerLeavingDuration, expanded]);

  const mini = !disableCollapsibleSidebar && !expanded;

  const handleSetSidebarExpanded = React.useCallback(
    (newExpanded) => () => {
      setExpanded(newExpanded);
    },
    [setExpanded],
  );

  const handlePageItemClick = React.useCallback(
    (itemId, hasNestedNavigation) => {
      if (hasNestedNavigation && !mini) {
        setExpandedItemIds((previousValue) =>
          previousValue.includes(itemId)
            ? previousValue.filter(
                (previousValueItemId) => previousValueItemId !== itemId,
              )
            : [...previousValue, itemId],
        );
      } else if (!isOverSmViewport && !hasNestedNavigation) {
        setExpanded(false);
      }
    },
    [mini, setExpanded, isOverSmViewport],
  );

  const hasDrawerTransitions =
    isOverSmViewport && (!disableCollapsibleSidebar || isOverMdViewport);

  const getDrawerContent = React.useCallback(
    (viewport) => (
      <React.Fragment>
        <Toolbar />
        <Box
          component="nav"
          aria-label={`${viewport.charAt(0).toUpperCase()}${viewport.slice(1)}`}
          sx={[
            {
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              overflow: "auto",
              scrollbarGutter: mini ? "stable" : "auto",
              overflowX: "hidden",
              pt: !mini ? 0 : 2,
            },
            hasDrawerTransitions
              ? getDrawerSxTransitionMixin(isFullyExpanded, "padding")
              : null,
          ]}
        >
          <List
            dense
            sx={{
              padding: mini ? 0 : 0.5,
              mb: 4,
              width: mini ? MINI_DRAWER_WIDTH : "auto",
            }}
          >
            <HeaderItem>Deliveries & Pickups</HeaderItem>
            <PageItem
              id="deliveries"
              title="Deliveries"
              icon={<LocalShippingIcon />}
              href="/deliveries"
              selected={
                !!matchPath({ path: "/deliveries", end: false }, pathname)
              }
              defaultExpanded={true}
              expanded={expandedItemIds.includes("deliveries")}
              nestedNavigation={
                <List
                  dense
                  sx={{
                    padding: 0,
                    my: 1,
                    pl: mini ? 0 : 1,
                    minWidth: 240,
                  }}
                >
                  {deliveries.map(({ invoiceCode, displayName }) => {
                    const href = `/deliveries/${invoiceCode}`;
                    return (
                      <PageItem
                        id={href}
                        key={invoiceCode}
                        title={displayName}
                        icon={<GroupIcon />}
                        href={href}
                        selected={!!matchPath(href, pathname)}
                      />
                    );
                  })}
                </List>
              }
            />
            <PageItem
              id="delivery-groups"
              title="Delivery Groups"
              icon={<Diversity3Icon />}
              href="/delivery-groups"
              selected={!!matchPath("/delivery-groups", pathname)}
            />
            <PageItem
              id="pickup"
              title="Pickup"
              icon={<GestureIcon />}
              href="/pickup"
              selected={!!matchPath("/pickup", pathname)}
            />
            <PageItem
              id="pickup-logs"
              title="Pickup Logs"
              icon={<DescriptionIcon />}
              href="/pickup-logs"
              selected={!!matchPath("/pickup-logs", pathname)}
            />
            <DividerItem />
          </List>
        </Box>
      </React.Fragment>
    ),
    [
      deliveries,
      mini,
      hasDrawerTransitions,
      isFullyExpanded,
      expandedItemIds,
      pathname,
    ],
  );

  const getDrawerSharedSx = React.useCallback(
    (isTemporary) => (drawerTheme) => {
      const drawerWidth = mini ? MINI_DRAWER_WIDTH : DRAWER_WIDTH;
      const widthTransitionStyles = getDrawerSxTransitionMixin(
        expanded,
        "width",
      )(drawerTheme);

      return {
        displayPrint: "none",
        width: drawerWidth,
        flexShrink: 0,
        ...widthTransitionStyles,
        overflowX: "hidden",
        ...(isTemporary ? { position: "absolute" } : {}),
        [`& .MuiDrawer-paper`]: {
          position: "absolute",
          width: drawerWidth,
          boxSizing: "border-box",
          backgroundImage: "none",
          ...widthTransitionStyles,
          overflowX: "hidden",
        },
      };
    },
    [expanded, mini],
  );

  const sidebarContextValue = React.useMemo(() => {
    return {
      onPageItemClick: handlePageItemClick,
      mini,
      fullyExpanded: isFullyExpanded,
      fullyCollapsed: isFullyCollapsed,
      hasDrawerTransitions,
    };
  }, [
    handlePageItemClick,
    mini,
    isFullyExpanded,
    isFullyCollapsed,
    hasDrawerTransitions,
  ]);

  return (
    <DashboardSidebarContext.Provider value={sidebarContextValue}>
      <Drawer
        container={container}
        variant="temporary"
        open={expanded}
        onClose={handleSetSidebarExpanded(false)}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={[
          {
            display: {
              xs: "block",
              sm: disableCollapsibleSidebar ? "block" : "none",
              md: "none",
            },
          },
          getDrawerSharedSx(true),
        ]}
      >
        {getDrawerContent("phone")}
      </Drawer>
      <Drawer
        variant="permanent"
        sx={[
          {
            display: {
              xs: "none",
              sm: disableCollapsibleSidebar ? "none" : "block",
              md: "none",
            },
          },
          getDrawerSharedSx(false),
        ]}
      >
        {getDrawerContent("tablet")}
      </Drawer>
      <Drawer
        variant="permanent"
        sx={[
          { display: { xs: "none", md: "block" } },
          getDrawerSharedSx(false),
        ]}
      >
        {getDrawerContent("desktop")}
      </Drawer>
    </DashboardSidebarContext.Provider>
  );
}
