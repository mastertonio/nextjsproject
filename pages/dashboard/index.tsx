import React, { useContext, useEffect, useState } from "react";
import {
  AppShell,
  useMantineTheme,
  LoadingOverlay,
  Text,
  Loader,
} from "@mantine/core";
import { useStyles } from "@styles/dashboardStyle";
import axios from "axios";
import { useQuery } from "react-query";
import {
  GetServerSideProps,
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
  GetStaticPaths,
  GetStaticPathsContext,
  NextApiRequest,
} from "next";

import RoiNavbar from "@core/components/navbar/Navbar";
import RoiFooter from "@core/components/footer/Footer";
import Welcome from "@dashboard/components/Welcome";
import DashboardGraph from "@dashboard/components/DashboardGraph";
import ViewCount from "@dashboard/components/ViewCount";
import CreateNewRoi from "@dashboard/components/CreateNewRoi";
import RoiRanking from "@dashboard/components/RoiRanking";
import { useLocalStorage, useSessionStorage } from "@mantine/hooks";
import Row from "@dashboard/components/Row";
import { useRouter } from "next/router";
import MainLoader from "@app/core/components/loader/MainLoader";
import UserContext, { State } from "@context/user.context";
import { useUserStore } from "@app/store/userState";
import * as cookie from 'cookie'
//
const Dashboard: React.FC = (user) =>
// message
{
  const router = useRouter();
  const theme = useMantineTheme();
  const { classes } = useStyles();
  const [value] = useLocalStorage({ key: "auth-token" });
  const [current, setCurrent] = useLocalStorage({ key: "current-user" });
  const [userInfo, setUserInfo] = useLocalStorage<State>({ key: "ckear" });
  const p = router.query;
  const userCtx = useContext(UserContext);
  const tokenZ = useUserStore(state => state.token)

  const getDashboardData = async () => {
    try {
      const res = await axios.get(`http://localhost:8080/v1/dashboard`, {
        withCredentials: true,
      });
      console.log(res)
      return res.data;
    } catch (error) {
      return error;
    }
  };

  const { isLoading, status, data, isFetching, refetch } = useQuery(
    "dashboardData",
    getDashboardData
  );

  console.log(user, "user")

  // if (isLoading)
  //   return ;

  return data ? (
    <MainLoader />
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
      className=""
      fixed
    // header={<RoiNavbar />}
    // footer={<RoiFooter />}
    >
      {/* <div className={classes.body}>
          <div className={classes.welcome}>
            <Welcome
              name={data?.welcome.account_name}
              active_roi={data?.welcome.active_roi}
              current_roi={data?.welcome.current_roi}
            />
            <ViewCount viewcount={data?.viewcount} />
          </div>
          <div className={classes.dashboard_graph}>
            <DashboardGraph />
          </div>
          <div className={classes.roi_ranking}>
            <CreateNewRoi />
            <RoiRanking />
          </div>
        </div>
        <div className={classes.bar_graph_wrapper}>
          <Text size="lg">My ROIs</Text>
          <Row my_roi={data?.my_roi} refetch={refetch} />
        </div> */}
    </AppShell>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  // const data = 'from gssp'
  const cookies = context.req.cookies
  const res = await fetch(`http://localhost:8080/v1/auth/current`, {
    headers: {
      'Cookie': "session=" + cookies.session + ";session.sig=" + cookies['session.sig'] + ";x-access-token=" + cookies['x-access-token']
    }
  })
  const user = await res.json();

  if (user) {
    // redirect to dashboard page if authenticated
    return { props: { user } }
  } else {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
      props: { user },
    }
  }

  // return { props: { user } }
}

export default Dashboard;
