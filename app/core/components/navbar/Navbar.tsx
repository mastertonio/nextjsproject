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
import UserContext from "@context/user.context";

const RoiNavbar: React.FC = () => {
  const theme = useMantineTheme();
  const router = useRouter();
  const { classes } = useStyles();
  const [opened, setOpened] = useState(false);
  const [isOpen, setIsOpen] = React.useState(false)
  const toggleDrawer = () => {
      setIsOpen((prevState) => !prevState)
  }
  const userCtx = useContext(UserContext)

  const [user, setUser] = useState<any>({});
  const [value] = useLocalStorage({ key: "auth-token" });
  const [current, setCurrent] = useLocalStorage({ key: "current-user" });
  const [company, setCompany] = useLocalStorage({ key: "my-company" });
  const sessionToken = sessionStorage.getItem('auth-token')

  const getCurrentUser = async () => {
    try {
      const res = await axios.get(`http://54.159.8.194/v1/users/${current}`, {
        withCredentials: true,
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

  return (
    <Header height={70} p="md" className={classes.header}>
      <MediaQuery largerThan="sm" styles={{ display: "none" }}>
        <Burger
          opened={opened}
          onClick={() => setOpened((o) => !o)}
          size="sm"
          color={theme.colors.gray[5]}
          mr="xl"
        />
      </MediaQuery>
      {router.route.includes("dashboard") && user?.role=="admin" || user?.role == "company-admin" || user?.role == "company-manager"  ? (
        <div>
            <Drawer
                open={isOpen}
                onClose={toggleDrawer}
                direction='left'
                style={{ backgroundColor: '#2f4050', padding: 20}}
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
      )}
      {router.route.includes("dashboard/manager") && user?.role == "company-manager"  ? (
        <div style={{ marginLeft: 10}}>
          <Button
            style={{ marginRight: "auto" }}
            onClick={()=> router.push('/dashboard')}
          >
            Main Dashboard
          </Button>
        </div>
        
      ) : (
        ""
      )}
      {router.route == "/dashboard" && user?.role == "company-manager"  ? (
        <div style={{ marginLeft: 10}}>
          <Button
            style={{ marginRight: "auto" }}
            onClick={()=> router.push('/dashboard/manager')}
          >
            Back to Reporting
          </Button>
        </div>
        
      ) : (
        ""
      )}
      <Group position="right" style={{ marginLeft: 'auto'}}>
        <AdminList />
        <PoweredByRoi />
        <ActionList />
      </Group>
    </Header>
  );
};

export default RoiNavbar;
