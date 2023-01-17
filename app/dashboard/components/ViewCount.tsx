import { useState } from "react";
import { Button, Collapse, Table } from "@mantine/core";
import short from "short-uuid"

interface iViewCount {
  roi_name: string;
  count: number;
}

export interface IViewCountProps {
  viewcount?: iViewCount[];
}

const ViewCount: React.FC<IViewCountProps> = ({ viewcount }) => {
  const [opened, setOpen] = useState(true);

  const elements = viewcount?.sort((a, b) => b.count - a.count)

  const rows = elements?.map((element, index) => (
    <tr key={short.generate()}>
      <td style={{ width: 10 }}><span style={{ backgroundColor: '#1ab394', paddingTop: 3, paddingBottom: 3, paddingLeft: 8, paddingRight: 8, margin: 15, color: "white", borderRadius: 4 }}>{index + 1}</span></td>
      <td>{element.roi_name}</td>
      <td>{element.count}</td>
    </tr>
  ));

  return (
    <>
      <Button className="flex items-center" onClick={() => setOpen((o) => !o)}>
        Viewed
      </Button>

      <Collapse
        in={opened}
        transitionDuration={400}
        transitionTimingFunction="linear"
      >
        <Table className="mt-[20px] sm:mt-0">
          <tbody>{rows}</tbody>
        </Table>
      </Collapse>
    </>
  );
};

export default ViewCount;
