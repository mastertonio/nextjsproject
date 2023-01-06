import { useEffect, useState } from "react";
import {
  Modal,
  Button,
  Text,
  TextInput,
  Grid,
  Stack,
  Select,
  PasswordInput,
  Textarea,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { AiOutlineEdit } from "react-icons/ai";
import axios from "axios";
import { useInputState, useLocalStorage } from "@mantine/hooks";
import { useRouter } from "next/router";
import { showNotification, updateNotification } from "@mantine/notifications";
import { IconCheck } from "@tabler/icons";
import {
  ICompanyProps,
  ICompanyTemplatesProps,
} from "@app/dashboard/components/table/utils/tableMethods";
import { useQuery } from "react-query";

export interface IButtonTemplateProps {
  id: string;
  refetch: () => void;
  name: string;
  notes: string;
  status: string;
}

const EditTemplateButton: React.FC<IButtonTemplateProps> = ({
  id,
  refetch,
  name,
  notes,
  status,
}) => {
  const [opened, setOpened] = useState(false);
  const router = useRouter();
  const [value] = useLocalStorage({ key: "auth-token" });
  const [current, setCurrent] = useLocalStorage({ key: "current-user" });
  const [company, setCompany] = useLocalStorage({ key: "my-company" });
  const p = router.query;
  const [state, setState] = useState<string | null>(null);
  const [password, setPass] = useInputState("");

  const form = useForm({
    initialValues: {
      name,
      notes,
      status: status.toString(),
    },
  });

  const handleSubmit = async (values: typeof form.values) => {
    try {
      showNotification({
        id: "edit-comp",
        loading: true,
        title: `Updating ...`,
        message: "Please wait, updating edited row",
        autoClose: false,
        disallowClose: true,
        color: "teal",
      });

      const response = await axios.patch(
        `/v1/company/${company}/template/${id}`,
        {
          name: values.name,
          notes: values.notes,
          status: parseInt(values.status),
        }
      );

      if (response) {
        refetch();
        updateNotification({
          id: "edit-comp",
          color: "teal",
          title: `Template updated!`,
          message: "A row was edited! ",
          icon: <IconCheck size={16} />,
          autoClose: 2500,
        });
      }
    } catch (error) {
      updateNotification({
        id: "edit-comp",
        color: "red",
        title: "Updating a table row failed",
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
        size="xl"
        padding={0}
      >
        <Text
          weight={700}
          color="gray"
          style={{
            padding: 30,
            fontSize: 30,
            backgroundColor: "#073e52",
            color: "white",
          }}
          align="center"
        >
          {name}
        </Text>

        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Stack
            justify="flex-start"
            sx={(theme) => ({
              backgroundColor:
                theme.colorScheme === "dark"
                  ? theme.colors.dark[8]
                  : theme.colors.gray[0],
              height: 350,
            })}
          >
            <Grid style={{ marginLeft: 30, marginRight: 30, marginTop: 40 }}>
              <Text>Name : </Text>
              <TextInput
                required
                style={{ width: 550, marginLeft: "auto" }}
                // defaultValue={myCompany.licenses}
                placeholder="Enter New Name"
                {...form.getInputProps("name")}
              />
            </Grid>
            <Grid style={{ marginLeft: 30, marginRight: 30, marginTop: 40 }}>
              <Text>Notes : </Text>
              <Textarea
                required
                style={{ width: 550, marginLeft: "auto" }}
                // defaultValue={myCompany.licenses}
                placeholder="Template Notes"
                {...form.getInputProps("notes")}
              />
            </Grid>
            <Grid style={{ marginLeft: 30, marginRight: 30, marginTop: 40 }}>
              <Text>Status : </Text>
              <Select
                data={[
                  { label: "Active", value: "1" },
                  { label: "Inactive", value: "0" },
                ]}
                placeholder="Set Status"
                {...form.getInputProps("status")}
                style={{ width: 550, marginLeft: "auto" }}
              />
            </Grid>
          </Stack>
          <Grid justify="flex-end" style={{ margin: 20 }}>
            <Button
              type="submit"
              radius="sm"
              size="sm"
              color="teal"
              style={{ marginRight: 10 }}
              onClick={() => setOpened(false)}
            >
              Edit Template
            </Button>
            <Button
              radius="sm"
              size="sm"
              onClick={() => setOpened(false)}
              style={{
                backgroundColor: "white",
                color: "black",
                borderColor: "gray",
              }}
            >
              Close
            </Button>
          </Grid>
        </form>
      </Modal>

      <Button
        leftIcon={<AiOutlineEdit />}
        radius="sm"
        size="xs"
        onClick={() => {
          setOpened(true);
        }}
        color="yellow"
      >
        Edit
      </Button>
    </>
  );
};

export default EditTemplateButton;
