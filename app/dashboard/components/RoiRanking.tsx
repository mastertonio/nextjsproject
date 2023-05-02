import short from "short-uuid";
import { Table } from "@mantine/core";
import { JSXElementConstructor, Key, ReactElement, ReactFragment, ReactPortal, useContext, useState } from "react";
import { useLocalStorage } from "@mantine/hooks";
import { useRouter } from "next/router";
import axios from "axios";
import { useQuery } from "react-query";
import UserContext, { UserDataProp } from "@app/context/user.context";

interface IRankCount {
  _id: string;
  name: string;
  totalROIS: number;
}


const RoiRanking: React.FC<UserDataProp> = ({ tokens, user }) => {
  const getRankings = async () => {
    return await axios.get(
      `/v1/dashboard/ranking/list`, {
      headers: {
        Authorization: `Bearer ${tokens.access.token}`,
      },
    }
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
            <th className="!border-white !border-0">Ranking</th>
            <th className="!border-white !border-0">Name</th>
            <th className="!border-white !border-0">ROIS</th>
          </tr>
        </thead>
        <tbody>
          {rows}
          <tr>
            <td><span className="bg-[#F4BB44] pt-[3px] pb-[3px] pl-[8px] pr-[8px] m-[15px] text-white rounded-[4px]">{5}</span></td>
            <td>{me?.name}</td>
            <td>{me?.totalROIS}</td>
          </tr>
        </tbody>
      </Table>
    </>
  );
};

export default RoiRanking;
