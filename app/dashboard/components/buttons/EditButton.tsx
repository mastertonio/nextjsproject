import { useState } from "react";
import { Modal, Button, Text, TextInput, Grid } from "@mantine/core";
import { useForm } from "@mantine/form";
import { AiOutlineEdit } from "react-icons/ai";
import axios from "axios";
import { useLocalStorage } from "@mantine/hooks";
import { useRouter } from "next/router";
import { showNotification, updateNotification } from "@mantine/notifications";
import { IconCheck } from "@tabler/icons";
import { useMutation, useQueryClient } from "react-query";
import { useUserStore } from "@app/store/userState";

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
  const userZ = useUserStore((state) => (state.user))
  const queryClient = useQueryClient()

  const form = useForm({
    initialValues: {
      title: "",
    },
  });

  type iEditTempProp = {
    title: string
  }

  const editRoi = useMutation({
    mutationFn: (roi: iEditTempProp) => axios.patch(`/v1/dashboard/roi/${id}/${userZ?.id}`, roi).then((response) => response.data),
    onMutate: (roi: iEditTempProp) => {
      showNotification({
        id: "edit-row",
        loading: true,
        title: `Editing ${roi.title}`,
        message: "Please wait ...",
        autoClose: false,
        disallowClose: true,
      });
    },
    onSuccess: (newRoi) => {
      queryClient.invalidateQueries({ queryKey: ['get_all_roi'] }),

        updateNotification({
          id: "edit-row",
          color: "teal",
          title: `${newRoi.title} edited successfully`,
          message: "",
          icon: <IconCheck size={16} />,
          autoClose: 3000,
        });
    },
    onError: (error) => {
      if (error instanceof Error) {
        updateNotification({
          id: "edit-row",
          color: "red",
          title: `Update failed`,
          message: error.message,
          autoClose: false,
        });
      }

      updateNotification({
        id: "edit-row",
        color: "red",
        title: `Update failed`,
        message: "Something went wrong, Please try again",
        autoClose: false,
      });
    }
  })


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
        <form onSubmit={form.onSubmit((values) => editRoi.mutate({ title: values.title }))}>
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
              type="button"
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
        type="button"
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
