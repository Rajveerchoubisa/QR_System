import { Box, Heading, VStack, Input, Button, useToast, HStack, Text, IconButton, Divider, Image } from "@chakra-ui/react";
import { useState } from "react";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";

const ManageMenu = () => {
  const [menuItem, setMenuItem] = useState("");
  const [price, setPrice] = useState("");
  const [menu, setMenu] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [qrCodeUrl, setQRCodeUrl] = useState("");
  const toast = useToast();

  const handleAdd = () => {
    if (!menuItem || !price) {
      toast({
        title: "Missing Fields",
        description: "Please fill in both fields",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    if (editIndex !== null) {
      const updated = [...menu];
      updated[editIndex] = { name: menuItem, price };
      setMenu(updated);
      setEditIndex(null);
      toast({ title: "Item Updated", status: "info", duration: 3000, isClosable: true });
    } else {
      setMenu([...menu, { name: menuItem, price }]);
      toast({ title: "Item Added", status: "success", duration: 3000, isClosable: true });
    }

    setMenuItem("");
    setPrice("");
    setQRCodeUrl(""); // Clear QR if menu changed
  };

  const handleDelete = (index) => {
    const updated = [...menu];
    updated.splice(index, 1);
    setMenu(updated);
    toast({ title: "Item Deleted", status: "error", duration: 3000, isClosable: true });
    setQRCodeUrl(""); // Clear QR if menu changed
  };

  const handleEdit = (index) => {
    setMenuItem(menu[index].name);
    setPrice(menu[index].price);
    setEditIndex(index);
  };

  const handleGenerateQR = () => {
    const menuData = encodeURIComponent(JSON.stringify(menu));
    const qr = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${menuData}`;
    setQRCodeUrl(qr);
  };

  return (
    <Box maxW="lg" mx="auto" mt={10} p={6} bg="white" borderRadius="md" boxShadow="md">
      <Heading size="lg" mb={6} color="blue.600">Manage Menu</Heading>

      <VStack spacing={4}>
        <Input
          placeholder="Item Name"
          value={menuItem}
          onChange={(e) => setMenuItem(e.target.value)}
        />
        <Input
          placeholder="Price (₹)"
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <Button colorScheme="blue" width="100%" onClick={handleAdd}>
          {editIndex !== null ? "Update Item" : "Add Item"}
        </Button>
      </VStack>

      <Divider my={6} />

      {menu.length > 0 && (
        <Box>
          <Heading size="md" mb={4}>Menu List</Heading>
          <VStack spacing={3} align="stretch">
            {menu.map((item, index) => (
              <HStack key={index} justify="space-between" bg="gray.50" p={3} borderRadius="md">
                <Text>{item.name} - ₹{item.price}</Text>
                <HStack>
                  <IconButton icon={<EditIcon />} size="sm" onClick={() => handleEdit(index)} />
                  <IconButton icon={<DeleteIcon />} size="sm" colorScheme="red" onClick={() => handleDelete(index)} />
                </HStack>
              </HStack>
            ))}
          </VStack>

          <Button colorScheme="green" mt={6} width="100%" onClick={handleGenerateQR}>
            Generate QR Code for Menu
          </Button>

          {qrCodeUrl && (
            <Box mt={6} textAlign="center">
              <Text fontWeight="semibold" mb={2}>Your Menu QR Code:</Text>
              <Image src={qrCodeUrl} alt="QR Code" mx="auto" />
            </Box>
          )}
        </Box>
      )}
    </Box>
  );
};

export default ManageMenu;
