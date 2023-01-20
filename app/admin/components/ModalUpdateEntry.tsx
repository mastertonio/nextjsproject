import React from 'react'
import { Modal, Button, Group, Text, TextInput, Textarea, Grid } from '@mantine/core';
import RichTextSection from '@app/core/components/richtext/RichTextSection';
import { useModalEntryStore } from '@app/store/builderStore';

type iModalEntryProps = {
  showModal: boolean,
}

const ModalUpdateEntry: React.FC<iModalEntryProps> = ({ showModal }) => {
  const hideModal = useModalEntryStore((state) => state.hide);

  return (
    <Modal opened={showModal} onClose={() => hideModal()} size="auto" title="Update Entry">
      <Grid className="p-[10px]">
        <Text className="text-[18px] text-[#676a6c] font-light w-[100%] md:w-[300px] 2xl:w-[500px]">Auto ID: </Text>
        <TextInput
          required
          className="w-[50%] ml-auto"
        />
      </Grid>

      <Grid className="p-[10px]">
        <Text className="text-[18px] text-[#676a6c] font-light w-[100%] md:w-[300px] 2xl:w-[500px]">Title: </Text>
        <RichTextSection />
      </Grid>

      <Grid className="p-[10px]">
        <Text className="text-[18px] text-[#676a6c] font-light w-[100%] md:w-[300px] 2xl:w-[500px]">Type: </Text>

      </Grid>
    </Modal>
  )
}

export default ModalUpdateEntry