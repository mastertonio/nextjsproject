import { Select } from "@mantine/core";
import { useEffect, useState } from "react";
import { useStyles } from "../navStyle";

const ActionList: React.FC = () => {
  const { classes } = useStyles();
  const adminList = ["Stand", "Run", "Walk", "Sit", "Roll"];
  const [values, setValues] = useState<any>(adminList[0]);

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
      data={adminList}
      onChange={(event) => handleChange(event)}
      className={classes.childrenSpacing}
    />
  );
};

export default ActionList;
