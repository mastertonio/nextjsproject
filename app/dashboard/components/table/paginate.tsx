import { Pagination, Select, Text } from "@mantine/core";

interface IPaginateProps {
  page: number,
  setLimit: (num: string) => void
  totalResults: number,
  limit: string,
  activePage: number,
  setPage: (num: number) => void
}

const Paginate: React.FC<IPaginateProps> = ({ page, setLimit, limit, totalResults, activePage, setPage}) => {
  const defaultlimit = "10"
  return (
    <div style={{ display: "flex", flexDirection: "row", alignItems: "center", margin: 20}}>
      <Text style={{ marginRight: 5}}>Showing {limit} of {totalResults} ROIs </Text>
      <Select
       style={{ width: 70}}
        placeholder="Pick one"
        defaultValue={defaultlimit}
        data={[
          { value: "10", label: "10" },
          { value: "20", label: "20" },
          { value: "30", label: "30" },
          { value: "50", label: "50" },
          { value: "100", label: "100" }
        ]}
        onChange={(value)=> {
          setLimit(value || defaultlimit)
        }}
      />
      <Text style={{ marginLeft: 5}}> ROIs per page </Text>
      <Pagination style={{ marginLeft: "auto"}} total={page ? page : 10} color="teal" onChange={setPage}/>
    </div>
  );
};

export default Paginate;
