import short from "short-uuid";
import { Table } from "@mantine/core";
import { useState } from "react";

interface IRankCount {
  _id: string;
  name: string;
  totalROIS: number;
}

export interface IRankCountProps {
  rankings?: IRankCount[];
}

const RoiRanking: React.FC<IRankCountProps> = ({ rankings }) => {
  const elements = rankings?.sort((a, b) => b.totalROIS - a.totalROIS);
  const [rank, setRank] = useState<number>(0)
  const rows = elements?.map((element, index) => (
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
