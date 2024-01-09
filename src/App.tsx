import {
    Box,
    CircularProgress,
    CircularProgressLabel,
    Container,
    Select,
    SimpleGrid,
    Spinner,
    Stack,
  } from "@chakra-ui/react";
  import {
    Day,
    Program,
    convertExerciseName,
    program as dataPoints,
  } from "./data";
  import { useEffect, useState } from "react";
  
  function App() {
    const [program, setProgram] = useState<Program[]>([]);
    const [week, setWeek] = useState(NaN);
    const [day, setDay] = useState(NaN);
    const [plan, setPlan] = useState<Day | undefined>(undefined);
    const [reps, setReps] = useState([0, 0, 0]);
  
    useEffect(() => {
      setProgram(dataPoints);
    }, []);
  
    const handleWeekChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      const selectedWeek = +e.target.value;
      setWeek(selectedWeek);
      setDay(NaN);
      setPlan(undefined);
    };
  
    const handleDayChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      const selectedDay = +e.target.value;
      setDay(selectedDay);
      setPlan(program.find((p) => p.week === week)?.days[selectedDay]);
      setReps([0, 0, 0]);
    };
  
    const incrementReps = (idx: number) => {
      const exercise = plan?.exercises[idx];
      if (!exercise) return;
      const progress = reps[idx];
      const increment = exercise.reps === "5x5" ? 20 : 100;
  
      const newProgress = progress === 100 ? 0 : progress + increment;
      const newReps = [...reps];
      newReps[idx] = newProgress;
      setReps(newReps);
    };
  
    return (
      <Container centerContent p="20px">
        {program.length === 0 ? (
          <Spinner />
        ) : (
          <>
            <Stack spacing={3} w="100%">
              <Select
                placeholder="Select Week"
                value={week}
                onChange={handleWeekChange}
              >
                {program.map((p) => (
                  <option key={p.week} value={p.week}>{`Week ${p.week}`}</option>
                ))}
              </Select>
              {!!week && (
                <Select
                  placeholder="Select Day"
                  onChange={handleDayChange}
                  value={day}
                >
                  <option key={0} value={0}>
                    Monday
                  </option>
                  <option key={1} value={1}>
                    Wednesday
                  </option>
                  <option key={2} value={2}>
                    Friday
                  </option>
                </Select>
              )}
            </Stack>
            {!!plan && (
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
                    bg="gray.100"
                    borderRadius="10px"
                    display="flex"
                    alignItems="center"
                    justifyContent="space-between"
                    onClick={() => incrementReps(idx)}
                  >
                    <Box>
                      <Box fontWeight="bold" fontSize="large">
                        {convertExerciseName(e.exercise)}
                      </Box>
                      <Box>{e.weight}lb</Box>
                      <Box>{e.reps}</Box>
                    </Box>
                    <CircularProgress
                      color="green.400"
                      value={reps[idx]}
                      size="90px"
                    >
                      <CircularProgressLabel>{reps[idx]}%</CircularProgressLabel>
                    </CircularProgress>
                  </Box>
                ))}
              </SimpleGrid>
            )}
          </>
        )}
      </Container>
    );
  }
  
  export default App;
  