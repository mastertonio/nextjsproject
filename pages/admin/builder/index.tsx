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
import TemplateSpecifics from "@app/admin/components/TemplateSpecifics";
import Sections from "@app/admin/components/Sections";
import { useLocalStorage, useSessionStorage } from "@mantine/hooks";
import Row from "@dashboard/components/Row";
import { useRouter } from "next/router";
import MainLoader from "@app/core/components/loader/MainLoader";
import UserContext, { State, UserContextTypes } from "@context/user.context";
import { UserState, useUserStore } from "@app/store/userState";
import * as cookie from 'cookie'
import FourOhFour from "pages/404";
//
const AdminBuilder: React.FC<UserState> = () => {
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
      className="p-0 m-0"
      fixed
      header={<RoiNavbar />}
    >
      <div className="flex-col sm:flex-row relative h-auto">
        {/* Template Specifics */}
        <TemplateSpecifics />
        <Sections />
      </div>
    </AppShell>
  );
  //   }

  //   if (isError) {
  //     return <FourOhFour />;
  //   }

  //   return <></>
};

export default AdminBuilder;
