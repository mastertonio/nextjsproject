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
  Alert
} from "@mantine/core";
import { useStyles } from "@styles/dashboardStyle";
import axios from "axios";
import { useQuery, useQueries } from "react-query";

import RoiNavbar from "@core/components/navbar/MainNavbar";
import { useLocalStorage } from "@mantine/hooks";
import { useRouter } from "next/router";
import Paginate from "@app/dashboard/components/table/paginate";
import {
  filterCompanyUsersData,
  ICompanyUsersProps,
  sortCompanyUsersData,
} from "@app/dashboard/components/table/utils/tableMethods";
import Th from "@app/dashboard/components/table/Thead";
import SkeletonLoader from "@app/core/components/loader/SkeletonLoader";
import { ICompanyElement } from "pages/company";
import Sidebar from "@app/core/components/sidebar/AdminRoleSidebar";
import Pophover from "@app/core/components/popover/Pophover";
import EditCompanyUserButton from "@app/company/components/buttons/EditCompanyUser";
import AddCompanyUserButton from "@app/company/components/buttons/AddCompanyUser";
import TransferButton from "@app/company/components/buttons/Transfer";
import CompanyUserTable from "@app/company/user/table";
import MainLoader from "@app/core/components/loader/MainLoader";
import { useUserStore } from "@app/store/userState";
import { getSession } from "next-auth/react";

export interface ICompanyUsersElements {
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
  manager_email:
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

const UsersDashboard: React.FC<any> = (login) => {
  const router = useRouter();
  const theme = useMantineTheme();
  const { classes, cx } = useStyles();
  const p = router.query;
  const userZ = useUserStore((state) => (state.user))

  const getCompanyUsers = async () => {
    return await axios.get(
      `/v1/company/${login.data.user.user.company_id}/user`, {
      headers: {
        Authorization: `Bearer ${login.data.user.tokens.access.token}`,
      },
    }
    );
  };

  const { isLoading, isError, error, data, refetch, isFetching } = useQuery(
    "get_all_company_users",
    getCompanyUsers
  );

  const queries = [
    {
      queryKey: ["license"],
      queryFn: async () => {
        const res = await axios.get(`/v1/company/${login.data.user.user.company_id}/license`, {
          headers: {
            Authorization: `Bearer ${login.data.user.tokens.access.token}`,
          },
        });
        return res.data;
      },
    },
  ];

  const results = useQueries(queries);

  const [limit, setLimit] = useState<number>(10);
  const [activePage, setPage] = useState<number>(1);
  const [allRoi, setAllRoi] = useState<any>();
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<string[]>([]);
  const [sortedData, setSortedData] = useState(data?.data);
  const [sortBy, setSortBy] = useState<keyof ICompanyUsersProps | null>(null);
  const [reverseSortDirection, setReverseSortDirection] = useState(false);
  const [status, setStatus] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const [userData, setUserData] = useState();

  useEffect(() => {
    setSortedData(data?.data);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const indexOfLastPost = activePage * limit;
  const indexOfFirstPost = indexOfLastPost - limit;
  const currentPosts = sortedData?.slice(indexOfFirstPost, indexOfLastPost);

  const setSorting = (field: keyof ICompanyUsersProps) => {
    const reversed = field === sortBy ? !reverseSortDirection : false;
    setReverseSortDirection(reversed);
    setSortBy(field);
    setSortedData(
      sortCompanyUsersData(data?.data, { sortBy: field, reversed, search })
    );
  };

  const handleSearchChange = (event: React.SetStateAction<string>) => {
    setSearch(event);
    setSortedData(
      sortCompanyUsersData(data?.data, {
        sortBy,
        reversed: reverseSortDirection,
        search: event,
      })
    );
  };

  const handleFilterChange = (event: SetStateAction<string[]>) => {
    setFilter(event);
    setSortedData(
      sortCompanyUsersData(data?.data, {
        sortBy,
        reversed: reverseSortDirection,
        search: event,
      })
    );
  };

  const companies = currentPosts?.map((item: ICompanyUsersProps) => ({
    id: item._id,
    username: item.email,
    first_name: item.first_name,
    last_name: item.last_name,
    created_rois: item.created_rois,
    currency: item.currency,
    status: item.status,
    role: item.role === 'admin' ? 'Admin' : item.role === 'company-admin' ? 'Company Admin' : item.role === 'company-manager' ? 'Manager/Director' : 'End User',
    manager_email: item.manager_email,
    manager_id: item.manager_id,
    actions: (
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: 'center'
        }}
      >
        <EditCompanyUserButton user={login.data.user} id={item._id} myCompany={item} refetch={refetch} name={item.email} />
        <TransferButton user={login.data.user} id={item._id} name={item.email} refetch={refetch} comp_id={login.data.user.user.company_id} />
      </div>
    ),
  }));

  // const currentPostsData = currentPosts?.map((item: ICompanyUsersProps) => {
  //   return item;
  // })

  // setUserData(currentPostsData)


  return isLoading ? <MainLoader /> : (
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
      className=""
      fixed
      header={<RoiNavbar user={login.data.user.user} tokens={login.data.user.tokens} />}
      navbar={<Sidebar user={login.data.user.user} tokens={login.data.user.tokens} />}
    >
      <div className="bg-white p-[10px] sm:p-[20px]">
        {login.data.user.user.role === 'company-admin' ? (
          <Grid className="m-[10px] pt-[20px]">
            <Alert color="teal" className="pt-[10px] pb-[10px] w-full">
              <span className="text-[14px] text-slate-500 font-medium"><span className="text-slate-700 font-semibold">{results[0]?.data?.company_name}</span> has <span className="text-slate-700 font-semibold">{results[0]?.data ? results[0]?.data?.company_license : 0}</span> licenses and <span className="text-slate-700 font-semibold">{results[0]?.data ? results[0]?.data?.user_count : 0}</span> users.</span>
            </Alert>
            {/* <Badge color="teal" variant="filled" size="md" className="leading-[9px]">
            The ROI Shop currently has {results[0]?.data?.company_license} licenses and {results[0]?.data?.user_count} users.
          </Badge> */}
          </Grid>
        ) : null}
        <Grid className="m-[10px] pt-[20px] pb-[20px]">
          {/* <TempList filter={filter} handleFilter={handleFilterChange} /> */}
          <AddCompanyUserButton user={login.data.user.user} tokens={login.data.user.tokens} myCompany={userData} refetch={refetch} />
          <Input
            variant="default"
            placeholder="Search for ROI"
            className="ml-auto w-full sm:w-[unset] mt-[20px] sm:mt-0"
            onChange={(event: {
              target: { value: React.SetStateAction<string> };
            }) => {
              handleSearchChange(event.target.value);
            }}
          />
        </Grid>
        <ScrollArea
          className="h-[590px]"
          onScrollPositionChange={({ y }) => setScrolled(y !== 0)}
        >
          <Table
            className={`min-w-full divide-y`}
            highlightOnHover
            verticalSpacing="xs"
            horizontalSpacing="xl"
          >
            <thead
              className={`${cx(classes.header, { [classes.scrolled]: scrolled })}z-[50]`}
            >
              <tr>
                <Th
                  sorted={sortBy === "email"}
                  reversed={reverseSortDirection}
                  onSort={() => setSorting("email")}
                  style="!px-6 !py-3 text-left tracking-wider !border-white !border-0"
                >
                  User Name
                </Th>
                <Th
                  sorted={sortBy === "created_rois"}
                  reversed={reverseSortDirection}
                  onSort={() => setSorting("created_rois")}
                  style="!px-6 !py-3 text-left tracking-wider !border-white !border-0"
                >
                  Created Rois
                </Th>
                <Th
                  sorted={sortBy === "role"}
                  reversed={reverseSortDirection}
                  onSort={() => setSorting("role")}
                  style="px-6 py-3 text-left tracking-wider !border-white !border-0"
                >
                  Role
                </Th>
                <Th
                  sorted={sortBy === "manager_email"}
                  reversed={reverseSortDirection}
                  onSort={() => setSorting("manager_email")}
                  style="px-6 py-3 text-left tracking-wider !border-white !border-0"
                >
                  Manager
                </Th>
                <Th
                  sorted={sortBy === "currency"}
                  reversed={reverseSortDirection}
                  onSort={() => setSorting("currency")}
                  style="px-6 py-3 text-left tracking-wider !border-white !border-0"
                >
                  Currency
                </Th>
                <Th
                  sorted={sortBy === "status"}
                  reversed={reverseSortDirection}
                  onSort={() => setSorting("status")}
                  style="px-6 py-3 text-left tracking-wider !border-white !border-0"
                >
                  Status
                </Th>
                <th className="px-6 py-3 text-left tracking-wider !border-white !border-0 !p-[10px]"></th>
              </tr>
            </thead>
            {isLoading ? (
              <SkeletonLoader />
            ) : (
              <tbody className="divide-y">
                {companies?.map((element: ICompanyUsersElements) => (
                  <tr key={element.id} className="h-[20px]">
                    <td style={{ width: 10 }} className="px-6 py-4 whitespace-nowrap">{element.username}</td>
                    <td
                      className="cursor-pointer px-6 py-4 whitespace-nowrap"
                    >
                      {element.created_rois}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">{element.role}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {!!element.manager_email ? element.manager_email : "Unassigned"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {element.currency}
                    </td>
                    <td
                      className="px-6 py-4 whitespace-nowrap"
                    >
                      <Badge color="green" variant="outline">
                        {element.status}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">{element.actions}</td>
                  </tr>
                ))}
              </tbody>
            )}
          </Table>
        </ScrollArea>
        <div className="mb-[40px]">
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
      <CompanyUserTable user={login.data.user} company={login.data.user.user.company_id ? login.data.user.user.company_id : ''} update={refetch} />
    </AppShell >
  );
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

export default UsersDashboard