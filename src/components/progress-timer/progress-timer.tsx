import { useEffect, useState } from "react";
import {
  Button,
  ButtonGroup,
  ColorMode,
  Flex,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Popover,
  PopoverArrow,
  PopoverContent,
  PopoverTrigger,
  Progress,
  useDisclosure,
} from "@chakra-ui/react";
import {
  NotAllowedIcon,
  RepeatClockIcon,
  SettingsIcon,
  TimeIcon,
} from "@chakra-ui/icons";

interface IProgressTimer {
  colorMode: ColorMode;
}

const timePreset = [90, 180, 300];

export const ProgressTimer = ({ colorMode }: IProgressTimer) => {
  const [time, setTime] = useState(90);
  const [initialTime, setInitialTime] = useState(90);
  const [active, setActive] = useState(false);
  const { isOpen, onToggle, onClose } = useDisclosure();

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

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const number = parseFloat(e.target.value);
    const vn = Number.isNaN(number) ? 0 : number;
    setTime(vn);
    setInitialTime(vn);
  };

  const handlePresetChange = (preset: number) => {
    setTime(preset);
    setInitialTime(preset);
    onClose();
  };

  return (
    <Flex
      marginTop="12px"
      w="100%"
      justifyContent="space-between"
      alignItems="center"
    >
      <InputGroup w="34%">
        <Input type="number" value={time} onChange={handleTimeChange} />
        <InputRightElement>
          <Popover
            isOpen={isOpen}
            onClose={onClose}
            placement="top-start"
            gutter={16}
          >
            <PopoverTrigger>
              <SettingsIcon
                color={
                  isOpen ? (colorMode === "light" ? "green" : "purple.200") : ""
                }
                onClick={onToggle}
              />
            </PopoverTrigger>
            <PopoverContent p={2} w="fit-content">
              <PopoverArrow />
              <ButtonGroup isAttached>
                {timePreset.map((preset) => (
                  <Button
                    onClick={() => handlePresetChange(preset)}
                    variant={time === preset ? "solid" : "outline"}
                    colorScheme={
                      time === preset
                        ? colorMode === "light"
                          ? "green"
                          : "purple"
                        : "gray"
                    }
                  >
                    {preset}
                  </Button>
                ))}
              </ButtonGroup>
            </PopoverContent>
          </Popover>
        </InputRightElement>
      </InputGroup>
      <ButtonGroup ml={2} isAttached>
        <IconButton
          onClick={toggleTime}
          colorScheme={
            active ? "red" : colorMode === "light" ? "green" : "purple"
          }
          aria-label={active ? "stop" : "start"}
          icon={active ? <NotAllowedIcon /> : <TimeIcon />}
        />
        <IconButton
          onClick={resetTime}
          aria-label="reset"
          icon={<RepeatClockIcon />}
        />
      </ButtonGroup>
      <Progress
        ml={2}
        value={time}
        max={initialTime}
        w="65%"
        colorScheme={
          time <= 10 ? "red" : colorMode === "light" ? "green" : "purple"
        }
      />
    </Flex>
  );
};
