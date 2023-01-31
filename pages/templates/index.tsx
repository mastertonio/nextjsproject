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
  Divider,
} from "@mantine/core";
import { IconPlus } from '@tabler/icons';
import { useStyles } from "@styles/dashboardStyle";
import axios from "axios";
import { useQuery } from "react-query";

import RoiNavbar from "@core/components/navbar/Navbar";
import { useLocalStorage, useScrollIntoView } from "@mantine/hooks";
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
import MainLoader from "@app/core/components/loader/MainLoader";
import shortUUID from "short-uuid";
import AddTemplateButton from "@app/company/components/buttons/AddTemplate";
import EditTemplateButton from "@app/company/components/buttons/EditTemplate";
import TemplateVersion from "@app/company/components/TemplateVersion";
import { useUserStore } from "@app/store/userState";

const TemplatesDashboard: React.FC = () => {
  const { scrollIntoView, targetRef } = useScrollIntoView<HTMLDivElement>({
    offset: 60,
  });
  const router = useRouter();
  const theme = useMantineTheme();
  const { classes, cx } = useStyles();
  const p = router.query;

  const userZ = useUserStore((state) => (state.user))

  const getCompanyTemplates = async () => {
    return await axios.get(
      `/v1/company/${userZ?.company_id}/template`
    );
  };

  const { isLoading, isError, error, data, refetch, isFetching } = useQuery(
    "get_all_company_templates",
    getCompanyTemplates
  );

  const [limit, setLimit] = useState<number>(10);
  const [activePage, setPage] = useState<number>(1);
  const [allRoi, setAllRoi] = useState<any>();
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<string[]>([]);
  const [sortedData, setSortedData] = useState(data?.data);
  const [sortBy, setSortBy] = useState<keyof ICompanyTemplatesProps | null>(
    null
  );
  const [reverseSortDirection, setReverseSortDirection] = useState(false);
  const [name, setName] = useState("");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    setSortedData(data?.data);
  }, [data]);

  const indexOfLastPost = activePage * limit;
  const indexOfFirstPost = indexOfLastPost - limit;
  const currentPosts = sortedData?.slice(indexOfFirstPost, indexOfLastPost);

  const setSorting = (field: keyof ICompanyTemplatesProps) => {
    const reversed = field === sortBy ? !reverseSortDirection : false;
    setReverseSortDirection(reversed);
    setSortBy(field);
    setSortedData(
      sortCompanyTemplatesData(data?.data, { sortBy: field, reversed, search })
    );
  };

  const handleSearchChange = (event: React.SetStateAction<string>) => {
    setSearch(event);
    setSortedData(
      sortCompanyTemplatesData(data?.data, {
        sortBy,
        reversed: reverseSortDirection,
        search: event,
      })
    );
  };

  const handleFilterChange = (event: SetStateAction<string[]>) => {
    setFilter(event);
    setSortedData(
      sortCompanyTemplatesData(data?.data, {
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
        className="cursor-pointer w-[10px]"
        onClick={() => {
          scrollIntoView({ alignment: "center" });
          setTemp(item._id);
          setComp(item.company_id);
          setName(item.name);
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
        className="flex justify-end items-center"
      >
        <EditTemplateButton
          id={item._id}
          notes={item.notes}
          status={item.active}
          refetch={refetch}
          name={item.name}
          key={shortUUID.generate()}
        />
        <Button radius="sm" size="xs" color="red" className="ml-[10px]">
          Delete
        </Button>
      </div>
    ),
  }));

  return isLoading ? (
    <MainLoader />
  ) : (
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
      <div className="m-[10px] bg-white p-[10px] sm:p-[25px]">
        <Grid className="m-[20px]">
          {/* <TempList filter={filter} handleFilter={handleFilterChange} /> */}
          <AddTemplateButton refetch={refetch} />
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
              className={cx(classes.header, { [classes.scrolled]: scrolled })}
              style={{ zIndex: 50 }}
            >
              <tr>
                <Th
                  sorted={sortBy === "name"}
                  reversed={reverseSortDirection}
                  onSort={() => setSorting("name")}
                  style="w-[400px] whitespace-nowrap !border-white !border-0"
                >
                  Template Name
                </Th>
                <Th
                  sorted={sortBy === "notes"}
                  reversed={reverseSortDirection}
                  onSort={() => setSorting("notes")}
                  style="w-[600px] whitespace-nowrap !border-white !border-0"
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
                    <tr key={element._id} className="h-[20px]">
                      <td className="w-[100px]"><IconPlus size={20} stroke={3} className="pt-[7px] pr-[5px]" /> {element.name}</td>
                      <td
                        className="cursor-pointer w-[140px] pl-[30px]"
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
        <div className="mt-[30px]">
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
              comp_id={userZ?.company_id ? userZ.company_id : ""}
              temp_id={temp_id}
              first_temp={data?.data[0]._id}
              name={name}
            />
          </>
        ) : (
          ""
        )}
        {/* <TemplateVersion update={refetch} comp_id={comp_id}  temp_id={temp_id} first_temp={data?.[0]._id} name={name} /> */}
        <div ref={targetRef}></div>
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

export default TemplatesDashboard;
