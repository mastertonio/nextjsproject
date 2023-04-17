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
import { getSession } from "next-auth/react";
import { useTokenStore } from "@app/store/builder/builderState"

const AdminBuilder: React.FC<any> = (login) => {
  const router = useRouter();
  const theme = useMantineTheme();
  const { classes } = useStyles();
  const userZ = useUserStore((state) => (state.user))
  const tokenChar = useTokenStore((state) => (state.tokenChar))

  const getAdminToolData = async () => {
    return await axios.get(`/v1/company/62b2a6f9061ed2a095b55555/template/6287791836bddb586c11082a/version/64368eebd9ff1b8e24aa6323/adminTool`, {
      headers: {
        Authorization: `Bearer ${tokenChar}`
      },
    });
  }

  const { isLoading, status, data, isFetching, refetch, isSuccess } = useQuery('adminToolData', getAdminToolData);

  useEffect(() => {
    console.log("token admin tool", tokenChar)
    console.log("admin tool data", data?.data)
  }, [data])



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
        <TemplateSpecifics data={data?.data.adminTool} />
        <Sections data={data?.data.adminTool} />
      </div>
    </AppShell>
  );
};

export default AdminBuilder;
