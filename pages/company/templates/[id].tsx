import React, { SetStateAction, useEffect, useState, useRef } from "react";
import {
  AppShell,
  useMantineTheme,
  Input,
  Grid,
  Button,
  ScrollArea,
  Table,
  Badge,
  Divider,
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
import { useLocalStorage, useScrollIntoView, useWindowScroll } from "@mantine/hooks";
import { useRouter } from "next/router";
import Paginate from "@app/dashboard/components/table/paginate";
import {
  sortCompanyTemplatesData,
  ICompanyTemplatesProps,
} from "@app/dashboard/components/table/utils/tableMethods";
import Th from "@app/dashboard/components/table/Thead";
import SkeletonLoader from "@app/core/components/loader/SkeletonLoader";
import { ICompanyElement } from "pages/company";
import Sidebar from "@app/core/components/sidebar/Sidebar";
import Pophover from "@app/core/components/popover/Pophover";
import EditCompanyUserButton from "@app/company/components/buttons/EditCompanyUser";
import AddCompanyUserButton from "@app/company/components/buttons/AddCompanyUser";
import TransferButton from "@app/company/components/buttons/Transfer";
import CompanyUserTable from "@app/company/user/table";
import MainLoader from "@app/core/components/loader/MainLoader";
import shortUUID from "short-uuid";
import AddTemplateButton from "@app/company/components/buttons/AddTemplate";
import EditTemplateButton from "@app/company/components/buttons/EditTemplate";
import TemplateVersion from "@app/company/components/TemplateVersion";
import FourOhFour from "pages/404";

const getCompanyTemplate = async (_id: string, token: string) => {
  try {
    const res = await axios.get(
      `http://54.159.8.194/v1/company/${_id}/template`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res.data;
  } catch (error) {
    return error;
  }
};

const TemplateDashboard: React.FC = () => {
  const { scrollIntoView, targetRef } = useScrollIntoView<HTMLDivElement>({ offset: 60 });
  const router = useRouter();
  const theme = useMantineTheme();
  const { classes, cx } = useStyles();
  const [value] = useLocalStorage({ key: "auth-token" });
  const [current, setCurrent] = useLocalStorage({ key: "current-user" });
  const [company, setCompany] = useLocalStorage({ key: "my-company" });
  const templatesID =
    typeof router.query?.id === "string" ? router.query.id : "";

  const { isLoading, isError, error, data, refetch, isFetching, isSuccess } =
    useQuery(
      ["get_specific_company_templates", templatesID],
      () => getCompanyTemplate(templatesID, value),
      {
        enabled: templatesID.length > 0,
      }
    );

  const [limit, setLimit] = useState<number>(10);
  const [activePage, setPage] = useState<number>(1);
  const [allRoi, setAllRoi] = useState<any>();
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<string[]>([]);
  const [sortedData, setSortedData] = useState(data);
  const [sortBy, setSortBy] = useState<keyof ICompanyTemplatesProps | null>(
    null
  );
  const [reverseSortDirection, setReverseSortDirection] = useState(false);
  const [name, setName] = useState("");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    setSortedData(data);
  }, [data]);

  const indexOfLastPost = activePage * limit;
  const indexOfFirstPost = indexOfLastPost - limit;
  const currentPosts = sortedData?.slice(indexOfFirstPost, indexOfLastPost);

  const setSorting = (field: keyof ICompanyTemplatesProps) => {
    const reversed = field === sortBy ? !reverseSortDirection : false;
    setReverseSortDirection(reversed);
    setSortBy(field);
    setSortedData(
      sortCompanyTemplatesData(data, { sortBy: field, reversed, search })
    );
  };

  const handleSearchChange = (event: React.SetStateAction<string>) => {
    setSearch(event);
    setSortedData(
      sortCompanyTemplatesData(data, {
        sortBy,
        reversed: reverseSortDirection,
        search: event,
      })
    );
  };

  const handleFilterChange = (event: SetStateAction<string[]>) => {
    setFilter(event);
    setSortedData(
      sortCompanyTemplatesData(data, {
        sortBy,
        reversed: reverseSortDirection,
        search: event,
      })
    );
  };

  const [temp_id, setTemp] = useState<string>("");
  const [comp_id, setComp] = useState<string>("");
  const templates = currentPosts?.map((item: ICompanyTemplatesProps) => ({
    id: item._id,
    name: (
      <span
        style={{ cursor: "pointer", width: 10 }}
        onClick={() => {
          setTemp(item._id);
          setComp(item.company_id);
          setName(item.name);
          scrollIntoView({ alignment: 'center' })
          refetch;
        }}
      >
        {item.name}
      </span>
    ),
    notes: item.notes,
    status: item.status,
    active: item.active,
    company_id: item.company_id,
    actions: (
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
        }}
      >
        <EditTemplateButton
          id={item._id}
          notes={item.notes}
          status={item.active}
          refetch={refetch}
          name={item.name}
          key={shortUUID.generate()}
        />
        <Button radius="sm" size="xs" color="red" style={{ marginLeft: 1 }}>
          Delete
        </Button>
      </div>
    ),
  }));

  if (isLoading) {
    return <MainLoader />;
  }

  if (isSuccess) {
    // return isLoading ? (
    //   <MainLoader />
    // ) :
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
            <AddTemplateButton refetch={refetch} />
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
            style={{ height: 590 }}
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
                    sorted={sortBy === "name"}
                    reversed={reverseSortDirection}
                    onSort={() => setSorting("name")}
                    style={{ width: 300 }}
                  >
                    Template Name
                  </Th>
                  <Th
                    sorted={sortBy === "notes"}
                    reversed={reverseSortDirection}
                    onSort={() => setSorting("notes")}
                    style={{ width: 670 }}
                  >
                    Notes
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
                  {templates?.map(
                    (element: {
                      _id: React.Key | null | undefined;
                      name:
                        | string
                        | number
                        | boolean
                        | React.ReactElement<
                            any,
                            string | React.JSXElementConstructor<any>
                          >
                        | React.ReactFragment
                        | React.ReactPortal
                        | null
                        | undefined;
                      notes:
                        | string
                        | number
                        | boolean
                        | React.ReactElement<
                            any,
                            string | React.JSXElementConstructor<any>
                          >
                        | React.ReactFragment
                        | React.ReactPortal
                        | null
                        | undefined;
                      status:
                        | string
                        | number
                        | boolean
                        | React.ReactElement<
                            any,
                            string | React.JSXElementConstructor<any>
                          >
                        | React.ReactFragment
                        | React.ReactPortal
                        | null
                        | undefined;
                      actions:
                        | string
                        | number
                        | boolean
                        | React.ReactElement<
                            any,
                            string | React.JSXElementConstructor<any>
                          >
                        | React.ReactFragment
                        | React.ReactPortal
                        | null
                        | undefined;
                    }) => (
                      <tr key={element._id} style={{ height: 20 }}>
                        <td>{element.name}</td>
                        <td
                          style={{
                            cursor: "pointer",
                            width: 140,
                            paddingLeft: 30,
                          }}
                        >
                          {element.notes}
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
                    )
                  )}
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

          {temp_id !== "" ? (
            <>
              <Divider my="lg" size="xl" style={{ marginTop: 70 }} />
              <TemplateVersion
                refTarget={targetRef}
                update={refetch}
                comp_id={templatesID}
                temp_id={temp_id}
                first_temp={data?.[0]._id}
                name={name}
              />
            </>
          ) : (
            ""
          )}
        </div>
      </AppShell>
    );
  }

  if (isError) {
    return <FourOhFour />;
  }

  return <></>;
};

// export async function getServerSideProps(ctx: any) {
//   // Fetch data from external API
//   console.log(ctx.req.cookies)
//   const res = await fetch(`https://jsonplaceholder.typicode.com/posts/`)
//   const data = await res.json()

//   // Pass data to the page via props
//   return { props: { data } }
// }

export default TemplateDashboard;
