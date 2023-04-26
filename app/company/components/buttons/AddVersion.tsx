import { useEffect, useState } from "react";
import {
  Modal,
  Button,
  Text,
  TextInput,
  Grid,
  Stack,
  Group,
  FileButton,
  Textarea,
  NumberInput,
  PasswordInput,
  Select,
  MultiSelect,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { AiFillPlusCircle, AiOutlineEdit } from "react-icons/ai";
import axios from "axios";
import { useLocalStorage } from "@mantine/hooks";
import { useRouter } from "next/router";
import { showNotification, updateNotification } from "@mantine/notifications";
import { IconCheck } from "@tabler/icons";
import { ICompanyProps } from "@app/dashboard/components/table/utils/tableMethods";
import { DatePicker } from "@mantine/dates";
import dayjs from "dayjs";
import { useQuery } from "react-query";
import { useUserStore } from "@app/store/userState";
import { UserDataProp } from "@app/context/user.context";

export interface IButtonAddVersion {
  update: () => void;
  temp_id: string;
  comp_id: string;
  first_temp?: string
  user: UserDataProp
}

const AddVersion: React.FC<IButtonAddVersion> = ({
  update,
  comp_id,
  first_temp,
  temp_id,
  user
}) => {
  const [opened, setOpened] = useState(false);
  const router = useRouter();
  const p = router.query;
  const [file, setFile] = useState<File | null>(null);
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [endDate, setEndDate] = useState<Date | null>(new Date());
  const [state, setState] = useState();
  const [filter, setFilter] = useState<string[]>([""]);

  const userZ = useUserStore((state) => (state.user))

  const form = useForm({
    initialValues: {
      name: '',
      stage: 0,
      notes: ''
    },
  });

  const handleSubmit = async (values: typeof form.values) => {
    console.log(values,'submitted val')
    try {
      showNotification({
        id: "edit-comp",
        loading: true,
        title: `Updating`,
        message: "Please wait, updating edited row",
        autoClose: false,
        disallowClose: true,
        color: "teal",
      });
      const response = await axios.post(
        `/v1/company/${user.user.company_id}/template/${temp_id}/version`,
        {
          name: values.name,
          version: values.stage,
          notes: values.notes,
        }, {
        headers: {
          Authorization: `Bearer ${user.tokens.access.token}`,
        },
      });
      if (response) {
        update();
        updateNotification({
          id: "edit-comp",
          color: "teal",
          title: `row was updated to `,
          message: "A row was updated! and renamed",
          icon: <IconCheck size={16} />,
          autoClose: 2500,
        });
        form.reset();
        setFile(null);
        setStartDate(null);
        setEndDate(null);
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
          Add Company Template
        </Text>

        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Stack
            justify="flex-start"
            sx={(theme) => ({
              backgroundColor:
                theme.colorScheme === "dark"
                  ? theme.colors.dark[8]
                  : theme.colors.gray[0],
              height: 300,
            })}
          >
            <Grid
              className="ml-[30px] mr-[30px] mt-[30px] mb-[15px]"
            >
              <Text>Name: </Text>
              <TextInput
                required
                className="w-[550px] ml-auto"
                placeholder="Enter Template Name"
                {...form.getInputProps("name")}
              />
            </Grid>
            <Grid
              style={{
                marginLeft: 30,
                marginRight: 30,
                marginBottom: 15,
              }}
            >
              <Text>Notes: </Text>
              <Textarea
                required
                className="w-[550px] ml-auto"
                placeholder="Enter Notes for Template"
                {...form.getInputProps("notes")}
              />
            </Grid>
            <Grid
              className="ml-[30px] mr-[30px] mb-[15px]"
            >
              <Text>Version: </Text>
              <NumberInput
                required
                className="w-[550px] ml-auto"
                min={0}
                max={10}
                placeholder="Enter Version"
                {...form.getInputProps("stage")}
              />
            </Grid>
          </Stack>

          <Grid justify="flex-end" className="m-[20px]">
            <Button
              type="submit"
              radius="sm"
              size="sm"
              color="teal"
              className="mr-[20px]"
              onClick={() => setOpened(false)}
            >
              Save Template Version
            </Button>
            <Button
              type="button"
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
        type="button"
        leftIcon={<AiFillPlusCircle />}
        radius="sm"
        size="sm"
        onClick={() => setOpened(true)}
        color="teal"
        className="w-full sm:w-[300px]"
      >
        Add Template Version
      </Button>
    </>
  );
};

export default AddVersion;
