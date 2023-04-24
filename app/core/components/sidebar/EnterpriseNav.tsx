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
import { useNavShowStore } from "@app/store/builderStore";
// import Drawer from 'react-modern-drawer'
import 'react-modern-drawer/dist/index.css'
import AdminList, { IAdminListProps } from "../navbar/components/AdminList";
import PoweredByRoi from "../navbar/components/PoweredByRoi";
import ActionList from "../navbar/components/ActionList";

const EnterpriseNavbar: React.FC = () => {
  const theme = useMantineTheme();
  const router = useRouter();
  const { classes } = useStyles();
  const [opened, setOpened] = useState(false);
  const showNav = useNavShowStore((state) => state.value);
  const show = useNavShowStore((state) => state.show);
  const hide = useNavShowStore((state) => state.hide);
  // const [opened, setOpened] = useState(false);
  // const [isOpen, setIsOpen] = React.useState(false)
  // const toggleDrawer = () => {
  //   setIsOpen((prevState) => !prevState)
  // }

  return (
    <Header height={70} p="md" className={classes.headerEnt}>

      <MediaQuery largerThan="sm" styles={{ display: "none" }}>
        <Burger
          opened={showNav}
          // onClick={() => setOpened((o) => !o)}
          onClick={() => {
            showNav === false ? show() : hide();
          }}
          size="sm"
          color={theme.colors.gray[5]}
          mr="xl"
        />
      </MediaQuery>
      <div style={{ marginLeft: '227px' }} className="hidden sm:flex">
        <h3 className="text-[14px] text-[#676a6c]">ROI DASHBOARD</h3>
      </div>
      <Group position="right" className={`${opened === true ? 'flex' : 'hidden'}  sm:ml-auto sm:flex flex-col sm:flex-row justify-start sm:justify-center z-10 sm:z-0 pt-[30px] sm:pt-0 pb-[5px] sm:pb-0 w-[50%]`}>
        <PoweredByRoi />
        <ActionList />
      </Group>

    </Header>
  );
};

export default EnterpriseNavbar;
