import { Text, Select, Button, Textarea, VStack } from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";

function App() {
  const [type, setType] = useState("");
  const [data, setData] = useState("");

  const handleGenerate = () => {
    axios
      .post(`https://ga-201server.vercel.app/news/${type}`)
      .then((res) => {
        console.log(res.data);
        setData(res.data);
      })
      .catch((error) => {
        console.error(error);
        setData("Error occurred while generating news.");
      });
  };

  const backgroundColor1 = "#b5c9d3"; // Light blue-gray
  const backgroundColor2 = "#cdd7dd"; // Dark blue-gray

  const handleTypeChange = (event) => {
    const selectedType = event.target.value;
    setType(selectedType);
  };

  return (
    <VStack
      spacing={4}
      align="center"
      bgGradient={`linear(to-b, ${backgroundColor1}, ${backgroundColor2})`}
      p={8}
      borderRadius="md"
    >
      <Text fontWeight={600} fontSize="25px" color="purple.600">
        Random News Generator
      </Text>
      <Select
        w="50%"
        onChange={handleTypeChange}
        bg="white"
        placeholder="Select a category"
      >
        <option value="sports">Sports</option>
        <option value="economics">Economics</option>
        <option value="politics">Politics</option>
      </Select>
      <Button onClick={handleGenerate} bg="purple.600" color="white">
        Generate
      </Button>
      {data && (
        <Textarea
          value={data}
          rows={data.split("\n").length}
          readOnly
          resize="none"
          width="50%"
          textAlign="left"
          bg="white"
          color="gray.800"
          borderRadius="md"
          boxShadow="sm"
          p={2}
          style={{ backgroundColor: "#f8f8f8", color: "rgb(107,70,193)" }}
        />
      )}
    </VStack>
  );
}

export default App;
