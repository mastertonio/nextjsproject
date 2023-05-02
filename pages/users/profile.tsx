import React, { useState } from "react";
import {
  AppShell,
  Button,
  Group,
  // LoadingOverlay,
  // Navbar,
  // PasswordInput,
  Stack,
  Text,
  TextInput,
  useMantineTheme,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import RoiFooter from "@core/components/footer/Footer";
import { useRouter } from "next/router";
import RoiNavbar from "@core/components/navbar/MainNavbar";
import Sidebar from "@core/components/sidebar/AdminRoleSidebar";
import { useLocalStorage } from "@mantine/hooks";
import axios from "axios";
import { useQuery } from "react-query";
import { useEffect } from "react";
import { BsFolderSymlinkFill } from "react-icons/bs";
import ChangePass from "@core/components/forms/changepassword";
import { showNotification, updateNotification } from "@mantine/notifications";
import { IconCheck } from '@tabler/icons'
import MainLoader from "@app/core/components/loader/MainLoader";
import { useUserStore } from "@app/store/userState";
import { getSession } from "next-auth/react";

const UserProfile: React.FC<any> = (login) => {
  const theme = useMantineTheme();
  const [error, setError] = useState("");
  const router = useRouter();
  const [user, setUser] = useState<any>({});
  const p = router.query;

  const userZ = useUserStore((state) => (state.user))

  const [userCred, setUserCred] = useState<any>(userZ);

  const form = useForm({
    initialValues: {
      email: login.data.user.user.email,
      first_name: login.data.user.user.first_name,
      last_name: login.data.user.user.last_name,
      phone_number: login.data.user.user.phone
    },
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
    }
  })

  const getCurrentUser = async () => {
    return await axios.get(`/v1/users/${login.data.user.user.id}`, {
      headers: {
        Authorization: `Bearer ${login.data.user.tokens.access.token}`,
      },
    });
  };

  const { isLoading, status, data, isFetching, refetch } = useQuery(
    "userProfile",
    getCurrentUser
  );

  const handleSubmit = async (values: typeof form.values) => {
    try {
      // values.preventDefault();
      showNotification({
        id: 'load-data',
        loading: true,
        title: 'Updating your data',
        message: 'Data will be loaded within seconds',
        autoClose: false,
        disallowClose: true,
        color: 'teal'
      })
      const res = await axios.patch(
        `/v1/users/${login.data.user.user.id}`,
        {
          email: values.email,
          first_name: values.first_name,
          last_name: values.last_name,
          phone: values.phone_number,
        },
        {
          headers: {
            Authorization: `Bearer ${login.data.user.tokens.access.token}`,
          },
        }
      );
      // const res = await axios.patch(
      //   `/v1/users/${userZ?.id}`,
      //   {
      //     email: userCred.email,
      //     first_name: userCred.first_name,
      //     last_name: userCred.last_name,
      //     phone: userCred.phone_number,
      //   }
      // );
      if (res) {
        updateNotification({
          id: 'load-data',
          color: 'teal',
          title: 'Data was updated!',
          message: 'User Information updated!',
          icon: <IconCheck size={16} />,
          autoClose: 1000,
        })
      }
      refetch();
    } catch (error) {
      updateNotification({
        id: 'load-data',
        title: 'Error in Saving Data',
        message: 'Please reload the page or try again later',
        autoClose: 1000,
        disallowClose: true,
        color: 'red'
      })
      return error;
    }
  };

  const handleChange = (e: {
    preventDefault: () => void;
    target: { name: any; value: any };
  }) => {
    e.preventDefault();
    const { name, value } = e.target;
    setUserCred({
      ...userCred,
      [name]: value,
    });
  };

  useEffect(() => {
    console.log('User Profile', user)
    setUser(data?.data);
  }, [data]);

  return isLoading ? <MainLoader /> : (
    <AppShell
      styles={{
        main: {
          background: "#d5dbe0"
          // background:
          //   theme.colorScheme === "dark"
          //     ? theme.colors.dark[8]
          //     : theme.colors.gray[0],
        },
      }}
      navbarOffsetBreakpoint="sm"
      asideOffsetBreakpoint="sm"
      fixed
      navbar={<Sidebar user={login.data.user.user} tokens={login.data.user.tokens} />}
      // footer={
      //   <RoiFooter />
      // }
      header={<RoiNavbar user={login.data.user.user} tokens={login.data.user.tokens} />}
    >
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <div
          className="mt-[20px] mb-[20px] bg-white p-[20px] rounded-[10px] shadow-lg"
        >
          <Text weight={700} className="text-[30px] text-teal-500">
            Personal Information
          </Text>

          <Stack className="mt-[20px]">
            <div className="grid grid-cols-2 gap-4">
              <div className="gap-1">
                <p className="text-[14px] text-slate-900 mb-[5px] font-semibold">Email Address</p>
                <TextInput
                  placeholder="Your Email Address"
                  name="email"
                  className="w-full"
                  // description="Your email address will also be your username and is the email address that all notifications will be sent to."
                  // inputWrapperOrder={['label', 'error', 'input', 'description']}
                  {...form.getInputProps("email")}
                // onBlur={onSubmit}
                />
                <p className="text-[10px] text-slate-400 mt-[5px] mb-0">Your email address will also be your username and is the email address that all notifications will be sent to.</p>
              </div>

              <div className="gap-1">
                <p className="text-[14px] text-slate-900 mb-[5px] font-semibold">Phone number</p>
                <TextInput
                  placeholder="Enter Phone Number "
                  name="phone_number"
                  className="w-full"
                  {...form.getInputProps("phone_number")}
                // onChange={handleChange}
                // onBlur={onSubmit}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="gap-1">
                <p className="text-[14px] text-slate-900 mb-[5px] font-semibold mt-0">First Name</p>
                <TextInput
                  placeholder="Your First Name"
                  name="first_name"
                  className="w-full"
                  {...form.getInputProps("first_name")}
                // onChange={handleChange}
                // onBlur={onSubmit}
                />
              </div>
              <div className="gap-1">
                <p className="text-[14px] text-slate-900 mb-[5px] font-semibold mt-0">Last Name</p>
                <TextInput
                  placeholder="Your Last Name"
                  name="last_name"
                  className="w-full"
                  {...form.getInputProps("last")}
                // onChange={handleChange}
                // onBlur={onSubmit}
                />
              </div>
            </div>

            <Group className="mt-[20px]">
              <Button
                type="submit"
                color="teal"
                leftIcon={<BsFolderSymlinkFill size={14} />}
                className="ml-auto"
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

export default UserProfile;
