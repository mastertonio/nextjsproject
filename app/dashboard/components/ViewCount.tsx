import { useState } from "react";
import { Button, Collapse, Table } from "@mantine/core";

interface iViewCount {
  roi_name: string;
  count: number;
}

export interface IViewCountProps {
  viewcount?: iViewCount[];
}

const ViewCount: React.FC<IViewCountProps> = ({ viewcount}) => {
  const [opened, setOpen] = useState(false);
  
  const elements = viewcount?.sort((a,b)=> b.count - a.count)

  const rows = elements?.map((element) => (
    <tr key={element.roi_name}>
      <td>{element.roi_name}</td>
      <td>{element.count}</td>
    </tr>
  ));

  return (
    <>
      <Button onClick={() => setOpen((o) => !o)}>
        Viewed
      </Button>

      <Collapse
        in={opened}
        transitionDuration={400}
        transitionTimingFunction="linear"
      >
        <Table>
          <tbody>{rows}</tbody>
        </Table>
      </Collapse>
    </>
  );
};

export default ViewCount;
