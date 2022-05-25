import { Select } from "@mantine/core";
import { useEffect, useState } from "react";
import { useStyles } from "../navStyle";

const ActionList: React.FC = () => {
  const { classes } = useStyles();
  const actionList = ["Action 1", "Action 2", "Action 3", "Action 4", "Action 5"];
  const [values, setValues] = useState<any>(actionList[0]);

  const handleChange = (event: any) => {
    setValues(event);
  };

  useEffect(() => {
    console.log("the value has changed", values);
  }, [values]);

  return (
    <Select
      placeholder="My Actions"
      searchable
      nothingFound="No options"
      variant="default"
      data={actionList}
      onChange={(event) => handleChange(event)}
      className={classes.childrenSpacing}
    />
  );
};

export default ActionList;
