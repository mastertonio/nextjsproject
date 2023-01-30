import React, { SetStateAction, useEffect, useState } from "react";
import {
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
import { useLocalStorage } from "@mantine/hooks";
import { useRouter } from "next/router";
import Paginate from "@app/dashboard/components/table/paginate";
import {
  ICompanyTemplatesVersionsProps,
  sortCompanyTemplatesVersionData,
} from "@app/dashboard/components/table/utils/tableMethods";
import Th from "@app/dashboard/components/table/Thead";
import SkeletonLoader from "@app/core/components/loader/SkeletonLoader";
import MainLoader from "@app/core/components/loader/MainLoader";
import shortUUID from "short-uuid";
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
const getTemplatesVersions = async (
  comp: string,
  temp: string
) => {
  return await axios.get(`/v1/company/${comp}/template/${temp}/version`);
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

  const { isLoading, isError, error, data, refetch, isFetching, isSuccess } =
    useQuery(
      ["get_all_company_templates_versions", temp_id],
      () => getTemplatesVersions(comp_id, temp_id),
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
  const [sortedData, setSortedData] = useState(data?.data);
  const [sortBy, setSortBy] = useState<
    keyof ICompanyTemplatesVersionsProps | null
  >(null);
  const [reverseSortDirection, setReverseSortDirection] = useState(false);
  const [status, setStatus] = useState("");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    setSortedData(data?.data);
  }, [data]);

  const indexOfLastPost = activePage * limit;
  const indexOfFirstPost = indexOfLastPost - limit;
  const currentPosts = sortedData?.slice(indexOfFirstPost, indexOfLastPost);

  const setSorting = (field: keyof ICompanyTemplatesVersionsProps) => {
    const reversed = field === sortBy ? !reverseSortDirection : false;
    setReverseSortDirection(reversed);
    setSortBy(field);
    setSortedData(
      sortCompanyTemplatesVersionData(data?.data, { sortBy: field, reversed, search })
    );
  };

  const handleSearchChange = (event: React.SetStateAction<string>) => {
    setSearch(event);
    setSortedData(
      sortCompanyTemplatesVersionData(data?.data, {
        sortBy,
        reversed: reverseSortDirection,
        search: event,
      })
    );
  };

  const handleFilterChange = (event: SetStateAction<string[]>) => {
    setFilter(event);
    setSortedData(
      sortCompanyTemplatesVersionData(data?.data, {
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
          className="flex justify-end items-center"
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
          <Button radius="sm" size="xs" color="red" className="ml-[10px]">
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
      <div className="m-[10px] bg-white">
        <div className="text-center mb-[40px] mt-[30px]">
          <Text className="text-[40px] text-[#00acac] font-bold">Template Version</Text>
        </div>

        <Grid className="m-[20px]">
          {/* <TempList filter={filter} handleFilter={handleFilterChange} /> */}
          <AddVersion update={refetch} comp_id={comp_id} temp_id={temp_id} />
          <Text
            color="teal"
            weight={900}
            className="ml-auto mr-auto mt-[30px] sm:mt-0 mb-[10px] sm:mb-0 text-[18px] sm:text-[16px]"
          >
            {name}
          </Text>
          <Input
            variant="default"
            placeholder="Search for ROI"
            className="ml-auto w-full sm:w-[unset] mt-[30px] sm:mt-0"
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
            className={classes.table}
            highlightOnHover
            verticalSpacing="xs"
            horizontalSpacing="xl"
          >
            <thead
              className={`${cx(classes.header, { [classes.scrolled]: scrolled })} z-[50]`}
            >
              <tr>
                <Th
                  sorted={sortBy === "name"}
                  reversed={reverseSortDirection}
                  onSort={() => setSorting("name")}
                  style="w-[400px] whitespace-nowrap !border-white !border-0"
                >
                  Version Name
                </Th>
                <Th
                  sorted={sortBy === "name"}
                  reversed={reverseSortDirection}
                  onSort={() => setSorting("name")}
                  style="w-[220px] whitespace-nowrap !border-white !border-0"
                >
                  Version Stage
                </Th>
                <Th
                  sorted={sortBy === "name"}
                  reversed={reverseSortDirection}
                  onSort={() => setSorting("name")}
                  style="w-[200px] whitespace-nowrap !border-white !border-0"
                >
                  Level
                </Th>
                <Th
                  sorted={sortBy === "notes"}
                  reversed={reverseSortDirection}
                  onSort={() => setSorting("notes")}
                  style="w-[620px] whitespace-nowrap !border-white !border-0"
                >
                  Notes
                </Th>
                <Th
                  sorted={sortBy === "status"}
                  reversed={reverseSortDirection}
                  onSort={() => setSorting("status")}
                  style="w-[130px] whitespace-nowrap !border-white !border-0"
                >
                  Status
                </Th>
                <th className="!border-white !border-0"></th>
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
                    <tr key={element._id} className="h-[20px]">
                      <td className="w-[10px]">{element.name}</td>
                      <td className="w-[10px]">{element.stage}</td>
                      <td className="w-[10px]">{element.level}</td>
                      <td
                        className="w-[140px] cursor-pointer pl-[30px]"
                      >
                        {element.notes}
                      </td>
                      <td
                        className="w-[110px]"
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
        <div ref={refTarget} className="mt-[30px]">
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
    router.push('/404');
  }

  return <></>;
};

export default TemplateVersion;
