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

export interface IButtonAddCompanyProps {
  refetch: () => void;
}

const AddCompanyUserButton: React.FC<IButtonAddCompanyProps> = ({
  refetch,
}) => {
  const [opened, setOpened] = useState(false);
  const [value] = useLocalStorage({ key: "auth-token" });
  const [current, setCurrent] = useLocalStorage({ key: "current-user" });
  const [company, setCompany] = useLocalStorage({ key: "my-company" });
  const router = useRouter();
  const p = router.query;
  const [file, setFile] = useState<File | null>(null);
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [endDate, setEndDate] = useState<Date | null>(new Date());
  const [state, setState] = useState();
  const [currency, setCurrency] = useState<string | null>(null);

  const getManagers = async () => {
    try {
      const res = await axios.get(
        `http://54.159.8.194/v1/company/${company}/manager`,
        {
          headers: {
            Authorization: `Bearer ${value}`,
          },
        }
      );
      return res.data;
    } catch (error) {
      return error;
    }
  };

  const getTemplates = async () => {
    try {
      const res = await axios.get(
        `http://54.159.8.194/v1/dashboard/template/list`,
        {
          headers: {
            Authorization: `Bearer ${value}`,
          },
        }
      );
      return res.data;
    } catch (error) {
      return error;
    }
  };

  const { isLoading, isError, error, data, isFetching } = useQuery(
    "get_add_Managers",
    getManagers
  );

  const templates = useQuery(["templates"], getTemplates);

  const templateList = templates?.data
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


  const templateList2 = templates?.data
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

  const transferlist = data?.map((item: { id: string; email: string }) => ({
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
    console.log(file, startDate, endDate);
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
        `http://54.159.8.194/v1/company/${company}/user`,
        {
          first_name: values.first_name,
          last_name: values.last_name,
          email: values.email,
          password: values.password,
          currency: values.currency,
          manager: values.manager,
          role: values.role,
          template: filter,
        },
        {
          headers: {
            Authorization: `Bearer ${value}`,
          },
        }
      );
      if (response) {
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
          style={{
            padding: 30,
            fontSize: 30,
            backgroundColor: "#073e52",
            color: "white",
          }}
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
              style={{
                marginLeft: 30,
                marginRight: 30,
                marginTop: 30,
                marginBottom: 15,
              }}
            >
              <Text>Email: </Text>
              <TextInput
                required
                style={{ width: 550, marginLeft: "auto" }}
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
                style={{ width: 550, marginLeft: "auto" }}
                placeholder="Enter User Password"
                {...form.getInputProps("password")}
              />
            </Grid>
            <Grid
              style={{
                marginLeft: 30,
                marginRight: 30,
                marginBottom: 15,
              }}
            >
              <Text>First Name: </Text>
              <TextInput
                required
                style={{ width: 550, marginLeft: "auto" }}
                placeholder="Enter User First Name"
                {...form.getInputProps("first_name")}
              />
            </Grid>
            <Grid
              style={{
                marginLeft: 30,
                marginRight: 30,
                marginBottom: 15,
              }}
            >
              <Text>Last Name: </Text>
              <TextInput
                required
                style={{ width: 550, marginLeft: "auto" }}
                placeholder="Enter User Last Name"
                {...form.getInputProps("last_name")}
              />
            </Grid>
            <Grid
              style={{
                marginLeft: 30,
                marginRight: 30,
                marginBottom: 15,
              }}
            >
              <Text>Currency: </Text>
              <Select
                value={currency}
                onChange={setCurrency}
                data={curData}
                placeholder="Choose Currency"
                {...form.getInputProps("currency")}
                style={{ width: 550, marginLeft: "auto" }}
              />
            </Grid>
            <Grid
              style={{
                marginLeft: 30,
                marginRight: 30,
                marginBottom: 15,
              }}
            >
              <Text>Role: </Text>
              <Select
                data={[{label: 'Company Manager', value: '3'}, { label: 'Company Agent', value: '4'}]}
                placeholder="Choose Role"
                {...form.getInputProps("role")}
                style={{ width: 550, marginLeft: "auto" }}
              />
              {/* <TextInput
                required
                style={{ width: 550, marginLeft: "auto" }}
                placeholder="Choose Role"
                {...form.getInputProps("role")}
              /> */}
            </Grid>
            <Grid
              style={{
                marginLeft: 30,
                marginRight: 30,
                marginBottom: 15,
              }}
            >
              <Text>Select Manager: </Text>
              <Select
                placeholder="New Title Name"
                style={{ width: 550, marginLeft: "auto" }}
                value={state}
                onChange={setState}
                data={transferlist?.length > 0 ? transferlist : []}
                {...form.getInputProps("manager")}
              />
            </Grid>

            <Grid style={{ marginLeft: 30, marginRight: 30, marginTop: 10 }}>
              <Text>Templates: </Text>
              <MultiSelect
                style={{ width: 550, marginLeft: "auto" }}
                placeholder="Choose Templates"
                searchable
                // clearable
                data={templateList ?? []}
                defaultValue={templateList?.map((a: { value: string; })=> a.value)}
                // value={filter}
                styles={{ input: { overflow: 'auto', maxHeight: 120}}}
                onChange={setFilter}
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
              Save User
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
        leftIcon={<AiFillPlusCircle />}
        radius="sm"
        size="sm"
        onClick={() => setOpened(true)}
        color="teal"
        style={{ width: 300 }}
      >
        Add User
      </Button>
    </>
  );
};

export default AddCompanyUserButton;
