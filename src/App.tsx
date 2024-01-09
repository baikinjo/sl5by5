import {
  Box,
  CircularProgress,
  CircularProgressLabel,
  Container,
  Flex,
  IconButton,
  NumberInput,
  NumberInputField,
  Progress,
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
import { NotAllowedIcon, RepeatClockIcon, TimeIcon } from "@chakra-ui/icons";

function App() {
  const [program, setProgram] = useState<Program[]>([]);
  const [week, setWeek] = useState(NaN);
  const [day, setDay] = useState(NaN);
  const [plan, setPlan] = useState<Day | undefined>(undefined);
  const [reps, setReps] = useState([0, 0, 0]);
  const [time, setTime] = useState(90);
  const [initialTime, setInitialTime] = useState(90);
  const [active, setActive] = useState(false);

  useEffect(() => {
    setProgram(dataPoints);
  }, []);

  useEffect(() => {
    let intervalId: ReturnType<typeof setInterval>;

    if (active && time > 0) {
      intervalId = setInterval(() => {
        setTime((prev) => prev - 1);
      }, 1000);
    }

    if (time === 0) {
      setTime(initialTime);
      setActive(false);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [active, time]);

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

  const toggleTime = () => {
    setActive(!active);
  };
  const resetTime = () => {
    setTime(initialTime);
    setActive(false);
  };
  const handleTimeChange = (_: string, vn: number) => {
    vn = Number.isNaN(vn) ? 0 : vn;
    setTime(vn);
    setInitialTime(vn);
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
                    bg="gray.100"
                    borderRadius="10px"
                    display="flex"
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <Box>
                      <Box fontWeight="bold" fontSize="large">
                        {convertExerciseName(e.exercise)}
                      </Box>
                      <Box>{e.weight}lb</Box>
                      <Box>{e.reps}</Box>
                    </Box>
                    <CircularProgress
                      onClick={() => incrementReps(idx)}
                      color="green.400"
                      value={reps[idx]}
                      size="90px"
                    >
                      <CircularProgressLabel>
                        {reps[idx]}%
                      </CircularProgressLabel>
                    </CircularProgress>
                  </Box>
                ))}
              </SimpleGrid>
              <Flex
                marginTop="12px"
                w="100%"
                justifyContent="space-between"
                alignItems="center"
              >
                <NumberInput
                  w="25%"
                  defaultValue={time}
                  value={time}
                  onChange={handleTimeChange}
                >
                  <NumberInputField />
                </NumberInput>
                <IconButton
                  onClick={toggleTime}
                  ml="8px"
                  colorScheme={active ? "red" : "green"}
                  aria-label={active ? "stop" : "start"}
                  icon={active ? <NotAllowedIcon /> : <TimeIcon />}
                />
                <IconButton
                  onClick={resetTime}
                  ml="8px"
                  aria-label="reset"
                  icon={<RepeatClockIcon />}
                />
                <Progress
                  ml="8px"
                  value={time}
                  max={initialTime}
                  w="65%"
                  colorScheme="green"
                />
              </Flex>
            </>
          )}
        </>
      )}
    </Container>
  );
}

export default App;
