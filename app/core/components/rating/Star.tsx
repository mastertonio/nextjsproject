import { Modal, Text, Rating } from "@mantine/core";
import { useLocalStorage } from "@mantine/hooks";
import { showNotification } from "@mantine/notifications";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useUserStore } from "@app/store/userState";
// import { Rating } from "react-simple-star-rating";
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
  user
}) => {
  const [value] = useLocalStorage({ key: "auth-token" });
  const userZ = useUserStore((state) => (state.user))
  const [r, setR] = useState<number>(rating);
  const [loaded, setLoaded] = useState(false)
  const router = useRouter();
  const p = router.query;

  const handleRate = async (rate: number) => {
    try {
      setR(rate);
      setOpened?.(false);
      const res = await axios.patch(
        `/v1/dashboard/roi/${id}/${user.user.id}`,
        { importance: rate }, {
        headers: {
          Authorization: `Bearer ${user.tokens.access.token}`,
        },
      }
      );
      if (res) {
        refetch();
      }
      refetch();
    } catch (error) {
      console.log('error rating', error)
      return error;
    }
  };



  return (
    <Rating
      color="teal"
      readOnly={readOnly}
      defaultValue={importance}
      onChange={handleRate}
      size={size}
    />
    // <Rating
    //   readonly={readOnly}
    //   fillColor="#000000"
    //   initialValue={importance}
    //   onClick={handleRate}
    //   size={size ? size : 16} /* Available Props */
    // />
  );
};

export default StarRating;
