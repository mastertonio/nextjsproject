import React, { useEffect, useState } from "react";
import {
  AppShell,
  useMantineTheme,
  LoadingOverlay,
  Select,
  Text,
  TextInput,
  Grid,
} from "@mantine/core";
import { useStyles } from "@styles/dashboardStyle";
import axios from "axios";
import { useQuery } from "react-query"

import RoiNavbar from "@core/components/navbar/Navbar";
import RoiFooter from "@core/components/footer/Footer";
import Welcome from "@dashboard/components/Welcome";
import DashboardGraph from "@dashboard/components/DashboardGraph";
import ViewCount from "@dashboard/components/ViewCount";
import CreateNewRoi from "@dashboard/components/CreateNewRoi";
import RoiRanking from "@dashboard/components/RoiRanking";
import { useLocalStorage } from "@mantine/hooks";
import Row from "@dashboard/components/Row";
import { selectUser } from "@redux/reducers/user/userSlice";
import { useAppSelector } from "@redux/store";
import { useRouter } from "next/router";

const Dashboard: React.FC = () => {
  const router = useRouter();
  const theme = useMantineTheme();
  const { classes } = useStyles();
  const [value] = useLocalStorage({ key: "auth-token" });
  const user = useAppSelector(selectUser);
  const p = router.query;
  
  const getDashboardData = async () => {
    try {
      const res = await axios.get(
        `http://54.159.8.194/v1/dashboard/${p.id}`,
        {
          headers: {
            Authorization: `Bearer ${value}`,
          },
        }
      );

      return res.data
    } catch (error) {
      console.log(error, "rarara");
    }
  };


  const { isLoading, error, data, isFetching} = useQuery("dashboardData", getDashboardData)
  // useEffect(() => {
  //   if (router.isReady) {
      
  //     getDashboardData();
  //   }
  // }, [user, router.isReady]);

  const dataTemp = data?.my_roi?.map((element: { id: any; name: string }) => ({
    key: element.id,
    value: element.id,
    label: element.name,
  }));

  if (isLoading) return (<LoadingOverlay visible={isLoading} />);

  // if (error) return "An error has occurred: " + error;

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
      header={
        <RoiNavbar admin={data?.admin_list} actions={data?.template_list} />
      }
      footer={<RoiFooter />}
    >
      <div className={classes.body}>
        <div className={classes.welcome}>
          <Welcome
            name={data?.welcome.account_name}
            active_roi={data?.welcome.active_roi}
            current_roi={data?.welcome.current_roi}
          />
          <ViewCount viewcount={data?.viewcount} />
        </div>
        <div className={classes.dashboard_graph}>
          <DashboardGraph chartData={data?.chart} />
        </div>
        <div className={classes.roi_ranking}>
          <CreateNewRoi my_roi={dataTemp} />
          <RoiRanking rankings={data?.ranking} />
        </div>
      </div>
      <div className={classes.bar_graph_wrapper}>
        <Text size="lg">My ROIs</Text>
        <Select style={{ width: 150 }} placeholder="Template" data={dataTemp} />
        <Row my_roi={data?.my_roi} />
      </div>
    </AppShell>
  );
};

export default Dashboard;
