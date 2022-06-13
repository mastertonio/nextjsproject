import { Modal, Select } from "@mantine/core";
import { useState } from "react";
import { Rating } from "react-simple-star-rating";

const SelectDropdown: React.FC = () => {
  const [opened, setOpen] = useState(false);
  const [rating, setRating] = useState<number>(0);

  const handleChange = (event: React.SetStateAction<string | null>) => {
    if (event === "Closed Won") {
      setOpen(true);
    }
    console.log(event, "eveeent");
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
          setRating(0);
        }}
        title="Importance Modal"
      >
        <Rating
          onClick={handleRating}
          ratingValue={rating} /* Available Props */
        />
      </Modal>
      <Select
        style={{ width: 150 }}
        defaultValue="Active"
        data={[
          { value: "Active", label: "Active" },
          { value: "Closed Won", label: "Closed Won" },
          { value: "Closed Lost", label: "Closed Lost" },
        ]}
        onChange={(event) => handleChange(event)}
      />
    </>
  );
};

export default SelectDropdown;
