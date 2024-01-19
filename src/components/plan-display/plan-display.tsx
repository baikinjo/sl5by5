import {
  Box,
  CircularProgress,
  CircularProgressLabel,
  ColorMode,
  Flex,
  SimpleGrid,
} from "@chakra-ui/react";
import { InfoOutlineIcon } from "@chakra-ui/icons";

import { ProgressTimer } from "../progress-timer/progress-timer";
import { Day, convertExerciseName } from "../../utils";

interface IPlanDisplay {
  plan: Day | undefined;
  reps: number[];
  colorMode: ColorMode;
  onOpen: () => void;
  setReps: React.Dispatch<React.SetStateAction<number[]>>;
  setSelectedExercise: React.Dispatch<React.SetStateAction<string>>;
}

export const PlanDisplay = ({
  plan,
  reps,
  colorMode,
  onOpen,
  setReps,
  setSelectedExercise,
}: IPlanDisplay) => {
  const incrementReps = (idx: number) => {
    const exercise = plan?.exercises[idx];
    if (!exercise) return;
    const progress = reps[idx];

    const newProgress = progress === 100 ? 0 : progress + 20;
    const newReps = [...reps];
    newReps[idx] = newProgress;
    setReps(newReps);
  };

  const handleModalOpen = (exercise: string) => {
    setSelectedExercise(exercise);
    onOpen();
  };

  return (
    !!plan && (
      <>
        <SimpleGrid
          columns={1}
          spacing={3}
          w="100%"
          mt="20px"
          textTransform="uppercase"
        >
          <Box fontWeight="bold">Plan {plan.plan}</Box>
          {plan.exercises.map((e, idx) => (
            <Box
              key={e.exercise}
              p="20px"
              bg={colorMode === "light" ? "gray.100" : "gray.600"}
              borderRadius="10px"
              display="flex"
              alignItems="center"
              justifyContent="space-between"
            >
              <Box>
                <Flex fontWeight="bold" fontSize="large" alignItems="center">
                  {convertExerciseName(e.exercise)}{" "}
                  <InfoOutlineIcon
                    onClick={() => handleModalOpen(e.exercise)}
                    ml="8px"
                  />
                </Flex>
                <Box>
                  {e.weight}lb | {(e.weight - 45) / 2}lb per plate
                </Box>
                <Box>{e.reps}</Box>
              </Box>
              <CircularProgress
                onClick={() => incrementReps(idx)}
                color={colorMode === "light" ? "green.400" : "purple.200"}
                value={reps[idx]}
                size="90px"
              >
                <CircularProgressLabel>{reps[idx]}%</CircularProgressLabel>
              </CircularProgress>
            </Box>
          ))}
        </SimpleGrid>
        <ProgressTimer colorMode={colorMode} />
      </>
    )
  );
};
