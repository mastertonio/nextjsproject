import { iDashRowProp2 } from "@dashboard/components/Row";
import { keys } from "@mantine/utils";

interface RowData {
  name: string;
  email: string;
  company: string;
}

export const filterData = (data: iDashRowProp2[], search: string) => {
  const query = search.toLowerCase().trim();
  return data.filter((item) => item.name.toLowerCase().includes(query)
  );
};

export const sortData = (
  data: iDashRowProp2[],
  payload: { sortBy: keyof iDashRowProp2 | null; reversed: boolean; search: any }
) => {
  const { sortBy } = payload;

  if (!sortBy) {
    return filterData(data, payload.search);
  }

  return filterData(
    [...data].sort((a, b) => {
      console.log(sortBy,'ab')
      if (payload.reversed) {
        return b[sortBy].toString().localeCompare(a[sortBy]);
      }

      return a[sortBy].toString().localeCompare(b[sortBy]);
    }),
    payload.search
  );
}