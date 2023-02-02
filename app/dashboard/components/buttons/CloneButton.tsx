import { useState } from "react";
import { Button, Modal, TextInput, Text, Grid } from "@mantine/core";
import { FaRegClone } from "react-icons/fa";
import axios from "axios";
import { useRouter } from "next/router";
import { IButtonRoiNameProps } from "./EditButton";
import { useForm } from "@mantine/form";
import { showNotification, updateNotification } from "@mantine/notifications";
import { IconCheck } from "@tabler/icons";
import { useMutation, useQueryClient } from "react-query";
import { useUserStore } from "@app/store/userState";

const CloneButton: React.FC<IButtonRoiNameProps> = ({ id, name, refetch }) => {
  const [opened, setOpened] = useState(false);
  const router = useRouter();
  const p = router.query;
  const userZ = useUserStore((state) => (state.user))
  const queryClient = useQueryClient()

  const form = useForm({
    initialValues: {
      title: "",
    },
  });

  type iCloneProp = {
    title: string
  }

  const cloneRoi = useMutation({
    mutationFn: (roi: iCloneProp) => axios.post(`/v1/dashboard/roi/${id}/${userZ?.id}`, roi).then((response) => response.data),
    onMutate: (roi: iCloneProp) => {
      showNotification({
        id: "clone-row",
        loading: true,
        title: `Cloning ${roi.title}`,
        message: "Please wait ...",
        autoClose: false,
        disallowClose: true,
      });
    },
    onSuccess: (newRoi) => {
      Promise.all(
        [
          queryClient.invalidateQueries({ queryKey: ['get_all_roi'] }),
          queryClient.invalidateQueries({ queryKey: ['graphData'] }),
          queryClient.invalidateQueries({ queryKey: ['ranking_list'] })
        ]
      )
      updateNotification({
        id: "clone-row",
        color: "teal",
        title: `Clone successful`,
        message: "Redirecting shortly ...",
        icon: <IconCheck size={16} />,
        autoClose: 3000,
      });
      router.push(`/templates/${newRoi.id}`);
    },
    onError: (error) => {
      if (error instanceof Error) {
        updateNotification({
          id: "clone-row",
          color: "red",
          title: `Template cloning failed`,
          message: error.message,
          autoClose: false,
        });
      }

      updateNotification({
        id: "clone-row",
        color: "red",
        title: `Template cloning failed`,
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
        size="50%"
        padding={0}
      >
        <Text
          weight={300}
          color="gray"
          style={{
            paddingTop: 30,
            paddingLeft: 30,
            paddingRight: 30,
            fontSize: 30,
            backgroundColor: "#073e52",
            color: "white",
          }}
        >
          Create a clone of {name}
        </Text>
        <Text
          weight={300}
          color="gray"
          style={{
            paddingLeft: 30,
            paddingRight: 30,
            paddingBottom: 30,
            marginBottom: 80,
            fontSize: 20,
            backgroundColor: "#073e52",
            color: "white",
          }}
        >
          Cloning this calculator will create an identical copy using the last
          saved set of values.
        </Text>
        <form onSubmit={form.onSubmit((values) => cloneRoi.mutate({ title: values.title }))}>
          <Grid style={{ margin: 30, marginBottom: 80 }}>
            <Text>Name </Text>
            <TextInput
              required
              style={{ width: 450, marginLeft: "auto" }}
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
        leftIcon={<FaRegClone />}
        radius="sm"
        color="teal"
        size="xs"
        onClick={() => setOpened(true)}
        style={{ marginRight: 1 }}
      >
        Clone
      </Button>
    </>
  );
};

export default CloneButton;
