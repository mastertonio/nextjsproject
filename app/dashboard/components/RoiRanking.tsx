import short from "short-uuid";
import { Table } from "@mantine/core";
import { JSXElementConstructor, Key, ReactElement, ReactFragment, ReactPortal, useContext, useEffect, useState } from "react";
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

  const { isLoading, status, data, isFetching, refetch } = useQuery(
    "ranking_list",
    getRankings
  );

  // const me = data?.data.filter((elem: { _id: string; }) => elem._id == user.id)
  // let elements = data?.data.sort((a: { totalROIS: number; }, b: { totalROIS: number; }) => b.totalROIS - a.totalROIS)

  // const me = data?.data.filter((elem: { _id: string }) => elem._id === user.id);
  // const elements = me?.concat(data?.data)
  //   .sort((a: { totalROIS: number }, b: { totalROIS: number }) => b.totalROIS - a.totalROIS)
  //   .slice(0, 5);



  const me = data?.data.find((elem: { _id: string }) => elem._id === user.id);
  // .concat(others.slice(3, 4))
  // const rank4 = elements.slice(0,4)
  // const me = elements.filter((elem: { _id: string; }) => user.id == elem._id)
  // const newRanking = rank4.push(me)
  // console.log(newRanking)
  const [rank, setRank] = useState()
  const rows = data?.data?.sort((a: { totalROIS: number; }, b: { totalROIS: number; }) => b.totalROIS - a.totalROIS).map((element: { _id: Key | null | undefined; name: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | ReactFragment | ReactPortal | null | undefined; totalROIS: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | ReactFragment | ReactPortal | null | undefined; }, index: number) => (
    <tr key={element._id}>
      <td><span className="bg-[#1ab394] pt-[3px] pb-[3px] pl-[8px] pr-[8px] m-[15px] text-white rounded-[4px]">{index + 1}</span></td>
      <td>{element.name}</td>
      <td>{element.totalROIS}</td>
    </tr>
  )).slice(0,4);

  
  const indexMe = rows?.indexOf(me)+1

  // useEffect(()=> {
  //   setRank(rows)
  // }, [data, rows])

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
          {me?.totalROIS > 0 ? (<tr>
            <td><span className="bg-yellow-500 pt-[3px] pb-[3px] pl-[8px] pr-[8px] m-[15px] text-white rounded-[4px]">{indexMe+1}</span></td>
            <td>{me?.name}</td>
            <td>{me?.totalROIS}</td>
          </tr>) : ""}
          
        </tbody>
      </Table>
    </>
  );
};

export default RoiRanking;
