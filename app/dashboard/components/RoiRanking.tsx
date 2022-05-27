import { useState } from "react";
import { Table } from "@mantine/core";

interface IRankCount {
  account_name: string;
  rois: number;
}

export interface IRankCountProps {
  rankings?: IRankCount[];
}

const RoiRanking: React.FC<IRankCountProps> = ({ rankings }) => {
  const elements = rankings?.sort((a,b)=> b.rois - a.rois)

  const rows = elements?.map((element) => (
    <tr key={element.account_name}>
      <td>{element.account_name}</td>
      <td>{element.rois}</td>
    </tr>
  ));

  return (
    <>
        <Table>
          <tbody>{rows}</tbody>
        </Table>
    </>
  );
};

export default RoiRanking;
