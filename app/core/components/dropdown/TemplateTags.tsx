import { MultiSelect, Select } from "@mantine/core";
import { SetStateAction, useEffect, useState } from "react";
import { useStyles } from "@styles/navStyle";
import { AiFillCaretDown } from "react-icons/ai";
import axios from "axios";
import { useLocalStorage } from "@mantine/hooks";
import { useQuery } from "react-query";

export interface ITemplateList {
  active: string;
  name: string;
  company_id: string;
  id: string;
}

interface ITempList {
  filter: string[]
  handleFilter: (e: SetStateAction<string[]>)=> void
}

const TempList: React.FC<ITempList> = ({ filter, handleFilter }) => {
  const { classes } = useStyles();
  const [values, setValues] = useState<any>("Admin");
  const [value] = useLocalStorage({ key: "auth-token" });
  const [current, setCurrent] = useLocalStorage({ key: "current-user" });

  const getTemplateList = async () => {
    try {
      const res = await axios.get(
        `http://54.159.8.194/v1/dashboard/template/list`,
        {
          headers: {
            Authorization: `Bearer ${value}`,
          },
        }
      );
      return res.data;
    } catch (error) {
      return error;
    }
  };

  const { isLoading, status, data, isFetching, refetch } = useQuery(
    "templateList",
    getTemplateList
  );

  const dataTemp2 = data?.map((a: { name: string; build: any }) => {return a?.build?.map((b: { _id: string; name: string; group: string }) => ({
    key: b._id,
    value: b.name,
    label: b.name,
    group: a.name
  }))
}).flat();

  return (
    <MultiSelect
      style={{ width: 450 }}
      placeholder="Filter Templates"
      searchable
      clearable
      data={dataTemp2 ?? []}
      value={filter}
      onChange={handleFilter}
    />
  );
};

export default TempList;
