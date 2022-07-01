import { useState } from "react";
import { Button} from "@mantine/core";
import { FaRegClone } from "react-icons/fa";
import axios from "axios";
import { useLocalStorage } from "@mantine/hooks";
import { useRouter } from "next/router";
import { IButtonRoiNameProps } from "./EditButton";

const CloneButton: React.FC<IButtonRoiNameProps> = ({ id, name}) => {
  const [value] = useLocalStorage({ key: "auth-token" });
  const router = useRouter();
  const p = router.query;
  
  const handleSubmit = async () => {
    try {
      await axios.post(
        `http://54.159.8.194/v1/dashboard/roi/${id}/${p.id}`, { title: name }, { headers: { Authorization: `Bearer ${value}` }}
      );
      // router.push("/awdwa");
    } catch (error) {
      console.log(error);
      return error;
    }
  };


  return (
    <>
        <Button leftIcon={<FaRegClone />} radius="xs" size="xs" color="teal" onClick={handleSubmit}>
          Clone
        </Button>
    </>
  );
};

export default CloneButton;
