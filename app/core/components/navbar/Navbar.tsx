import axios from "axios";
import {
  useMantineTheme,
  Burger,
  Header,
  MediaQuery,
  Group,
  Button,
} from "@mantine/core";
import React, { useState } from "react";
import { useRouter } from "next/router";
import { useStyles } from "@styles/navStyle";
import AdminList, { IAdminListProps } from "./components/AdminList";
import PoweredByRoi from "./components/PoweredByRoi";
import ActionList from "./components/ActionList";
import Drawer from 'react-modern-drawer'
import 'react-modern-drawer/dist/index.css'
import DashboardDrawer from "../drawer/DrawerContent";

const RoiNavbar: React.FC = () => {
  const theme = useMantineTheme();
  const router = useRouter();
  const { classes } = useStyles();
  const [opened, setOpened] = useState(false);
  const [isOpen, setIsOpen] = React.useState(false)
  const toggleDrawer = () => {
      setIsOpen((prevState) => !prevState)
  }

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
      {router.route.includes("dashboard") ? (
        <div>
            <Drawer
                open={isOpen}
                onClose={toggleDrawer}
                direction='left'
                style={{ backgroundColor: '#2f4050', padding: 20}}
            >
                <DashboardDrawer />
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
      <Group position="right" style={{ marginLeft: 'auto'}}>
        <AdminList />
        <PoweredByRoi />
        <ActionList />
      </Group>
    </Header>
  );
};

export default RoiNavbar;
