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
import { useUserStore } from "@app/store/userState";

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
  const p = router.query;
  const userZ = useUserStore((state) => (state.user))

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
        `/v1/company/${userZ?.company_id}/template/${id}`,
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
          className="p-[30px] text-[30px] !bg-[#073e52] text-white"
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
            <Grid className="ml-[30px] mr-[30px] mt-[40px]">
              <Text>Name : </Text>
              <TextInput
                required
                className="w-[550px] ml-auto"
                // defaultValue={myCompany.licenses}
                placeholder="Enter New Name"
                {...form.getInputProps("name")}
              />
            </Grid>
            <Grid className="ml-[30px] mr-[30px] mt-[40px]">
              <Text>Notes : </Text>
              <Textarea
                required
                className="w-[550px] ml-auto"
                // defaultValue={myCompany.licenses}
                placeholder="Template Notes"
                {...form.getInputProps("notes")}
              />
            </Grid>
            <Grid className="ml-[30px] mr-[30px] mt-[40px]">
              <Text>Status : </Text>
              <Select
                data={[
                  { label: "Active", value: "1" },
                  { label: "Inactive", value: "0" },
                ]}
                placeholder="Set Status"
                {...form.getInputProps("status")}
                className="w-[550px] ml-auto"
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
              onClick={() => setOpened(false)}
            >
              Edit Template
            </Button>
            <Button
              radius="sm"
              size="sm"
              onClick={() => setOpened(false)}
              className="bg-white text-black border-gray-500"
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
        className="mr-[5px]"
        color="yellow"
      >
        Edit
      </Button>
    </>
  );
};

export default EditTemplateButton;
