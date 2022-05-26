import { useState } from "react";
import { Table } from "@mantine/core";

const RoiRanking: React.FC = () => {

  const elements = [
    { position: 1,  name: "Swimming sammy" , count: 500 },
    { position: 2,  name: "Fitness Gym", count: 400 },
    { position: 3,  name: "Real Estate Phil", count: 300 },
    { position: 4,  name: "Car dealers", count: 200 },
    { position: 5,  name: "Booking barry", count: 100 },
  ];

  const rows = elements.map((element) => (
    <tr key={element.position}>
      <td>{element.position}</td>
      <td>{element.name}</td>
      <td>{element.count}</td>
    </tr>
  ));

  return (
    <>
        <Table verticalSpacing="xs">
          <tbody>{rows}</tbody>
        </Table>
    </>
  );
};

export default RoiRanking;
