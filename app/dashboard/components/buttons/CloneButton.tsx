import { useState } from "react";
import { Button} from "@mantine/core";
import { FaRegClone } from "react-icons/fa";

const CloneButton: React.FC = () => {
  const [opened, setOpened] = useState(false);

  return (
    <>
        <Button leftIcon={<FaRegClone />} radius="xs" size="xs" color="teal" onClick={() => setOpened(true)}>
          Clone
        </Button>
    </>
  );
};

export default CloneButton;
