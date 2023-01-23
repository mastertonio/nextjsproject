import React from 'react'
import { Modal, Button, Divider, Text, TextInput, Textarea, Grid } from '@mantine/core';
import { useForm } from '@mantine/form';
import RichTextSection from '@app/core/components/richtext/RichTextSection';
import FormSelect from '@app/core/components/dropdown/FormSelect';
import { useModalEntryStore } from '@app/store/builderStore';
import { iSectionData } from './Sections';

interface IModalEntryProps {
  showModal: boolean
  sectionData: iSectionData[]
  setSectionData: (arr: iSectionData[]) => void
  setOpened: (b: boolean) => void
  open: boolean
}

const ModalUpdateEntry: React.FC<IModalEntryProps> = ({ showModal, setSectionData, sectionData, setOpened, open }) => {
  const hideModal = useModalEntryStore((state) => state.hide);
  const form = useForm({
    initialValues: {
      autoID: "",
      title: "",
      type: "",
      choices: "",
      format: "",
      toolTip: "",
      append: "",
      formula: "",
      address: ""
    }
  })

  const handleSubmit = async (values: typeof form.values) => {
    try {
      console.log('Values: ', values)
    } catch (error) {
      console.log('Error: ', error)
    }
  }

  const dataSelect = [
    { value: 'input', label: 'Input' },
    { value: 'output', label: 'Output' },
    { value: 'textarea', label: 'Textarea' },
    { value: 'dropdown', label: 'Dropdown' },
    { value: 'radio', label: 'Radio' },
    { value: 'checkbox', label: 'Checkbox' },
    { value: 'slider', label: 'Slider' },
    { value: 'header', label: 'Header' },
    { value: 'html', label: 'HTML' },
  ]

  return (
    <Modal opened={open} onClose={() => hideModal()} size="920px" title="Update Entry" padding={0} className="section-wrapper">
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <div className="bg-[#ECEFF1] p-[40px] mt-0">
          <Grid className="p-[10px]">
            <Text className="text-[18px] text-[#676a6c] font-light w-[100%] md:w-[300px] 2xl:w-[25%]">Auto ID: </Text>
            <TextInput
              required
              className="w-[75%] ml-auto"
              {...form.getInputProps("autoID")}
            />
          </Grid>

          <Grid className="p-[10px]">
            <Text className="text-[18px] text-[#676a6c] font-light w-[100%] md:w-[300px] 2xl:w-[25%]">Title: </Text>
            <div className="w-[75%] ml-auto">
              <RichTextSection />
            </div>
          </Grid>

          <Grid className="p-[10px]">
            <Text className="text-[18px] text-[#676a6c] font-light w-[100%] md:w-[300px] 2xl:w-[25%]">Type: </Text>
            <div className="w-[75%]">
              <FormSelect data={dataSelect} values={{ ...form.getInputProps("type") }} />
            </div>
          </Grid>

          <Grid className="p-[10px]">
            <Text className="text-[18px] text-[#676a6c] font-light w-[100%] md:w-[300px] 2xl:w-[25%]">Choices: </Text>
            <Button
              type="submit"
              radius="sm"
              size="sm"
              color="teal"
              className="ml-auto"
            >
              Add New Choice
            </Button>
          </Grid>

          <Grid className="p-[10px]">
            <Text className="text-[18px] text-[#676a6c] font-light w-[100%] md:w-[300px] 2xl:w-[25%]">Format: </Text>
            <TextInput
              required
              className="w-[75%] ml-auto"
              {...form.getInputProps("format")}
            />
          </Grid>

          <Grid className="p-[10px]">
            <Text className="text-[18px] text-[#676a6c] font-light w-[100%] md:w-[300px] 2xl:w-[25%]">Tooltip: </Text>
            <div className="w-[75%] ml-auto">
              <RichTextSection />
            </div>
          </Grid>

          <Grid className="p-[10px]">
            <Text className="text-[18px] text-[#676a6c] font-light w-[100%] md:w-[300px] 2xl:w-[25%]">Append: </Text>
            <TextInput
              required
              className="w-[75%] ml-auto"
              {...form.getInputProps("append")}
            />
          </Grid>

          <Grid className="p-[10px]">
            <Text className="text-[18px] text-[#676a6c] font-light w-[100%] md:w-[300px] 2xl:w-[25%]">Formula: </Text>
            <Textarea
              className="w-[75%] ml-auto"
              {...form.getInputProps("formula")}
            />
          </Grid>

          <Grid className="p-[10px]">
            <Text className="text-[18px] text-[#676a6c] font-light w-[100%] md:w-[300px] 2xl:w-[25%]">Address: </Text>
            <TextInput
              required
              className="w-[75%] ml-auto"
              {...form.getInputProps("address")}
            />
          </Grid>

          <Divider className="mt-[30px] mb-[30px]" />

          <Grid justify="flex-end" className="mt-[20px]">
            <Button
              type="submit"
              radius="sm"
              size="sm"
              color="teal"
              className="mr-[10px]"
            >
              Update Entry
            </Button>
            <Button
              radius="sm"
              size="sm"
              color="red"
              className="mr-[10px]"
            >
              Delete
            </Button>
            <Button
              radius="sm"
              size="sm"
              color="gray"
              className="mr-[10px]"
              onClick={() => setOpened(false)}
            >
              Cancel
            </Button>
          </Grid>
        </div>
      </form>
    </Modal>
  )
}

export default ModalUpdateEntry