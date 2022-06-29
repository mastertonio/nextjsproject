import { useState } from "react";
import { Modal, Button, Group, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { AiOutlineEdit } from "react-icons/ai";
import axios from "axios";
import { useLocalStorage } from "@mantine/hooks";
import { useRouter } from "next/router";

export interface IButtonRoiNameProps {
  id: string;
  setFetching: (fetch: boolean)=> void
}

const EditButton: React.FC<IButtonRoiNameProps> = ({ id , setFetching}) => {
  const [opened, setOpened] = useState(false);
  const [value] = useLocalStorage({ key: "auth-token" });
  const router = useRouter();
  const p = router.query;

  const form = useForm({
    initialValues: {
      title: "",
    },
  });

  const handleSubmit = async (values: typeof form.values) => {
    try {
      setFetching(true)
      const response = await axios.patch(
        `http://54.159.8.194/v1/dashboard/roi/${id}/${p.id}`, { title: values.title }, { headers: { Authorization: `Bearer ${value}` }}
      );
      setFetching(false)
      // router.push("/awdwa");
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
        title="Fill up form here"
      >
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <TextInput
            required
            label="Title"
            placeholder="New Title Name"
            {...form.getInputProps("title")}
          />

          <Button
            type="submit"
            radius="sm"
            size="xs"
            onClick={() => setOpened(false)}
          >
            Submit
          </Button>
        </form>
      </Modal>

      <Button
        leftIcon={<AiOutlineEdit />}
        radius="sm"
        size="xs"
        onClick={() => setOpened(true)}
      >
        Edit
      </Button>
    </>
  );
};

export default EditButton;
