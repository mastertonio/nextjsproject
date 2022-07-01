import React, { useEffect, useState } from "react";
import {
  AppShell,
  useMantineTheme,
  LoadingOverlay,
  Select,
  Text,
} from "@mantine/core";
import { useStyles } from "@styles/dashboardStyle";
import axios from "axios";
import { useQuery } from "react-query";
import {
  GetServerSideProps,
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from "next";

import RoiNavbar from "@core/components/navbar/Navbar";
import RoiFooter from "@core/components/footer/Footer";
import Welcome from "@dashboard/components/Welcome";
import DashboardGraph from "@dashboard/components/DashboardGraph";
import ViewCount from "@dashboard/components/ViewCount";
import CreateNewRoi from "@dashboard/components/CreateNewRoi";
import RoiRanking from "@dashboard/components/RoiRanking";
import { useLocalStorage } from "@mantine/hooks";
import Row from "@dashboard/components/Row";
import { useRouter } from "next/router";
//
const Dashboard: React.FC = ({
  dta,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const router = useRouter();
  const theme = useMantineTheme();
  const { classes } = useStyles();
  const [value] = useLocalStorage({ key: "auth-token" });
  const [intervalMs, setIntervalMs] = useState(1000);

  const getDashboardData = async () => {
    try {
      const res = await axios.get(`http://54.159.8.194/v1/dashboard/${dta}`, {
        headers: {
          Authorization: `Bearer ${value}`,
        },
      });

      return res.data;
    } catch (error) {
      console.log(error, "rarara");
    }
  };

  const { isLoading, status, data, isFetching } = useQuery(
    "dashboardData",
    getDashboardData,
    {
      // Refetch the data every second
      refetchInterval: intervalMs,
    }
  );

  const dataTemp = data?.my_roi?.map((element: { id: any; name: string }) => ({
    key: element.id,
    value: element.id,
    label: element.name,
  }));

  if (isLoading)
    return <LoadingOverlay visible={router.isReady && isLoading} />;

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
          <CreateNewRoi actions={data?.template_list} />
          <RoiRanking rankings={data?.ranking} />
        </div>
      </div>
      <div className={classes.bar_graph_wrapper}>
        <Text size="lg">My ROIs</Text>
        <Select
          style={{ width: 150 }}
          placeholder="Filter"
          searchable
          defaultValue={""}
          clearable
          data={dataTemp}
        />
        <Row my_roi={data?.my_roi} fetching={isFetching} />
      </div>
    </AppShell>
  );
};

const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const user = context.query.id
  // const res = await axios.get(`http://54.159.8.194/v1/dashboard/${context.query.id}`, {
  //   headers: {
  //     Authorization: `Bearer ${user}`,
  //   },
  // });

  return {
    props: {
      dta: user,
    },
  };
};

export default Dashboard;
