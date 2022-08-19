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
  const [value] = useLocalStorage({ key: "auth-token" });
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);

  const getRoiListAll = async () => {
    try {
      const res = await axios.get(`http://54.159.8.194/v1/dashboard/roi/list`, {
        headers: {
          Authorization: `Bearer ${value}`,
        },
      });
      return res.data;
    } catch (error) {
      return error;
    }
  };

  const { isLoading, isError, error, data, refetch, isFetching } = useQuery(
    "get_all_roi",
    getRoiListAll
  );

  useEffect(() => {
    console.log(data);
    setSortedData(data);
  }, [data]);

  const [limit, setLimit] = useState<number>(10);
  const [activePage, setPage] = useState<number>(1);
  const [allRoi, setAllRoi] = useState<any>();
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<string[]>([]);
  const [sortedData, setSortedData] = useState(data);
  const [sortBy, setSortBy] = useState<keyof iDashRowProp | null>(null);
  const [reverseSortDirection, setReverseSortDirection] = useState(false);

  useEffect(() => {
    console.log(filter);
  }, [filter]);

  const indexOfLastPost = activePage * limit;
  const indexOfFirstPost = indexOfLastPost - limit;
  const currentPosts = sortedData?.slice(indexOfFirstPost, indexOfLastPost);

  const setSorting = (field: keyof iDashRowProp2) => {
    const reversed = field === sortBy ? !reverseSortDirection : false;
    setReverseSortDirection(reversed);
    setSortBy(field);
    setSortedData(sortData(data, { sortBy: field, reversed, search }));
  };

  const handleSearchChange = (event: React.SetStateAction<string>) => {
    setSearch(event);
    setSortedData(
      sortData(data, {
        sortBy,
        reversed: reverseSortDirection,
        search: event,
      })
    );
    console.log(sortedData);
  };

  const handleFilterChange = (event: SetStateAction<string[]>) => {
    setFilter(event);
    setSortedData(
      sortFilterData(data, {
        sortBy,
        reversed: reverseSortDirection,
        search: event,
      })
    );

    console.log(sortedData);
  };

  const myroi = currentPosts?.map((item: any) => ({
    id: item.id,
    link: item.link,
    button: (
      <Button
        leftIcon={<AiOutlineFolderOpen />}
        color="blue"
        onClick={() => {
          router.push(`/templates/${item.id}`);
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
        style={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: 'center'
        }}
      >
        <EditButton id={item.id} refetch={refetch} name={item.name} />
        <CloneButton id={item.id} refetch={refetch} name={item.name} />
        <DeleteButton id={item.id} refetch={refetch} name={item.name} />
      </div>
    ),
    source: item.source,
  }));

  return (
    <div>
      <Grid style={{ margin: 20 }}>
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
          style={{ marginLeft: "auto" }}
          onChange={(event: {
            target: { value: React.SetStateAction<string> };
          }) => {
            handleSearchChange(event.target.value);
          }}
        />
      </Grid>
      <ScrollArea
        style={{ height: 640 }}
        onScrollPositionChange={({ y }) => setScrolled(y !== 0)}
      >
        <Table className={classes.table} highlightOnHover verticalSpacing="xs">
          <thead
            className={cx(classes.header, { [classes.scrolled]: scrolled })}
            style={{ zIndex: 50 }}
          >
            <tr>
              <th style={{ width: 100 }}></th>
              <th style={{ width: 150 }}>Status</th>
              <th style={{ width: 105 }}>Importance</th>
              <Th
                sorted={sortBy === "name"}
                reversed={reverseSortDirection}
                onSort={() => setSorting("name")}
                style={{ width: 300 }}
              >
                ROI name
              </Th>
              <Th
                sorted={sortBy === "source_name"}
                reversed={reverseSortDirection}
                onSort={() => setSorting("name")}
                style={{ width: 225 }}
              >
                Template Name
              </Th>
              <Th
                sorted={sortBy === "dateCreated"}
                reversed={reverseSortDirection}
                onSort={() => setSorting("dateCreated")}
                style={{ width: 250 }}
              >
                Dates
              </Th>
              <Th
                sorted={sortBy === "views"}
                reversed={reverseSortDirection}
                onSort={() => setSorting("views")}
                style={{ width: 190 }}
              >
                Views
              </Th>
              <Th
                sorted={sortBy === "uniqueViews"}
                reversed={reverseSortDirection}
                onSort={() => setSorting("uniqueViews")}
                style={{ width: 200 }}
              >
                Unique Views
              </Th>
              <th></th>
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
                  <tr key={element.id} style={{ height: 20 }}>
                    <td style={{ width: 10 }}>{element.button}</td>
                    <td style={{ width: 145 }}>{element.status}</td>
                    <td style={{ width: 140 }}>{element.importance}</td>
                    <td
                      style={{ cursor: "pointer", width: 310 }}
                      onClick={() => {
                        router.push(`/templates/${element.id}`);
                      }}
                    >
                      {element.roiname}
                    </td>
                    <td style={{ width: 240 }}>{element.source_name}</td>
                    <td style={{ width: 285 }}>{element.dates}</td>
                    <td style={{ width: 150, paddingLeft: 20 }}>
                      {element.views}
                    </td>
                    <td style={{ width: 190, paddingLeft: 40 }}>
                      {element.uniqueViews}
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
    </div>
  );
};

export default Row;
