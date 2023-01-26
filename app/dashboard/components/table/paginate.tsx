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
      className="flex flex-col sm:flex-row items-center m-0 sm:m-[20px]"
    >
      <Text className="mr-[10px] text-[14px] text-slate-800 font-medium">
        Showing {firstIndex + 1} to {lastIndex > totalResults ? totalResults : lastIndex} of {totalResults} ROIs{" "}
      </Text>
      <Select
        className="w-[70px] mt-[20px] sm:mt-0"
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
      <Text className="ml-[10px] mt-[20px] sm:mt-0 text-[14px] text-slate-800 font-medium"> ROIs per page </Text>
      <Pagination
        className="ml-[unset] sm:ml-auto mt-[20px] sm:mt-0"
        total={page}
        color="teal"
        page={activePage}
        onChange={setPage}
      />
    </div >
  );
};

export default Paginate;
