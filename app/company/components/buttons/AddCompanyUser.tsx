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
import { getSession } from "next-auth/react";
import { UserDataProp } from "@app/context/user.context";

export interface IButtonAddCompanyProps {
  refetch: () => void;
}

const AddCompanyUserButton: React.FC<Partial<UserDataProp>> = ({ tokens, user}) => {
  const [opened, setOpened] = useState(false);
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [endDate, setEndDate] = useState<Date | null>(new Date());
  const [state, setState] = useState();
  const [currency, setCurrency] = useState<string | null>(null);

  const userZ = useUserStore((state) => (state.user))

  const getManagers = async () => {
    return await axios.get(
      `/v1/company/${user?.company_id}/manager`,{
        headers: {
          Authorization: `Bearer ${tokens?.access.token}`,
        },
      }
    );
  };

  const getTemplates = async () => {
    return await axios.get(
      `/v1/dashboard/template/list`,{
        headers: {
          Authorization: `Bearer ${tokens?.access.token}`,
        },
      }
    );
  };

  const { isLoading, isError, error, data, isFetching } = useQuery(
    "get_add_Managers",
    getManagers
  );

  const templates = useQuery(["templates"], getTemplates);

  const templateList = templates?.data?.data
    ?.map((a: { name: string; build: any }) => {
      return a?.build?.map(
        (b: { _id: string; name: string; group: string }) => ({
          key: b._id,
          value: b._id,
          label: b.name,
          group: a.name,
        })
      );
    })
    .flat();


  const templateList2 = templates?.data?.data
    ?.map((a: { name: string; build: any }) => {
      return a?.build?.map(
        (b: { _id: string; name: string; group: string }) => ({
          key: b._id,
          value: b._id,
          label: b.name,
          group: a.name,
        })
      );
    })
    .flat();

  const defaultTemps = templateList?.map((a: { value: any }) => {
    return a.value;
  });

  const [filter, setFilter] = useState<string[]>([""]);

  const transferlist = data?.data.map((item: { id: string; email: string }) => ({
    key: item.id,
    value: item.id,
    label: item.email,
  }));

  const form = useForm({
    initialValues: {
      first_name: "",
      last_name: "",
      email: "",
      password: "$3rVerus1..a",
      currency: "",
      manager: "",
      role: "",
    },
  });

  const handleSubmit = async (values: typeof form.values) => {
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
        `/v1/company/${user?.company_id}/user`,
        {
          first_name: values.first_name,
          last_name: values.last_name,
          email: values.email,
          password: values.password,
          currency: values.currency,
          manager: values.manager,
          role: values.role,
          template: filter,
        });
      if (response) {
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

  const curData = [
    {
      label: "USD",
      value: "USD",
    },
    {
      label: "PHP",
      value: "PHP",
    },
    {
      label: "EUR",
      value: "EUR",
    },
    {
      label: "JPY",
      value: "JPY",
    },
    {
      label: "GBP",
      value: "GBP",
    },
    {
      label: "AUD",
      value: "AUD",
    },
    {
      label: "CAD",
      value: "CAD",
    },
    {
      label: "CHF",
      value: "CHF",
    },
    {
      label: "CNY",
      value: "CNY",
    },
  ];

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
          Add Company User
        </Text>

        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Stack
            justify="flex-start"
            sx={(theme) => ({
              backgroundColor:
                theme.colorScheme === "dark"
                  ? theme.colors.dark[8]
                  : theme.colors.gray[0],
              height: 600,
            })}
          >
            <Grid
              className="ml-[30px] mr-[30px] mt-[30px] mb-[15px]"
            >
              <Text>Email: </Text>
              <TextInput
                required
                className="w-[550px] ml-auto"
                placeholder="Enter User Email"
                {...form.getInputProps("email")}
              />
            </Grid>
            <Grid
              style={{
                marginLeft: 30,
                marginRight: 30,
                marginBottom: 15,
              }}
            >
              <Text>Password: </Text>
              <PasswordInput
                required
                className="w-[550px] ml-auto"
                placeholder="Enter User Password"
                {...form.getInputProps("password")}
              />
            </Grid>
            <Grid
              className="ml-[30px] mr-[30px] mb-[15px]"
            >
              <Text>First Name: </Text>
              <TextInput
                required
                className="w-[550px] ml-auto"
                placeholder="Enter User First Name"
                {...form.getInputProps("first_name")}
              />
            </Grid>
            <Grid
              className="ml-[30px] mr-[30px] mb-[15px]"
            >
              <Text>Last Name: </Text>
              <TextInput
                required
                className="w-[550px] ml-auto"
                placeholder="Enter User Last Name"
                {...form.getInputProps("last_name")}
              />
            </Grid>
            <Grid
              className="ml-[30px] mr-[30px] mb-[15px]"
            >
              <Text>Currency: </Text>
              <Select
                defaultValue={currency}
                data={curData}
                placeholder="Choose Currency"
                {...form.getInputProps("currency")}
                className="w-[550px] ml-auto"
              />
            </Grid>
            <Grid
              className="ml-[30px] mr-[30px] mb-[15px]"
            >
              <Text>Role: </Text>
              <Select
                data={[{ label: 'Company Manager', value: '3' }, { label: 'Company Agent', value: '4' }]}
                placeholder="Choose Role"
                {...form.getInputProps("role")}
                className="w-[550px] ml-auto"
              />
              {/* <TextInput
                required
                style={{ width: 550, marginLeft: "auto" }}
                placeholder="Choose Role"
                {...form.getInputProps("role")}
              /> */}
            </Grid>
            <Grid
              className="ml-[30px] mr-[30px] mb-[15px]"
            >
              <Text>Select Manager: </Text>
              <Select
                placeholder="New Title Name"
                className="w-[550px] ml-auto"
                defaultValue={state}
                data={transferlist?.length > 0 ? transferlist : []}
                {...form.getInputProps("manager")}
              />
            </Grid>

            <Grid className="ml-[30px] mr-[30px] mt-[10px]">
              <Text>Templates: </Text>
              <MultiSelect
                className="w-[550px] ml-auto"
                placeholder="Choose Templates"
                searchable
                // clearable
                data={templateList ?? []}
                defaultValue={templateList?.map((a: { value: string; }) => a.value)}
                // value={filter}
                styles={{ input: { overflow: 'auto', maxHeight: 120 } }}
                onChange={setFilter}
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
              Save User
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
        className="w-[300px]"
      >
        Add User
      </Button>
    </>
  );
};

export default AddCompanyUserButton;
