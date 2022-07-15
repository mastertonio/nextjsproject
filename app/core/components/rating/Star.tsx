import { Modal, Text } from "@mantine/core";
import { useLocalStorage } from "@mantine/hooks";
import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";
import { Rating } from "react-simple-star-rating";
import { IStarProps } from "../dropdown/Select";

const StarRating: React.FC<IStarProps> = ({ id, refetch, importance, readOnly, rating, setStar, setRating, opened, cur_status, setOpened, size }) => {
  const [value] = useLocalStorage({ key: "auth-token" });
  const router = useRouter();
  const p = router.query;

  const handleRate = async (rate: number) => {
    try {
      setOpened?.(false)
      await axios.patch(
        `http://54.159.8.194/v1/dashboard/roi/${id}/${p.id}`,
        { importance: rate },
        { headers: { Authorization: `Bearer ${value}` } }
      );
      refetch();
    } catch (error) {
      console.log(error);
      return error;
    }
  };
  return (
    <Rating
      readonly={readOnly}
      fillColor="#000000"
      initialValue={importance}
      onClick={handleRate}
      ratingValue={importance}
      size={size ? size : 16} /* Available Props */
    />
  );
};

export default StarRating;
