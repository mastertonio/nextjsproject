import { Modal} from "@mantine/core";

interface INewRoiModalProps {
    opened: boolean,
    onClose: ()=> void,
    ModalTitle: string
}

const CreateNewRoi: React.FC<INewRoiModalProps> = ({ opened, onClose, ModalTitle}) => {

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={ModalTitle}
    >
      {/* Modal content */}
    </Modal>
  );
};

export default CreateNewRoi;
