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
import * as cookie from 'cookie'
import FourOhFour from "pages/404";
//
const AdminBuilder: React.FC<UserState> = () =>{
  const router = useRouter();
  const theme = useMantineTheme();
  const { classes } = useStyles();
  const userZ = useUserStore((state) => (state.user))

//   const getDashboardData = async () => {
//     return await axios.get(`/v1/dashboard`);
//   };

//   const { isLoading, status, data, isFetching, refetch, isSuccess, isError } = useQuery(
//     "dashboardData",
//     getDashboardData
//   );

//   if (isLoading) return <MainLoader />;

//   if (isSuccess) {
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
        header={<RoiNavbar />}
      >
        <h1>Admin Builder Page</h1>
      </AppShell>
    );
//   }

//   if (isError) {
//     return <FourOhFour />;
//   }

//   return <></>
};

export default AdminBuilder;
