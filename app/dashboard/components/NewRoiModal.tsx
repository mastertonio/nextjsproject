import {
  Box,
  Button,
  Group,
  Input,
  Modal,
  PasswordInput,
  TextInput
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { AiOutlineDown } from "react-icons/ai";
interface INewRoiModalProps {
  opened: boolean;
  onClose: () => void;
  ModalTitle: string;
}

const CreateNewRoi: React.FC<INewRoiModalProps> = ({
  opened,
  onClose,
  ModalTitle,
}) => {
  const form = useForm({
    initialValues: {
      name: "",
      template: [],
    },
  });

  return (
    <Modal opened={opened} onClose={onClose} title={ModalTitle}>
      <Box sx={{ maxWidth: 340 }} mx="auto">
        <form onSubmit={form.onSubmit((values) => console.log(values))}>
          <TextInput
            required
            label="Name"
            placeholder="Enter Name"
            {...form.getInputProps("name")}
          />

          <Input component="select" rightSection={<AiOutlineDown />}>
            <option value="1">1</option>
            <option value="2">2</option>
          </Input>

          <Group position="right" mt="md">
            <Button type="submit">Submit</Button>
          </Group>
        </form>
      </Box>
    </Modal>
  );
};

export default CreateNewRoi;
