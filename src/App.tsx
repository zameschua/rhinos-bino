import React, { useMemo, useState } from "react";
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
  Text,
  Divider,
  Center,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  ModalHeader,
  ModalOverlay,
  Input,
} from "@chakra-ui/react";
import _ from "lodash";

const App = () => {
  const toast = useToast();

  const [readings, setReadings] = useState<
    { azimuth: string; elevation: string }[]
  >([
    { azimuth: "", elevation: "" },
    { azimuth: "", elevation: "" },
    { azimuth: "", elevation: "" },
    { azimuth: "", elevation: "" },
    { azimuth: "", elevation: "" },
  ]);
  const [isModalVisible, setModalVisible] = useState<boolean>(false);
  const [numberOfShots, setNumberOfShots] = useState<number>(5);

  return (
    <ChakraProvider>
      <Center
        overflowY={"scroll"}
        width={"100vw"}
        minHeight={"100vh"}
        alignContent={"center"}
        backgroundColor={"gray.700"}
        paddingY={"8"}
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
            <Text fontSize={20} fontWeight={"semibold"} marginBottom={2}>
              Number of shots
            </Text>
            <Divider marginBottom={2} />
            <NumberInput
              min={3}
              max={5}
              defaultValue={numberOfShots}
              onChange={(valueAsString, valueAsNumber) => {
                if (isNaN(valueAsNumber)) {
                  return;
                }

                setNumberOfShots(valueAsNumber);

                let newReadings: {
                  azimuth: string;
                  elevation: string;
                }[] = _.cloneDeep(readings);
                if (valueAsNumber > readings.length) {
                  while (newReadings.length < valueAsNumber) {
                    newReadings.push({
                      azimuth: "",
                      elevation: "",
                    });
                  }
                } else {
                  newReadings = _.slice(newReadings, 0, valueAsNumber);
                }
                setReadings(newReadings);
              }}
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </Box>

          {readings.map((reading, index) => {
            return (
              <Box key={index}>
                <Text fontSize={20} fontWeight={"semibold"} marginBottom={2}>
                  Shot {index + 1}
                </Text>
                <Divider marginBottom={2} />
                <Box marginBottom={8}>
                  <Box marginBottom={4}>
                    <Text fontWeight={"medium"} color={"gray.600"}>
                      Azimuth {index + 1}
                    </Text>
                    <Input
                      type={"number"}
                      value={reading.azimuth}
                      onChange={(event) => {
                        setReadings(
                          readings.map((readingInner, indexInner) => {
                            if (indexInner !== index) {
                              return readingInner;
                            }

                            return {
                              azimuth: event.target.value,
                              elevation: reading.elevation,
                            };
                          })
                        );
                      }}
                      placeholder={"0.00"}
                    />
                  </Box>
                  <Box>
                    <Text fontWeight={"medium"} color={"gray.600"}>
                      Elevation {index + 1}
                    </Text>
                    <Input
                      type={"number"}
                      value={reading.elevation}
                      onChange={(event) => {
                        setReadings(
                          readings.map((readingInner, indexInner) => {
                            if (indexInner !== index) {
                              return readingInner;
                            }

                            return {
                              azimuth: reading.azimuth,
                              elevation: event.target.value,
                            };
                          })
                        );
                      }}
                      placeholder={"0.00"}
                    />
                  </Box>
                </Box>
              </Box>
            );
          })}
        </Box>
        <Center
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
              onClick={() => {
                let newReadings: {
                  azimuth: string;
                  elevation: string;
                }[] = [];

                for (let i = 0; i < numberOfShots; i++) {
                  newReadings.push({
                    azimuth: "",
                    elevation: "",
                  });
                }
                setReadings(newReadings);
                toast({
                  status: "success",
                  description: "Successfully cleared all readings",
                  isClosable: true,
                });
              }}
            >
              Clear all
            </Button>
            <Button
              colorScheme={"blue"}
              flex={1}
              onClick={() => {
                let hasError: boolean = false;
                for (const [index, reading] of Object.entries(readings)) {
                  if (reading.azimuth === "") {
                    hasError = true;
                    toast({
                      status: "error",
                      description: `Shot ${
                        parseInt(index) + 1
                      } missing azimuth`,
                      isClosable: true,
                    });
                  }
                  if (reading.elevation === "") {
                    hasError = true;
                    toast({
                      status: "error",
                      description: `Shot ${
                        parseInt(index) + 1
                      } missing elevation`,
                      isClosable: true,
                    });
                  }
                }

                if (hasError) {
                  return;
                }

                setModalVisible(true);
              }}
            >
              Calculate
            </Button>
          </ButtonGroup>
        </Center>
      </Center>
      {isModalVisible && (
        <ResultModal
          readings={readings}
          onClose={() => setModalVisible(false)}
        />
      )}
    </ChakraProvider>
  );
};

const ResultModal = ({
  readings,
  onClose,
}: {
  readings: {
    azimuth: string;
    elevation: string;
  }[];
  onClose: () => void;
}) => {
  const azimuth: number = useMemo(() => {
    return (
      (_.sumBy(readings, (reading) => parseFloat(reading?.azimuth ?? 0)) /
        readings.length) *
        2 -
      1
    );
  }, [readings]);
  const elevation: number = useMemo(() => {
    return (
      (_.sumBy(readings, (reading) => parseFloat(reading?.elevation ?? 0)) /
        readings.length) *
        2 -
      1
    );
  }, [readings]);
  return (
    <Modal isOpen={true} onClose={onClose}>
      <ModalOverlay />
      <ModalContent maxWidth={"500"} width={"100%"} shadow={"lg"}>
        <ModalHeader>
          <Text fontSize={24} fontWeight={"medium"}>
            Zeroing Adjustment
          </Text>
        </ModalHeader>
        <ModalCloseButton />

        <ModalBody padding={"4"}>
          <Box marginBottom={4}>
            <Text fontWeight={"medium"} color={"text.600"}>
              Azimuth
            </Text>
            <Text>
              {azimuth > 0 && "+"}
              {azimuth.toFixed(2)}
            </Text>
          </Box>
          <Box>
            <Text fontWeight={"medium"} color={"text.600"}>
              Elevation
            </Text>
            <Text>
              {elevation > 0 && "+"}
              {elevation.toFixed(2)}
            </Text>
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default App;
