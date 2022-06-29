import { useState } from "react";
import { Modal, Button, Group, TextInput, Text, Select } from "@mantine/core";
import { useForm } from "@mantine/form";
import { AiOutlineDown } from "react-icons/ai";

const CreateNewRoi: React.FC<any> = ({ my_roi }) => {
  const [opened, setOpened] = useState(false);

  const form = useForm({
    initialValues: {
      name: "",
      template: [],
    },
  });

  return (
    <>
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title="Fill up form here"
      >
        <TextInput
          required
          label="Name"
          placeholder="Enter Name"
          {...form.getInputProps("name")}
        />

        <Text>Choose a Template</Text>
        <Select
          style={{ width: 150 }}
          rightSection={<AiOutlineDown />}
          placeholder="Template"
          data={
            my_roi
              ? my_roi
              : { value: "No Templates", label: "No Templates Detected" }
          }
        />
      </Modal>

      <Group position="center">
        <Button radius="xs" size="xl" uppercase onClick={() => setOpened(true)}>
          Create New ROI
        </Button>
      </Group>
    </>
  );
};

export default CreateNewRoi;
