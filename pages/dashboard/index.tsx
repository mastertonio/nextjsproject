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
import { getSession } from "next-auth/react";

type UserGSSP = {
  exp: number,
  iat: number,
  jti: string,
  tokens: {
    access: {
      expires: string,
      token: string
    },
    refresh: {
      expires: string,
      token: string
    }
  },
  user: UserContextTypes
}

interface DProps {
  expires: string,
  user: UserGSSP

}
//
const Dashboard: React.FC<any> = (
  login
) => {
  const router = useRouter();
  const theme = useMantineTheme();
  const { classes } = useStyles();
  const userZ = useUserStore((state) => (state))
  const getDashboardData = async () => {
    return await axios.get(`/v1/dashboard`, {
      headers: {
        Authorization: `Bearer ${login.data.user.tokens.access.token}`,
      },
    });
  };

  const { isLoading, status, data, isFetching, refetch, isSuccess, isError } = useQuery(
    "dashboardData",
    getDashboardData
  );

  useEffect(() => {
    console.log(login.data.user.user, "tetete")
  }, [login])


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
        header={<RoiNavbar user={login.data.user.user} tokens={login.data.user.tokens} />}
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
            <DashboardGraph token={login.data.user.tokens.access.token} />
          </div>
          <div className={`${classes.roi_ranking} w-full sm:w-[400px] relative`}>
            <CreateNewRoi user={login.data.user.user} tokens={login.data.user.tokens} />
            <RoiRanking user={login.data.user.user} tokens={login.data.user.tokens} />
          </div>
        </div>
        <div className={`${classes.bar_graph_wrapper} mt-[30px] sm:mt-0 relative`}>
          <Text size="lg" className="mb-[20px] sm:mb-0">My ROIs</Text>
          <Row my_roi={data?.data.my_roi} refetch={refetch} user={login.data.user} />
        </div>
      </AppShell>
    );
  }

  return <></>
};

export async function getServerSideProps(ctx: any) {
  const session = await getSession({ req: ctx.req });
  if (!session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }
  console.log(session, 'sezsion')
  // Pass data to the page via props
  return { props: { data: session } }
}

export default Dashboard;
