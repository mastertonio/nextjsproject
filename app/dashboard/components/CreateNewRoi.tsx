import { useState } from "react";
import { Modal, Button, Group } from "@mantine/core";

const CreateNewRoi: React.FC = () => {
  const [opened, setOpened] = useState(false);

  return (
    <>
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title="Fill up form here"
      >
        {/* Modal content */}
      </Modal>

      <Group position="center">
        <Button onClick={() => setOpened(true)}>Create New ROI</Button>
      </Group>
    </>
  );
};

export default CreateNewRoi;
