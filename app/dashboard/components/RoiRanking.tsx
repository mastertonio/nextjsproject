import short from "short-uuid";
import { Table } from "@mantine/core";
import { JSXElementConstructor, Key, ReactElement, ReactFragment, ReactPortal, useState } from "react";
import { useLocalStorage } from "@mantine/hooks";
import { useRouter } from "next/router";
import axios from "axios";
import { useQuery } from "react-query";

interface IRankCount {
  _id: string;
  name: string;
  totalROIS: number;
}

export interface IRankCountProps {
  rankings?: IRankCount[];
}

const RoiRanking: React.FC<IRankCountProps> = () => {
  const [value] = useLocalStorage({ key: "auth-token" });
  const [current] = useLocalStorage({ key: "current-user" });
  const router = useRouter();
  const p = router.query;

  const getRankings = async () => {
    try {
      const res = await axios.get(
        `http://54.159.8.194/v1/dashboard/ranking/list`,
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

  const { isLoading, status, data, isFetching } = useQuery(
    "ranking_list",
    getRankings
  );


  const elements = data?.sort((a: { totalROIS: number; }, b: { totalROIS: number; }) => b.totalROIS - a.totalROIS);
  const [rank, setRank] = useState<number>(0)
  const rows = elements?.map((element: { _id: Key | null | undefined; name: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | ReactFragment | ReactPortal | null | undefined; totalROIS: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | ReactFragment | ReactPortal | null | undefined; }, index: number) => (
    <tr key={element._id}>
      <td><span style={{ backgroundColor: '#1ab394', paddingTop: 3, paddingBottom: 3, paddingLeft: 8, paddingRight: 8, margin: 15, color: "white", borderRadius: 4}}>{index + 1}</span></td>
      <td>{element.name}</td>
      <td>{element.totalROIS}</td>
    </tr>
  ));

  return (
    <>
      <Table>
        <thead>
          <tr>
            <th>Ranking</th>
            <th>Name</th>
            <th>ROIS</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    </>
  );
};

export default RoiRanking;
