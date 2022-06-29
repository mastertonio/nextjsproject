import { useState } from "react";
import { Modal, Button, Group, TextInput} from "@mantine/core";
import { useForm } from "@mantine/form";
import { AiOutlineDelete } from "react-icons/ai";

const CloneButton: React.FC = () => {
  const [opened, setOpened] = useState(false);

  const form = useForm({
    initialValues: {
      name: "",
      template: [],
    },
  });

  return (
    <>
        <Button leftIcon={<AiOutlineDelete />} radius="xs" size="xs" color="red" onClick={() => setOpened(true)}>
          Delete
        </Button>
    </>
  );
};

export default CloneButton;
