import { useState } from "react";
import { Button, Collapse, Table } from "@mantine/core";

interface iViewCount {
  account_name: string;
  rois: number;
}

export interface IViewCountProps {
  rankings?: iViewCount[];
}

const ViewCount: React.FC<IViewCountProps> = ({ rankings }) => {
  const [opened, setOpen] = useState(false);
  const elements = rankings?.sort((a,b)=> b.rois - a.rois)

  const rows = elements?.map((element) => (
    <tr key={element.account_name}>
      <td>{element.account_name}</td>
      <td>{element.rois}</td>
    </tr>
  ));

  return (
    <>
      <Button onClick={() => setOpen((o) => !o)}>
        Toggle with linear transition
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
