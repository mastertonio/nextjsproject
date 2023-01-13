import { MultiSelect, Select } from "@mantine/core";
import { SetStateAction, useContext, useEffect, useState } from "react";
import { useStyles } from "@styles/navStyle";
import { AiFillCaretDown } from "react-icons/ai";
import axios from "axios";
import { useLocalStorage } from "@mantine/hooks";
import { useQuery } from "react-query";
import UserContext from "@app/context/user.context";

export interface ITemplateList {
  active: string;
  name: string;
  company_id: string;
  id: string;
}

interface ITempList {
  filter: string[]
  handleFilter: (e: SetStateAction<string[]>) => void
}

const TempList: React.FC<ITempList> = ({ filter, handleFilter }) => {

  const getTemplateList = async () => {
     return await axios.get(
        `/v1/dashboard/template/list`
      );
  };

  const { isLoading, status, data, isFetching, refetch, isError, isSuccess } = useQuery(
    "templateList",
    getTemplateList
  );

  if (isLoading) return <div>Loading</div>

  if (isError) {
    return (
      <MultiSelect
        style={{ width: 450 }}
        placeholder="Filter Templates"
        searchable
        clearable
        // data={dataTemp2 ?? []}
        data={[]}
        value={filter}
        onChange={handleFilter}
      />
    );
  };

  if (isSuccess) {
    const dataTemp2 = data?.data.map((a: { name: string; build: any }) => {
      return a?.build?.map((b: { _id: string; name: string; group: string }) => ({
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
  }

  return <></>
}

export default TempList;
