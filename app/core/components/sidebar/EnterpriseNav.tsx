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
// import DashboardDrawer from "../drawer/DrawerContent";
// import { useLocalStorage } from "@mantine/hooks";
// import { useQuery } from "react-query";
// import UserContext from "@context/user.context";

const EnterpriseNavbar: React.FC = () => {
  const theme = useMantineTheme();
  const router = useRouter();
  const { classes } = useStyles();
  const showNav = useNavShowStore((state) => state.value);
  const show = useNavShowStore((state) => state.show);
  const hide = useNavShowStore((state) => state.hide);
  // const [opened, setOpened] = useState(false);
  // const [isOpen, setIsOpen] = React.useState(false)
  // const toggleDrawer = () => {
  //   setIsOpen((prevState) => !prevState)
  // }

  return (
    <Header height={70} p="md" className={classes.header}>
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
    </Header>
  );
};

export default EnterpriseNavbar;
