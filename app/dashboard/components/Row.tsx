import { Button, Table } from "@mantine/core";
import SelectDropdown from "@core/components/dropdown/Select";
import { Rating } from "react-simple-star-rating";
import { SetStateAction, useEffect, useState } from "react";
import { useStyles } from "@styles/dashboardStyle";
import { useRouter } from "next/router";
import EditButton from "./buttons/EditButton";
import DeleteButton from "./buttons/DeleteButton";
import CloneButton from "./buttons/CloneButton";
import { AiOutlineFolderOpen } from "react-icons/ai";

export interface iDashRowProp {
  id: string;
  link?: string;
  importance: number;
  name: string;
  source: string;
  dateCreated: string;
  views: number;
  uniqueViews: number;
}

export interface iDashboardRowProps {
  my_roi: iDashRowProp[] | null;
  setData?: (prevState: SetStateAction<any>) => any
  fetching: boolean
}

const Row: React.FC<iDashboardRowProps> = ({ my_roi , setData, fetching}) => {
  const [rating, setRating] = useState<number>(0);
  const [search, setSearch] = useState<string>("");
  const [status, setStatus] = useState<boolean>(false)
  const { classes } = useStyles();
  const router = useRouter();

  useEffect(()=>{
    console.log(status, 'status')
  },[status])
  const handleRating = (rate: number) => {
    setRating(rate);
  };

  const handleSearch = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setSearch(event.target.value);
  };

  const myroi = my_roi?.map(
    ({
      link,
      views,
      uniqueViews,
      source,
      dateCreated,
      id,
      importance,
      name,
    }) => ({
      id,
      link,
      button: (
        <Button
          leftIcon={<AiOutlineFolderOpen />}
          color="blue"
          onClick={() => {
            router.push(`/templates/${id}`);
          }}
        >Open</Button>
      ),
      status: <SelectDropdown status={status} setStatus={setStatus} rating={rating} setRating={setRating} id={id}/>,
      importance: status ? (
        <Rating
          initialValue={importance}
          size={20}
          allowHover={status}
          onClick={setRating}
          ratingValue={rating} /* Available Props */
        />
      ) : <Rating ratingValue={0} size={20}/>,
      roiname: name,
      dates: dateCreated,
      views,
      uniqueViews,
      actions: (
        <>
          <EditButton id={id} />
          <CloneButton id={id} name={name}/>
          <DeleteButton id={id} />
        </>
      ),
      source,
    })
  );

  const filterSearch = {
    nodes: myroi?.filter((item) => item.roiname.includes(search)),
  };

  const rows = filterSearch.nodes?.map((element) => (
    <tr key={element.id}>
      <td>{element.button}</td>
      <td>{element.status}</td>
      <td>{element.importance}</td>
      <td>{element.roiname}</td>
      <td>{element.dates}</td>
      <td>{element.views}</td>
      <td>{element.uniqueViews}</td>
      <td>{element.actions}</td>
    </tr>
  ));

  return (
    <>
      <Table
        className={classes.table}
        horizontalSpacing="xl"
        highlightOnHover
        verticalSpacing="xs" 
      >
        <thead>
          <tr>
            <th> </th>
            <th>Status</th>
            <th>Importance</th>
            <th>ROI name</th>
            <th>Dates</th>
            <th>Views</th>
            <th>Unique Views</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    </>
  );
};

export default Row;
