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

import RoiNavbar from "@core/components/navbar/Navbar";
import TemplateSpecifics from "@app/admin/components/NewTemplateSpecifics";
import Sections from "@app/admin/components/NewSections";
import { useRouter } from "next/router";
import { UserState, useUserStore } from "@app/store/userState";

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
      className="p-0 m-0 "
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
};

export default AdminBuilder;
