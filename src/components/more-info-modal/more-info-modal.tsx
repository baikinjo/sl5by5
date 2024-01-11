import {
  Button,
  ColorMode,
  Image,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";

import { convertExerciseName, exerciseMedia } from "../../utils";

interface IMoreInfoModal {
  isOpen: boolean;
  selectedExercise: string;
  colorMode: ColorMode;
  onClose: () => void;
  setSelectedExercise: React.Dispatch<React.SetStateAction<string>>;
}

export const MoreInfoModal = ({
  isOpen,
  selectedExercise,
  colorMode,
  onClose,
  setSelectedExercise,
}: IMoreInfoModal) => {
  const handleModalClose = () => {
    setSelectedExercise("");
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleModalClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader textTransform="uppercase">
          {convertExerciseName(selectedExercise)}
        </ModalHeader>
        <ModalBody>
          <Image src={exerciseMedia(selectedExercise)} alt={selectedExercise} />
        </ModalBody>
        <ModalFooter>
          <Button
            colorScheme={colorMode === "light" ? "green" : "purple"}
            onClick={handleModalClose}
          >
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
