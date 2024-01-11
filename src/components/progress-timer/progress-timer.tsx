import { useEffect, useState } from "react";
import {
  ColorMode,
  Flex,
  IconButton,
  NumberInput,
  NumberInputField,
  Progress,
} from "@chakra-ui/react";
import { NotAllowedIcon, RepeatClockIcon, TimeIcon } from "@chakra-ui/icons";

interface IProgressTimer {
  colorMode: ColorMode;
}

export const ProgressTimer = ({ colorMode }: IProgressTimer) => {
  const [time, setTime] = useState(90);
  const [initialTime, setInitialTime] = useState(90);
  const [active, setActive] = useState(false);

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
        ml={2}
        colorScheme={
          active ? "red" : colorMode === "light" ? "green" : "purple"
        }
        aria-label={active ? "stop" : "start"}
        icon={active ? <NotAllowedIcon /> : <TimeIcon />}
      />
      <IconButton
        onClick={resetTime}
        ml={2}
        aria-label="reset"
        icon={<RepeatClockIcon />}
      />
      <Progress
        ml={2}
        value={time}
        max={initialTime}
        w="65%"
        colorScheme={colorMode === "light" ? "green" : "purple"}
      />
    </Flex>
  );
};
