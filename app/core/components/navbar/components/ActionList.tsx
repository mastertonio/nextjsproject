import { Select } from "@mantine/core";
import { useEffect, useState } from "react";
import short from "short-uuid";
import { useStyles } from "@styles/navStyle";
import { IAdminListProps } from "./AdminList";

const ActionList: React.FC<IAdminListProps> = ({ actions }) => {
  const { classes } = useStyles();
  const actionList = actions?.map((a)=> ({key: short.generate(),value: a.name, label: a.name}));
  const [values, setValues] = useState<any>('');

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
      data={actionList ? actionList : []}
      onChange={(event) => handleChange(event)}
      className={classes.childrenSpacing}
    />
  );
};

export default ActionList;
