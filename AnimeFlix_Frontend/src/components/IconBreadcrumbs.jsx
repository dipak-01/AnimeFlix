import * as React from "react";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";

function handleClick(event) {
  event.preventDefault();
  console.info("You clicked a breadcrumb.");
}

export default function IconBreadcrumbs() {
  return (
    <div
      role="presentation"
      onClick={handleClick}
      className="flex w-full justify-center overflow-x-auto py-2"
      style={{ WebkitOverflowScrolling: "touch" }}
    >
      <Breadcrumbs
        aria-label="breadcrumb"
        sx={{
          width: "100%",
          justifyContent: "center",
          display: "flex",
          flexWrap: "nowrap",
          overflowX: "auto",
          px: 1,
        }}
      >
        <Link
          underline="hover"
          sx={{ display: "flex", alignItems: "center", minWidth: 0 }}
          color="inherit"
          href="/"
        >
          <i className="fas fa-xmark mr-1"></i>
          MUI
        </Link>
        <Link
          underline="hover"
          sx={{ display: "flex", alignItems: "center", minWidth: 0 }}
          color="inherit"
          href="/material-ui/getting-started/installation/"
        >
          <i className="fas fa-xmark mr-1"></i>
          Core
        </Link>
        <Typography
          sx={{ display: "flex", alignItems: "center", minWidth: 0 }}
          color="text.primary"
        >
          <i className="fas fa-xmark mr-1"></i>
          Breadcrumb
        </Typography>
      </Breadcrumbs>
    </div>
  );
}
