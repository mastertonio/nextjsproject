import React, { useEffect, useState } from "react";
import {
  AppShell,
  useMantineTheme,
  LoadingOverlay,
  Select,
  Text,
  Input,
  Grid,
  MultiSelect,
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
  const [current, setCurrent] = useLocalStorage({ key: "current-user" });
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<string[]>([])
  const p = router.query;

  useEffect(() => {
    console.log(dta);
  }, [dta]);

  const getDashboardData = async () => {
    try {
      const res = await axios.get(
        `http://54.159.8.194/v1/dashboard/${current}`,
        {
          headers: {
            Authorization: `Bearer ${value}`,
          },
        }
      );
      return res.data;
    } catch (error) {
      console.log(error, "rarara");
    }
  };

  const { isLoading, status, data, isFetching, refetch } = useQuery(
    "dashboardData",
    getDashboardData
  );

  const dataTemp = data?.my_roi?.map((element: { id: any; name: string }) => ({
    key: element.id,
    value: element.name,
    label: element.name,
  }));

  useEffect(()=>{
    console.log(filter)
  },[filter])

  if (isLoading)
    return <LoadingOverlay visible={router.isReady && isLoading} />;

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
      header={
        <RoiNavbar admin={data?.admin_list} actions={data?.template_list}  refetch={refetch}/>
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
          <CreateNewRoi actions={data?.template_list} refetch={refetch} />
          <RoiRanking rankings={data?.ranking} />
        </div>
      </div>
      <div className={classes.bar_graph_wrapper}>
        <Text size="lg">My ROIs</Text>
        <Grid style={{ margin: 20}}>
          <MultiSelect
            style={{ width: 150 }}
            placeholder="Filter"
            searchable
            clearable
            data={dataTemp ? dataTemp : []}
            onChange={(event)=>{
              setFilter(event)
            }}
          />
          <Input
            variant="default"
            placeholder="Search for ROI"
            style={{ marginLeft: 'auto'}}
            onChange={(event: {
              target: { value: React.SetStateAction<string> };
            }) => {
              setSearch(event.target.value);
            }}
          />
        </Grid>
        <Row
          my_roi={data.my_roi}
          refetch={refetch}
          search={search}
          filters={filter}
        />
      </div>
    </AppShell>
  );
};

// const getStaticPaths: GetStaticPaths = async(context: GetStaticPathsContext)=> {
//   return {
//     paths: [
//       { params: { id: 1 } }
//     ],
//     fallback: false
//   };
// }

const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  console.log(context.req, "qqqq");
  const user = context.query;
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
