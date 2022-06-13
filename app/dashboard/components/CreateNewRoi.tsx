import { useState } from "react";
import { Button, Group } from "@mantine/core";
import NewRoiModal from "./NewRoiModal";

const CreateNewRoi: React.FC = () => {
  const [opened, setOpened] = useState(false);

  return (
    <>
      <NewRoiModal
        ModalTitle="Fill up form here"
        onClose={() => {
          setOpened((prev) => !prev);
        }}
        opened={opened}
      ></NewRoiModal>

      <Group position="center">
        <Button onClick={() => setOpened(true)}>Create New ROI</Button>
      </Group>
    </>
  );
};

export default CreateNewRoi;
