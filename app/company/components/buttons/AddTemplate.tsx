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

export interface IButtonAddCompanyProps {
  refetch: () => void;
  user: UserDataProp
}

const AddTemplateButton: React.FC<IButtonAddCompanyProps> = ({ refetch, user }) => {
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
      name: "",
      notes: "",
      projection: 0,
      month: 0,
      year: 0
    },
  });

  const handleSubmit = async (values: typeof form.values) => {
    const month = values.month;
    const year = Math.floor(values.year * 12);

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
        `/v1/company/${user.user.company_id}/template`,
        {
          name: values.name,
          status: "1",
          notes: values.notes,
          projection: values.year !== 0 ? year : values.month !== 0 ? month : year
        }, {
        headers: {
          Authorization: `Bearer ${user.tokens.access.token}`,
        },
      });

      console.log('add template: template ID', response.data._id)

      const responseVersion = await axios.post(
        `/v1/company/${user.user.company_id}/template/${response.data._id}/version`,
        {
          name: values.name,
          version: 0,
          notes: values.notes,
        }, {
        headers: {
          Authorization: `Bearer ${user.tokens.access.token}`,
        },
      });

      console.log('add version: template ID', responseVersion)

      if (response && responseVersion) {
        refetch();
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

      router.push({ pathname: `/admin/builder/${response.data._id}`, query: { comp_id: user.user.company_id, temp_id: response.data._id, id: response.data._id } })
    } catch (error) {
      console.log("Add Template", error);
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
          className="p-[30px] text-[30px] bg-[#073e52] text-white"
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
              height: 'auto',
            })}
          >
            <Grid
              className="ml-[30px] mr-[30px] mt-[30px] mb-[15px]"
            >
              <Text className="text-[16px] text-slate-700 font-semibold mb-[10px] sm:mb-0">Name: </Text>
              <TextInput
                required
                className="w-[550px] ml-auto"
                placeholder="Enter Template Name"
                {...form.getInputProps("name")}
              />
            </Grid>
            <Grid
              className="ml-[30px] mr-[30px] mb-[15px]"
            >
              <Text className="text-[16px] text-slate-700 font-semibold mb-[10px] sm:mb-0">Notes: </Text>
              <Textarea
                className="w-[550px] ml-auto"
                placeholder="Enter Notes for Template"
                {...form.getInputProps("notes")}
              />
            </Grid>
            <Grid className="ml-[30px] mr-[30px] mb-[20px]">
              <Text className="text-[16px] text-slate-700 font-semibold mb-[10px] sm:mb-0">Projection</Text>
              <div className="w-full sm:w-[450px] ml-auto flex flex-col sm:flex-row items-center">
                <div className="flex flex-row items-center mr-0 sm:mr-[30px] mt-[20px] sm:mt-0">
                  <Text className="text-[14px] mr-[10px] text-slate-700 font-semibold w-[50px]">Month</Text>
                  <NumberInput defaultValue={0}  {...form.getInputProps("month")} hideControls className="w-[150px]" />
                </div>
                <div className="flex flex-row items-center mt-[20px] sm:mt-0">
                  <Text className="text-[14px] mr-[22px] sm:mr-[10px] text-slate-700 font-semibold w-[50px]">Year</Text>
                  <NumberInput defaultValue={0}  {...form.getInputProps("year")} hideControls className="w-[150px]" />
                </div>
              </div>
            </Grid>

            <Grid justify="flex-end" className="m-[20px] pt-[10px] bg-[#f8f9fa]">
              <Button
                type="submit"
                radius="sm"
                size="sm"
                color="teal"
                className="mr-[10px]"
                onClick={() => setOpened(false)}
              >
                Build Template
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
          </Stack>


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
        Add Template
      </Button>
    </>
  );
};

export default AddTemplateButton;
