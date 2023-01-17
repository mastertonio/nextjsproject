import short from "short-uuid";
import { Table } from "@mantine/core";
import { JSXElementConstructor, Key, ReactElement, ReactFragment, ReactPortal, useContext, useState } from "react";
import { useLocalStorage } from "@mantine/hooks";
import { useRouter } from "next/router";
import axios from "axios";
import { useQuery } from "react-query";
import UserContext from "@app/context/user.context";

interface IRankCount {
  _id: string;
  name: string;
  totalROIS: number;
}

export interface IRankCountProps {
  rankings?: IRankCount[];
}

const RoiRanking: React.FC<IRankCountProps> = () => {
  const getRankings = async () => {
    return await axios.get(
        `/v1/dashboard/ranking/list`
      );
  };

  const { isLoading, status, data, isFetching } = useQuery(
    "ranking_list",
    getRankings
  );


  const elements = data?.data.sort((a: { totalROIS: number; }, b: { totalROIS: number; }) => b.totalROIS - a.totalROIS);
  const [rank, setRank] = useState<number>(0)
  const rows = elements?.map((element: { _id: Key | null | undefined; name: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | ReactFragment | ReactPortal | null | undefined; totalROIS: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | ReactFragment | ReactPortal | null | undefined; }, index: number) => (
    <tr key={element._id}>
      <td><span className="bg-[#1ab394] pt-[3px] pb-[3px] pl-[8px] pr-[8px] m-[15px] text-white rounded-[4px]">{index + 1}</span></td>
      <td>{element.name}</td>
      <td>{element.totalROIS}</td>
    </tr>
  ));

  return (
    <>
      <Table className="mt-[20px] sm:mt-0">
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
