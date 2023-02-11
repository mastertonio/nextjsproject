import axios from "axios";
import {
  useMantineTheme,
  Burger,
  Header,
  MediaQuery,
  Group,
  Button,
} from "@mantine/core";
import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useStyles } from "@styles/navStyle";
import AdminList, { IAdminListProps } from "./components/AdminList";
import PoweredByRoi from "./components/PoweredByRoi";
import ActionList from "./components/ActionList";
import Drawer from 'react-modern-drawer'
import 'react-modern-drawer/dist/index.css'
import DashboardDrawer from "../drawer/DrawerContent";
import { useLocalStorage } from "@mantine/hooks";
import { useQuery } from "react-query";
import UserContext, { UserContextTypes } from "@context/user.context";

import { UserState, useUserStore } from "@app/store/userState";
import { GetServerSideProps } from "next";

const RoiNavbar: React.FC<Partial<UserState>> = ({ user }, cookies) => {
  const theme = useMantineTheme();
  const router = useRouter();
  const { classes } = useStyles();
  const [opened, setOpened] = useState(false);
  const [isOpen, setIsOpen] = React.useState(false)
  const toggleDrawer = () => {
    setIsOpen((prevState) => !prevState)
  }

  return (
    <Header height={opened === true ? 220 : 70} p="md" className={`${classes.header} flex-col sm:flex-row`}>
      <div className="flex justify-between items-center">
        <MediaQuery largerThan="sm" styles={{ display: "none" }}>
          <Burger
            opened={opened}
            onClick={() => setOpened((o) => !o)}
            size="sm"
            color={theme.colors.gray[5]}
            mr="xl"
          />
        </MediaQuery>
        <div>
          <Drawer
            open={isOpen}
            onClose={toggleDrawer}
            direction='left'
            className="!bg-[#2f4050] !p-[20px]"
          >
            <DashboardDrawer user={user} />
          </Drawer>
          <Button
            className="mr-auto !bg-[#00acac]"
            onClick={toggleDrawer}
          >
            Navigate
          </Button>
        </div>
      </div>
      {/* {router.route.includes("dashboard") && user?.role == "admin" || user?.role == "company-admin" || user?.role == "company-manager" ? (
        <div>
          <Drawer
            open={isOpen}
            onClose={toggleDrawer}
            direction='left'
            style={{ backgroundColor: '#2f4050', padding: 20 }}
          >
            <DashboardDrawer user={user} />
          </Drawer>
          <Button
            style={{ marginRight: "auto", backgroundColor: '#00acac' }}
            onClick={toggleDrawer}
          >
            Navigate
          </Button>
        </div>

      ) : (
        ""
      )} */}
      {router.route.includes("dashboard/manager") && user?.role == "company-manager" ? (
        <div className="ml-[10px]">
          <Button
            className="mr-auto"
            onClick={() => router.push('/dashboard')}
          >
            Main Dashboard
          </Button>
        </div>

      ) : (
        ""
      )}
      {router.route == "/dashboard" && user?.role == "company-manager" ? (
        <div className="ml-[10px]">
          <Button
            className="mr-auto"
            onClick={() => router.push('/dashboard/manager')}
          >
            Back to Reporting
          </Button>
        </div>

      ) : (
        ""
      )}
      <Group position="right" className={`${opened === true ? 'flex' : 'hidden'} ml-[unset] sm:ml-auto sm:flex flex-col sm:flex-row justify-start sm:justify-center z-10 sm:z-0 pt-[30px] sm:pt-0 pb-[5px] sm:pb-0`}>
        <AdminList />
        <PoweredByRoi />
        <ActionList />
      </Group>
    </Header>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  // const data = 'from gssp'
  const cookies = context.req.cookies
  const res = await fetch(`${process.env.NEXT_DEV_PORT}/v1/auth/current`, {
    headers: {
      'Cookie': "session=" + cookies.session + ";session.sig=" + cookies['session.sig'] + ";x-access-token=" + cookies['x-access-token']
    }
  })
  const user = await res.json();

  if (user) {
    // redirect to dashboard page if authenticated
    return { props: { user: user } }
  } else {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
      props: { user, cookies },
    }
  }

  // return { props: { user } }
}

export default RoiNavbar;
