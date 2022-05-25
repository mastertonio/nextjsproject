import React, { useEffect, useState } from "react";
import { AppShell, useMantineTheme } from "@mantine/core";
import { useStyles } from "../styles/dashboardStyle";
import axios from "axios";

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
  const [data, setData] = useState<any>();

  useEffect(() => {
    const getDashboardData = async () => {
      try {
        const res = await axios.get(
          "http://54.159.8.194/v1/dashboard/628247b19e2a1d3a5ef8b9ad",
          {
            headers: {
              Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MjgyNDdiMTllMmExZDNhNWVmOGI5YWQiLCJpYXQiOjE2NTM0NzU2NTMsImV4cCI6MTY1MzQ3NzQ1MywidHlwZSI6ImFjY2VzcyJ9.ZFZuV8GsP8scrFMf8pvUi38rvN7OhkkJSsMdxITdNzo`,
            },
          }
        );

        setData(res?.data)
        console.log(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    getDashboardData()
    console.log(data,"datatatata")
  },[]);

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
      header={<RoiNavbar admin={data?.admin_list} />}
    >
      <div className={classes.body}>
        <div className={classes.welcome}>
          <Welcome name={data?.welcome.account_name} active_roi={data?.welcome.active_roi} current_roi={data?.welcome.current_roi}/>
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
