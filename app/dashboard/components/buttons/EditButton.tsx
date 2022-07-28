import { useState } from "react";
import { Modal, Button, Text, TextInput, Grid } from "@mantine/core";
import { useForm } from "@mantine/form";
import { AiOutlineEdit } from "react-icons/ai";
import axios from "axios";
import { useLocalStorage } from "@mantine/hooks";
import { useRouter } from "next/router";
import { showNotification, updateNotification } from "@mantine/notifications";
import { IconCheck } from "@tabler/icons";

export interface IButtonRoiNameProps {
  id: string;
  refetch: () => void;
  name: string;
}

const EditButton: React.FC<IButtonRoiNameProps> = ({ id, refetch, name }) => {
  const [opened, setOpened] = useState(false);
  const [value] = useLocalStorage({ key: "auth-token" });
  const router = useRouter();
  const p = router.query;

  const form = useForm({
    initialValues: {
      title: "",
    },
  });

  const handleSubmit = async (values: typeof form.values) => {
    try {
      showNotification({
        id: "edit-row",
        loading: true,
        title: `Updating ${name}`,
        message: "Please wait, updating edited row",
        autoClose: false,
        disallowClose: true,
        color: "teal",
      });
      const response = await axios.patch(
        `http://54.159.8.194/v1/dashboard/roi/${id}/${p.id}`,
        { title: values.title },
        { headers: { Authorization: `Bearer ${value}` } }
      );
      if (response) {
        refetch();
        updateNotification({
          id: "edit-row",
          color: "teal",
          title: `${name} row was updated to ${values.title}`,
          message: "A row was updated! and renamed",
          icon: <IconCheck size={16} />,
          autoClose: 2500,
        });
      }
    } catch (error) {
      updateNotification({
        id: "edit-row",
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
        size="lg"
        padding={0}
      >
        <Text
          weight={700}
          color="gray"
          style={{
            padding: 30,
            marginBottom: 80,
            fontSize: 30,
            backgroundColor: "#073e52",
            color: "white",
          }}
          align="center"
        >
          {name}
        </Text>
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Grid style={{ margin: 30, marginBottom: 80 }}>
            <Text>Change ROI Name to: </Text>
            <TextInput
              required
              style={{ width: 250, marginLeft: "auto" }}
              placeholder="New Title Name"
              {...form.getInputProps("title")}
            />
          </Grid>

          <Grid justify="flex-end" style={{ margin: 20 }}>
            <Button
              type="submit"
              radius="sm"
              size="sm"
              color="teal"
              style={{ marginRight: 10 }}
              onClick={() => setOpened(false)}
            >
              Change ROI Name
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
        onClick={() => setOpened(true)}
        style={{
          marginRight: 1,
          backgroundColor: "white",
          color: "black",
          borderColor: "gray",
        }}
      >
        Edit
      </Button>
    </>
  );
};

export default EditButton;
