import { useEffect, useState } from "react";
import {
  Container,
  Spinner,
  useColorMode,
  useDisclosure,
} from "@chakra-ui/react";

import { MoreInfoModal, PlanDisplay, WeekDaySelect } from "./components";
import { Program, Day, dataPoints } from "./utils";

function App() {
  const [program, setProgram] = useState<Program[]>([]);
  const [plan, setPlan] = useState<Day | undefined>(undefined);
  const [reps, setReps] = useState([0, 0, 0]);
  const [selectedExercise, setSelectedExercise] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { colorMode, toggleColorMode } = useColorMode();

  useEffect(() => {
    setProgram(dataPoints);
  }, []);

  return (
    <Container centerContent p="20px">
      {program.length === 0 ? (
        <Spinner />
      ) : (
        <>
          <MoreInfoModal
            isOpen={isOpen}
            colorMode={colorMode}
            selectedExercise={selectedExercise}
            onClose={onClose}
            setSelectedExercise={setSelectedExercise}
          />
          <WeekDaySelect
            program={program}
            colorMode={colorMode}
            toggleColorMode={toggleColorMode}
            setPlan={setPlan}
            setReps={setReps}
          />
          <PlanDisplay
            plan={plan}
            reps={reps}
            colorMode={colorMode}
            onOpen={onOpen}
            setReps={setReps}
            setSelectedExercise={setSelectedExercise}
          />
        </>
      )}
    </Container>
  );
}

export default App;
