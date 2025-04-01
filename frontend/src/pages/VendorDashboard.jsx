import { Box, Heading, Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";
const VendorDashboard = () => {
  return (
    <Box p={10}>
      <Heading>Vendor Dashboard</Heading>
      <Link to="/vendor/menu">
        <Button mt={4} colorScheme="blue">Manage Menu</Button>
      </Link>
      <Link to="/vendor/qrcode">
        <Button mt={4} ml={4} colorScheme="green">Generate QR Code</Button>
      </Link>
    </Box>
  );
};
export default VendorDashboard;