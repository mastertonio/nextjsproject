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
import UserContext, { State, UserContextTypes } from "@context/user.context";
import { UserState, useUserStore } from "@app/store/userState";
import Cookies from 'js-cookie';
import FourOhFour from "pages/404";
//
const Dashboard: React.FC<UserState> = ({ user }) =>
// message
{
  const router = useRouter();
  const theme = useMantineTheme();
  const { classes } = useStyles();
  const expireCookies = useUserStore((state) => (state.expires))
  const tokenSet = useUserStore((state) => (state.token))
  const userZ = useUserStore((state) => (state.user))
  const getDashboardData = async () => {
    return await axios.get(`/v1/dashboard`);
  };

  const { isLoading, status, data, isFetching, refetch, isSuccess, isError } = useQuery(
    "dashboardData",
    getDashboardData
  );

  useEffect(() => {
    Cookies.set('x-access-token', tokenSet, {
      expires: new Date(expireCookies).getTime()
    });

    if (Date.now() > new Date(expireCookies).getTime()) {
      Cookies.remove('x-access-token')
      router.push('/');
    }
  }, [router, expireCookies, tokenSet]);


  if (isLoading) return <MainLoader />;

  if (isSuccess) {
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
        className=""
        fixed
        header={<RoiNavbar user={userZ} />}
      // footer={<RoiFooter />}
      >
        <div className={`${classes.body} flex-col sm:flex-row relative h-auto`}>
          <div className={`${classes.welcome} w-full sm:w-[400px]`}>
            <Welcome
              name={data?.data.welcome.account_name}
              active_roi={data?.data.welcome.active_roi}
              current_roi={data?.data.welcome.current_roi}
            />
            <ViewCount viewcount={data?.data.viewcount} />
          </div>
          <div className={`${classes.dashboard_graph} w-full sm:w-[900px] mt-[30px] sm:mt-0`}>
            <DashboardGraph />
          </div>
          <div className={`${classes.roi_ranking} w-full sm:w-[400px] relative`}>
            <CreateNewRoi />
            <RoiRanking />
          </div>
        </div>
        <div className={`${classes.bar_graph_wrapper} mt-[30px] sm:mt-0 relative`}>
          <Text size="lg" className="mb-[20px] sm:mb-0">My ROIs</Text>
          <Row my_roi={data?.data.my_roi} refetch={refetch} />
        </div>
      </AppShell>
    );
  }

  // if (Date.now() > new Date(expireCookies).getTime()) {
  //   router.push(`/`);
  // }

  if (isError) {
    return <FourOhFour />;
  }

  return <></>
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  // const data = 'from gssp'
  const cookies = context.req.cookies
  const sessionExpired = cookies['x-access-token'];

  console.log(cookies)

  // check if the session has expired
  if (Date.now() > new Date(sessionExpired).getTime()) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
      props: {}
    }
  }

  const res = await fetch(`${process.env.NEXT_DEV_PORT}/v1/auth/current`, {
    headers: {
      'Cookie': "session=" + cookies.session + ";session.sig=" + cookies['session.sig'] + ";x-access-token=" + cookies['x-access-token']
    }
  })
  const user = await res.json();

  if (Object.keys(user).length === 0 && user.constructor === Object) {
    // redirect to dashboard page if authenticated

    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
      props: { user }
    }
  } else {
    return {
      props: { user }
    }
  }

  // return { props: { user } }
}

export default Dashboard;
