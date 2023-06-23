import { useState } from "react";
import { Modal, Button, Text, TextInput, Grid, Select } from "@mantine/core";
import { useForm } from "@mantine/form";
import { AiOutlineEdit } from "react-icons/ai";
import axios from "axios";
import { useLocalStorage } from "@mantine/hooks";
import { useRouter } from "next/router";
import { showNotification, updateNotification } from "@mantine/notifications";
import { IconCheck } from "@tabler/icons";
import { useMutation, useQueryClient, useQuery } from "react-query";
import { useUserStore } from "@app/store/userState";
import { UserDataProp } from "@app/context/user.context";

export interface IButtonRoiNameProps {
  id: string;
  refetch: () => void;
  name: string;
  user: UserDataProp
}

const EditButton: React.FC<IButtonRoiNameProps> = ({ id, refetch, name, user }) => {
  const [opened, setOpened] = useState(false);
  const [state, setState] = useState<string | null>(null);
  const [value] = useLocalStorage({ key: "auth-token" });
  const router = useRouter();
  const p = router.query;
  const userZ = useUserStore((state) => (state.user))
  const queryClient = useQueryClient()

  const form = useForm({
    initialValues: {
      title: "",
      transferTo: "",
    },
  });

  type iEditTempProp = {
    title: string
  }

  const getManagers = async () => {
    return await axios.get(
      `/v1/company/${user.user.company_id}/user`, {
      headers: {
        Authorization: `Bearer ${user.tokens.access.token}`,
      },
    }
    );
  };

  const { isLoading, isError, error, data, isFetching } = useQuery(
    "getTransManagers",
    getManagers
  );

  const transferlist = data?.data.map((item: { _id: string; email: string; }) => ({ key: item._id, value: item._id, label: item.email }))

  console.log('transferlist', data)

  const editRoi = useMutation({
    mutationFn: (roi: iEditTempProp) => axios.patch(`/v1/dashboard/roi/${id}/${user.user.id}`, roi, {
      headers: {
        Authorization: `Bearer ${user.tokens.access.token}`,
      },
    }).then((response) => response.data),
    onMutate: (roi: iEditTempProp) => {
      showNotification({
        id: "edit-row",
        loading: true,
        title: `Editing ${roi.title}`,
        message: "Please wait ...",
        autoClose: false,

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
          className="p-[10px] mb-[40px] text-[30px] bg-[#073e52] text-white"
          // style={{
          //   padding: 30,
          //   marginBottom: 80,
          //   fontSize: 30,
          //   backgroundColor: "#073e52",
          //   color: "white",
          // }}
          align="center"
        >
          {name}
        </Text>
        <form onSubmit={form.onSubmit((values) => editRoi.mutate({ title: values.title }))}>
          <Grid className="m-[20px]">
            <Text className="text-[14px]">Change ROI Name to: </Text>
            <TextInput
              required
              className="w-[400px] ml-auto"
              placeholder="New Title Name"
              {...form.getInputProps("title")}
            />
          </Grid>

          <Grid className="m-[20px] mb-[40px]">
            <Text className="text-[14px]">Transfer to: </Text>
            <Select
              placeholder="Select Email Address"
              className="w-[400px] ml-auto"
              defaultValue={state}
              data={transferlist?.length > 0 ? transferlist : []}
              {...form.getInputProps("transferTo")}
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
