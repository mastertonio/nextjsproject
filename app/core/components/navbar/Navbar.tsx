import axios from "axios";
import {
  Text,
  useMantineTheme,
  Burger,
  Header,
  MediaQuery,
} from "@mantine/core";
import React, { useState } from "react";
import { useRouter } from "next/router";
import { useStyles } from "./navStyle"
import AdminList, { IAdminListProps } from "./components/AdminList";
import PoweredByRoi from "./components/PoweredByRoi";
import ActionList from "./components/ActionList"

const RoiNavbar: React.FC<IAdminListProps> = ({ admin, actions }) => {
  const theme = useMantineTheme();
  const router = useRouter();
  const { classes } = useStyles();
  const [opened, setOpened] = useState(false);

  return (
    <Header
      height={70}
      p="md"
      className={classes.header}
    >
      <div style={{ display: "flex", alignItems: "center", height: "100%" }}>
        <MediaQuery largerThan="sm" styles={{ display: "none" }}>
          <Burger
            opened={opened}
            onClick={() => setOpened((o) => !o)}
            size="sm"
            color={theme.colors.gray[5]}
            mr="xl"
          />
        </MediaQuery>

        <AdminList admin={admin} />
        <PoweredByRoi />
        <ActionList actions={actions}/>
      </div>
    </Header>
  );
};

export default RoiNavbar;
