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

export interface ITransferButton {
  id: string;
  refetch: () => void;
  name: string;
}

const TransferButton: React.FC<ITransferButton> = ({ id, refetch, name }) => {
  const [opened, setOpened] = useState(false);
  const router = useRouter();
  const p = router.query;
  const [state, setState] = useState<string | null>(null);
  const userZ = useUserStore((state) => (state.user))

  const getManagers = async () => {
    return await axios.get(
        `/v1/company/${userZ?.company_id}/user`
      );
  };

  const { isLoading, isError, error, data, isFetching } = useQuery(
    "getTransManagers",
    getManagers
  );
 
  const transferlist = data?.data.map((item: { _id: string; email: string; })=> ({key: item._id, value: item._id, label: item.email}))



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
        disallowClose: true,
        color: "teal",
      });
      const response = await axios.post(
        `/v1/company/${userZ?.company_id}/roi/transfer/all`,
        {
          roi_source_uid: id,
          roi_new_uid: values.new_source,
        }
      );
      if (response) {
        refetch();
        updateNotification({
          id: "edit-comp",
          color: "teal",
          title: `Transfer All Succeeded!`,
          message: "The transfer was successful! ",
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
              style={{
                marginLeft: 30,
                marginRight: 30,
                marginTop: 30,
                marginBottom: 15,
              }}
            >
              <Text>Email: </Text>
              <Select
                placeholder="New Title Name"
                style={{ width: 550, marginLeft: "auto" }}
                defaultValue={state}
                data={transferlist?.length > 0 ? transferlist : []}
                {...form.getInputProps("new_source")}
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
              Transfer Templates
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

export default TransferButton;
