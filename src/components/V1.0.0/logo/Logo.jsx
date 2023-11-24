import React from "react";
import { Avatar, Typography } from "@mui/material";

const sxDysplayMedium = {
  xs: "none",
  md: "flex"
};

const sxDysplaySmall = {
  xs: "flex",
  md: "none"
};

export default function Logo(props) {
  const { sxtype, caption } = props;
  const [sxDisplay, setSxDisplay] = React.useState(sxDysplaySmall);
  const [variant, setVariant] = React.useState("h6");
  const [flexGrow, setFlexGrow] = React.useState(null);

  React.useEffect(() => {
    if (sxtype != null && sxtype === "md") {
      setSxDisplay(sxDysplayMedium);
      setVariant("h5");
      setFlexGrow(1);
    } else {
      setSxDisplay(sxDysplaySmall);
      setVariant("h6");
      setFlexGrow(null);
    }
  }, [sxtype]);

  return (
    <React.Fragment>
      <Avatar sx={{ display: sxDisplay, mr: 1 }} />
      <Typography
        variant={variant}
        noWrap
        component="a"
        href="/"
        sx={{
          display: sxDisplay,
          mr: 2,
          flexGrow: flexGrow,
          fontWeight: 700,
          letterSpacing: ".3rem",
          color: "inherit",
          textDecoration: "none"
        }}
        {...props}
      >
        {caption == null ? "DNE" : caption}
      </Typography>
    </React.Fragment>
  );
}
