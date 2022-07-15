import { Grid, Modal, Select, Text } from "@mantine/core";
import { useLocalStorage } from "@mantine/hooks";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Rating } from "react-simple-star-rating";
import StarRating from "../rating/Star";

export interface IStarProps {
  cur_status: number;
  setStatus?: (status: boolean) => void;
  setRating?: (rate: number) => void;
  setStar: (star: boolean) => void;
  readOnly?: boolean;
  rating: number;
  id: string;
  importance: number;
  refetch: () => void;
  opened?: boolean;
  setOpened?: (open: boolean) => void;
  size?: number;
}

const SelectDropdown: React.FC<IStarProps> = ({
  cur_status,
  rating,
  importance,
  id,
  setRating,
  refetch,
  setStar,
}) => {
  const [opened, setOpen] = useState(false);
  const [value] = useLocalStorage({ key: "auth-token" });
  const router = useRouter();
  const p = router.query;

  const handleSubmit = async () => {
    try {
      await axios.patch(
        `http://54.159.8.194/v1/dashboard/roi/${id}/${p.id}`,
        { status: "1" },
        { headers: { Authorization: `Bearer ${value}` } }
      );
      refetch();
    } catch (error) {
      console.log(error);
      return error;
    }
  };

  const handleChange = (event: React.SetStateAction<string | null>) => {
    if (event == "1") {
      setOpen(true);
      handleSubmit();
      refetch();
    }
    refetch();
  };

  const handleDefault = (cur_status: number) => {
    switch (cur_status) {
      case 1:
        return "1";
      case 2:
        return "2";
      default:
        return "0";
    }
  };

  return (
    <>
      <Modal
        opened={opened}
        onClose={() => {
          setOpen((prev) => !prev);
          refetch();
        }}
        withCloseButton={false}
        size="lg"
        padding={0}
      >
        <Text
          weight={700}
          color="gray"
          style={{
            paddingTop: 30,
            paddingLeft: 30,
            paddingRight: 30,
            fontSize: 30,
            backgroundColor: "#051a3d",
            color: "white",
          }}
          align="center"
        >
          Congrats on winning this opportunity!
        </Text>
        <Text
          weight={100}
          color="gray"
          style={{
            paddingLeft: 30,
            paddingRight: 30,
            paddingBottom: 30,
            marginBottom: 80,
            fontSize: 30,
            backgroundColor: "#051a3d",
            color: "white",
          }}
          align="center"
        >
          Please rate how useful this tool was in the process
        </Text>
        <Grid justify="center" m={50}>
          <StarRating
            importance={importance}
            id={id}
            cur_status={cur_status}
            refetch={refetch}
            rating={rating}
            setRating={setRating}
            readOnly={false}
            setStar={setStar}
            opened={opened}
            setOpened={setOpen}
            size={50}
          />
        </Grid>
      </Modal>
      <Select
        style={{ width: 150 }}
        defaultValue={handleDefault(cur_status)}
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
