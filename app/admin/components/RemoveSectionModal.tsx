import { useState } from "react";
import { Modal, Button, Text, TextInput, Grid } from "@mantine/core";
import { useForm } from "@mantine/form";
import { AiOutlineDelete } from "react-icons/ai";
import { useLocalStorage } from "@mantine/hooks";
import { useRouter } from "next/router";
import axios from "axios";
import { AiOutlineExclamationCircle } from "react-icons/ai";
import { showNotification, updateNotification } from "@mantine/notifications";
import { IconCheck } from "@tabler/icons";
import { useUserStore } from "@app/store/userState";
import { useMutation, useQueryClient } from "react-query";
import { MdClose } from 'react-icons/md'
import { UserDataProp } from "@app/context/user.context";

type RemoveSectionModalProps = {
  id: string,
  user: UserDataProp,
  secName: string
  adminId: string
}

const RemoveSectionModal: React.FC<RemoveSectionModalProps> = ({ id, user, secName, adminId }) => {
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

  type iDeleteTempProp = {
    title: string
  }

  const deleteRoi = useMutation({
    mutationFn: () => axios.delete(`/v1/company/admintool/${adminId}/section/${id}`,{
      headers: {
        Authorization: `Bearer ${user.tokens.access.token}`,
      },
    }).then((response) => response.data),
    onMutate: (roi) => {
      console.log(roi, "roi")
      showNotification({
        id: "delete-row",
        loading: true,
        title: `Deleting row`,
        message: "Please wait ...",
        autoClose: false,
        disallowClose: true,
      });
    },
    onSuccess: (newRoi) => {
      console.log(newRoi, "roiroi")
      Promise.all(
        [
          queryClient.invalidateQueries({ queryKey: ['get_all_roi'] }),
          queryClient.invalidateQueries({ queryKey: ['graphData'] }),
          queryClient.invalidateQueries({ queryKey: ['ranking_list'] }),
          queryClient.invalidateQueries({ queryKey: ['adminToolData'] })
        ]
      )
      updateNotification({
        id: "delete-row",
        color: "teal",
        title: `Section removed successfully`,
        message: "",
        icon: <IconCheck size={16} />,
        autoClose: 3000,
      });
    },
    onError: (error) => {
      if (error instanceof Error) {
        updateNotification({
          id: "delete-row",
          color: "red",
          title: `Deletion failed`,
          message: error.message,
          autoClose: false,
        });
      }

      updateNotification({
        id: "delete-row",
        color: "red",
        title: `Deletion failed`,
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
        <Text align="center">
          <AiOutlineExclamationCircle size={250} color="#f8bb86" />
        </Text>

        <Text
          weight={500}
          color="gray"
          style={{
            paddingTop: 30,
            paddingLeft: 30,
            paddingRight: 30,
            fontSize: 30,
            backgroundColor: "white",
            color: "gray",
          }}
          align="center"
        >
          Are you sure ?
        </Text>
        <Text
          weight={300}
          color="gray"
          style={{
            paddingLeft: 30,
            paddingRight: 30,
            paddingBottom: 30,
            marginBottom: 10,
            fontSize: 20,
            backgroundColor: "white",
            color: "gray",
          }}
          align="center"
        >
          You will not be able to recover{" "}
          <Text weight={700} style={{ display: "inline-block", fontSize: 20 }}>
            {secName}
          </Text>
          !
        </Text>
        <Grid justify="flex-end" style={{ margin: 20 }}>
          <Button
            type="submit"
            radius="sm"
            size="sm"
            color="red"
            style={{ marginRight: 10 }}
            onClick={() => {
              setOpened(false)
              deleteRoi.mutate()
            }}
          >
            Delete
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
      </Modal>
      <MdClose onClick={()=> setOpened(true)} className="text-red-600 text-[25px] cursor-pointer" />
    </>
  );
};

export default RemoveSectionModal;
