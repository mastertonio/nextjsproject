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

  const { isLoading, isError, error, data, refetch, isFetching, isSuccess } = useQuery(
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
        className="flex justify-end items-center gap-2"
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

  if (isLoading) return <MainLoader />

  if (isSuccess) {
    return (
      <AppShell
        styles={{
          main: {
            backgroundColor: "white",
          },
        }}
        className="ml-[20px] mr-[20px] sm:ml-[50px] sm:mr-[50px] mt-auto mb-auto max-w-[1780px]"
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
          className="mt-[40px] ml-[10px] mr-[10px] mb-[30px]"
        >
          {/* <TempList filter={filter} handleFilter={handleFilterChange} /> */}
          <AddCompanyButton refetch={refetch} />
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
          className="h-[650px]"
          onScrollPositionChange={({ y }) => setScrolled(y !== 0)}
        >
          <Table
            className={`${classes.table} w-[1200px] sm:w-[unset]`}
            highlightOnHover
            verticalSpacing="xs"
            fontSize="xs"
          >
            <thead
              className={`${cx(classes.header, { [classes.scrolled]: scrolled })} z-[50]`}
            >
              <tr>
                <th className="w-[85px] !border-white !border-0"></th>
                <Th
                  sorted={sortBy === "name"}
                  reversed={reverseSortDirection}
                  onSort={() => setSorting("name")}
                  style="w-[510px] sm:w-[310px] !border-white !border-0 whitespace-nowrap sm:whitespace-normal"
                >
                  Company Name
                </Th>
                <Th
                  sorted={sortBy === "alias"}
                  reversed={reverseSortDirection}
                  onSort={() => setSorting("alias")}
                  style="w-[400px] sm:w-[225px] !border-white !border-0"
                >
                  Alias
                </Th>
                <Th
                  sorted={sortBy === "licenses"}
                  reversed={reverseSortDirection}
                  onSort={() => setSorting("licenses")}
                  style="w-[400px] sm:w-[160px] !border-white !border-0"
                >
                  Licenses
                </Th>
                <Th
                  sorted={sortBy === "templates"}
                  reversed={reverseSortDirection}
                  onSort={() => setSorting("templates")}
                  style="w-[400px] sm:w-[170px] !border-white !border-0"
                >
                  Templates
                </Th>
                <Th
                  sorted={sortBy === "active"}
                  reversed={reverseSortDirection}
                  onSort={() => setSorting("active")}
                  style="w-[220px] !border-white !border-0"
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
                {companies?.map((element: ICompanyElement) => (
                  <tr key={element.id}>
                    <td className="w-[10px]">{element.button}</td>
                    <td>
                      {element.roiname}
                    </td>
                    <td className="w-[240px]">{element.alias}</td>
                    <td className="w-[155px]">{element.licenses}</td>
                    <td className="w-[145px] pl-[20px]" >
                      {element.templates}
                    </td>
                    <td
                      className="w-[190px]"
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
      </AppShell>
    );
  };

  return <></>
}


export default CompanyList;
