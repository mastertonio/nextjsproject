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
import { useUserStore } from "@app/store/userState";
import { UserDataProp } from "@app/context/user.context";
import { format } from "path";

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
  status: string;
};

export interface IButtonCompanyUserProps {
  id: string;
  refetch: () => void;
  name: string;
  myCompany: ICompanyUserTypes;
  user: UserDataProp
}

const EditCompanyUserButton: React.FC<IButtonCompanyUserProps> = ({
  id,
  refetch,
  name,
  myCompany,
  user
}) => {
  const [opened, setOpened] = useState(false);
  const router = useRouter();
  const p = router.query;
  const [state, setState] = useState<string | null>(null);
  const [password, setPass] = useInputState("");
  const userZ = useUserStore((state) => (state.user))

  const rolesData = [
    { key: "3", label: 'Manager/Director', value: '3' },
    { key: "4", label: 'End User', value: '4' },
    { key: "2", label: 'Admin', value: '2' },
  ]

  const statusList = [
    { key: "1", label: "Active", value: "1" },
    { key: "0", label: "Inactive", value: "0" },
  ]

  const statusData = statusList.map((item: { value: string }) => item.value)
  const rolesList = rolesData.map((item: { value: string }) => item.value)
  const [valueRole, setValueRole] = useState(myCompany.role == 'company-manager' ? rolesList[0].toString() : myCompany.role == 'company-agent' ? rolesList[1].toString() : rolesList[2].toString());
  const [valueStatus, setValueStatus] = useState(myCompany.status == 'active' ? statusData[0].toString() : statusData[1].toString());

  const form = useForm({
    initialValues: {
      first_name: myCompany.first_name,
      last_name: myCompany.last_name,
      email: myCompany.email,
      password: "",
      currency: myCompany.currency,
      manager: myCompany.manager_id,
      role: myCompany.role == 'company-manager' ? rolesList[0].toString() : myCompany.role == 'company-agent' ? rolesList[1].toString() : rolesList[2].toString(),
      status: myCompany.status == 'active' ? statusData[0].toString() : statusData[1].toString()
    },
  });


  const getManagers = async () => {
    return await axios.get(`/v1/company/${user?.user.role === 'admin' ? router.query.company_id : user?.user.company_id}/manager`, {
      headers: {
        Authorization: `Bearer ${user.tokens.access.token}`,
      },
    });
  };

  const { isLoading, isError, error, data, isFetching } = useQuery(
    "getManagers",
    getManagers
  );

  const transferlist = data?.data.map((item: { id: string; email: string }) => ({
    key: item.id,
    value: item.id,
    label: item.email,
  }));

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

      const response = await axios.patch(
        `/v1/company/${user.user.company_id}/user/${id}`,
        {
          first_name: values.first_name,
          last_name: values.last_name,
          email: values.email,
          password: !!values.password ? values.password : "$3rVerus1..a",
          currency: values.currency,
          manager: values.manager,
          role: valueRole,
          status: valueStatus,
        }, {
        headers: {
          Authorization: `Bearer ${user.tokens.access.token}`,
        },
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
      setOpened(false)
    } catch (error) {
      console.log('error update', error);
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
          {name}
        </Text>

        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Stack
            justify="flex-start"
            // sx={(theme) => ({
            //   backgroundColor:
            //     theme.colorScheme === "dark"
            //       ? theme.colors.dark[8]
            //       : theme.colors.gray[0],
            //   height: 350,
            // })}
            h={430}
          >
            <Grid
              className="ml-[30px] mr-[30px] mt-[30px] mb-[15px]"
            >
              <div>
                <Text>Email: </Text>
                <TextInput
                  required
                  className="w-[350px] ml-auto"
                  // defaultValue={myCompany.name}
                  placeholder="Enter Email Address"
                  {...form.getInputProps("email")}
                />
              </div>
              <div style={{ marginLeft: "auto" }}>
                <Text>Password: </Text>
                <PasswordInput
                  className="w-[350px] ml-auto"
                  // defaultValue={password}
                  placeholder="Enter User Password"
                  {...form.getInputProps("password")}
                />
              </div>
            </Grid>
            <Grid className="ml-[30px] mr-[30px]">
              <div>
                <Text>First Name: </Text>
                <TextInput
                  required
                  className="w-[350px] ml-auto"
                  // defaultValue={myCompany.licenses}
                  placeholder="User First Name"
                  {...form.getInputProps("first_name")}
                />
              </div>
              <div className="ml-auto">
                <Text>Last Name: </Text>
                <TextInput
                  required
                  className="w-[350px] ml-auto"
                  // defaultValue={myCompany.licenses}
                  placeholder="User Last Name"
                  {...form.getInputProps("last_name")}
                />
              </div>
            </Grid>
            <Grid className="ml-[30px] mr-[30px] mt-[40px]">
              <div>
                <Text>Currency : </Text>
                <Select
                  data={curData}
                  placeholder="Choose Currency"
                  {...form.getInputProps("currency")}
                  className="w-[350px] ml-auto"
                />
                {/* <TextInput
                  required
                  style={{ width: 350, marginLeft: "auto" }}
                  // defaultValue={myCompany.licenses}
                  placeholder="Change User Currency"
                  {...form.getInputProps("currency")}
                /> */}
              </div>
              <div className="ml-auto">
                <Text>Update Manager: </Text>
                <Select
                  placeholder="New Title Name"
                  className="w-[350px] ml-auto"
                  defaultValue={myCompany.manager_email}
                  data={transferlist?.length > 0 ? transferlist.filter((el: { value: string; }) => id !== el.value) : []}
                  {...form.getInputProps("manager")}
                />
              </div>
            </Grid>
            <Grid className="ml-[30px] mr-[30px] mt-[30px]">
              <div>
                <Text>Status:</Text>
                <Select
                  data={statusList}
                  defaultValue={myCompany.status == 'active' ? statusData[0].toString() : statusData[1].toString()}
                  placeholder="Set Status"
                  // {...form.getInputProps("status")}
                  className="w-[350px] ml-auto"
                  onChange={(value: string) => setValueStatus(value)}
                />
              </div>
              <div className="ml-auto">
                <Text>Role: </Text>
                <Select
                  data={rolesData}
                  placeholder="Choose Role"
                  defaultValue={myCompany.role == 'company-manager' ? rolesList[0].toString() : myCompany.role == 'company-agent' ? rolesList[1].toString() : rolesList[2].toString()}
                  // {...form.getInputProps("role")}
                  className="w-[350px] ml-auto"
                  onChange={(value: string) => setValueRole(value)}
                />
              </div>
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
              Update User
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
