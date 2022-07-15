import { useState } from "react";
import { Modal, Button, Text, TextInput, Grid } from "@mantine/core";
import { useForm } from "@mantine/form";
import { AiOutlineDelete } from "react-icons/ai";
import { useLocalStorage } from "@mantine/hooks";
import { useRouter } from "next/router";
import axios from "axios";
import { IButtonRoiNameProps } from "./EditButton";
import { AiOutlineExclamationCircle } from "react-icons/ai";

const DeleteButton: React.FC<IButtonRoiNameProps> = ({ id, refetch, name }) => {
  const [opened, setOpened] = useState(false);
  const [value] = useLocalStorage({ key: "auth-token" });
  const router = useRouter();
  const p = router.query;

  const form = useForm({
    initialValues: {
      title: "",
    },
  });

  const handleSubmit = async () => {
    try {
      setOpened(false)
      await axios.delete(`http://54.159.8.194/v1/dashboard/roi/${id}/${p.id}`, {
        headers: { Authorization: `Bearer ${value}` },
      });
      refetch();
    } catch (error) {
      console.log(error);
      return error;
    }
  };

  return (
    <>
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        withCloseButton={false}
        size="lg"
        padding={0}
      >
        <Text align="center">
          <AiOutlineExclamationCircle size={250} color="#f8bb86" />
        </Text>

        <Text
          weight={500}
          color="gray"
          style={{
            paddingTop: 30,
            paddingLeft: 30,
            paddingRight: 30,
            fontSize: 30,
            backgroundColor: "white",
            color: "gray",
          }}
          align="center"
        >
          Are you sure ?
        </Text>
        <Text
          weight={300}
          color="gray"
          style={{
            paddingLeft: 30,
            paddingRight: 30,
            paddingBottom: 30,
            marginBottom: 10,
            fontSize: 20,
            backgroundColor: "white",
            color: "gray",
          }}
          align="center"
        >
          You will not be able to recover <Text weight={700} style={{ display: "inline-block", fontSize: 20}}>{name}</Text>!
        </Text>
        <Grid justify="flex-end" style={{ margin: 20 }}>
          <Button
            type="submit"
            radius="sm"
            size="sm"
            color="red"
            style={{ marginRight: 10 }}
            onClick={() => handleSubmit()}
          >
            Delete
          </Button>
          <Button
            radius="sm"
            size="sm"
            onClick={() => setOpened(false)}
            style={{
              backgroundColor: "white",
              color: "black",
              borderColor: "gray",
            }}
          >
            Close
          </Button>
        </Grid>
      </Modal>
      <Button
        leftIcon={<AiOutlineDelete />}
        radius="sm"
        size="xs"
        color="red"
        onClick={() => setOpened(true)}
      >
        Delete
      </Button>
    </>
  );
};

export default DeleteButton;
