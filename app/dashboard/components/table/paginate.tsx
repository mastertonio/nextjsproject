import { Pagination, Select, Text } from "@mantine/core";
import React, { HtmlHTMLAttributes, useState } from "react";
import { usePagination } from '@mantine/hooks';
interface IPaginateProps {
  page: number;
  setLimit: (num: number) => void;
  totalResults: number;
  limit: number;
  activePage: number;
  setPage: (num: number) => void;
  refetch: () => void;
  firstIndex: number
  lastIndex: number
}

const Paginate: React.FC<IPaginateProps> = ({
  page,
  setLimit,
  limit,
  totalResults,
  activePage,
  setPage,
  refetch,
  firstIndex,
  lastIndex
}) => {
  const [defaultlimit, setDefaultLimit] = useState<string>(`${limit}`);
  // const pagination = usePagination({ total: page, initialPage: activePage });

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        margin: 20,
      }}
    >
      <Text style={{ marginRight: 5 }}>
        Showing {firstIndex+1} to {lastIndex>totalResults ? totalResults : lastIndex} of {totalResults} ROIs{" "}
      </Text>
      <Select
        style={{ width: 70 }}
        placeholder="Pick one"
        value={defaultlimit}
        data={[
          { value: "10", label: "10" },
          { value: "20", label: "20" },
          { value: "30", label: "30" },
          { value: "50", label: "50" },
          { value: "100", label: "100" },
        ]}
        onChange={(value) => {
          setDefaultLimit(value || defaultlimit);
          switch (value) {
            case "20":
              return setLimit(20);
            case "30":
              return setLimit(30);
            case "50":
              return setLimit(50);
            case "100":
              return setLimit(100);
            default:
              return setLimit(10);
          }
        }}
      />
      <Text style={{ marginLeft: 5 }}> ROIs per page </Text>
      <Pagination
        style={{ marginLeft: "auto" }}
        total={page}
        color="teal"
        page={activePage}
        onChange={setPage}
      />
    </div>
  );
};

export default Paginate;
