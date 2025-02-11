import React from "react";
import { ShoppingCart, Favorite, WorkspacePremium } from "@mui/icons-material";
import { Box, Typography, Stack, Divider } from "@mui/material";

const BuyerProfile: React.FC = () => {
  return (
    <Box sx={{ mt: 4, pt: 4, borderTop: "2px solid #E0E0E0" }}>
      <Typography variant="h5" fontWeight="bold" color="primary" display="flex" alignItems="center" gap={1}>
        <WorkspacePremium sx={{ color: "#FFD700" }} />
        Buyer Details
      </Typography>

      <Stack spacing={2} mt={2}>
        <Stack direction="row" alignItems="center" spacing={2}>
          <ShoppingCart color="primary" />
          <Typography variant="body1" fontWeight="medium">
            Orders Placed: <strong>15</strong>
          </Typography>
        </Stack>

        <Stack direction="row" alignItems="center" spacing={2}>
          <Favorite sx={{ color: "red" }} />
          <Typography variant="body1" fontWeight="medium">
            Wishlist Items: <strong>5</strong>
          </Typography>
        </Stack>

        <Stack direction="row" alignItems="center" spacing={2}>
          <WorkspacePremium sx={{ color: "#FFD700" }} />
          <Typography variant="body1" fontWeight="medium">
            Membership: <strong style={{ color: "red" }}>Not Subscribed</strong>
          </Typography>
        </Stack>
      </Stack>
    </Box>
  );
};

export default BuyerProfile;
