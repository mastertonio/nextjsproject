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
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { AiOutlineEdit } from "react-icons/ai";
import axios from "axios";
import { useInputState, useLocalStorage } from "@mantine/hooks";
import { useRouter } from "next/router";
import { showNotification, updateNotification } from "@mantine/notifications";
import { IconCheck } from "@tabler/icons";
import { ICompanyProps } from "@app/dashboard/components/table/utils/tableMethods";
import { useQuery } from "react-query";

type IManagerTypes = {
  _id: string;
  first_name: string;
  last_name: string;
  email: string;
};

type ICompanyUserTypes = {
  first_name: string;
  last_name: string;
  email: string;
  password?: string;
  currency: string;
  manager_email: string;
  manager_id: string;
  role: string;
  template?: string[];
};

export interface IButtonCompanyUserProps {
  id: string;
  refetch: () => void;
  name: string;
  myCompany: ICompanyUserTypes;
}

const EditCompanyUserButton: React.FC<IButtonCompanyUserProps> = ({
  id,
  refetch,
  name,
  myCompany,
}) => {
  const [opened, setOpened] = useState(false);
  const router = useRouter();
  const [value] = useLocalStorage({ key: "auth-token" });
  const [current, setCurrent] = useLocalStorage({ key: "current-user" });
  const [company, setCompany] = useLocalStorage({ key: "my-company" });
  const p = router.query;
  const [state, setState] = useState<string | null>(null);
  const [password, setPass] = useInputState("");

  const getManagers = async () => {
    try {
      const res = await axios.get(
        `/v1/company/${company}/manager`);
      return res.data;
    } catch (error) {
      return error;
    }
  };

  const { isLoading, isError, error, data, isFetching } = useQuery(
    "getManagers",
    getManagers
  );

  const transferlist = data?.map((item: { id: string; email: string }) => ({
    key: item.id,
    value: item.id,
    label: item.email,
  }));


  const form = useForm({
    initialValues: {
      first_name: myCompany.first_name,
      last_name: myCompany.last_name,
      email: myCompany.email,
      password: "",
      currency: myCompany.currency,
      manager: myCompany.manager_id,
      role: myCompany.role,
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
        `/v1/company/${company}/user/${id}`,
        {
          first_name: values.first_name,
          last_name: values.last_name,
          email: values.email,
          password: !!values.password ? values.password : "$3rVerus1..a",
          currency: values.currency,
          manager: values.manager,
          role: values.role,
        }
      );

      if (response) {
        refetch();
        updateNotification({
          id: "edit-comp",
          color: "teal",
          title: `User updated!`,
          message: "A user was edited! ",
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
            <Grid
              style={{
                marginLeft: 30,
                marginRight: 30,
                marginTop: 30,
                marginBottom: 15,
              }}
            >
              <div>
                <Text>Email: </Text>
                <TextInput
                  required
                  style={{ width: 350, marginLeft: "auto" }}
                  // defaultValue={myCompany.name}
                  placeholder="Enter Email Address"
                  {...form.getInputProps("email")}
                />
              </div>
              <div style={{ marginLeft: "auto" }}>
                <Text>Password: </Text>
                <PasswordInput
                  style={{ width: 350, marginLeft: "auto" }}
                  value={password}
                  onChange={setPass}
                  placeholder="Enter User Password"
                  {...form.getInputProps("password")}
                />
              </div>
            </Grid>
            <Grid style={{ marginLeft: 30, marginRight: 30 }}>
              <div>
                <Text>First Name: </Text>
                <TextInput
                  required
                  style={{ width: 350, marginLeft: "auto" }}
                  // defaultValue={myCompany.licenses}
                  placeholder="User First Name"
                  {...form.getInputProps("first_name")}
                />
              </div>
              <div style={{ marginLeft: "auto" }}>
                <Text>Last Name: </Text>
                <TextInput
                  required
                  style={{ width: 350, marginLeft: "auto" }}
                  // defaultValue={myCompany.licenses}
                  placeholder="User Last Name"
                  {...form.getInputProps("last_name")}
                />
              </div>
            </Grid>
            <Grid style={{ marginLeft: 30, marginRight: 30, marginTop: 40 }}>
              <div>
                <Text>Currency : </Text>
                <Select
                data={curData}
                placeholder="Choose Currency"
                {...form.getInputProps("currency")}
                style={{ width: 550, marginLeft: "auto" }}
              />
                {/* <TextInput
                  required
                  style={{ width: 350, marginLeft: "auto" }}
                  // defaultValue={myCompany.licenses}
                  placeholder="Change User Currency"
                  {...form.getInputProps("currency")}
                /> */}
              </div>
            </Grid>
            <Grid style={{ marginLeft: 30, marginRight: 30, marginTop: 40 }}>
              <div>
                <Text>Update Manager: </Text>
                <Select
                  placeholder="New Title Name"
                  style={{ width: 550, marginLeft: "auto" }}
                  defaultValue={myCompany.manager_email}
                  value={state}
                  onChange={setState}
                  data={transferlist?.length > 0 ? transferlist : []}
                  {...form.getInputProps("manager")}
                />
              </div>
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
              Edit User
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
        leftIcon={<AiOutlineEdit />}
        radius="sm"
        size="xs"
        onClick={() => setOpened(true)}
        color="yellow"
      >
        Edit
      </Button>
    </>
  );
};

export default EditCompanyUserButton;
