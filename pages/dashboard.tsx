import React, { useEffect } from "react";
import { AppShell, useMantineTheme } from "@mantine/core";
import { useStyles } from "../styles/dashboardStyle";

import RoiNavbar from "../app/core/components/navbar/Navbar";
import RoiFooter from "../app/core/components/footer/Footer";
import Welcome from "../app/dashboard/components/Welcome";
import DashboardGraph from "../app/dashboard/components/DashboardGraph";
import ViewCount from "../app/dashboard/components/ViewCount";
import CreateNewRoi from "../app/dashboard/components/CreateNewRoi";
import RoiRanking from "../app/dashboard/components/RoiRanking";

const Dashboard: React.FC = () => {
  const theme = useMantineTheme();
  const { classes } = useStyles();


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
      className={classes.body}
      fixed
      footer={<RoiFooter />}
      header={<RoiNavbar />}
    >
      <div className={classes.body}>
        <div className={classes.welcome}>
          <Welcome />
          <ViewCount />
        </div>
        <div className={classes.button}>
          <DashboardGraph />
        </div>
        <div className={classes.welcome}>
          <CreateNewRoi />
          <RoiRanking />
        </div>
      </div>
    </AppShell>
  );
};

export default Dashboard;
