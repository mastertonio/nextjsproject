import { useContext, useEffect, useState } from "react";
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
import { showNotification, updateNotification } from "@mantine/notifications";
import { IconCheck } from "@tabler/icons";
import { useQuery } from "react-query";
import UserContext from "@app/context/user.context";

const CreateNewRoi: React.FC = () => {
  const [opened, setOpened] = useState(false);
  const [checked, setChecked] = useState(true);
  const [value] = useLocalStorage({ key: "auth-token" });
  const [current] = useLocalStorage({ key: "current-user" });
  const [templateCreated, setTemplateCreated] = useLocalStorage({
    key: "cr-temp",
  });
  const router = useRouter();
  const p = router.query;
  const userCtx = useContext(UserContext)

  const getTemplateButtonList = async () => {
    try {
      const res = await axios.get(
        `http://54.159.8.194/v1/dashboard/template/list`,
        {
          headers: {
            Authorization: `Bearer ${userCtx.token}`,
          },
        }
      );
      return res.data;
    } catch (error) {
      return error;
    }
  };

  const { isLoading, status, data, isFetching } = useQuery(
    "template_List",
    getTemplateButtonList
  );

  const [mapp, setMapp] = useState<Array<object>>([])

  const actionList = data?.map((a: { name: string; build: any }) => {return a?.build?.map((b: { _id: string; name: string; group: string }) => ({
    key: b._id,
    value: b._id,
    label: b.name,
    group: a.name
  }))
}).flat();

  const form = useForm({
    initialValues: {
      name: "",
      template: "",
    },
  });

  const handleSubmit = async (values: typeof form.values) => {
    try {
      showNotification({
        id: "create-row",
        loading: true,
        title: `Creating ${values.name}`,
        message: "Please wait ...",
        autoClose: false,
        disallowClose: true,
      });
      const res = await axios.post(
        `http://54.159.8.194/v1/dashboard/${current}`,
        { name: values.name, template_id: values.template },
        { headers: { Authorization: `Bearer ${value}` } }
      );
      if (res && checked) {
        updateNotification({
          id: "create-row",
          color: "teal",
          title: `${values.name} created`,
          message: "Redirecting shortly ...",
          icon: <IconCheck size={16} />,
          autoClose: 2500,
        });

        router.push(`/templates`);
      }
      updateNotification({
        id: "create-row",
        color: "teal",
        title: `${values.name} created`,
        message: "Redirecting shortly ...",
        icon: <IconCheck size={16} />,
        autoClose: 2500,
      });
    } catch (error) {
      updateNotification({
        id: "create-row",
        color: "red",
        title: "Creating an ROI failed",
        message: "Something went wrong, Please try again",
        autoClose: false,
      });
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
              data={
                actionList?.length > 0
                  ? actionList
                  : [
                      {
                        value: "",
                        label: "No Template Detected",
                        disabled: true,
                      },
                    ]
              }
              {...form.getInputProps("template")}
            />
          </Grid>
          <Grid
            justify="flex-end"
            style={{ marginRight: 20, marginBottom: 140 }}
          >
            <Checkbox
              checked={checked}
              onChange={(event) => setChecked(event.currentTarget.checked)}
              label="Open the Created ROI"
            />
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
              color="red"
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
          radius="sm"
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
