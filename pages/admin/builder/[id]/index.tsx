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
import { useCalculatorSheetStore, useCalculatorStore } from "@app/store/builder/calculatorStore";
import he from "he";
import { convertHtmlToPlainText } from "@app/admin/components/SectionEditEntries";
import { FcComboChart } from "react-icons/fc";
import io from 'socket.io-client';

const socket = io('http://localhost:3001');

const AdminBuilder: React.FC<any> = (login) => {
  const router = useRouter();
  const theme = useMantineTheme();
  const { classes } = useStyles();
  const userZ = useUserStore((state) => (state.user))
  const tokenChar = useTokenStore((state) => (state.tokenChar))
  const cells = useCalculatorSheetStore((state) => state.cells)
  const sectionStore = useAdminSectionStore
  const addItems = useCalculatorStore((state) => state.addItems)
  const celll = useCalculatorStore((state) => state.cells)
  const [message, setMessage] = useState('');
  const [receivedMessage, setReceivedMessage] = useState('');
  // const sections = useAdminSectionStore((state) => (state.sections))

  useEffect(() => {
    // Event listener for receiving messages from the server
    socket.on('message', (message) => {
      setReceivedMessage(message);
    });

    // Clean up the event listener on component unmount
    return () => {
      socket.off('message');
    };
  }, []);

  const sendMessage = () => {
    socket.emit('message', message); // Send the message to the server
    setMessage('');
  };

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

  const getEnterpriseData = async () => {
    return await axios.get(`/v1/templateBuilder/${router.query.ver_id}`, {
      headers: {
        Authorization: `Bearer ${login.data.user.tokens.access.token}`,
      },
    });
  };

  const { isLoading, status, data, isFetching, refetch, isSuccess } = useQuery('adminToolData', getAdminToolData);

  const query2 = useQuery('data2', getEnterpriseData);
  const flatData = data?.data?.adminTool?.sections.map((section: { grayContent: { elements: any; }; }) => section.grayContent.elements).flat()

  useEffect(() => {
    addItems(flatData)
    console.log("triggered", flatData, celll)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data])
  if (isLoading) return <MainLoader />;

  if (isSuccess) {
    const flatData = data?.data?.adminTool?.sections.map((section: { grayContent: { elements: any; }; }) => section.grayContent.elements).flat()
    const choices = data?.data?.adminTool?.sections.map((section: { grayContent: { elements: any; }; }) => section.grayContent.elements).flat().map((elem: { address: string; title: string; }) => ({ value: elem.address, label: convertHtmlToPlainText(he.decode(elem.title)) }))
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
          <div>
            <h1>First Screen</h1>
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <button onClick={sendMessage}>Send</button>
            <h2>Received Message on Second Screen: {receivedMessage}</h2>
          </div>
          <div className="bg-[#ffffff] shadow p-[10px]">
            <h1 className="text-[20px] sm:text-[28px] text-slate-800 font-bold flex flex-row items-center ml-[20px]">
              <FcComboChart className="text-blue-600 mr-[10px] text-[40px] sm:text-[30px]" />
              <h1 className="text-left text-[#676a6c] text-[26px] sm:text-[30px] font-medium">{query2.data?.data?.templateBuilderInfo?.name} | {query2.data?.data?.templateBuilderInfo?.projection} Year Projection</h1>
              <span className="float-right ml-auto text-[#216C2A] font-bold">$0</span>
            </h1>
          </div>
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
