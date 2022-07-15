import {
  Button,
  ScrollArea,
  Table,
  LoadingOverlay,
  Loader,
  Skeleton,
  Pagination,
} from "@mantine/core";
import SelectDropdown from "@core/components/dropdown/Select";
import { Rating } from "react-simple-star-rating";
import { JSXElementConstructor, Key, ReactElement, ReactFragment, ReactPortal, SetStateAction, useEffect, useState } from "react";
import { useStyles } from "@styles/dashboardStyle";
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

export interface iDashRowProp {
  id: string;
  link?: string;
  importance: number;
  name: string;
  source: string;
  dateCreated: string;
  views: number;
  uniqueViews: number;
  status: number;
}

export interface iDashboardRowProps {
  my_roi: iDashRowProp[] | null;
  filters: string[];
  search: string;
  refetch: () => void;
}

const Row: React.FC<iDashboardRowProps> = ({
  my_roi,
  filters,
  search,
  refetch,
}) => {
  const [rating, setRating] = useState<number>(0);
  const [star, setStar] = useState<boolean>(true);
  const { classes } = useStyles();
  const [limit, setLimit] = useState<string>("10")
  const [activePage, setPage] = useState(1);
  const [value] = useLocalStorage({ key: "auth-token" });
  const [allRoi, setAllRoi] = useState()
  const router = useRouter();

  const getRoiList = async (limit: number, page: number) => {
    try {
      const res = await axios.get(
        `http://54.159.8.194/v1/dashboard/roi/list?limit=${limit}&page=${page}`,
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

  const { isLoading, isError, error, data, isFetching, isPreviousData } =
    useQuery(["roi_list", activePage], () => getRoiList(10, activePage), {
      keepPreviousData: true,
    });

  useEffect(() => {
    setAllRoi(data?.results);
    console.log(allRoi)
  }, [allRoi, data]);

  const myroi = data?.results.map(
    (item: any) => ({
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
      dates: item.dateCreated,
      views: item.views,
      uniqueViews: item.uniqueViews,
      actions: (
        <>
          <EditButton id={item.id} refetch={refetch} name={item.name} />
          <CloneButton id={item.id} refetch={refetch} name={item.name} />
          <DeleteButton id={item.id} refetch={refetch} name={item.name} />
        </>
      ),
      source: item.source,
    })
  );

  // const filterSearch = {
  //   nodes: ,
  // };

  // const rows = filterSearch.nodes?.map((element) => (
  //   <tr key={element.id}>
  //     <td>{element.button}</td>
  //     <td>{element.status}</td>
  //     <td>{element.importance}</td>
  //     <td>{element.roiname}</td>
  //     <td>{element.dates}</td>
  //     <td>{element.views}</td>
  //     <td>{element.uniqueViews}</td>
  //     <td>{element.actions}</td>
  //   </tr>
  // ));

  // if(fetching) return (<div>Fetching data...</div>)

  return (
    <div>
      <Table
        className={classes.table}
        horizontalSpacing="xl"
        highlightOnHover
        verticalSpacing="xs"
      >
        <thead>
          <tr>
            <th style={{ width: 110 }}></th>
            <th style={{ width: 170 }}>Status</th>
            <th style={{ width: 140 }}>Importance</th>
            <th style={{ width: 420 }}>ROI name</th>
            <th style={{ width: 270 }}>Dates</th>
            <th style={{ width: 170 }}>Views</th>
            <th>Unique Views</th>
            <th></th>
          </tr>
        </thead>
      </Table>
      <ScrollArea style={{ height: 550 }}>
        <Table className={classes.table} highlightOnHover verticalSpacing="xs">
          {isLoading ? (
            <>
              <Skeleton height={20} radius="xl" />
              <Skeleton height={20} mt={12} radius="xl" />
              <Skeleton height={20} mt={12} radius="xl" />
              <Skeleton height={20} mt={12} radius="xl" />
              <Skeleton height={20} mt={12} radius="xl" />
              <Skeleton height={20} mt={12} radius="xl" />
              <Skeleton height={20} mt={12} radius="xl" />
              <Skeleton height={20} mt={12} radius="xl" />
              <Skeleton height={20} mt={12} radius="xl" />
              <Skeleton height={20} mt={12} radius="xl" />
              <Skeleton height={20} mt={12} radius="xl" />
              <Skeleton height={20} mt={12} radius="xl" />
              <Skeleton height={20} mt={12} radius="xl" />
              <Skeleton height={20} mt={12} radius="xl" />
              <Skeleton height={20} mt={12} radius="xl" />
              <Skeleton height={20} mt={12} radius="xl" />
              <Skeleton height={20} mt={12} radius="xl" />
            </>
          ) : (
            <tbody>
              { myroi.filter((item: { roiname: string | string[]; }) => item.roiname.includes(search))
                    .map((element: { id: Key | null | undefined; button: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | ReactFragment | ReactPortal | null | undefined; status: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | ReactFragment | ReactPortal | null | undefined; importance: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | ReactFragment | ReactPortal | null | undefined; roiname: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | ReactFragment | ReactPortal | null | undefined; dates: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | ReactFragment | ReactPortal | null | undefined; views: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | ReactFragment | ReactPortal | null | undefined; uniqueViews: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | ReactFragment | ReactPortal | null | undefined; actions: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | ReactFragment | ReactPortal | null | undefined; }) => (
                      <tr key={element.id} style={{ height: 20 }}>
                        <td style={{ width: 10 }}>{element.button}</td>
                        <td style={{ width: 180 }}>{element.status}</td>
                        <td style={{ width: 140 }}>{element.importance}</td>
                        <td
                          style={{ cursor: "pointer", width: 420 }}
                          onClick={() => {
                            router.push(`/templates/${element.id}`);
                          }}
                        >
                          {element.roiname}
                        </td>
                        <td style={{ width: 270 }}>{element.dates}</td>
                        <td style={{ width: 170 }}>{element.views} views</td>
                        <td style={{ width: 190 }}>
                          {element.uniqueViews} unique views
                        </td>
                        <td
                          style={{
                            display: "flex",
                            justifyContent: "flex-end",
                            height: 57,
                          }}
                        >
                          {element.actions}
                        </td>
                      </tr>
                    ))}
            </tbody>
          )}
        </Table>
      </ScrollArea>
      <div>
        <Paginate page={isLoading ? 10 : data.totalPages} limit={limit} totalResults={data?.totalResults} setLimit={setLimit} activePage={activePage} setPage={setPage} />
      </div>
    </div>
  );
};

export default Row;
