import React, { useState } from 'react'
import { Modal, Button, Divider, Text, TextInput, Textarea, Grid, Select } from '@mantine/core';
import { useForm } from '@mantine/form';
import RichTextSection from '@app/core/components/richtext/RichTextSection';
// import FormSelect from '@app/core/components/dropdown/SelectChoice';
// import { useModalEntryStore } from '@app/store/builderStore';
import { useQuestionPropsStore } from '@app/store/builder/builderState';
import { iSectionData } from './Sections';
import { useLocalStorage } from '@mantine/hooks';
import { useMutation, useQueryClient } from 'react-query';
import axios from 'axios';
import router from 'next/router';
import { UserDataProp } from '@app/context/user.context';
import shortUUID from 'short-uuid';
import { SectionStateAdminTool, useAdminSectionStore } from '@app/store/adminToolSectionStore';

interface IModalEntryProps {
  showModal: boolean
  sectionData: SectionStateAdminTool
  setSectionData: (arr: iSectionData[]) => void
  setOpened: (b: boolean) => void
  setOpenChoice: (b: boolean) => void
  open: boolean
  user: UserDataProp
  id?: string
  adminId: string
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

type formProps = {
  id: string,
  title: string,
  type: string,
  choices: string,
  format: string,
  decimalPlace: string,
  currency: string,
  tooltip: string,
  appendedText: string,
  prefilled: string,
  formula: string,
  address: string,
  section: string,
}

const ModalUpdateEntry: React.FC<IModalEntryProps> = ({adminId, showModal, setSectionData, sectionData, setOpened, open, setOpenChoice, user, id }) => {
  const addQuestions = useQuestionPropsStore((state) => state.addQuestions);
  const initialValue =
    "<p>Your initial <b>html value</b> or an empty string to init editor without value</p>";
  const [value, setValue] = useState<string>(initialValue)
  const [sel, setSel] = useState<string | null>(null);
  const [drop, setDrop] = useState<string | null>(null)
  const prevSections = useAdminSectionStore((state) => (state.sections))
  const adminData = useAdminSectionStore((state) => state.sections)
  // console.log("lis", sectionData)

  const form = useForm({
    initialValues: {
      id: shortUUID.generate(),
      title: "",
      type: "",
      choices: "",
      format: "",
      decimalPlace: "",
      currency: "",
      tooltip: "",
      appendedText: "",
      prefilled: "",
      formula: "",
      address: "",
      section: "",
    },
  })
  const queryClient = useQueryClient()



  const handleSubmit = async (values: typeof form.values) => {
    try {
      console.log("wwwwww", values)
      setOpened(false)
      // form.reset();
    } catch (error) {
      console.log('Error: ', error)
    }
  }

  const addChoice = () => {
    setOpenChoice(true)
    setOpened(false)
  }

  const dataSelect = [
    { value: 'Input', label: 'Input' },
    { value: 'Output', label: 'Output' },
    { value: 'Textarea', label: 'Textarea' },
    { value: 'Dropdown', label: 'Dropdown' },
    { value: 'Radio', label: 'Radio' },
    { value: 'Checkbox', label: 'Checkbox' },
    { value: 'Slider', label: 'Slider' },
    { value: 'Header', label: 'Header' },
    { value: 'HTML', label: 'HTML' },
    { value: 'Ratings', label: 'Ratings' },
  ];

  const format = [
    { value: "Number", label: "Number" },
    { value: "Currency", label: "Currency" },
    { value: "Percent", label: "Percent" },
  ];

  const currencyFormat = [
    { value: "USD", label: "USD" },
  ]

  const sections = [
    { value: "Average Salary", label: "Average Salary" },
  ]

  const addEntry = useMutation({
    mutationFn: (roi: formProps) =>
      axios.patch(
        `/v1/admintool/${adminId}/section/${id}`,
        {
          ...sectionData,
          grayContent: {
            elements: [
              {
                id: roi.id,
                title: roi.title,
                type: roi.type,
                format: roi.format,
                tooltip: roi.tooltip,
                appendedText: roi.appendedText,
                formula: roi.formula,
                address: roi.address,
              }
            ]
          }
        },
        {
          headers: {
            Authorization: `Bearer ${user.tokens.access.token}`,
          },
        }
      ).then((response) => response.data),
    onMutate: (roi) => {
      console.log(roi, "roiroriiro")
      console.log("IIIIIIIIIIIII", id)
    },
    onSuccess: (newRoi) => {
      setOpened(false)
      Promise.all(
        [
          queryClient.invalidateQueries({ queryKey: ['adminToolData'] }),
          queryClient.invalidateQueries({ queryKey: ['enterpriseData'] }),
          // queryClient.invalidateQueries({ queryKey: ['ranking_list'] })
        ]
      )


    },
    onError: (error) => {
      if (error instanceof Error) {

      }

    }
  })

  return (
    <>
      <Modal opened={open} onClose={() => setOpened(false)} size="920px" title="Add Entry" padding={0} className="section-wrapper">
        <form onSubmit={form.onSubmit((values) => addEntry.mutate(values))}>
          <div className="bg-[#ECEFF1] p-[20px] sm:p-[40px] mt-0">
            <Grid className="p-[10px]">
              <Text className="text-[18px] text-[#676a6c] font-light w-[100%] md:w-[300px] 2xl:w-[25%]">Auto ID: </Text>
              <TextInput
                required
                className="w-[100%] sm:w-[75%] ml-auto"
                {...form.getInputProps("id")}
                disabled={true}
              />
            </Grid>

            <Grid className="p-[10px] mt-[20px] sm:mt-[20px]">
              <Text className="text-[18px] text-[#676a6c] font-light w-[100%] md:w-[300px] 2xl:w-[25%]">Entry Name: </Text>
              <Textarea
                required
                className="w-[100%] sm:w-[75%] ml-auto"
                {...form.getInputProps(`title`)}
              />
              {/* <div className="w-[100%] sm:w-[75%] ml-auto">
              <RichTextSection value={value} setValue={setValue} />
            </div> */}
            </Grid>

            <Grid className="p-[10px] mt-[10px] sm:mt-[20px]">
              <Text className="text-[18px] text-[#676a6c] font-light w-[100%] md:w-[300px] 2xl:w-[25%]">Type: </Text>
              <div className="w-[100%] sm:w-[75%]">
                <Select
                  placeholder="Choose"
                  data={dataSelect}
                  {...form.getInputProps("type")}
                />
              </div>
            </Grid>

            {form.values.type === 'Dropdown' || form.values.type === 'Radio' || form.values.type === 'Checkbox' ? (
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

            {form.values.type !== 'Textarea' ? (
              <Grid className="p-[10px] mt-[10px] sm:mt-[20px]">
                <Text className="text-[18px] text-[#676a6c] font-light w-[100%] md:w-[300px] 2xl:w-[25%]">Format: </Text>
                <div className="w-[100%] sm:w-[75%]">
                  <Select
                    placeholder="Choose"
                    data={format}
                    {...form.getInputProps("format")}
                  />
                </div>
              </Grid>
            ) : null}

            {form.values.format === "Number" || form.values.format === "Percent" || form.values.format === "Currency" ? (
              <Grid className="p-[10px] mt-[10px] sm:mt-[20px]">
                <Text className="text-[18px] text-[#676a6c] font-light w-[100%] md:w-[300px] 2xl:w-[25%]">Decimal Place: </Text>
                <TextInput
                  required
                  className="w-[100%] sm:w-[75%] ml-auto"
                  {...form.getInputProps("decimalPlace")}
                />
              </Grid>
            ) : null}

            {form.values.format === "Currency" ? (
              <Grid className="p-[10px] mt-[10px] sm:mt-[20px]">
                <Text className="text-[18px] text-[#676a6c] font-light w-[100%] md:w-[300px] 2xl:w-[25%]">Currency: </Text>
                <div className="w-[100%] sm:w-[75%]">
                  <Select
                    placeholder="Choose"
                    data={currencyFormat}
                    {...form.getInputProps("currency")}
                  />
                </div>
              </Grid>
            ) : null}

            <Grid className="p-[10px] mt-[10px] sm:mt-[20px]">
              <Text className="text-[18px] text-[#676a6c] font-light w-[100%] md:w-[300px] 2xl:w-[25%]">Helpful Tip: </Text>
              <TextInput
                required
                className="w-[100%] sm:w-[75%] ml-auto"
                {...form.getInputProps("tooltip")}
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
                {...form.getInputProps("prefilled")}
              />
            </Grid>

            {form.values.formula !== 'Textarea' ? (
              <Grid className="p-[10px] mt-[10px] sm:mt-[20px]">
                <Text className="text-[18px] text-[#676a6c] font-light w-[100%] md:w-[300px] 2xl:w-[25%]">Append Value: </Text>
                <TextInput
                  required
                  className="w-[100%] sm:w-[75%] ml-auto"
                  {...form.getInputProps("appendedText")}
                />
              </Grid>
            ) : null}

            <Grid className="p-[10px] mt-[10px] sm:mt-[20px]">
              <Text className="text-[18px] text-[#676a6c] font-light w-[100%] md:w-[300px] 2xl:w-[25%]">Address: </Text>
              <TextInput
                required
                className="w-[100%] sm:w-[75%] ml-auto"
                {...form.getInputProps("address")}
              />
            </Grid>

            {form.values.formula !== 'Textarea' ? (
              <Grid className="p-[10px] mt-[10px] sm:mt-[20px]">
                <Text className="text-[18px] text-[#676a6c] font-light w-[100%] md:w-[300px] 2xl:w-[25%]">Formula: </Text>
                <Textarea
                  className="w-[100%] sm:w-[75%] ml-auto"
                  {...form.getInputProps("formula")}
                  disabled={form.values.type !== "Output"}
                />
              </Grid>
            ) : null}

            {form.values.type !== 'Textarea' ? (
              <Grid className="p-[10px] mt-[10px] sm:mt-[20px]">
                <Text className="text-[18px] text-[#676a6c] font-light w-[100%] md:w-[300px] 2xl:w-[25%]">Other Sections: </Text>
                <div className="w-[100%] sm:w-[75%]">
                  <Select
                    placeholder="Choose"
                    data={[
                      { value: 'React', label: 'React' },
                      { value: 'Angular', label: 'Angular' },
                      { value: 'Svelte', label: 'Svelte' },
                      { value: 'Vue', label: 'Vue' },
                    ]}
                    {...form.getInputProps("sections")}
                    onChange={(val) => {
                      form.setFieldValue('formula', `${form.values.formula} ${val}`)
                    }
                    }
                    disabled={form.values.type !== "Output"}
                  />
                </div>
              </Grid>
            ) : null}

            <Divider className="mt-[30px] mb-[30px]" />

            <Grid justify="flex-end" className="mt-[20px] mb-[20px] sm:mb-0 flex flex-col sm:flex-row m-0 sm:m-[-8px] pt-0 sm:pt-[20px">
              <Button
                type="submit"
                radius="sm"
                size="sm"
                color="teal"
                className="mr-0 sm:mr-[10px] mb-[10px]"
              >
                Add Entry {id}
              </Button>
              {/* <Button
              type="button"
              radius="sm"
              size="sm"
              color="red"
              className="mr-0 sm:mr-[10px] mb-[10px]"
            >
              Delete
            </Button> */}
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
      <Button
        type="submit"
        radius="sm"
        size="sm"
        color="teal"
        className="mr-0 sm:mr-[10px]"
        // onClick={() => setUpdateQuestion(true)}
        onClick={() => {
          setOpened(true)
        }}
      // onClick={addEmptySection}
      >
        Add New Entry {id}
      </Button>
    </>
  )
}

export default ModalUpdateEntry