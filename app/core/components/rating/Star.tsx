import { Modal, Text } from "@mantine/core";
import { useState } from "react";
import { Rating } from 'react-simple-star-rating'
import { IStarProps } from "../dropdown/Select";

const StarRating: React.FC<IStarProps> = ({ setStatus, status }) => {
  const [rating, setRating] = useState<number>(0)
  const [opened, setOpen] = useState(false);

  const handleRating = (rate: number) => {
    setRating(rate)
  }

    return (
        <Modal
        opened={opened}
        onClose={() => {
          setOpen((prev) => !prev);
          setRating(0)
        }}
        title="Importance Modal"
      >
        
          <Rating readonly={true} onClick={handleRating} ratingValue={rating} size={10}/* Available Props */ />
      </Modal>
    )
}

export default StarRating