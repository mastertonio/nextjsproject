import { useState } from "react";
import {
  Modal,
  Button,
  Group,
  TextInput,
  Text,
  Select,
  Grid,
  Checkbox,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { AiOutlineDown } from "react-icons/ai";
import { IAdminListProps } from "@core/components/navbar/components/AdminList";
import axios from "axios";
import { useLocalStorage } from "@mantine/hooks";
import { useRouter } from "next/router";
import { FaPlusSquare } from "react-icons/fa";

const CreateNewRoi: React.FC<IAdminListProps> = ({ actions, refetch }) => {
  const [opened, setOpened] = useState(false);
  const [checked, setChecked] = useState(true);
  const [value] = useLocalStorage({ key: "auth-token" });
  const [current] = useLocalStorage({ key: "current-user" });
  const [templateCreated, setTemplateCreated] = useLocalStorage({
    key: "cr-temp",
  });
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
      const res = await axios.post(
        `http://54.159.8.194/v1/dashboard/${current}`,
        { name: values.name, template_id: values.template },
        { headers: { Authorization: `Bearer ${value}` } }
      );
      refetch()
      if (res && checked) {
        console.log(res.data.id);
        router.push(`/templates/${res.data.id}`);
      }
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
        withCloseButton={false}
        size="50%"
      >
        <form onSubmit={form.onSubmit(handleSubmit)} style={{ margin: 30 }}>
          <Text
            weight={700}
            color="gray"
            style={{ marginLeft: 20, marginBottom: 40, fontSize: 30 }}
          >
            Create A New ROI Calculation
          </Text>

          <Grid style={{ margin: 20 }}>
            <Text>Name</Text>
            <TextInput
              required
              style={{ width: 550, marginLeft: "auto" }}
              placeholder="Enter Name"
              {...form.getInputProps("name")}
            />
          </Grid>

          <Grid style={{ margin: 20, marginBottom: 20 }}>
            <Text>Choose a Template</Text>
            <Select
              style={{ width: 550, marginLeft: "auto" }}
              rightSection={<AiOutlineDown />}
              placeholder="Template"
              searchable
              clearable
              data={actionList ? actionList : ["No template Detected"]}
              {...form.getInputProps("template")}
            />
          </Grid>
          <Grid justify="flex-end" style={{ marginRight: 20, marginBottom: 140}}>
            <Checkbox checked={checked} onChange={(event) => setChecked(event.currentTarget.checked)} label="Open the Created ROI" />
          </Grid>
          <Grid justify="flex-end">
            <Button
              type="submit"
              radius="sm"
              size="md"
              style={{ marginRight: 10 }}
              onClick={() => setOpened(false)}
            >
              Create ROI
            </Button>
            <Button
              radius="sm"
              size="md"
              onClick={() => setOpened(false)}
              color="#FFFFFF"
            >
              Close
            </Button>
          </Grid>
        </form>
      </Modal>

      <Group position="center">
        <Button
          fullWidth
          leftIcon={<FaPlusSquare />}
          radius="md"
          size="xl"
          style={{ height: 100, marginRight: 0, fontSize: 25 }}
          uppercase
          onClick={() => setOpened(true)}
        >
          Create a New ROI
        </Button>
      </Group>
    </>
  );
};

export default CreateNewRoi;
