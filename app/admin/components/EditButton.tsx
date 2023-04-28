import { useState } from "react";
import { Modal, Button, Text, TextInput, Grid, Textarea, Select, Divider } from "@mantine/core";
import { useForm } from "@mantine/form";
import { AiOutlineEdit } from "react-icons/ai";
import axios from "axios";
import { useLocalStorage } from "@mantine/hooks";
import { useRouter } from "next/router";
import { showNotification, updateNotification } from "@mantine/notifications";
import { IconCheck } from "@tabler/icons";
import { useMutation, useQueryClient } from "react-query";
import { useUserStore } from "@app/store/userState";
import { UserDataProp } from "@app/context/user.context";
import { SectionStateAdminTool, iSectionData } from "@app/store/adminToolSectionStore";
import shortUUID from "short-uuid";

export interface IButtonRoiNameProps {
  id?: string;
  // refetch: () => void;
  // name: string;
  user: UserDataProp
}

interface IModalEntryProps {
  sectionData: SectionStateAdminTool
  setSectionData: (arr: iSectionData[]) => void
  setOpenChoice: (b: boolean) => void
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
}

const EditButton: React.FC<IModalEntryProps> = ({ adminId, sectionData, setOpenChoice, setSectionData, user, id }) => {
  const [opened, setOpened] = useState(false);
  const [value] = useLocalStorage({ key: "auth-token" });
  const router = useRouter();
  const p = router.query;
  const userZ = useUserStore((state) => (state.user))
  const queryClient = useQueryClient()

  const form = useForm({
    initialValues: {
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
      address: ""
    },
  })


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

  type iEditTempProp = {
    title: string
  }

  const addEntry = useMutation({
    mutationFn: (roi: formProps) =>
      axios.patch(
        `/v1/company/admintool/${adminId}/section/${id}`,
        {
          grayContent: {
            elements: [
              {
                title: roi.title,
                dataType: roi.type,
                choices: roi.choices,
                format: roi.format,
                decimalPlace: roi.decimalPlace,
                currency: roi.currency,
                tooltip: roi.tooltip,
                appendedText: roi.appendedText,
                prefilled: roi.prefilled,
                formula: roi.formula,
                address: roi.address
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
      // if (error instanceof Error) { //Error or AxiosError
      //set message here
      // }
    }
  })

  const addChoice = () => {
    setOpenChoice(true)
    setOpened(false)
  }

  return (
    <>
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        withCloseButton={false}
        size="920px" title="Add Entry" padding={0} className="section-wrapper"
      >
        <form onSubmit={form.onSubmit((values) => addEntry.mutate(values))}>
          <div className="bg-[#ECEFF1] p-[20px] sm:p-[40px] mt-0">
            {value}
            {/* <Grid className="p-[10px]">
              <Text className="text-[18px] text-[#676a6c] font-light w-[100%] md:w-[300px] 2xl:w-[25%]">Auto ID: </Text>
              <TextInput
                required
                className="w-[100%] sm:w-[75%] ml-auto"
                disabled={true}
              />
            </Grid> */}

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
                Add Entry
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
        onClick={() => setOpened(true)}
      >
        Add New Entry
      </Button>
    </>
  );
};

export default EditButton;
