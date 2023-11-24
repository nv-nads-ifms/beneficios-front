import { Box, Typography } from "@mui/material";
import React from "react";

export default function DNATitleLabel(props) {
  const { text } = props;
  return (
    <Box
      sx={{
        mx: "auto",
        p: 1,
        m: 1
      }}
    >
      <Typography variant="h5" align="center">
        {text}
      </Typography>
    </Box>
  );
}
