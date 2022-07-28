import { iDashRowProp2 } from "@dashboard/components/Row";
import { keys } from "@mantine/utils";

interface RowData {
  name: string;
  email: string;
  company: string;
}

export const filterMultipleData = (data: iDashRowProp2[], search: string[]) => {
  const query = search;
  return data.filter(item => query.length>0 ? query.includes(item.source_name) : item.source_name.toLowerCase().includes(''));
};

export const sortFilterData = (
  data: iDashRowProp2[],
  payload: {
    sortBy: keyof iDashRowProp2 | null;
    reversed: boolean;
    search: any;
  }
) => {
  const { sortBy } = payload;

  if (!sortBy) {
    return filterMultipleData(data, payload.search);
  }

  return filterMultipleData(
    [...data].sort((a, b) => {
      if (payload.reversed) {
        return b[sortBy].toString().localeCompare(a[sortBy]);
      }

      return a[sortBy].toString().localeCompare(b[sortBy]);
    }),
    payload.search
  );
};

export const filterData = (data: iDashRowProp2[], search: string) => {
  const query = search.toLowerCase().trim();
  return data.filter((item) => {
    console.log(item.name.toLowerCase().includes(query),'dawdawdawdaw')
    return item.name.toLowerCase().includes(query)
  });
};

export const sortData = (
  data: iDashRowProp2[],
  payload: {
    sortBy: keyof iDashRowProp2 | null;
    reversed: boolean;
    search: any;
  }
) => {
  const { sortBy } = payload;

  if (!sortBy) {
    return filterData(data, payload.search);
  }

  return filterData(
    [...data].sort((a, b) => {
      if (payload.reversed) {
        return b[sortBy].toString().localeCompare(a[sortBy]);
      }

      return a[sortBy].toString().localeCompare(b[sortBy]);
    }),
    payload.search
  );
};
