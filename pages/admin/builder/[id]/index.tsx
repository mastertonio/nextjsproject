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

import RoiNavbar from "@core/components/navbar/AdminNavbar";
import TemplateSpecifics from "@app/admin/components/NewTemplateSpecifics";
import Sections from "@app/admin/components/NewSections";
import { useRouter } from "next/router";
import { UserState, useUserStore } from "@app/store/userState";
import { getSession } from "next-auth/react";
import { useCalculationStore, useTokenStore } from "@app/store/builder/builderState"
import MainLoader from "@app/core/components/loader/MainLoader";
import { useAdminSectionStore } from "@app/store/adminToolSectionStore";
import { useCalculatorSheetStore } from "@app/store/builder/calculatorStore";

const AdminBuilder: React.FC<any> = (login) => {
  const router = useRouter();
  const theme = useMantineTheme();
  const { classes } = useStyles();
  const userZ = useUserStore((state) => (state.user))
  const tokenChar = useTokenStore((state) => (state.tokenChar))
  const cells = useCalculatorSheetStore((state)=> state.cells)
  const sectionStore = useAdminSectionStore
  // const sections = useAdminSectionStore((state) => (state.sections))

  // console.log('template', router.query.temp_id)
  // console.log('version', router.query.id)

  const getAdminToolData = async () => {
    const res = await axios.get(`/v1/company/${router.query.comp_id}/template/${router.query.temp_id}/version/${router.query.ver_id}/adminTool`, {
      headers: {
        Authorization: `Bearer ${login.data.user.tokens.access.token}`
      },
    });

    sectionStore.setState(res.data.adminTool)

    return res
  }

  const { isLoading, status, data, isFetching, refetch, isSuccess } = useQuery('adminToolData', getAdminToolData);

  if (isLoading) return <MainLoader />;

  if (isSuccess) {
    const flatData = data?.data?.adminTool?.sections.map((section: { grayContent: { elements: any; }; }) => section.grayContent.elements).flat()
    const choices = data?.data?.adminTool?.sections.map((section: { grayContent: { elements: any; }; }) => section.grayContent.elements).flat().map((elem: { address: string; title: string; }) => ({ value: elem.address, label: elem.title }))
    // const choices = data?.data?.adminTool?.sections.map((section: { grayContent: { elements: any; }; }) => section.grayContent.elements).flat().map(() => )
    // useCalculationStore.
    // console.log('admintool', flatData)
    return (
      <AppShell
        styles={{
          main: {
            background: "#d5dbe0"
            // background:
            //   theme.colorScheme === "dark"
            //     ? theme.colors.dark[8]
            //     : theme.colors.gray[0],
          },
        }}
        navbarOffsetBreakpoint="sm"
        asideOffsetBreakpoint="sm"
        className="p-0 m-0 "
        fixed
        header={<RoiNavbar user={login.data.user.user} tokens={login.data.user.tokens} />}
      >
        <div className="flex-col sm:flex-row relative h-auto">
          {/* Template Specifics */}
          <TemplateSpecifics data={data?.data.adminTool} user={login.data.user} isFetching={isFetching} />
          <Sections user={login.data.user} data={data?.data.adminTool} choices={choices} fullData={flatData} />
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
  // Pass data to the page via props
  return { props: { data: session } }
}

export default AdminBuilder;
