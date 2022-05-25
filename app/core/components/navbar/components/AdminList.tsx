import { AutocompleteItem, Select } from "@mantine/core";
import { useEffect, useState } from "react";
import { useStyles } from "../navStyle";

type iAdminData = {
  uid?: string,
  name: string
  id?: string
}

export interface IAdminListProps {
  admin?: iAdminData[]
  actions?: iAdminData[]
}

const AdminList: React.FC<IAdminListProps> = ({ admin }) => {
  const { classes } = useStyles();
  const adminList = admin?.map((a)=> a.name);
  adminList?.unshift('Admin')
  const [values, setValues] = useState<any>('Admin');

  const handleChange = (event: any) => {
    setValues(event);
  };

  useEffect(() => {
    console.log("the value has changed", values);
  }, [values]);

  return (
    <Select
      searchable
      nothingFound="No options"
      variant="filled"
      data={adminList ? adminList : []}
      styles={{
        wrapper: { color: "white" },
        dropdown: { color: "white" },
        item: { color: "teal" },
        hovered: { color: "teal" },
        filledVariant: { color: "teal" },
        input: {
          color: "white",
          backgroundColor: "#00acac",
          placeholder: "red",
        },
        required: { color: "teal" },
      }}
      value={values}
      onChange={(event) => handleChange(event)}
      className={classes.childrenSpacing}
    />
  );
};

export default AdminList;
