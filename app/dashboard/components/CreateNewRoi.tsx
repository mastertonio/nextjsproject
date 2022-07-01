import { useState } from "react";
import { Modal, Button, Group, TextInput, Text, Select } from "@mantine/core";
import { useForm } from "@mantine/form";
import { AiOutlineDown } from "react-icons/ai";
import { IAdminListProps } from "@core/components/navbar/components/AdminList";
import axios from "axios";
import { useLocalStorage } from "@mantine/hooks";
import { useRouter } from "next/router";

const CreateNewRoi: React.FC<IAdminListProps> = ({ actions }) => {
  const [opened, setOpened] = useState(false);
  const [value] = useLocalStorage({ key: "auth-token" });
  const [current] = useLocalStorage({ key: "current-user" })
  const router = useRouter();
  const p = router.query;

  const actionList = actions?.map((a) => ({
    key: a.id,
    value: a.id,
    label: a.name,
  }));

  const form = useForm({
    initialValues: {
      name: "",
      template: "",
    },
  });

  const handleSubmit = async (values: typeof form.values) => {
    try {
      console.log(current)
      await axios.post(
        `http://54.159.8.194/v1/dashboard/${current}`,
        { name: values.name, template_id: values.template },
        { headers: { Authorization: `Bearer ${value}` } }
      );
      // router.push("/awdwa");
    } catch (error) {
      console.log(error);
      return error;
    }
  };

  return (
    <>
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title="Fill up form here"
      >
        <form onSubmit={form.onSubmit(handleSubmit)}>
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
            searchable
            clearable
            data={actionList ? actionList : ["No template Detected"]}
            {...form.getInputProps("template")}
          />

          <Button
            type="submit"
            radius="sm"
            size="xs"
            onClick={() => setOpened(false)}
          >
            Submit
          </Button>
        </form>
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
