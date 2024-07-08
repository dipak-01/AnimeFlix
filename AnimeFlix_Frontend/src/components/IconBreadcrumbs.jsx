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
    <div role="presentation" onClick={handleClick}>
      <Breadcrumbs aria-label="breadcrumb">
        <Link
          underline="hover"
          sx={{ display: "flex", alignItems: "center" }}
          color="inherit"
          href="/"
        >
          <i className="fas fa-xmark  "></i>
          MUI
        </Link>
        <Link
          underline="hover"
          sx={{ display: "flex", alignItems: "center" }}
          color="inherit"
          href="/material-ui/getting-started/installation/"
        >
          <i className="fas fa-xmark  "></i>
          Core
        </Link>
        <Typography
          sx={{ display: "flex", alignItems: "center" }}
          color="text.primary"
        >
          <i className="fas fa-xmark  "></i>
          Breadcrumb
        </Typography>
      </Breadcrumbs>
    </div>
  );
}
