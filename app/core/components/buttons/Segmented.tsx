import { useState } from "react";
import { SegmentedControl } from "@mantine/core";

interface ISegmentedProps {
  val: string;
}

const Segmented: React.FC<ISegmentedProps> = ({ val }) => {
  const [value, setValue] = useState(val);
  return (
    <SegmentedControl
      value={value}
      onChange={setValue}
      color={value=="active" ? "teal" : "gray"}
      data={[
        { label: "Inactive", value: "inactive" },
        { label: "Active", value: "active" },
      ]}
    />
  );
};

export default Segmented;
