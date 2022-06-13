import { Button, Table } from "@mantine/core";
import SelectDropdown from "../dropdown/Select";
import { Rating } from "react-simple-star-rating";
import { useState } from "react";
import { useStyles } from "../../../../styles/dashboardStyle";

const Row: React.FC = () => {
  const [rating, setRating] = useState<number>(0);
  const [search, setSearch] = useState<string>("");
  const { classes } = useStyles();

  const handleRating = (rate: number) => {
    setRating(rate);
  };

  
  const handleSearch = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setSearch(event.target.value);
  };

  const threeButtons = (
    <>
      <Button children="Edit" size="xs" />
      <Button children="Clone" color="teal" size="xs" />
      <Button children="Delete" color="red" size="xs" />
    </>
  );

  const elements = [
    {
      button: <Button children="Open" color="blue" />,
      status: <SelectDropdown />,
      importance: (
        <Rating
          onClick={handleRating}
          ratingValue={rating} /* Available Props */
        />
      ),
      roiname: "Sample template 1",
      dates: "2022-05-05T09:32:24.605+00:00",
      views: 0,
      uniqueViews: 0,
      actions: threeButtons,
    },
    {
      button: <Button children="Open" color="blue" />,
      status: <SelectDropdown />,
      importance: (
        <Rating
          onClick={handleRating}
          ratingValue={rating} /* Available Props */
        />
      ),
      roiname: "Sample template 2",
      dates: "2022-05-05T10:32:24.605+00:00",
      views: 1,
      uniqueViews: 1,
      actions: threeButtons,
    },
    {
      button: <Button children="Open" color="blue" />,
      status: <SelectDropdown />,
      importance: (
        <Rating
          onClick={handleRating}
          ratingValue={rating} /* Available Props */
        />
      ),
      roiname: "Sample template 3",
      dates: "2022-05-05T10:32:24.605+00:00",
      views: 2,
      uniqueViews: 2,
      actions: threeButtons,
    },
  ];

  const filterSearch = {
    nodes: elements.filter((item) => item.roiname.includes(search)),
  };

  const rows = filterSearch.nodes.map((element) => (
    <tr key={element.roiname}>
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
        verticalSpacing="xs"
        highlightOnHover
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
