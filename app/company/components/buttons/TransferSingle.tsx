import { useEffect, useState } from "react";
import {
  Modal,
  Button,
  Text,
  TextInput,
  Grid,
  Stack,
  Select,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { AiOutlineSwap } from "react-icons/ai";
import axios from "axios";
import { useLocalStorage } from "@mantine/hooks";
import { useRouter } from "next/router";
import { showNotification, updateNotification } from "@mantine/notifications";
import { IconCheck } from "@tabler/icons";
import { ICompanyProps } from "@app/dashboard/components/table/utils/tableMethods";
import { useQuery } from "react-query";
import { useUserStore } from "@app/store/userState";
import { UserDataProp } from "@app/context/user.context";

export interface ITransferSingleButton {
  id: string;
  refetch: () => void;
  name: string;
  tempId: string
  user: UserDataProp
}

const TransferSingleButton: React.FC<ITransferSingleButton> = ({ id, refetch, name, tempId, user }) => {
  const [opened, setOpened] = useState(false);
  const router = useRouter();
  const [value] = useLocalStorage({ key: "auth-token" });
  const [current, setCurrent] = useLocalStorage({ key: "current-user" });
  const [company, setCompany] = useLocalStorage({ key: "my-company" });
  const p = router.query;
  const [state, setState] = useState<string | null>(null);
  const userZ = useUserStore((state) => (state.user))

  const getManagers = async () => {
    return await axios.get(
      `/v1/company/${user.user.company_id}/user`, {
      headers: {
        Authorization: `Bearer ${user.tokens.access.token}`,
      },
    }
    );
  };

  const { isLoading, isError, error, data, isFetching, refetch: singleRefetch } = useQuery(
    "getTransManagers",
    getManagers
  );

  const transferlist = data?.data.map((item: { _id: string; email: string; }) => ({ key: item._id, value: item._id, label: item.email }))



  const form = useForm({
    initialValues: {
      new_source: "",
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

        color: "teal",
      });
      const response = await axios.post(
        `/v1/company/${user.user.company_id}/roi/transfer`,
        {
          roi_source_uid: id,
          roi_new_uid: values.new_source,
          template_id: tempId
        }, {
        headers: {
          Authorization: `Bearer ${user.tokens.access.token}`,
        },
      }
      );
      if (response) {
        refetch();
        singleRefetch();
        updateNotification({
          id: "edit-comp",
          color: "teal",
          title: `Transfer success!`,
          message: "Transfer succeeded! ",
          icon: <IconCheck size={16} />,
          autoClose: 2500,
        });
      }
      setOpened(false)
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
          className="p-[30px] text-[30px] bg-[#073e52] text-white"
          align="center"
        >
          Transfer all of the user&apos;s ROIs to another user
        </Text>

        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Stack
            justify="flex-start"
            sx={(theme) => ({
              backgroundColor:
                theme.colorScheme === "dark"
                  ? theme.colors.dark[8]
                  : theme.colors.gray[0],
              height: 150,
            })}
          >
            <Grid
              className="ml-[30px] mr-[30px] mt-[30px] mb-[15px]"
            >
              <Text>Email Address: </Text>
              <Select
                placeholder="Please Choose"
                className="w-[550px] ml-auto"
                defaultValue={state}
                data={transferlist?.length > 0 ? transferlist : []}
                {...form.getInputProps("new_source")}
              />
            </Grid>
          </Stack>
          <Grid justify="flex-end" className="m-[20px]">
            <Button
              type="submit"
              radius="sm"
              size="sm"
              color="teal"
              className="mr-[10px]"
            // onClick={() => setOpened(false)}
            >
              Transfer Templates
            </Button>
            <Button
              type="button"
              radius="sm"
              size="sm"
              onClick={() => setOpened(false)}
              className="bg-white text-black border-[gray]"
            >
              Close
            </Button>
          </Grid>
        </form>
      </Modal>

      <Button
        type="button"
        leftIcon={<AiOutlineSwap />}
        radius="sm"
        size="xs"
        onClick={() => setOpened(true)}
        color="teal"
        style={{ marginLeft: 1 }}
      >
        Transfer
      </Button>
    </>
  );
};

export default TransferSingleButton;
