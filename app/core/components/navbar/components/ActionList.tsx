import { Select } from "@mantine/core";
import { useEffect, useState } from "react";
import { useStyles } from "../navStyle";
import { IAdminListProps } from "./AdminList";

const ActionList: React.FC<IAdminListProps> = ({ actions }) => {
  const { classes } = useStyles();
  const actionList = actions?.map((a)=> a.name);
  const [values, setValues] = useState<any>('');

  const handleChange = (event: React.SetStateAction<string | null>) => {
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
      data={actionList ? actionList : []}
      onChange={(event) => handleChange(event)}
      className={classes.childrenSpacing}
    />
  );
};

export default ActionList;
