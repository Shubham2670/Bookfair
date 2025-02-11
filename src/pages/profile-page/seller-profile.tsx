import React from "react";
import { Storefront, TrendingUp, Star } from "@mui/icons-material";
import { Box, Typography, Stack } from "@mui/material";

const SellerProfile: React.FC = () => {
  return (
    <Box sx={{ mt: 4, pt: 4, borderTop: "2px solid #E0E0E0" }}>
         
      <Typography variant="h5" fontWeight="bold" color="primary" display="flex" alignItems="center" gap={1}>
        <Storefront color="primary" />
        Seller Details
      </Typography>

      <Stack spacing={2} mt={2}>
        <Stack direction="row" alignItems="center" spacing={2}>
          <Storefront sx={{ color: "#1976D2" }} />
          <Typography variant="body1" fontWeight="medium">
            Shop Name: <strong>Awesome Books Store</strong>
          </Typography>
        </Stack>

        <Stack direction="row" alignItems="center" spacing={2}>
          <TrendingUp sx={{ color: "green" }} />
          <Typography variant="body1" fontWeight="medium">
            Total Sales: <strong>120</strong>
          </Typography>
        </Stack>

        <Stack direction="row" alignItems="center" spacing={2}>
          <Star sx={{ color: "#FFD700" }} />
          <Typography variant="body1" fontWeight="medium">
            Rating: ⭐⭐⭐⭐☆
          </Typography>
        </Stack>
      </Stack>
    </Box>
  );
};

export default SellerProfile;
