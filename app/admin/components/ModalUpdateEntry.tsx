import React from 'react'
import { Modal, Button, Divider, Text, TextInput, Textarea, Grid, Select } from '@mantine/core';
import { useForm } from '@mantine/form';
import RichTextSection from '@app/core/components/richtext/RichTextSection';
import FormSelect from '@app/core/components/dropdown/SelectChoice';
import { useModalEntryStore } from '@app/store/builderStore';
import { useNewStore } from '@app/store/builder/builderState';
import { iSectionData } from './Sections';
import { useLocalStorage } from '@mantine/hooks';

interface IModalEntryProps {
  showModal: boolean
  sectionData: iSectionData[]
  setSectionData: (arr: iSectionData[]) => void
  setOpened: (b: boolean) => void
  setOpenChoice: (b: boolean) => void
  open: boolean
}

type iSectionProps = {
  id: number
  title: string
  type: string
  format: string
  tooltip: string
  appendedText: string
  formula: string
  address: string
}

const ModalUpdateEntry: React.FC<IModalEntryProps> = ({ showModal, setSectionData, sectionData, setOpened, open, setOpenChoice }) => {
  const hideModal = useModalEntryStore((state) => state.hide);
  const choiceValue = useNewStore((state) => state.choiceValue);
  const form = useForm({
    initialValues: {
      formEntry: [{
        id: Math.floor(Math.random() * 1000),
        title: "",
        type: "",
        choices: "",
        format: "",
        tooltip: "",
        appendedText: "",
        prefilled: "",
        formula: "",
        address: ""
      }],
      // id: "",
      // title: "",
      // type: "",
      // choices: "",
      // format: "",
      // toolTip: "",
      // append: "",
      // prefilled: "",
      // formula: "",
      // address: ""
    }
  })
  const [formValue, setFormValue] = useLocalStorage<iSectionProps[]>({ key: 'formValue', defaultValue: [] });

  const handleSubmit = async (values: typeof form.values) => {
    try {
      form.insertListItem('formEntry', {
        id: Math.floor(Math.random() * 1000),
        title: values.formEntry[0].title,
        type: values.formEntry[0].type,
        format: values.formEntry[0].format,
        tooltip: values.formEntry[0].tooltip,
        appendedText: values.formEntry[0].appendedText,
        formula: values.formEntry[0].formula,
        address: values.formEntry[0].address
      })
      setFormValue([
        ...formValue,
        {
          id: Math.floor(Math.random() * 1000),
          title: values.formEntry[0].title,
          type: values.formEntry[0].type,
          format: values.formEntry[0].format,
          tooltip: values.formEntry[0].tooltip,
          appendedText: values.formEntry[0].appendedText,
          formula: values.formEntry[0].formula,
          address: values.formEntry[0].address
        }
      ]);
      setSectionData([
        ...sectionData,
        {
          id: Math.floor(Math.random() * 1000),
          title: values.formEntry[0].title,
          type: values.formEntry[0].type,
          format: values.formEntry[0].format,
          tooltip: values.formEntry[0].tooltip,
          appendedText: values.formEntry[0].appendedText,
          formula: values.formEntry[0].formula,
          address: values.formEntry[0].address
        }
      ])
      setOpened(false)
      form.reset();
    } catch (error) {
      console.log('Error: ', error)
    }
  }

  const addChoice = () => {
    setOpenChoice(true)
    setOpened(false)
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
    { value: 'ratings', label: 'Ratings' },
  ]

  return (
    <Modal opened={open} onClose={() => setOpened(false)} size="920px" title="Update Entry" padding={0} className="section-wrapper">
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <div className="bg-[#ECEFF1] p-[20px] sm:p-[40px] mt-0">
          <Grid className="p-[10px]">
            <Text className="text-[18px] text-[#676a6c] font-light w-[100%] md:w-[300px] 2xl:w-[25%]">Auto ID: </Text>
            <TextInput
              required
              className="w-[100%] sm:w-[75%] ml-auto"
              {...form.getInputProps("formEntry.0.id")}
              disabled={true}
              value={2}
            />
          </Grid>

          <Grid className="p-[10px] mt-[20px] sm:mt-[20px]">
            <Text className="text-[18px] text-[#676a6c] font-light w-[100%] md:w-[300px] 2xl:w-[25%]">Title: </Text>
            <Textarea
              required
              className="w-[100%] sm:w-[75%] ml-auto"
              {...form.getInputProps(`formEntry.0.title`)}
            />
            {/* <div className="w-[100%] sm:w-[75%] ml-auto">
              <RichTextSection />
            </div> */}
          </Grid>

          <Grid className="p-[10px] mt-[10px] sm:mt-[20px]">
            <Text className="text-[18px] text-[#676a6c] font-light w-[100%] md:w-[300px] 2xl:w-[25%]">Type: </Text>
            <div className="w-[100%] sm:w-[75%]">
              <div className="ml-auto">
                <Select
                  placeholder="Choose"
                  data={dataSelect}
                  {...form.getInputProps("formEntry.0.type")}
                />
              </div>
              {/* <FormSelect
                data={dataSelect}
                values={{ ...form.getInputProps("formEntry.0.type") }}
              /> */}
            </div>
          </Grid>

          {choiceValue === 'dropdown' || choiceValue === 'radio' || choiceValue === 'checkbox' ? (
            <Grid className="p-[10px] mt-[10px] sm:mt-[20px]">
              <Text className="text-[18px] text-[#676a6c] font-light w-[100%] md:w-[300px] 2xl:w-[25%]">Choices: </Text>
              <Button
                type="button"
                radius="sm"
                size="sm"
                color="teal"
                className="ml-auto w-[100%] sm:w-[unset]"
                onClick={addChoice}
              >
                Add New Choice
              </Button>
            </Grid>
          ) : null}

          <Grid className="p-[10px] mt-[10px] sm:mt-[20px]">
            <Text className="text-[18px] text-[#676a6c] font-light w-[100%] md:w-[300px] 2xl:w-[25%]">Format: </Text>
            <TextInput
              required
              className="w-[100%] sm:w-[75%] ml-auto"
              {...form.getInputProps("formEntry.0.format")}
            />
          </Grid>

          <Grid className="p-[10px] mt-[10px] sm:mt-[20px]">
            <Text className="text-[18px] text-[#676a6c] font-light w-[100%] md:w-[300px] 2xl:w-[25%]">Helpful Tip: </Text>
            <TextInput
              required
              className="w-[100%] sm:w-[75%] ml-auto"
              {...form.getInputProps("formEntry.0.tooltip")}
            />
            {/* <div className="w-[100%] sm:w-[75%] ml-auto">
              <RichTextSection />
            </div> */}
          </Grid>
          <Grid className="p-[10px] mt-[10px] sm:mt-[20px]">
            <Text className="text-[18px] text-[#676a6c] font-light w-[100%] md:w-[300px] 2xl:w-[25%]">Prefilled Value: </Text>
            <TextInput
              required
              className="w-[100%] sm:w-[75%] ml-auto"
              {...form.getInputProps("formEntry.0.prefilled")}
            />
          </Grid>
          <Grid className="p-[10px] mt-[10px] sm:mt-[20px]">
            <Text className="text-[18px] text-[#676a6c] font-light w-[100%] md:w-[300px] 2xl:w-[25%]">Append Value: </Text>
            <TextInput
              required
              className="w-[100%] sm:w-[75%] ml-auto"
              {...form.getInputProps("formEntry.0.appendedText")}
            />
          </Grid>

          <Grid className="p-[10px] mt-[10px] sm:mt-[20px]">
            <Text className="text-[18px] text-[#676a6c] font-light w-[100%] md:w-[300px] 2xl:w-[25%]">Formula: </Text>
            <Textarea
              className="w-[100%] sm:w-[75%] ml-auto"
              {...form.getInputProps("formEntry.0.formula")}
            />
          </Grid>

          <Grid className="p-[10px] mt-[10px] sm:mt-[20px]">
            <Text className="text-[18px] text-[#676a6c] font-light w-[100%] md:w-[300px] 2xl:w-[25%]">Address: </Text>
            <TextInput
              required
              className="w-[100%] sm:w-[75%] ml-auto"
              {...form.getInputProps("formEntry.0.address")}
            />
          </Grid>

          <Divider className="mt-[30px] mb-[30px]" />

          <Grid justify="flex-end" className="mt-[20px] mb-[20px] sm:mb-0 flex flex-col sm:flex-row m-0 sm:m-[-8px] pt-0 sm:pt-[20px">
            <Button
              type="submit"
              radius="sm"
              size="sm"
              color="teal"
              className="mr-0 sm:mr-[10px] mb-[10px]"
            >
              Update Entry
            </Button>
            <Button
              type="button"
              radius="sm"
              size="sm"
              color="red"
              className="mr-0 sm:mr-[10px] mb-[10px]"
            >
              Delete
            </Button>
            <Button
              type="button"
              radius="sm"
              size="sm"
              color="gray"
              className="mr-0 sm:mr-[10px]"
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