import { Modal, Text } from "@mantine/core";
import { useLocalStorage } from "@mantine/hooks";
import { showNotification } from "@mantine/notifications";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Rating } from "react-simple-star-rating";
import { IStarProps } from "../dropdown/Select";

const StarRating: React.FC<IStarProps> = ({
  id,
  refetch,
  importance,
  readOnly,
  rating,
  setStar,
  setRating,
  opened,
  cur_status,
  setOpened,
  size,
  disabled,
}) => {
  const [value] = useLocalStorage({ key: "auth-token" });
  const [r, setR] = useState<number>(rating);
  const [loaded, setLoaded] = useState(false)
  const router = useRouter();
  const p = router.query;

  const handleRate = async (rate: number) => {
    try {
      setR(rate);
      setOpened?.(false);
      const res = await axios.patch(
        `http://54.159.8.194/v1/dashboard/roi/${id}/${p.id}`,
        { importance: rate },
        { headers: { Authorization: `Bearer ${value}` } }
      );
      if (res) {
        refetch();
      }
      refetch();
    } catch (error) {
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
