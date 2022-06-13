import React, { useEffect, useState } from "react";
import {
  AppShell,
  useMantineTheme,
  LoadingOverlay,
  Select,
  Text,
  TextInput,
  Grid
} from "@mantine/core";
import { useStyles } from "../styles/dashboardStyle";
import axios from "axios";

import RoiNavbar from "../app/core/components/navbar/Navbar";
import RoiFooter from "../app/core/components/footer/Footer";
import Welcome from "../app/dashboard/components/Welcome";
import DashboardGraph from "../app/dashboard/components/DashboardGraph";
import ViewCount from "../app/dashboard/components/ViewCount";
import CreateNewRoi from "../app/dashboard/components/CreateNewRoi";
import RoiRanking from "../app/dashboard/components/RoiRanking";
import { useLocalStorage } from "@mantine/hooks";
import Row from "../app/core/components/data-grid/Row";
import DataGrid from "../app/core/components/data-grid/DataGrid";

const Dashboard: React.FC = () => {
  const theme = useMantineTheme();
  const { classes } = useStyles();
  const [data, setData] = useState<any>();
  const [value] = useLocalStorage({ key: "auth-token" });
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const getDashboardData = async () => {
      try {
        const res = await axios.get(
          "http://54.159.8.194/v1/dashboard/628247b19e2a1d3a5ef8b9ad",
          {
            headers: {
              Authorization: `Bearer ${value}`,
            },
          }
        );
        if (res) {
          setData(res?.data);
          setVisible(false);
        }
      } catch (error) {
        console.log(error,'rarara');
      }
    };
    getDashboardData();
  }, []);

  return visible ? (
    <LoadingOverlay visible={visible} />
  ) : (
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
      header={
        <RoiNavbar admin={data?.admin_list} actions={data?.template_list} />
      }
      footer={<RoiFooter />}
    >
      <div className={classes.body}>
        <div className={classes.welcome}>
      <Grid justify="space-between">
        <Grid.Col span={2}>
          <Welcome
            name={data?.welcome.account_name}
            active_roi={data?.welcome.active_roi}
            current_roi={data?.welcome.current_roi}
          />
          <ViewCount viewcount={data?.viewcount} />
        </Grid.Col>
        </Grid>
        <div className={classes.dashboard_graph}>
          <DashboardGraph chartData={data?.chart} />
        </div>
        <div className={classes.welcome}>
          <CreateNewRoi />
          <RoiRanking rankings={data?.ranking} />
        </div>
      </div>
      <div>
        <Text size="lg">My ROIs</Text>
        <Select
          style={{ width: 150 }}
          placeholder="Template"
          data={[]}
        />
        <Grid justify="space-between" align="center">
          <Select
              style={{ width: 150 }}
              placeholder="Template" data={[]}          />
          <TextInput
            placeholder="Search"
            rightSectionWidth={90}
            styles={{ rightSection: { pointerEvents: "none" } }}
          />
        </Grid>
        {/* <DataGrid /> */}
        <Row />
      </div>
      </div>
    </AppShell>
  );
};

export default Dashboard;
