import { useState } from "react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { ColorMode, Flex, IconButton, Select, Stack } from "@chakra-ui/react";

import { Program, Day } from "../../utils";

interface IWeekDaySelectBase {
  program: Program[];
  colorMode: ColorMode;
  toggleColorMode: () => void;
  setPlan: React.Dispatch<React.SetStateAction<Day | undefined>>;
  setReps: React.Dispatch<React.SetStateAction<number[]>>;
}
interface IWeekSelect extends Omit<IWeekDaySelectBase, "setReps"> {
  week: number;
  setWeek: React.Dispatch<React.SetStateAction<number>>;
  setDay: React.Dispatch<React.SetStateAction<number>>;
}
interface IDaySelect
  extends Omit<IWeekDaySelectBase, "colorMode" | "toggleColorMode"> {
  week: number;
  day: number;
  setDay: React.Dispatch<React.SetStateAction<number>>;
}

const WeekSelect = ({
  program,
  week,
  colorMode,
  toggleColorMode,
  setWeek,
  setDay,
  setPlan,
}: IWeekSelect) => {
  const handleWeekChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedWeek = +e.target.value;
    setWeek(selectedWeek);
    setDay(NaN);
    setPlan(undefined);
  };

  return (
    <Flex>
      <Select
        placeholder="Select Week"
        value={week}
        onChange={handleWeekChange}
      >
        {program.map((p) => (
          <option key={p.week} value={p.week}>{`Week ${p.week}`}</option>
        ))}
      </Select>
      <IconButton
        variant="outline"
        aria-label="toggleColor"
        icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
        ml={1}
        onClick={toggleColorMode}
      />
    </Flex>
  );
};

const DaySelect = ({
  program,
  week,
  day,
  setDay,
  setPlan,
  setReps,
}: IDaySelect) => {
  const handleDayChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedDay = +e.target.value;
    setDay(selectedDay);
    setPlan(program.find((p) => p.week === week)?.days[selectedDay]);
    setReps([0, 0, 0]);
  };

  return (
    <Select placeholder="Select Day" onChange={handleDayChange} value={day}>
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
  );
};

export const WeekDaySelect = ({
  program,
  colorMode,
  toggleColorMode,
  setPlan,
  setReps,
}: IWeekDaySelectBase) => {
  const [week, setWeek] = useState(NaN);
  const [day, setDay] = useState(NaN);

  return (
    <Stack spacing={3} w="100%">
      <WeekSelect
        program={program}
        week={week}
        colorMode={colorMode}
        toggleColorMode={toggleColorMode}
        setWeek={setWeek}
        setDay={setDay}
        setPlan={setPlan}
      />
      {!!week && (
        <DaySelect
          program={program}
          week={week}
          day={day}
          setDay={setDay}
          setPlan={setPlan}
          setReps={setReps}
        />
      )}
    </Stack>
  );
};
