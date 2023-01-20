import {
  Button,
  ScrollArea,
  Table,
  Grid,
  Input,
  AppShell,
  useMantineTheme,
  SegmentedControl,
} from "@mantine/core";
import {
  JSXElementConstructor,
  Key,
  ReactElement,
  ReactFragment,
  ReactPortal,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { useStyles } from "@styles/dashboardStyle";
import { useRouter } from "next/router";
import { AiOutlineFolderOpen } from "react-icons/ai";
import { HiTemplate } from "react-icons/hi";
import { FiUsers } from "react-icons/fi";
import axios from "axios";
import { useLocalStorage } from "@mantine/hooks";
import { useQuery } from "react-query";
import Paginate from "@dashboard/components/table/paginate";
import {
  ICompanyProps,
  sortCompanyData,
} from "@dashboard/components/table/utils/tableMethods";
import Th from "@dashboard/components/table/Thead";
import SkeletonLoader from "@core/components/loader/SkeletonLoader";
import TempList from "@core/components/dropdown/TemplateTags";
import EditCompanyButton from "@app/company/components/buttons/EditCompanyButton";
import Sidebar from "@app/core/components/sidebar/Sidebar";
import RoiNavbar from "@app/core/components/navbar/Navbar";
import Segmented from "@app/core/components/buttons/Segmented";
import AddCompanyButton from "@app/company/components/buttons/AddCompanyButton";
import MainLoader from "@app/core/components/loader/MainLoader";

export interface iDashRowProp {
  id: string;
  link: string;
  importance: number;
  name: string;
  source: string;
  dateCreated: string;
  views: number;
  uniqueViews: number;
  status: number;
  source_name: string;
}

export interface iDashRowProp2 {
  id: string;
  link: string;
  importance: string;
  name: string;
  source: string;
  dateCreated: string;
  views: string;
  uniqueViews: string;
  status: string;
  source_name: string;
}

export interface ICompanyElement {
  id: Key | null | undefined;
  button:
  | string
  | number
  | boolean
  | ReactElement<any, string | JSXElementConstructor<any>>
  | ReactFragment
  | ReactPortal
  | null
  | undefined;
  roiname:
  | string
  | number
  | boolean
  | ReactElement<any, string | JSXElementConstructor<any>>
  | ReactFragment
  | ReactPortal
  | null
  | undefined;
  alias:
  | string
  | number
  | boolean
  | ReactElement<any, string | JSXElementConstructor<any>>
  | ReactFragment
  | ReactPortal
  | null
  | undefined;
  licenses:
  | string
  | number
  | boolean
  | ReactElement<any, string | JSXElementConstructor<any>>
  | ReactFragment
  | ReactPortal
  | null
  | undefined;
  templates:
  | string
  | number
  | boolean
  | ReactElement<any, string | JSXElementConstructor<any>>
  | ReactFragment
  | ReactPortal
  | null
  | undefined;
  active:
  | string
  | number
  | boolean
  | ReactElement<any, string | JSXElementConstructor<any>>
  | ReactFragment
  | ReactPortal
  | null
  | undefined;
  actions:
  | string
  | number
  | boolean
  | ReactElement<any, string | JSXElementConstructor<any>>
  | ReactFragment
  | ReactPortal
  | null
  | undefined;
}

export interface ISearchableDashProp {
  source: string;
  name: string;
  dateCreated: string;
}

export interface iDashboardRowProps {
  my_roi: iDashRowProp[] | null;
  refetch: () => void;
}

const CompanyList: React.FC<iDashboardRowProps> = () => {
  const theme = useMantineTheme();
  const { classes, cx } = useStyles();
  const router = useRouter();

  const getCompanies = async () => {
    return await axios.get(`/v1/company`);
  };

  const { isLoading, isError, error, data, refetch, isFetching } = useQuery(
    "get_all_company",
    getCompanies
  );

  const [limit, setLimit] = useState<number>(10);
  const [activePage, setPage] = useState<number>(1);
  const [allRoi, setAllRoi] = useState<any>();
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<string[]>([]);
  const [sortedData, setSortedData] = useState(data?.data);
  const [sortBy, setSortBy] = useState<keyof ICompanyProps | null>(null);
  const [reverseSortDirection, setReverseSortDirection] = useState(false);
  const [status, setStatus] = useState("");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    setSortedData(data?.data);
  }, [data]);

  const indexOfLastPost = activePage * limit;
  const indexOfFirstPost = indexOfLastPost - limit;
  const currentPosts = sortedData?.slice(indexOfFirstPost, indexOfLastPost);

  const setSorting = (field: keyof ICompanyProps) => {
    const reversed = field === sortBy ? !reverseSortDirection : false;
    setReverseSortDirection(reversed);
    setSortBy(field);
    setSortedData(sortCompanyData(data?.data, { sortBy: field, reversed, search }));
  };

  const handleSearchChange = (event: React.SetStateAction<string>) => {
    setSearch(event);
    setSortedData(
      sortCompanyData(data?.data, {
        sortBy,
        reversed: reverseSortDirection,
        search: event,
      })
    );
  };

  const handleFilterChange = (event: SetStateAction<string[]>) => {
    setFilter(event);
    setSortedData(
      sortCompanyData(data?.data, {
        sortBy,
        reversed: reverseSortDirection,
        search: event,
      })
    );
  };

  const companies = currentPosts?.map((item: any) => ({
    id: item._id,
    button: (
      <Button
        leftIcon={<AiOutlineFolderOpen />}
        color="blue"
        onClick={() => {
          router.push(`/company/${item._id}`);
        }}
      >
        Open
      </Button>
    ),
    roiname: item.name,
    alias: item.alias,
    licenses: item.licenses,
    templates: item.templates,
    active: <Segmented val={item.active} key={item._id} refetch={refetch} name={item.name} id={item._id} />,
    actions: (
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
        }}
      >
        <Button
          leftIcon={<HiTemplate />}
          size="xs"
          color="indigo"
          onClick={() => {
            router.push(`/company/templates/${item._id}`);
          }}
        >
          Templates
        </Button>
        <Button
          leftIcon={<FiUsers />}
          size="xs"
          color="cyan"
          onClick={() => {
            router.push(`/company/users/${item._id}`);
          }}
        >
          Users
        </Button>
        <EditCompanyButton
          id={item._id}
          refetch={refetch}
          name={item.name}
          myCompany={item}
        />
      </div>
    ),
  }));

  return isLoading ? <MainLoader /> : (
    <AppShell
      styles={{
        main: {
          backgroundColor: "white",
        },
      }}
      style={{
        marginLeft: 50,
        marginRight: 50,
        marginTop: "auto",
        marginBottom: "auto",
        maxWidth: 1780,
      }}
      navbarOffsetBreakpoint="sm"
      asideOffsetBreakpoint="sm"
      fixed
      navbar={<Sidebar />}
      // footer={
      //   <RoiFooter />
      // }
      header={<RoiNavbar />}
    >
      <Grid
        style={{
          marginTop: 20,
          marginBottom: 20,
          marginLeft: 10,
          marginRight: 10,
        }}
      >
        {/* <TempList filter={filter} handleFilter={handleFilterChange} /> */}
        <AddCompanyButton refetch={refetch} />
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
        style={{ height: 650 }}
        onScrollPositionChange={({ y }) => setScrolled(y !== 0)}
      >
        <Table
          className={classes.table}
          highlightOnHover
          verticalSpacing="xs"
          fontSize="xs"
        >
          <thead
            className={cx(classes.header, { [classes.scrolled]: scrolled })}
            style={{ zIndex: 50 }}
          >
            <tr>
              <th style={{ width: 85 }}></th>
              <Th
                sorted={sortBy === "name"}
                reversed={reverseSortDirection}
                onSort={() => setSorting("name")}
                style="w-[310px]"
              >
                Company Name
              </Th>
              <Th
                sorted={sortBy === "alias"}
                reversed={reverseSortDirection}
                onSort={() => setSorting("alias")}
                style="w-[225px]"
              >
                Alias
              </Th>
              <Th
                sorted={sortBy === "licenses"}
                reversed={reverseSortDirection}
                onSort={() => setSorting("licenses")}
                style="w-[160px]"
              >
                Licenses
              </Th>
              <Th
                sorted={sortBy === "templates"}
                reversed={reverseSortDirection}
                onSort={() => setSorting("templates")}
                style="w-[170px]"
              >
                Templates
              </Th>
              <Th
                sorted={sortBy === "active"}
                reversed={reverseSortDirection}
                onSort={() => setSorting("active")}
                style="w-[220px]"
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
              {companies?.map((element: ICompanyElement) => (
                <tr key={element.id}>
                  <td style={{ width: 10 }}>{element.button}</td>
                  <td
                  >
                    {element.roiname}
                  </td>
                  <td style={{ width: 240 }}>{element.alias}</td>
                  <td style={{ width: 155 }}>{element.licenses}</td>
                  <td style={{ width: 145, paddingLeft: 20 }}>
                    {element.templates}
                  </td>
                  <td
                    style={{
                      width: 190,
                    }}
                  >
                    {element.active}
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
    </AppShell>
  );
};

export default CompanyList;
