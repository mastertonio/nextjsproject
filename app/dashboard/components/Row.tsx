import {
  Button,
  ScrollArea,
  Table,
  Skeleton,
  Grid,
  MultiSelect,
  Input,
  Pagination,
} from "@mantine/core";
import SelectDropdown from "@core/components/dropdown/Select";
import {
  JSXElementConstructor,
  Key,
  ReactElement,
  ReactFragment,
  ReactPortal,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { useStyles } from "@styles/tableStyle";
import { useRouter } from "next/router";
import EditButton from "./buttons/EditButton";
import DeleteButton from "./buttons/DeleteButton";
import CloneButton from "./buttons/CloneButton";
import { AiOutlineFolderOpen } from "react-icons/ai";
import axios from "axios";
import { useLocalStorage } from "@mantine/hooks";
import StarRating from "@core/components/rating/Star";
import { useQuery } from "react-query";
import Paginate from "./table/paginate";
import { sortData, sortFilterData } from "./table/utils/tableMethods";
import Th from "./table/Thead";
import SkeletonLoader from "@core/components/loader/SkeletonLoader";
import TempList from "@core/components/dropdown/TemplateTags";
import UserContext from "@app/context/user.context";

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

export interface ISearchableDashProp {
  source: string;
  name: string;
  dateCreated: string;
}

export interface iDashboardRowProps {
  my_roi: iDashRowProp[] | null;
  refetch: () => void;
}

const Row: React.FC<iDashboardRowProps> = ({ my_roi }) => {
  const [rating, setRating] = useState<number>(0);
  const [star, setStar] = useState<boolean>(true);
  const { classes, cx } = useStyles();
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const userCtx = useContext(UserContext)

  const getRoiListAll = async () => {
    return await axios.get(`/v1/dashboard/roi/list`);
  };

  const { isLoading, isError, error, data, refetch, isFetching } = useQuery(
    "get_all_roi",
    getRoiListAll
  );

  useEffect(() => {
    setSortedData(data?.data);
  }, [data]);

  const [limit, setLimit] = useState<number>(10);
  const [activePage, setPage] = useState<number>(1);
  const [allRoi, setAllRoi] = useState<any>();
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<string[]>([]);
  const [sortedData, setSortedData] = useState(data?.data);
  const [sortBy, setSortBy] = useState<keyof iDashRowProp | null>(null);
  const [reverseSortDirection, setReverseSortDirection] = useState(false);


  const indexOfLastPost = activePage * limit;
  const indexOfFirstPost = indexOfLastPost - limit;
  const currentPosts = sortedData?.slice(indexOfFirstPost, indexOfLastPost);

  const setSorting = (field: keyof iDashRowProp2) => {
    const reversed = field === sortBy ? !reverseSortDirection : false;
    setReverseSortDirection(reversed);
    setSortBy(field);
    setSortedData(sortData(data?.data, { sortBy: field, reversed, search }));
  };

  const handleSearchChange = (event: React.SetStateAction<string>) => {
    console.log('search handle', event)
    setSearch(event);
    setSortedData(
      sortData(data?.data, {
        sortBy,
        reversed: reverseSortDirection,
        search: event,
      })
    );
  };

  const handleFilterChange = (event: SetStateAction<string[]>) => {
    setFilter(event);
    setSortedData(
      sortFilterData(data?.data, {
        sortBy,
        reversed: reverseSortDirection,
        search: event,
      })
    );
  };

  const myroi = currentPosts?.map((item: any) => ({
    id: item.id,
    link: item.link,
    button: (
      <Button
        type="button"
        leftIcon={<AiOutlineFolderOpen />}
        color="blue"
        onClick={() => {
          router.push(`/enterprise/${item.id}`);
        }}
      >
        Open
      </Button>
    ),
    status: (
      <SelectDropdown
        cur_status={item.status}
        importance={item.importance}
        rating={rating}
        id={item.id}
        refetch={refetch}
        setStar={setStar}
        setRating={setRating}
      />
    ),
    importance:
      item.importance != 0 ? (
        <StarRating
          importance={item.importance}
          id={item.id}
          cur_status={item.status}
          refetch={refetch}
          rating={rating}
          setRating={setRating}
          readOnly={false}
          setStar={setStar}
        />
      ) : (
        <StarRating
          importance={item.importance}
          id={item.id}
          cur_status={item.status}
          refetch={refetch}
          rating={rating}
          setRating={setRating}
          readOnly={true}
          setStar={setStar}
        />
      ),
    roiname: item.name,
    source_name: item.source_name,
    dates: item.dateCreated,
    views: item.views,
    uniqueViews: item.uniqueViews,
    actions: (
      <div
        className="flex justify-end items-center gap-2"
      >
        <EditButton id={item.id} refetch={refetch} name={item.name} />
        <CloneButton id={item.id} refetch={refetch} name={item.name} />
        <DeleteButton id={item.id} refetch={refetch} name={item.name} />
      </div>
    ),
    source: item.source,
  }));

  console.log('roi', myroi)

  return (
    <div>
      <Grid className="m-0 sm:m-[20px]">
        <TempList filter={filter} handleFilter={handleFilterChange} />
        {/* <MultiSelect
          style={{ width: 450 }}
          placeholder="Filter"
          searchable
          clearable
          data={[{ value: 'The ROI Shop', label: 'The ROI Shop' }]}
          value={filter}
          onChange={handleFilterChange}
        /> */}
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
        className="h-[640px]"
        onScrollPositionChange={({ y }) => setScrolled(y !== 0)}
      >
        <Table className={classes.table} highlightOnHover verticalSpacing="xs">
          <thead
            className={cx(classes.header, { [classes.scrolled]: scrolled })}
            style={{ zIndex: 50 }}
          >
            <tr>
              <th className="w-[80px] sm:w-[100px] !border-white !border-0"></th>
              <th className="w-[130px] sm:w-[150px] !border-white !border-0">Status</th>
              <th className="w-[105px] !border-white !border-0">Importance</th>
              <Th
                sorted={sortBy === "name"}
                reversed={reverseSortDirection}
                onSort={() => setSorting("name")}
                style="w-[300px] whitespace-nowrap sm:whitespace-normal !border-white !border-0"
              >
                ROI name
              </Th>
              <Th
                sorted={sortBy === "source_name"}
                reversed={reverseSortDirection}
                onSort={() => setSorting("name")}
                style="w-[225px] whitespace-nowrap sm:whitespace-normal !border-white !border-0"
              >
                Template Name
              </Th>
              <Th
                sorted={sortBy === "dateCreated"}
                reversed={reverseSortDirection}
                onSort={() => setSorting("dateCreated")}
                style="w-[250px] whitespace-nowrap sm:whitespace-normal !border-white !border-0"
              >
                Dates
              </Th>
              <Th
                sorted={sortBy === "views"}
                reversed={reverseSortDirection}
                onSort={() => setSorting("views")}
                style="w-[190px] whitespace-nowrap sm:whitespace-normal !border-white !border-0"
              >
                Views
              </Th>
              <Th
                sorted={sortBy === "uniqueViews"}
                reversed={reverseSortDirection}
                onSort={() => setSorting("uniqueViews")}
                style="w-[200px] whitespace-nowrap sm:whitespace-normal !border-white !border-0"
              >
                Unique Views
              </Th>
              <th className="whitespace-nowrap sm:whitespace-normal !border-white !border-0"></th>
            </tr>
          </thead>
          {isLoading ? (
            <SkeletonLoader />
          ) : (
            <tbody>
              {myroi?.map(
                (element: {
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
                  status:
                  | string
                  | number
                  | boolean
                  | ReactElement<any, string | JSXElementConstructor<any>>
                  | ReactFragment
                  | ReactPortal
                  | null
                  | undefined;
                  importance:
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
                  source_name:
                  | string
                  | number
                  | boolean
                  | ReactElement<any, string | JSXElementConstructor<any>>
                  | ReactFragment
                  | ReactPortal
                  | null
                  | undefined;
                  dates:
                  | string
                  | number
                  | boolean
                  | ReactElement<any, string | JSXElementConstructor<any>>
                  | ReactFragment
                  | ReactPortal
                  | null
                  | undefined;
                  views:
                  | string
                  | number
                  | boolean
                  | ReactElement<any, string | JSXElementConstructor<any>>
                  | ReactFragment
                  | ReactPortal
                  | null
                  | undefined;
                  uniqueViews:
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
                }) => (
                  <tr key={element.id} className="h-[20px]">
                    <td className="w-[10px] whitespace-nowrap sm:whitespace-normal" >{element.button}</td>
                    <td className="w-[145px] whitespace-nowrap sm:whitespace-normal">{element.status}</td>
                    <td className="w-[140px] whitespace-nowrap sm:whitespace-normal">{element.importance}</td>
                    <td
                      className="w-[310px] cursor-pointer whitespace-nowrap sm:whitespace-normal"
                      onClick={() => {
                        router.push(`/enterprise/${element.id}`);
                      }}
                    >
                      {element.roiname}
                    </td>
                    <td className="w-[240px] whitespace-nowrap sm:whitespace-normal">{element.source_name}</td>
                    <td className="w-[285px] whitespace-nowrap sm:whitespace-normal">{element.dates}</td>
                    <td className="w-[150px] pl-[20px] whitespace-nowrap sm:whitespace-normal" >
                      {element.views}
                    </td>
                    <td className="w-[190px] pl-[40px] whitespace-nowrap sm:whitespace-normal">
                      {element.uniqueViews}
                    </td>
                    <td className="whitespace-nowrap sm:whitespace-normal">{element.actions}</td>
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
    </div>
  );
};

export default Row;
