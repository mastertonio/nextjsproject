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
  NumberInput,
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
  version: string;
  comp_id: string;
  temp_id: string;
}

const EditVersion: React.FC<IButtonTemplateProps> = ({
  id,
  refetch,
  name,
  notes,
  status,
  version,
  comp_id,
  temp_id,
}) => {
  const [opened, setOpened] = useState(false);
  const router = useRouter();
  const p = router.query;
  const [state, setState] = useState<string | null>(null);
  const [password, setPass] = useInputState("");

  const form = useForm({
    initialValues: {
      name,
      notes,
      status,
      version,
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
        `/v1/company/${comp_id}/template/${temp_id}/version/${id}`,
        {
          name: values.name,
          notes: values.notes,
          status: values.status == "active" ? 1 : 0,
          version: parseInt(values.version),
        }
      );

      if (response) {
        refetch();
        updateNotification({
          id: "edit-comp",
          color: "teal",
          title: `Template Version updated!`,
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
          className="p-[30px] text-[30px] bg-[#073e52] text-white"
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
              height: 450,
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
                  { label: "Active", value: "active" },
                  { label: "Inactive", value: "inactive" },
                ]}
                placeholder="Set Status"
                {...form.getInputProps("status")}
                className="w-[550px] ml-auto"
              />
            </Grid>
            <Grid className="ml-[30px] mr-[30px] mt-[40px]">
              <Text>Versions : </Text>
              <NumberInput
                required
                className="w-[550px] ml-auto"
                // defaultValue={myCompany.licenses}
                min={0}
                max={10}
                placeholder="Set Status"
                {...form.getInputProps("version")}
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
              className="bg-white text-black border-[gray]"
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

export default EditVersion;
