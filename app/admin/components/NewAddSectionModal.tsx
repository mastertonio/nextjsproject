import { useEffect, useState } from "react";
import { Modal, Button, Text, TextInput, Grid, Textarea, Select, Divider, ActionIcon, ScrollArea, MultiSelect } from "@mantine/core";
import RichTextSection from '@app/core/components/richtext/RichTextSection';
import { useForm, zodResolver } from "@mantine/form";
import { AiOutlineEdit } from "react-icons/ai";
import axios from "axios";
import { useLocalStorage, randomId } from "@mantine/hooks";
import { useRouter } from "next/router";
import { showNotification, updateNotification } from "@mantine/notifications";
import { IconCheck, IconTrash } from "@tabler/icons";
import { useMutation, useQueryClient } from "react-query";
import { useUserStore } from "@app/store/userState";
import { UserDataProp } from "@app/context/user.context";
import { SectionStateAdminTool, iSectionData } from "@app/store/adminToolSectionStore";
import shortUUID from "short-uuid";
import { z } from 'zod';
import { useCalculatorStore } from "@app/store/builder/calculatorStore";
import { HiOutlineDocumentText } from 'react-icons/hi'

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
  choices: []
  fullData: []
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

export type formProps = {
  title: string
  type: string,
  choices: any,
  format: string,
  decimalPlace: string,
  currency: string,
  tooltip: string,
  appendedText: string,
  prefilled: string,
  formula: string,
  address: string,
}

interface OptionsFormula {
  value: string
  label: string
}

const schema = z.object({
  title: z.string().nonempty().min(2, { message: 'Name should have at least 2 letters' }),
});

const NewAddSectionModal: React.FC<IModalEntryProps> = ({ adminId, sectionData, setOpenChoice, setSectionData, user, id, choices, fullData }) => {
  const [opened, setOpened] = useState(false);
  const initialValue = "<div></div>";
  const [value, setValue] = useState<string>(initialValue)
  const [errorMsg, setErrorMessage] = useState<string>('');
  // const [value] = useLocalStorage({ key: "auth-token" });
  const router = useRouter();
  const p = router.query;
  const userZ = useUserStore((state) => (state.user))
  const queryClient = useQueryClient()


  // function findLast<T>(array: T[], predicate: (value: T, index: number, array: T[]) => boolean): T | undefined {
  //   for (let i = array.length - 1; i >= 0; i--) {
  //     const value = array[i];
  //     if (predicate(value, i, array)) {
  //       return value;
  //     }
  //   }
  //   return undefined;
  // }

  // const lastItem = findLast(cells, () => true)
  // console.log("lastttt", lastItem)
  const getLastCellAdress = useCalculatorStore((state) => state.getLastCellAddress)
  const cells = useCalculatorStore((state) => state.cells)
  const lv = getLastCellAdress()
  const [currentAddress, setCurrentAddress] = useState(lv);
  const [realFormula, setRF] = useState("")
  const currentColumn = currentAddress.charCodeAt(0);
  const nextColumn = String.fromCharCode(currentColumn + 1);

  useEffect(() => {
    setCurrentAddress(lv)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lv])

  // Generate the next address
  const nextAddress = `${nextColumn}1`;

  const form = useForm({
    initialValues: {
      type: "Input",
      choices: [{
        selectedOptions: []
      }],
      format: "",
      decimalPlace: "",
      currency: user.user.currency,
      tooltip: "",
      appendedText: "",
      prefilled: "",
      formula: "",
      address: currentAddress
    },
    transformValues: (values) => ({
      ...values,
      address: values.type == "Dropdown" || values.type == "Radio" || values.type == "Checkbox" || values.type == "Textarea" || values.type == "Ratings" ? "" : currentAddress,
    }),
  })


  const data = [
    { value: 'react', label: 'React' },
    { value: 'ng', label: 'Angular' },
    { value: 'svelte', label: 'Svelte' },
    { value: 'vue', label: 'Vue' },
    { value: 'riot', label: 'Riot' },
    { value: 'next', label: 'Next.js' },
    { value: 'blitz', label: 'Blitz.js' },
  ];

  const zchoice = choices ? choices.map((item: { label: string, value: string }) => ({
    value: item.value,
    label: item.label,
  })) : []

  const choicesFields = form.values.choices.map((item, index) => {
    let allArr: any = []
    const handleChildElementChange = (selectedOptions: any) => {
      const matches = selectedOptions.map((targetItem: any) => {
        const matchingItem: any = fullData.find((item: { address: string }) => item.address === targetItem);
        return allArr.push({
          value: matchingItem.value,
          label: matchingItem.title,
          dataType: matchingItem.dataType,
          classes: "col-lg-4",
          title: matchingItem.title,
          sliderType: "stacked",
          address: matchingItem.address
        })
      })
      form.setFieldValue(`choices.${index}.selectedOptions`, selectedOptions)
    };

    return (
      <Grid className="p-[10px] mt-[20px] sm:mt-[10px] mb-[20px]" key={index}>
        <Text className="text-[16px] text-[#676a6c] font-light w-[100%] md:w-[300px] 2xl:w-[25%]">Option {index + 1}: </Text>
        <TextInput
          className="w-[100%] sm:w-[40%] ml-auto"
          placeholder="Text"
          {...form.getInputProps(`choices.${index}.label`)}
        />
        <TextInput
          className="w-[100%] sm:w-[20%] ml-auto"
          placeholder="Value"
          {...form.getInputProps(`choices.${index}.value`)}
        />
        <ActionIcon color="red" onClick={() => form.removeListItem('choices', index)}>
          <IconTrash size="1rem" />
        </ActionIcon>
        <div className="w-full">
          <MultiSelect
            data={zchoice}
            label="Entries to show"
            value={form.values.choices[index].selectedOptions}
            onChange={handleChildElementChange}
            placeholder="Pick all that you like"
            searchable
            nothingFound="Nothing found"
            clearButtonProps={{ 'aria-label': 'Clear selection' }}
            clearable
          />
        </div>
      </Grid>
    )
  })


  // onChange={(value) => {
  //   value.forEach((targetItem) => {
  //     const matchingItem: any = fullData.find((item: { address: string}) => item.address === targetItem);
  //     if (matchingItem) {
  //       const index = form.values.choices.findIndex(
  //         (choice: { value: any}) => choice.value === targetItem
  //       );
  //       form.insertListItem(`choices.${index}.childElement`, {
  //         dataType: matchingItem.dataType,
  //         label: matchingItem.title,
  //         classes: "col-lg-4",
  //         title: matchingItem.title,
  //         sliderType: "stacked",
  //         value: matchingItem.value,
  //         address: matchingItem.address
  //       });
  //       console.log('form', form.values);
  //     }
  //   });
  // }}

  const ModalTitle = (title: string) => (
    <div className="flex flex-row items-center">
      <HiOutlineDocumentText className="mr-[10px] text-[36px] sm:text-[26px]" />
      <Text className="text-[18px] sm:text-[22px] mb-0 mt-[3px] font-semibold">{title}</Text>
    </div>
  )

  const dataSelect = [
    { value: 'Input', label: 'Input' },
    { value: 'Output', label: 'Output' },
    { value: 'Textarea', label: 'Textarea' },
    { value: 'Dropdown', label: 'Dropdown' },
    { value: 'Radio', label: 'Radio' },
    { value: 'Checkbox', label: 'Checkbox' },
    // { value: 'Slider', label: 'Slider' },
    { value: 'Header', label: 'Header' },
    // { value: 'HTML', label: 'HTML' },
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
                address: lv == "NULL" ? "A1" : nextAddress
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
      console.log("MUTATE", roi)
      setOpened(false)
      showNotification({
        id: "adding-entry",
        loading: true,
        title: `Adding entries`,
        message: "Please wait ...",
        autoClose: false,
      });
    },
    onSuccess: (newRoi) => {

      setCurrentAddress(nextAddress);
      Promise.all(
        [
          queryClient.invalidateQueries({ queryKey: ['adminToolData'] }),
          queryClient.invalidateQueries({ queryKey: ['enterpriseData'] }),
          // queryClient.invalidateQueries({ queryKey: ['ranking_list'] })
        ]
      )
      form.reset();
      setValue('<div></div>');
      setErrorMessage('')
      updateNotification({
        id: "adding-entry",
        color: "teal",
        title: `Entry Added!`,
        message: "",
        icon: <IconCheck size={16} />,
        autoClose: 3000,
      });
    },
    onError: (error) => {
      if (error instanceof Error) {
        updateNotification({
          id: "adding-entry",
          color: "red",
          title: `Adding entries failed`,
          message: error.message,
          autoClose: false,
        });
      }

      updateNotification({
        id: "adding-entry",
        color: "red",
        title: `Adding entries failed`,
        message: "Something went wrong, Please try again",
        autoClose: false,
      });
    }
  })

  const editSection = useMutation({
    mutationFn: (sect: any) => axios.put(`/v1/company/admintool/${adminId}/section/${id}`, {
      grayContentElement: sect
    }, {
      headers: {
        Authorization: `Bearer ${user.tokens.access.token}`,
      },
    }).then((response) => response.data),
    onMutate: (roi) => {
      setOpened(false)
    },
    onSuccess: (newRoi) => {
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

  //must check previous address in database
  function generateExcelAddresses(numRows: number, numCols: number): string[] {
    const addresses: string[] = [];

    for (let row = 1; row <= numRows; row++) {
      for (let col = 1; col <= numCols; col++) {
        const columnLetter = String.fromCharCode(64 + col);
        const address = `${columnLetter}${row}`;
        addresses.push(address);
      }
    }

    return addresses;
  }

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
        size="920px"
        title={ModalTitle('Add Entry')}
        padding={0}
        className="section-wrapper"
      // scrollAreaComponent={ScrollArea.Autosize}
      >
        {/* <div>{currentAddress}{nextAddress}</div> */}
        <form onSubmit={form.onSubmit(async (values) => {


          if (value == '<div></div>' || value == '<p></p>') {
            setErrorMessage('Entry Name is required');
            return;
          } else if (values.type == "Dropdown" || values.type == "Radio" || values.type == "Checkbox") {
            const newMeta = cells.filter((item) => values.choices.some((elem: { selectedOptions: any }) => elem?.selectedOptions?.some((ite: any) => ite == item.address)))
            // values.choices.map(item => console.log(newMeta, item.selectedOptions))
            const updatedCells = cells.map((item) => {
              const matchingElement = newMeta.find((elem) => elem.address === item.address);
              if (matchingElement) {
                return {
                  ...matchingElement,
                  isDisabled: true
                };
              }
              return item;
            });
            try {
              await editSection.mutateAsync(updatedCells);

              await addEntry.mutateAsync({
                address: values.address,
                appendedText: values.appendedText,
                choices: values.choices,
                title: value,
                currency: values.currency,
                decimalPlace: values.decimalPlace,
                format: values.format,
                formula: values.formula,
                prefilled: values.prefilled,
                tooltip: values.tooltip,
                type: values.type
              });
            } catch (error) {
              // Handle errors
              console.error(error);
            }
          } else {
            addEntry.mutateAsync({
              address: values.address,
              appendedText: values.appendedText,
              choices: values.choices,
              title: value,
              currency: values.currency,
              decimalPlace: values.decimalPlace,
              format: values.format,
              formula: values.formula,
              prefilled: values.prefilled,
              tooltip: values.tooltip,
              type: values.type
            })
          }
        }
        )}>
          <div className="bg-[#ECEFF1] p-[20px] sm:p-[40px] mt-0">
            {/* {value} */}
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
              {/* <Textarea
                required
                className="w-[100%] sm:w-[75%] ml-auto"
                
              /> */}
              <div className="w-[100%] sm:w-[75%] ml-auto">
                <RichTextSection
                  content={value}
                  onChange={(values) => {
                    console.log('richt', values);
                    setValue(values)
                    setErrorMessage('')
                  }}
                  type={form.values.type}
                />
                {errorMsg && <Text className="text-[14px] text-red-700 mt-[5px]">{errorMsg}</Text>}
              </div>
            </Grid>

            <Grid className="p-[10px] mt-[10px] sm:mt-[20px]">
              <Text className="text-[18px] text-[#676a6c] font-light w-[100%] md:w-[300px] 2xl:w-[25%]">Type: </Text>
              <div className="w-[100%] sm:w-[75%]">
                <Select
                  placeholder="Choose"
                  data={dataSelect}
                  {...form.getInputProps("type")}
                  required
                />
              </div>
            </Grid>

            {form.values.type === 'Dropdown' || form.values.type === 'Radio' || form.values.type === 'Checkbox' ? (
              <div className="p-[10px] w-[100%] sm:w-[70%] mb-[60px] ml-auto">
                {/* <Text className="text-[18px] text-[#676a6c] font-light w-[100%] md:w-[300px] 2xl:w-[25%]">Choices: </Text> */}
                {choicesFields}
                <Button
                  type="button"
                  radius="sm"
                  size="sm"
                  color="teal"
                  className="float-right w-[100%] sm:w-[unset]"
                  // onClick={addChoice}
                  onClick={() =>
                    form.insertListItem('choices', { id: randomId(), label: "", value: "" })
                  }
                >
                  Add New Choice
                </Button>
              </div>
            ) : null}

            {form.values.type == "Dropdown" || form.values.type == 'Radio' || form.values.type == 'Checkbox' || form.values.type == "Textarea" || form.values.type == "Ratings" || form.values.type == "Header" ? (
              null
            ) : (
              <div>
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

                {form.values.format === "Number" || form.values.format === "Percent" || form.values.format === "Currency" && !(form.values.type == "Dropdown" || form.values.type == "Radio" || form.values.type == "Checkbox") ? (
                  <Grid className="p-[10px] mt-[10px] sm:mt-[20px]">
                    <Text className="text-[18px] text-[#676a6c] font-light w-[100%] md:w-[300px] 2xl:w-[25%]">Decimal Place: </Text>
                    <TextInput
                      className="w-[100%] sm:w-[75%] ml-auto"
                      {...form.getInputProps("decimalPlace")}
                    // value={form.values.type === "Input" || form.values.type === "Output" ? 0 : ""}
                    />
                  </Grid>
                ) : null}

                {/* {form.values.format === "Currency" ? (
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
            ) : null} */}

                <Grid className="p-[10px] mt-[10px] sm:mt-[20px]">
                  <Text className="text-[18px] text-[#676a6c] font-light w-[100%] md:w-[300px] 2xl:w-[25%]">Helpful Tip: </Text>
                  <TextInput
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
                    //in short a placeholder
                    className="w-[100%] sm:w-[75%] ml-auto"
                    {...form.getInputProps("prefilled")}
                  />
                </Grid>

                {form.values.formula !== 'Textarea' ? (
                  <Grid className="p-[10px] mt-[10px] sm:mt-[20px]">
                    <Text className="text-[18px] text-[#676a6c] font-light w-[100%] md:w-[300px] 2xl:w-[25%]">Append Text: </Text>
                    <TextInput
                      className="w-[100%] sm:w-[75%] ml-auto"
                      {...form.getInputProps("appendedText")}
                    />
                  </Grid>
                ) : null}

                {/* <Grid className="p-[10px] mt-[10px] sm:mt-[20px]">
                  <Text className="text-[18px] text-[#676a6c] font-light w-[100%] md:w-[300px] 2xl:w-[25%]">Address: </Text>
                  <TextInput
                    className="w-[100%] sm:w-[75%] ml-auto"
                    {...form.getInputProps("address")}
                  />
                </Grid> */}

                {form.values.formula !== 'Textarea' ? (
                  <Grid className="p-[10px] mt-[10px] sm:mt-[20px]">
                    <Text className="text-[18px] text-[#676a6c] font-light w-[100%] md:w-[300px] 2xl:w-[25%]">Formula: </Text>
                    <Textarea
                      className="w-[100%] sm:w-[75%] ml-auto"
                      {...form.getInputProps("formula")}
                    // disabled={form.values.type !== "Output"}
                    />
                  </Grid>
                ) : null}

                {form.values.type !== 'Textarea' ? (
                  <Grid className="p-[10px] mt-[10px] sm:mt-[20px]">
                    <Text className="text-[18px] text-[#676a6c] font-light w-[100%] md:w-[300px] 2xl:w-[25%]">Other Sections: </Text>
                    <div className="w-[100%] sm:w-[75%]">
                      <Select
                        placeholder="Choose"
                        data={zchoice}
                        onChange={(val) => {
                          // const selectedOption = zchoice.find((item: { value: string }) => item.value === val);
                          // const selectedLabel = selectedOption ? selectedOption.label : '';
                          // const updatedFormula = form.values.formula.replace(val as, selectedLabel);
                          // setRF((prevValue) => '');
                          // form.setFieldValue('formula', updatedFormula);
                          const selectedOption = zchoice.find((item: { value: string }) => item.value === val);
                          setRF((prevValue) => `${prevValue} ${val}`)
                          form.setFieldValue('formula', `${form.values.formula} ${val}`)
                        }
                        }
                      // disabled={form.values.type !== "Output"}
                      />
                    </div>
                  </Grid>
                ) : null}
              </div>
            )}

            <Divider className="mt-[30px] mb-[30px]" />

            <Grid justify="flex-end" className="mt-[20px] mb-[20px] sm:mb-0 flex flex-col sm:flex-row m-0 sm:m-[-8px] pt-0 sm:pt-[20px">
              <Button
                type="submit"
                radius="sm"
                size="sm"
                color="teal"
                className="mr-0 sm:mr-[10px] mb-[10px]"
              >
                Save Entry
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
                onClick={() => {
                  setOpened(false)
                  setErrorMessage('')
                }}
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

export default NewAddSectionModal;
