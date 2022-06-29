import { useState } from "react";
import { Modal, Button, Group, TextInput} from "@mantine/core";
import { useForm } from "@mantine/form";
import { AiOutlineDelete } from "react-icons/ai";
import { useLocalStorage } from "@mantine/hooks";
import { useRouter } from "next/router";
import axios from "axios";
import { IButtonRoiNameProps } from "./EditButton";

const DeleteButton: React.FC<IButtonRoiNameProps> = ({ id }) => {
  const [opened, setOpened] = useState(false);
  const [value] = useLocalStorage({ key: "auth-token" });
  const router = useRouter();
  const p = router.query;


  const handleSubmit = async () => {
    try {
      await axios.delete(
        `http://54.159.8.194/v1/dashboard/roi/${id}/${p.id}`, { headers: { Authorization: `Bearer ${value}` }}
      );
      // router.push("/awdwa");
    } catch (error) {
      console.log(error);
      return error;
    }
  };

  return (
    <>
        <Button leftIcon={<AiOutlineDelete />} radius="xs" size="xs" color="red" onClick={handleSubmit}>
          Delete
        </Button>
    </>
  );
};

export default DeleteButton;
