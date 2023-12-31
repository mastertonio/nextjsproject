import { Grid, Modal, Select, Text } from "@mantine/core";
import { useLocalStorage } from "@mantine/hooks";
import { showNotification, updateNotification } from "@mantine/notifications";
import { IconCheck } from "@tabler/icons";
import axios from "axios";
import { useRouter } from "next/router";
import { SetStateAction, useEffect, useState } from "react";
import { Rating } from "react-simple-star-rating";
import StarRating from "../rating/Star";
import { UserDataProp } from "@app/context/user.context";

export interface IStarProps {
  cur_status: number;
  setStatus?: (status: boolean) => void;
  setRating: (rate: number) => void;
  setStar: (star: boolean) => void;
  readOnly?: boolean;
  rating: number;
  id: string;
  importance: number;
  refetch: () => void;
  opened?: boolean;
  setOpened?: (open: boolean) => void;
  size?: any;
  disabled?: boolean
  user: UserDataProp
}

const SelectDropdown: React.FC<IStarProps> = ({
  cur_status,
  rating,
  importance,
  id,
  setRating,
  refetch,
  setStar,
  user
}) => {
  const [opened, setOpen] = useState(false);
  const [value] = useLocalStorage({ key: "auth-token" });
  const [values, setValues] = useState<any>(`${cur_status}`);
  const router = useRouter();
  const p = router.query;

  // useEffect(()=>{
  //   if(cur_status==null){
  //     setValues('0')
  //   }
  // },[cur_status])

  const handleSubmit = async (data?: string) => {
    try {
      showNotification({
        id: "status-row",
        loading: true,
        title: `Updating status`,
        message: "Please wait ...",
        autoClose: false,
         
        color: "teal",
      });
      const res = await axios.patch(
        `/v1/dashboard/roi/${id}/${p.id}`,
        { status: data ?? values }
      );
      if (res) {
        updateNotification({
          id: "status-row",
          color: "teal",
          title: `Status updated!`,
          message: "Refreshing shortly ...",
          icon: <IconCheck size={16} />,
          autoClose: 2500,
        });
        refetch();
      }
      refetch();
    } catch (error) {
      updateNotification({
        id: "status-row",
        color: "red",
        title: "Updating status failed",
        message: "Something went wrong, Please try again",
        autoClose: 2500,
      });
      return error;
    }
  };

  const handleChange = (event: SetStateAction<string> | null | undefined) => {
    if (event == "1") {
      setOpen(true);
      setStar(false)
      setValues(event);
      handleSubmit(event);
      refetch();
    }

    if (event == "0") {
      setValues(event);
      handleSubmit(event);
      refetch();
    }

    if (event == "2") {
      setValues(event);
      handleSubmit(event);
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
          className="pt-[30px] pl-[30px] pr-[30px] text-[30px] bg-[#051a3d] text-white"
          align="center"
        >
          Congrats on winning this opportunity!
        </Text>
        <Text
          weight={100}
          color="gray"
          className="mb-0 pb-[30px] pl-[30px] pr-[30px] text-[30px] bg-[#051a3d] text-white"
          align="center"
        >
          Please rate how useful this tool was in the process
        </Text>
        <Grid justify="center" m={30}>
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
            size="lg"
            user={user}
          />
        </Grid>
      </Modal>
      <Select
        className="w-[130px]"
        value={values}
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
