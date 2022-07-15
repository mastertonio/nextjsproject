import { useState } from "react";
import { Button, Modal, TextInput, Text, Grid } from "@mantine/core";
import { FaRegClone } from "react-icons/fa";
import axios from "axios";
import { useLocalStorage } from "@mantine/hooks";
import { useRouter } from "next/router";
import { IButtonRoiNameProps } from "./EditButton";
import { useForm } from "@mantine/form";

const CloneButton: React.FC<IButtonRoiNameProps> = ({ id, name, refetch }) => {
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
      await axios.post(
        `http://54.159.8.194/v1/dashboard/roi/${id}/${p.id}`,
        { title: values.title },
        { headers: { Authorization: `Bearer ${value}` } }
      );
      router.push(`/templates/${id}`)
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
        size="50%"
        padding={0}
      >
         <Text
          weight={300}
          color="gray"
          style={{
            paddingTop: 30,
            paddingLeft: 30,
            paddingRight: 30,
            fontSize: 30,
            backgroundColor: "#073e52",
            color: "white",
          }}
        >
          Create a clone of {name}
        </Text>
        <Text
          weight={300}
          color="gray"
          style={{
            paddingLeft: 30,
            paddingRight: 30,
            paddingBottom: 30,
            marginBottom: 80,
            fontSize: 20,
            backgroundColor: "#073e52",
            color: "white",
          }}
        >
          Cloning this calculator will create an identical copy using the last saved set of values.
        </Text>
        <form onSubmit={form.onSubmit(handleSubmit)}>
        <Grid style={{ margin: 30, marginBottom: 80}}>
            <Text>Name </Text>
            <TextInput
              required
              style={{ width: 450, marginLeft: "auto" }}
              placeholder="New Title Name"
              {...form.getInputProps("title")}
            />
          </Grid>

          <Grid justify="flex-end" style={{ margin: 20}}>
            <Button
              type="submit"
              radius="sm"
              size="sm"
              color="teal"
              style={{ marginRight: 10 }}
              onClick={() => setOpened(false)}
            >
              Change ROI Name
            </Button>
            <Button
              radius="sm"
              size="sm"
              onClick={() => setOpened(false)}
              style={{backgroundColor: "white", color: "black", borderColor: 'gray'}}
            >
              Close
            </Button>
          </Grid>
        </form>
      </Modal>

      <Button
        leftIcon={<FaRegClone />}
        radius="sm"
        color="teal"
        size="xs"
        onClick={() => setOpened(true)}
        style={{ marginRight: 1}}
      >
        Clone
      </Button>
    </>
  );
};

export default CloneButton;
