import React, { useState } from "react";
import {
  AppShell,
  Button,
  Group,
  LoadingOverlay,
  Navbar,
  PasswordInput,
  Stack,
  Text,
  TextInput,
  useMantineTheme,
} from "@mantine/core";
import RoiFooter from "@core/components/footer/Footer";
import { useRouter } from "next/router";
import RoiNavbar from "@core/components/navbar/Navbar";
import Sidebar from "@core/components/sidebar/Sidebar";
import { useLocalStorage } from "@mantine/hooks";
import axios from "axios";
import { useQuery } from "react-query";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { BsFolderSymlinkFill } from "react-icons/bs";
import ChangePass from "@core/components/forms/changepassword";

const UserProfile: React.FC = () => {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);
  const router = useRouter();
  const [user, setUser] = useState<any>({});
  const [user2, setUser2] = useState<any>({});
  const [userInfo, setUserInfo] = useLocalStorage({ key: "user-info" });
  const [value] = useLocalStorage({ key: "auth-token" });
  const [current, setCurrent] = useLocalStorage({ key: "current-user" });
  const p = router.query;

  const { register, handleSubmit } = useForm({
    mode: "onBlur",
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      phone_number: "",
    },
  });

  const getCurrentUser = async () => {
    try {
      const res = await axios.get(`http://54.159.8.194/v1/users/${current}`, {
        headers: {
          Authorization: `Bearer ${value}`,
        },
      });
      return res.data;
    } catch (error) {
      return error;
    }
  };

  const { isLoading, status, data, isFetching, refetch } = useQuery(
    "userList",
    getCurrentUser
  );

  const onSubmit = async (data: any) => {
    try {
      switch (data) {
        case !!data.email:
          await axios.patch(
            `http://54.159.8.194/v1/users/${current}`,
            { email: data.email },
            { headers: { Authorization: `Bearer ${value}` } }
          );
          refetch();
          break;
        case !!data.first_name:
          await axios.patch(
            `http://54.159.8.194/v1/users/${current}`,
            { first_name: data.first_name },
            { headers: { Authorization: `Bearer ${value}` } }
          );
          refetch();
          break;
        case !!data.last_name:
          await axios.patch(
            `http://54.159.8.194/v1/users/${current}`,
            { last_name: data.last_name },
            { headers: { Authorization: `Bearer ${value}` } }
          );
          refetch();
          break;
        case !!data.phone:
          await axios.patch(
            `http://54.159.8.194/v1/users/${current}`,
            { last_name: data.last_name },
            { headers: { Authorization: `Bearer ${value}` } }
          );
          refetch();
          break;
        default:
          await axios.patch(
            `http://54.159.8.194/v1/users/${current}`,
            {
              email: data.email,
              first_name: data.first_name,
              last_name: data.last_name,
              phone: data.phone,
            },
            { headers: { Authorization: `Bearer ${value}` } }
          );
          refetch();
          break;
      }
    } catch (error) {
      console.log(error);
      return error;
    }
  };

  useEffect(() => {
    setUser2(userInfo);
    setUser(data);
  }, [data, userInfo]);

  if (isLoading)
    return <LoadingOverlay visible={router.isReady && isLoading} />;

  return (
    <AppShell
      styles={{
        main: {
          background:
            theme.colorScheme === "dark"
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
        },
      }}
      navbarOffsetBreakpoint="sm"
      asideOffsetBreakpoint="sm"
      fixed
      navbar={<Sidebar name={user?.name} user={user} />}
      // footer={
      //   <RoiFooter />
      // }
      header={<RoiNavbar />}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <div
          style={{
            margin: 5,
            backgroundColor: "white",
            padding: 20,
            borderRadius: 10,
          }}
        >
          <Text weight={700} color="gray" style={{ fontSize: 30 }}>
            Personal Information
          </Text>

          <Stack>
            <Group>
              <TextInput
                placeholder="Your Email Address"
                label="Email"
                defaultValue={user?.email}
                {...register("email")}
                style={{ width: 950, marginTop: "auto" }}
              />
            </Group>

            <TextInput
              placeholder="Your First Name"
              label="First Name"
              defaultValue={user?.first_name}
              {...register("first_name")}
            />
            <TextInput
              placeholder="Your Last Name"
              label="Last Name"
              defaultValue={user?.last_name}
              {...register("last_name")}
            />
            <TextInput
              placeholder="Enter Phone Number "
              label="Phone number"
              defaultValue={user?.phone}
              {...register("phone_number")}
            />
            <Group>
              <Button
                type="submit"
                color="teal"
                leftIcon={<BsFolderSymlinkFill size={14} />}
                style={{ marginLeft: "auto" }}
              >
                Update Information
              </Button>
            </Group>
          </Stack>
        </div>
      </form>
      <ChangePass />
    </AppShell>
  );
};

export default UserProfile;
