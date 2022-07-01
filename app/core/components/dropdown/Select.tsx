import { Modal, Select, Text } from "@mantine/core";
import { useState } from "react";
import { Rating } from "react-simple-star-rating";

export interface IStarProps {
  status: boolean;
  setStatus: (status: boolean) => void;
  rating: number;
  setRating: (rating: number) => void;
  id: string
}

const SelectDropdown: React.FC<IStarProps> = ({ status, setStatus, rating, setRating}) => {
  const [opened, setOpen] = useState(false);

  const handleChange = (event: React.SetStateAction<string | null>) => {
    if (event == "1") {
      setOpen(true);
      setStatus(true);
    }
    console.log(status, "eveeent");
  };

  const handleRating = (rate: number) => {
    setRating(rate);
  };

  return (
    <>
      <Modal
        opened={opened}
        onClose={() => {
          setOpen((prev) => !prev);
        }}
        title="Please Rate how useful this tool was in the process"
      >
        <Text> </Text>
        <Rating
          onClick={handleRating}
          ratingValue={rating} /* Available Props */
        />
      </Modal>
      <Select
        style={{ width: 150 }}
        defaultValue="0"
        data={[
          { value: "0", label: "Active" },
          { value: "1", label: "Closed Won" },
          { value: "2", label: "Closed Lost" },
        ]}
        onChange={(event) => handleChange(event)}
      />
    </>
  );
};

export default SelectDropdown;
