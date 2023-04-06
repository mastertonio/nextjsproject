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
import { useUserStore } from "@app/store/userState";
import { getSession } from "next-auth/react";

const Company: React.FC<any> = (login) => {
  const theme = useMantineTheme();
  const router = useRouter();
  const [user, setUser] = useState<any>({});
  const userZ = useUserStore((state) => (state.user))
  

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

  const getCurrentUser = async () => {
    return await axios.get(`/v1/users/${login.data.user.user.id}`);
  };

  const { isLoading, status, data, isFetching, refetch } = useQuery(
    "userList",
    getCurrentUser
  );

  useEffect(() => {
    setUser(data?.data);
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
      navbar={<Sidebar tokens={login.data.user.tokens} user={login.data.user.user} />}
      // footer={
      //   <RoiFooter />
      // }
      header={<RoiNavbar />}
    >
      Welcome {user?.name} to your Company
    </AppShell>
  );
};

export async function getServerSideProps(ctx: any) {
  const session = await getSession({ req: ctx.req });
  if (!session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }
  // Pass data to the page via props
  return { props: { data: session } }
}

export default Company;
