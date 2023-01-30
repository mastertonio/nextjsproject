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
import { useLocalStorage } from "@mantine/hooks";
import Paginate from "@app/dashboard/components/table/paginate";
import {
  filterCompanyUsersData,
  ICompanyTemplateUsersProps,
  ICompanyUsersProps,
  sortCompanyTemplateUsersData,
  sortCompanyUsersData,
} from "@app/dashboard/components/table/utils/tableMethods";
import Th from "@app/dashboard/components/table/Thead";
import SkeletonLoader from "@app/core/components/loader/SkeletonLoader";
import Pophover from "@app/core/components/popover/Pophover";
import TransferSingleButton from "../components/buttons/TransferSingle";
import shortUUID from "short-uuid";
import MainLoader from "@app/core/components/loader/MainLoader";
import FourOhFour from "pages/404";

export interface ICompanyUserTable {
  user_id: string;
  template_name: string;
  calculator_name: string;
  username: string;
  link: string;
  createdAt: string;
  visits: string;
  unique_ip: string;
}

export interface ICompanyUserTableProps {
  update: () => void;
  company: string;
}



const CompanyUserTable: React.FC<ICompanyUserTableProps> = ({
  company,
  update,
}) => {
  const { classes, cx } = useStyles();
  const [value] = useLocalStorage({ key: "auth-token" });

  const getCompanyUsers = async (company: string) => {
    return await axios.get(
      `/v1/company/${company}/user/templates`
    );
  };

  const { isLoading, isError, error, data, refetch, isFetching, isSuccess } =
    useQuery(
      ["get_all_company_users_with_templates"],
      () => getCompanyUsers(company),
      { enabled: company.length > 0 }
    );

  const [limit, setLimit] = useState<number>(10);
  const [activePage, setPage] = useState<number>(1);
  const [allRoi, setAllRoi] = useState<any>();
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<string[]>([]);
  const [sortedData, setSortedData] = useState(data?.data);
  const [sortBy, setSortBy] = useState<keyof ICompanyTemplateUsersProps | null>(
    null
  );
  const [reverseSortDirection, setReverseSortDirection] = useState(false);
  const [status, setStatus] = useState("");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    setSortedData(data?.data);
  }, [data]);

  const indexOfLastPost = activePage * limit;
  const indexOfFirstPost = indexOfLastPost - limit;
  const currentPosts = sortedData?.slice(indexOfFirstPost, indexOfLastPost);

  const setSorting = (field: keyof ICompanyTemplateUsersProps) => {
    const reversed = field === sortBy ? !reverseSortDirection : false;
    setReverseSortDirection(reversed);
    setSortBy(field);
    setSortedData(
      sortCompanyTemplateUsersData(data?.data, { sortBy: field, reversed, search })
    );
  };

  const handleSearchChange = (event: React.SetStateAction<string>) => {
    setSearch(event);
    setSortedData(
      sortCompanyTemplateUsersData(data?.data, {
        sortBy,
        reversed: reverseSortDirection,
        search: event,
      })
    );
  };

  const handleFilterChange = (event: SetStateAction<string[]>) => {
    setFilter(event);
    setSortedData(
      sortCompanyTemplateUsersData(data?.data, {
        sortBy,
        reversed: reverseSortDirection,
        search: event,
      })
    );
  };

  const companyUsers = currentPosts?.map(
    (item: ICompanyTemplateUsersProps) => ({
      id: item.user_id,
      templatee_id: item.template_id,
      template_name: item.template_name,
      calculator_name: item.calculator_name,
      username: item.username,
      link: <Pophover title={item.link} />,
      createdAt: item.createdAt,
      visits: item.visits,
      unique_ip: item.unique_ip,
      actions: (
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          <TransferSingleButton
            id={item.user_id}
            name={item.username}
            refetch={update}
            tempId={item.template_id}
          />
        </div>
      ),
    })
  );

  if (isFetching) {
    return <MainLoader />;
  }

  if (isSuccess) {
    return (
      <div>
        <div style={{ margin: 10, backgroundColor: "white", padding: 50 }}>
          <Grid style={{ margin: 20 }}>
            <Text weight={700}> The ROI Shop User Calculators</Text>
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
                    sorted={sortBy === "username"}
                    reversed={reverseSortDirection}
                    onSort={() => setSorting("username")}
                    style="w-[300px] !border-white !border-0"
                  >
                    User Name
                  </Th>
                  <Th
                    sorted={sortBy === "calculator_name"}
                    reversed={reverseSortDirection}
                    onSort={() => setSorting("calculator_name")}
                    style="w-[250px] !border-white !border-0"
                  >
                    Calculator Name
                  </Th>
                  <Th
                    sorted={sortBy === "template_name"}
                    reversed={reverseSortDirection}
                    onSort={() => setSorting("template_name")}
                    style="w-[250px] !border-white !border-0"
                  >
                    Template Name
                  </Th>
                  <Th
                    sorted={sortBy === "createdAt"}
                    reversed={reverseSortDirection}
                    onSort={() => setSorting("createdAt")}
                    style="w-[400px] !border-white !border-0"
                  >
                    Created Date
                  </Th>
                  <Th
                    sorted={sortBy === "visits"}
                    reversed={reverseSortDirection}
                    onSort={() => setSorting("visits")}
                    style="w-[110px] !border-white !border-0"
                  >
                    Visits
                  </Th>
                  <Th
                    sorted={sortBy === "unique_ip"}
                    reversed={reverseSortDirection}
                    onSort={() => setSorting("unique_ip")}
                    style="w-[130px] !border-white !border-0"
                  >
                    Unique
                  </Th>
                  <th className="!border-white !border-0"></th>
                </tr>
              </thead>
              {isLoading ? (
                <SkeletonLoader />
              ) : (
                <tbody>
                  {companyUsers?.map((element: any) => (
                    <tr key={shortUUID.generate()} style={{ height: 20 }}>
                      <td style={{ width: 10 }}>{element.username}</td>
                      <td
                        style={{
                          cursor: "pointer",
                          width: 140,
                          paddingLeft: 30,
                        }}
                      >
                        {element.calculator_name}
                      </td>
                      <td>{element.template_name}</td>
                      <td>{element.createdAt}</td>
                      <td style={{ width: 145, paddingLeft: 30 }}>
                        {element.visits}
                      </td>
                      <td
                        style={{
                          width: 110,
                        }}
                      >
                        {element.unique_ip}
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
      </div>
    );
  }

  if (isError) {
    return <FourOhFour />;
  }

  return <></>;
};

export default CompanyUserTable;
