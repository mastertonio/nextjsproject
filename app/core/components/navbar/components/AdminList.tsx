import { AutocompleteItem, Select } from "@mantine/core";
import { useEffect, useState } from "react";
import { useStyles } from "../navStyle";

const AdminList: React.FC = () => {
  const { classes } = useStyles();
  const adminList = ["Admin", "React", "Angular", "Svelte", "Vue"];
  const [values, setValues] = useState<any>("Admin");

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
      data={adminList}
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
