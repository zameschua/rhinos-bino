import React, { useState } from "react";
import "./App.css";
import {
  Box,
  ChakraProvider,
  ButtonGroup,
  Button,
  Modal,
  ModalContent,
  ModalCloseButton,
  ModalBody,
  useToast,
  Input,
  Text,
  Divider,
  Center,
} from "@chakra-ui/react";

const NUMBER_REGEX = /^\d*\.?\d*$/;

const App = () => {
  const toast = useToast();
  const [isModalVisible, setModalVisible] = useState<boolean>(false);

  const [a1, setA1] = useState<string>("");
  const [e1, setE1] = useState<string>("");
  const [a2, setA2] = useState<string>("");
  const [e2, setE2] = useState<string>("");
  const [a3, setA3] = useState<string>("");
  const [e3, setE3] = useState<string>("");
  const [a4, setA4] = useState<string>("");
  const [e4, setE4] = useState<string>("");
  const [a5, setA5] = useState<string>("");
  const [e5, setE5] = useState<string>("");

  return (
    <ChakraProvider>
      <Center
        overflowY={"scroll"}
        width={"100vw"}
        alignContent={"center"}
        backgroundColor={"gray.700"}
        padding={"8"}
        paddingBottom={100}
      >
        <Box
          maxWidth={400}
          width={"100%"}
          backgroundColor={"white"}
          padding={4}
          borderRadius={"16"}
        >
          <Text fontSize={24} fontWeight={"medium"} marginBottom={4}>
            Rhino ball-sighting calculator
          </Text>
          <Box marginBottom={8}>
            <Box marginBottom={4}>
              <Text fontWeight={"medium"} color={"text.600"}>
                Azimuth 1
              </Text>
              <Input
                value={a1}
                onChange={(event) => {
                  const isValid: boolean = NUMBER_REGEX.test(
                    event.target.value
                  );

                  if (isValid) {
                    setA1(event.target.value);
                  }
                }}
                placeholder={"0.00"}
              />
            </Box>
            <Box>
              <Text fontWeight={"medium"} color={"text.600"}>
                Elevation 1
              </Text>
              <Input
                value={e1}
                onChange={(event) => {
                  const isValid: boolean = NUMBER_REGEX.test(
                    event.target.value
                  );

                  if (isValid) {
                    setE1(event.target.value);
                  }
                }}
                placeholder={"0.00"}
              />
            </Box>
          </Box>
          <Divider marginBottom={8} />
          <Box marginBottom={8}>
            <Box marginBottom={4}>
              <Text fontWeight={"medium"} color={"text.600"}>
                Azimuth 2
              </Text>
              <Input
                value={a2}
                onChange={(event) => {
                  const isValid: boolean = NUMBER_REGEX.test(
                    event.target.value
                  );

                  if (isValid) {
                    setA2(event.target.value);
                  }
                }}
                placeholder={"0.00"}
              />
            </Box>
            <Box>
              <Text fontWeight={"medium"} color={"text.600"}>
                Elevation 2
              </Text>
              <Input
                value={e2}
                onChange={(event) => {
                  const isValid: boolean = NUMBER_REGEX.test(
                    event.target.value
                  );

                  if (isValid) {
                    setE2(event.target.value);
                  }
                }}
                placeholder={"0.00"}
              />
            </Box>
          </Box>
          <Divider marginBottom={8} />
          <Box marginBottom={8}>
            <Box marginBottom={4}>
              <Text fontWeight={"medium"} color={"text.600"}>
                Azimuth 3
              </Text>
              <Input
                value={a3}
                onChange={(event) => {
                  const isValid: boolean = NUMBER_REGEX.test(
                    event.target.value
                  );

                  if (isValid) {
                    setA3(event.target.value);
                  }
                }}
                placeholder={"0.00"}
              />
            </Box>
            <Box>
              <Text fontWeight={"medium"} color={"text.600"}>
                Elevation 3
              </Text>
              <Input
                value={e3}
                onChange={(event) => {
                  const isValid: boolean = NUMBER_REGEX.test(
                    event.target.value
                  );

                  if (isValid) {
                    setE3(event.target.value);
                  }
                }}
                placeholder={"0.00"}
              />
            </Box>
          </Box>
          <Divider marginBottom={8} />
          <Box marginBottom={8}>
            <Box marginBottom={4}>
              <Text fontWeight={"medium"} color={"text.600"}>
                Azimuth 4
              </Text>
              <Input
                value={a4}
                onChange={(event) => {
                  const isValid: boolean = NUMBER_REGEX.test(
                    event.target.value
                  );

                  if (isValid) {
                    setA4(event.target.value);
                  }
                }}
                placeholder={"0.00"}
              />
            </Box>
            <Box>
              <Text fontWeight={"medium"} color={"text.600"}>
                Elevation 4
              </Text>
              <Input
                value={e4}
                onChange={(event) => {
                  const isValid: boolean = NUMBER_REGEX.test(
                    event.target.value
                  );

                  if (isValid) {
                    setE4(event.target.value);
                  }
                }}
                placeholder={"0.00"}
              />
            </Box>
          </Box>
          <Divider marginBottom={8} />
          <Box marginBottom={8}>
            <Box marginBottom={4}>
              <Text fontWeight={"medium"} color={"text.600"}>
                Azimuth 5
              </Text>
              <Input
                value={a5}
                onChange={(event) => {
                  const isValid: boolean = NUMBER_REGEX.test(
                    event.target.value
                  );

                  if (isValid) {
                    setA5(event.target.value);
                  }
                }}
                placeholder={"0.00"}
              />
            </Box>
            <Box>
              <Text fontWeight={"medium"} color={"text.600"}>
                Elevation 5
              </Text>
              <Input
                value={e5}
                onChange={(event) => {
                  const isValid: boolean = NUMBER_REGEX.test(
                    event.target.value
                  );

                  if (isValid) {
                    setE5(event.target.value);
                  }
                }}
                placeholder={"0.00"}
              />
            </Box>
          </Box>
        </Box>
        <Box
          position={"fixed"}
          bottom={0}
          width={"100%"}
          justifyContent={"center"}
          alignItems={"center"}
          padding={2}
          backgroundColor={"gray.100"}
        >
          <ButtonGroup maxWidth={"400"} width={"100%"} flexDirection={"row"}>
            <Button
              flex={1}
              variant={"outline"}
              colorScheme={"gray"}
              onClick={() => {
                setA1("");
                setE1("");
                setA2("");
                setE2("");
                setA3("");
                setE3("");
                setA4("");
                setE4("");
                setA5("");
                setE5("");
              }}
            >
              Clear all
            </Button>
            <Button
              colorScheme={"blue"}
              flex={1}
              onClick={() => {
                if (
                  a1 === "" ||
                  e1 === "" ||
                  a2 === "" ||
                  e2 === "" ||
                  a3 === "" ||
                  e3 === ""
                ) {
                  toast({
                    description: "Need at least 3 readings to continue",
                    status: "error",
                    position: "top",
                  });
                  return;
                }

                if ((a4 === "" && e4 !== "") || (a4 !== "" && e4 === "")) {
                  toast({
                    description:
                      "Azimuth 4 and Elevation 4 need to both be populated",
                    status: "error",
                    position: "top",
                  });
                  return;
                }

                if ((a5 === "" && e5 !== "") || (a5 !== "" && e5 === "")) {
                  toast({
                    description:
                      "Azimuth 5 and Elevation 5 need to both be populated",
                    status: "error",
                    position: "top",
                  });
                  return;
                }

                setModalVisible(true);
              }}
            >
              Calculate
            </Button>
          </ButtonGroup>
        </Box>
      </Center>

      <Modal isOpen={isModalVisible} onClose={() => setModalVisible(false)}>
        <ModalContent maxWidth={"400"} width={"100%"} shadow={"lg"}>
          <ModalCloseButton />
          <ModalBody padding={"4"}>
            <Text fontWeight={"medium"} color={"text.600"}>
              Azimuth
            </Text>
            <Text fontWeight={"medium"} color={"text.600"}>
              Elevation
            </Text>
          </ModalBody>
        </ModalContent>
      </Modal>
    </ChakraProvider>
  );
};

export default App;
