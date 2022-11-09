import React, { SetStateAction, useEffect, useState } from "react";
import {
  AppShell,
  useMantineTheme,
  Input,
  Grid,
  Button,
  ScrollArea,
  Table,
  Badge,
  Text,
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
import { useLocalStorage } from "@mantine/hooks";
import { useRouter } from "next/router";
import Paginate from "@app/dashboard/components/table/paginate";
import {
  sortCompanyTemplatesData,
  ICompanyTemplatesProps,
  ICompanyTemplatesVersionsProps,
  sortCompanyTemplatesVersionData,
} from "@app/dashboard/components/table/utils/tableMethods";
import Th from "@app/dashboard/components/table/Thead";
import SkeletonLoader from "@app/core/components/loader/SkeletonLoader";
import { ICompanyElement } from "pages/company";
import Sidebar from "@app/core/components/sidebar/Sidebar";
import Pophover from "@app/core/components/popover/Pophover";
import EditCompanyUserButton from "@app/company/components/buttons/EditCompanyUser";
import AddCompanyUserButton from "@app/company/components/buttons/AddCompanyUser";
import TransferButton from "@app/company/components/buttons/Transfer";
import CompanyUserTable, {
  ICompanyUserTableProps,
} from "@app/company/user/table";
import MainLoader from "@app/core/components/loader/MainLoader";
import shortUUID from "short-uuid";
import AddTemplateButton from "@app/company/components/buttons/AddTemplate";
import EditTemplateButton from "@app/company/components/buttons/EditTemplate";
import AddVersion from "./buttons/AddVersion";
import EditVersion from "./buttons/EditVersion";
import FourOhFour from "pages/404";

interface ITemplateVersionType {
  update: () => void;
  temp_id: string;
  comp_id: string;
  first_temp: string;
  name: string;
  refTarget: any;
}
//`http://54.159.8.194/v1/company/${!!comp_id ? comp_id : company}/template/${!!temp_id ? temp_id : first_temp}/version`,
const getTemplatesVersions = async (
  comp: string,
  temp: string,
  value: string
) => {
  try {
    console.log(comp, temp);
    const res = await axios.get(
      `http://54.159.8.194/v1/company/${comp}/template/${temp}/version`,
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

const TemplateVersion: React.FC<ITemplateVersionType> = ({
  update,
  comp_id,
  temp_id,
  first_temp,
  name,
  refTarget,
}) => {
  const router = useRouter();
  const theme = useMantineTheme();
  const { classes, cx } = useStyles();
  const [value] = useLocalStorage({ key: "auth-token" });

  const { isLoading, isError, error, data, refetch, isFetching, isSuccess } =
    useQuery(
      ["get_all_company_templates_versions", temp_id],
      () => getTemplatesVersions(comp_id, temp_id, value),
      { refetchOnWindowFocus: false, enabled: temp_id.length > 0 }
    );

  useEffect(() => {
    update();
    refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [comp_id, temp_id, update]);

  const [limit, setLimit] = useState<number>(10);
  const [activePage, setPage] = useState<number>(1);
  const [allRoi, setAllRoi] = useState<any>();
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<string[]>([]);
  const [sortedData, setSortedData] = useState(data);
  const [sortBy, setSortBy] = useState<
    keyof ICompanyTemplatesVersionsProps | null
  >(null);
  const [reverseSortDirection, setReverseSortDirection] = useState(false);
  const [status, setStatus] = useState("");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    setSortedData(data);
  }, [data]);

  const indexOfLastPost = activePage * limit;
  const indexOfFirstPost = indexOfLastPost - limit;
  const currentPosts = sortedData?.slice(indexOfFirstPost, indexOfLastPost);

  const setSorting = (field: keyof ICompanyTemplatesVersionsProps) => {
    const reversed = field === sortBy ? !reverseSortDirection : false;
    setReverseSortDirection(reversed);
    setSortBy(field);
    setSortedData(
      sortCompanyTemplatesVersionData(data, { sortBy: field, reversed, search })
    );
  };

  const handleSearchChange = (event: React.SetStateAction<string>) => {
    setSearch(event);
    setSortedData(
      sortCompanyTemplatesVersionData(data, {
        sortBy,
        reversed: reverseSortDirection,
        search: event,
      })
    );
  };

  const handleFilterChange = (event: SetStateAction<string[]>) => {
    setFilter(event);
    setSortedData(
      sortCompanyTemplatesVersionData(data, {
        sortBy,
        reversed: reverseSortDirection,
        search: event,
      })
    );
  };

  const templates = currentPosts?.map(
    (item: ICompanyTemplatesVersionsProps) => ({
      id: item._id,
      name: item.name,
      notes: item.notes,
      status: item.status,
      stage: item.stage,
      level: item.level,
      versions: item.versions,
      actions: (
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          <EditVersion
            comp_id={comp_id}
            temp_id={temp_id}
            id={item._id}
            name={item.name}
            notes={item.notes}
            refetch={refetch}
            status={item.status}
            version={item.versions}
            key={shortUUID.generate()}
          />
          <Button radius="sm" size="xs" color="red" style={{ marginLeft: 1 }}>
            Delete
          </Button>
        </div>
      ),
    })
  );

  if (isLoading) {
    return <MainLoader />;
  }

  if (isSuccess) {
    // return isLoading ? (
    //   <MainLoader />
    // ) :
    return (
      <div style={{ margin: 10, backgroundColor: "white", padding: 30 }}>
        <Grid style={{ margin: 20 }}>
          {/* <TempList filter={filter} handleFilter={handleFilterChange} /> */}
          <AddVersion update={refetch} comp_id={comp_id} temp_id={temp_id} />
          <Text
            color="teal"
            weight={900}
            style={{ marginLeft: "auto", marginRight: "auto" }}
          >
            {name}
          </Text>
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
                  style={{ width: 400 }}
                >
                  Version Name
                </Th>
                <Th
                  sorted={sortBy === "name"}
                  reversed={reverseSortDirection}
                  onSort={() => setSorting("name")}
                  style={{ width: 220 }}
                >
                  Version Stage
                </Th>
                <Th
                  sorted={sortBy === "name"}
                  reversed={reverseSortDirection}
                  onSort={() => setSorting("name")}
                  style={{ width: 200 }}
                >
                  Level
                </Th>
                <Th
                  sorted={sortBy === "notes"}
                  reversed={reverseSortDirection}
                  onSort={() => setSorting("notes")}
                  style={{ width: 620 }}
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
            {isLoading || isFetching ? (
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
                    stage:
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
                    level:
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
                      <td style={{ width: 10 }}>{element.name}</td>
                      <td style={{ width: 10 }}>{element.stage}</td>
                      <td style={{ width: 10 }}>{element.level}</td>
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
        <div ref={refTarget}>
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
    );
  }

  if (isError) {
    return <FourOhFour />;
  }

  return <></>;
};

export default TemplateVersion;
