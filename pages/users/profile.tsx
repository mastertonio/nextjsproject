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
import { BsFolderSymlinkFill } from "react-icons/bs";
import ChangePass from "@core/components/forms/changepassword";
import { showNotification, updateNotification } from "@mantine/notifications";
import { IconCheck } from '@tabler/icons'
import MainLoader from "@app/core/components/loader/MainLoader";
import { useUserStore } from "@app/store/userState";

const UserProfile: React.FC = () => {
  const theme = useMantineTheme();
  const [error, setError] = useState("");
  const router = useRouter();
  const [user, setUser] = useState<any>({});
  const [userCred, setUserCred] = useState<any>();
  const p = router.query;

  const userZ = useUserStore((state) => (state.user))

  const getCurrentUser = async () => {
    return await axios.get(`/v1/users/${userZ?.id}`);
  };

  const { isLoading, status, data, isFetching, refetch } = useQuery(
    "userProfile",
    getCurrentUser
  );

  const onSubmit = async (e: { preventDefault: () => void }) => {
    try {
      e.preventDefault();
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
        `/v1/users/${userZ?.id}`,
        {
          email: userCred.email,
          first_name: userCred.first_name,
          last_name: userCred.last_name,
          phone: userCred.phone_number,
        }
      );
      if(res){
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
    setUser(data?.data);
  }, [data]);

  return isLoading ? <MainLoader /> : (
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
      navbar={<Sidebar />}
      // footer={
      //   <RoiFooter />
      // }
      header={<RoiNavbar />}
    >
      <form onSubmit={onSubmit}>
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
                name="email"
                style={{ width: 950, marginTop: "auto" }}
                onChange={handleChange}
                description="Your email address will also be your username and is the email address that all notifications will be sent to."
                inputWrapperOrder={['label', 'error', 'input', 'description']}
                onBlur={onSubmit}
              />
            </Group>

            <TextInput
              placeholder="Your First Name"
              label="First Name"
              name="first_name"
              onChange={handleChange}
              onBlur={onSubmit}
            />
            <TextInput
              placeholder="Your Last Name"
              label="Last Name"
              name="last_name"
              onChange={handleChange}
              onBlur={onSubmit}
            />
            <TextInput
              placeholder="Enter Phone Number "
              label="Phone number"
              name="phone_number"
              onChange={handleChange}
              onBlur={onSubmit}
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
