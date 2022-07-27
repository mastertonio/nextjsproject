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

const Templates: React.FC = () => {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);
  const router = useRouter();
  const [user, setUser] = useState<any>({});
  const p = router.query;

  const { register, handleSubmit } = useForm({
    mode: "onBlur",
    defaultValues: {
      first_name: "",
      last_name: "",
      avatar: "",
      email: "",
      phone_number: "",
    },
  });

  const onSubmit = (data: any) => {
    alert(data.first_name);
  };

  const [value] = useLocalStorage({ key: "auth-token" });
  const [current, setCurrent] = useLocalStorage({ key: "current-user" });

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

  useEffect(() => {
    setUser(data);
  }, [data]);

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
      Welcome {user?.name} to your Templates Page
    </AppShell>
  );
};

export default Templates;
