import { Modal, Text } from "@mantine/core";
import { useState } from "react";
import { Rating } from 'react-simple-star-rating'

const StarRating: React.FC = () => {
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
        
          <Rating onClick={handleRating} ratingValue={rating} /* Available Props */ />
      </Modal>
    )
}

export default StarRating