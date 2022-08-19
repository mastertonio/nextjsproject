import React, { SetStateAction, useEffect, useState } from "react";
import {
  AppShell,
  useMantineTheme,
  LoadingOverlay,
  Select,
  Text,
  Input,
  Grid,
  MultiSelect,
  Button,
  ScrollArea,
  Table,
  Center,
  Badge,
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
import { FaPlusSquare } from "react-icons/fa";
import Paginate from "@app/dashboard/components/table/paginate";
import EditCompanyButton from "@app/company/components/buttons/EditCompanyButton";
import { FiUsers } from "react-icons/fi";
import { HiTemplate } from "react-icons/hi";
import Segmented from "@app/core/components/buttons/Segmented";
import { AiOutlineFolderOpen } from "react-icons/ai";
import {
  filterCompanyUsersData,
  ICompanyUsersProps,
  sortCompanyUsersData,
} from "@app/dashboard/components/table/utils/tableMethods";
import Th from "@app/dashboard/components/table/Thead";
import SkeletonLoader from "@app/core/components/loader/SkeletonLoader";
import { ICompanyElement } from "pages/company";
import Sidebar from "@app/core/components/sidebar/Sidebar";
import Pophover from "@app/core/components/popover/Pophover";
import { useAppDispatch, useAppSelector } from "@redux/store";

interface ICompanyUsersElements {
  id: React.Key | null | undefined;
  username:
    | string
    | number
    | boolean
    | React.ReactElement<any, string | React.JSXElementConstructor<any>>
    | React.ReactFragment
    | React.ReactPortal
    | null
    | undefined;
  created_rois:
    | string
    | number
    | boolean
    | React.ReactElement<any, string | React.JSXElementConstructor<any>>
    | React.ReactFragment
    | React.ReactPortal
    | null
    | undefined;
  role:
    | string
    | number
    | boolean
    | React.ReactElement<any, string | React.JSXElementConstructor<any>>
    | React.ReactFragment
    | React.ReactPortal
    | null
    | undefined;
  manager:
    | string
    | number
    | boolean
    | React.ReactElement<any, string | React.JSXElementConstructor<any>>
    | React.ReactFragment
    | React.ReactPortal
    | null
    | undefined;
  currency:
    | string
    | number
    | boolean
    | React.ReactElement<any, string | React.JSXElementConstructor<any>>
    | React.ReactFragment
    | React.ReactPortal
    | null
    | undefined;
  status:
    | string
    | number
    | boolean
    | React.ReactElement<any, string | React.JSXElementConstructor<any>>
    | React.ReactFragment
    | React.ReactPortal
    | null
    | undefined;
  actions:
    | string
    | number
    | boolean
    | React.ReactElement<any, string | React.JSXElementConstructor<any>>
    | React.ReactFragment
    | React.ReactPortal
    | null
    | undefined;
}

const Dashboard: React.FC = () => {
  const router = useRouter();
  const theme = useMantineTheme();
  const { classes, cx } = useStyles();
  const [value] = useLocalStorage({ key: "auth-token" });
  const [current, setCurrent] = useLocalStorage({ key: "current-user" });
  const [company, setCompany] = useLocalStorage({ key: "my-company" });
  const users = useAppSelector((state) => state.user);
  const p = router.query;

  const getCompanyUsers = async () => {
    try {
      const res = await axios.get(
        `http://54.159.8.194/v1/company/${company}/user`,
        {
          headers: {
            Authorization: `Bearer ${value}`,
          },
        }
      );
      return res.data;
    } catch (error) {
      return error;
    }
  };

  const { isLoading, isError, error, data, refetch, isFetching } = useQuery(
    "get_all_company_users",
    getCompanyUsers
  );

  const [limit, setLimit] = useState<number>(10);
  const [activePage, setPage] = useState<number>(1);
  const [allRoi, setAllRoi] = useState<any>();
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<string[]>([]);
  const [sortedData, setSortedData] = useState(data);
  const [sortBy, setSortBy] = useState<keyof ICompanyUsersProps | null>(null);
  const [reverseSortDirection, setReverseSortDirection] = useState(false);
  const [status, setStatus] = useState("");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    console.log(filter);
  }, [filter]);

  useEffect(() => {
    setSortedData(data);
  }, [data]);

  const indexOfLastPost = activePage * limit;
  const indexOfFirstPost = indexOfLastPost - limit;
  const currentPosts = sortedData?.slice(indexOfFirstPost, indexOfLastPost);

  const setSorting = (field: keyof ICompanyUsersProps) => {
    const reversed = field === sortBy ? !reverseSortDirection : false;
    setReverseSortDirection(reversed);
    setSortBy(field);
    setSortedData(
      sortCompanyUsersData(data, { sortBy: field, reversed, search })
    );
  };

  const handleSearchChange = (event: React.SetStateAction<string>) => {
    setSearch(event);
    setSortedData(
      sortCompanyUsersData(data, {
        sortBy,
        reversed: reverseSortDirection,
        search: event,
      })
    );
  };

  const handleFilterChange = (event: SetStateAction<string[]>) => {
    setFilter(event);
    setSortedData(
      sortCompanyUsersData(data, {
        sortBy,
        reversed: reverseSortDirection,
        search: event,
      })
    );
  };

  const companies = currentPosts?.map((item: ICompanyUsersProps) => ({
    id: item._id,
    username: <Pophover title={item.email} />,
    first_name: item.first_name,
    last_name: item.last_name,
    created_rois: item.created_rois,
    currency: item.currency,
    status: item.status,
    role: item.role,
    s: item.manager,
    actions: (
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: 'center'
        }}
      >
        <Button
          leftIcon={<HiTemplate />}
          size="xs"
          color="yellow"
          onClick={() => {
            router.push(`/templates`);
          }}
        >
          Edit
        </Button>
        <Button
          leftIcon={<FiUsers />}
          size="xs"
          color="cyan"
          onClick={() => {
            router.push(`/users`);
          }}
        >
          Transfer
        </Button>
      </div>
    ),
  }));

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
      navbar={<Sidebar />}
    >
      <div style={{ margin: 10, backgroundColor: "white", padding: 50 }}>
        <Grid style={{ margin: 20 }}>
          {/* <TempList filter={filter} handleFilter={handleFilterChange} /> */}
          <Text size="lg">My ROIs</Text>
          <Input
            variant="default"
            placeholder="Search for ROI"
            style={{ marginLeft: "auto" }}
            onChange={(event: {
              target: { value: React.SetStateAction<string> };
            }) => {
              handleSearchChange(event.target.value);
            }}
          />
        </Grid>
        <ScrollArea
          style={{ height: 620 }}
          onScrollPositionChange={({ y }) => setScrolled(y !== 0)}
        >
          <Table
            className={classes.table}
            highlightOnHover
            verticalSpacing="xs"
            horizontalSpacing="xl"
          >
            <thead
              className={cx(classes.header, { [classes.scrolled]: scrolled })}
              style={{ zIndex: 50 }}
            >
              <tr>
                <Th
                  sorted={sortBy === "email"}
                  reversed={reverseSortDirection}
                  onSort={() => setSorting("email")}
                  style={{ width: 300 }}
                >
                  User Name
                </Th>
                <Th
                  sorted={sortBy === "created_rois"}
                  reversed={reverseSortDirection}
                  onSort={() => setSorting("created_rois")}
                  style={{ width: 170 }}
                >
                  Created Rois
                </Th>
                <Th
                  sorted={sortBy === "role"}
                  reversed={reverseSortDirection}
                  onSort={() => setSorting("role")}
                  style={{ width: 170 }}
                >
                  Role
                </Th>
                <Th
                  sorted={sortBy === "manager"}
                  reversed={reverseSortDirection}
                  onSort={() => setSorting("manager")}
                  style={{ width: 250 }}
                >
                  Manager
                </Th>
                <Th
                  sorted={sortBy === "currency"}
                  reversed={reverseSortDirection}
                  onSort={() => setSorting("currency")}
                  style={{ width: 110 }}
                >
                  Currency
                </Th>
                <Th
                  sorted={sortBy === "status"}
                  reversed={reverseSortDirection}
                  onSort={() => setSorting("status")}
                  style={{ width: 130 }}
                >
                  Status
                </Th>
                <th></th>
              </tr>
            </thead>
            {isLoading ? (
              <SkeletonLoader />
            ) : (
              <tbody>
                {companies?.map((element: ICompanyUsersElements) => (
                  <tr key={element.id} style={{ height: 20 }}>
                    <td style={{ width: 10 }}>{element.username}</td>
                    <td
                      style={{
                        cursor: "pointer",
                        width: 140,
                        paddingLeft: 30,
                      }}
                    >
                      {element.created_rois}
                    </td>
                    <td>{element.role}</td>
                    <td>
                      {!!element.manager ? element.manager : "Unassigned"}
                    </td>
                    <td style={{ width: 145, paddingLeft: 30 }}>
                      {element.currency}
                    </td>
                    <td
                      style={{
                        width: 110,
                      }}
                    >
                      <Badge color="green" variant="outline">
                        {element.status}
                      </Badge>
                    </td>
                    <td>{element.actions}</td>
                  </tr>
                ))}
              </tbody>
            )}
          </Table>
        </ScrollArea>
        <div>
          <Paginate
            refetch={refetch}
            page={sortedData ? Math.ceil(sortedData?.length / limit) : 10}
            limit={limit}
            totalResults={sortedData?.length}
            setLimit={setLimit}
            activePage={activePage}
            setPage={setPage}
            firstIndex={indexOfFirstPost}
            lastIndex={indexOfLastPost}
          />
        </div>
      </div>
    </AppShell>
  );
};

// export async function getServerSideProps(ctx: any) {
//   // Fetch data from external API
//   console.log(ctx.req.cookies)
//   const res = await fetch(`https://jsonplaceholder.typicode.com/posts/`)
//   const data = await res.json()

//   // Pass data to the page via props
//   return { props: { data } }
// }

export default Dashboard;
