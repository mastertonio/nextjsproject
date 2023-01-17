import CheckboxChoices, { iChoicesTypeProps, iOtherTypeProps } from "@app/enterprise/components/CheckboxChoices";
import DropdownChoices from "@app/enterprise/components/DropdownChoices";
import FloatingCard from "@app/enterprise/components/FloatingCard";
import {
  Card,
  Image,
  Text,
  Badge,
  Button,
  Group,
  Container,
  Grid,
  SimpleGrid,
  TextInput,
  Stack,
  Flex,
  Tooltip,
  Textarea,
  Divider,
  Slider,
  Rating,
} from "@mantine/core";
import { useToggle } from "@mantine/hooks";
import {
  IconQuestionMark,
  IconZoomQuestion,
  IconCalculator,
  IconAt,
} from "@tabler/icons";
import { ReactNode, useState } from "react";
import { iSliderCardProps } from "../../../core/components/card";
import styles from "@styles/tiptap.module.scss";

export type iVariableProp = {
  id: string;
  type: string;
  label: string;
  format: string;
  icon: ReactNode | null,
  rightSection: ReactNode | null,
  disabled: boolean
  other: iOtherTypeProps
  choices: iChoicesTypeProps[]
  content: string
};

export type iElemsProp = {
  id: string;
  type: string;
  text: string;
  toggle: boolean,
  elements: iVariableProp[];
};


type iGrayProps = {
  type: string,
  classes?: string,
  elements: iElemsProp[]
}

type iVariablesProps = {
  id: string;
  label?: string;
  type: string;
  text?: string;
  elems?: iElemsProp[];
};

type Itest = {
  gray: iElemsProp
}

const InputVariable: React.FC<iGrayProps> = ({
  type,
  classes,
  elements,
}) => {
  const [show, setShow] = useState<boolean>(false)
  const [value, toggle] = useToggle(['teal', 'red']);

  const hide = () => {
    setShow((prevState) => !prevState)
  }

  return (
    <Grid
      // gap="xs"
      // direction="row"
      // wrap="wrap"
      className="mt-[10px] mb-[10px] p-[10px] w-full"
    >
      <Stack pb={20} className="bg-[white] p-[10px] ml-[15px] rounded-[12px] w-[96%] sm:w-[76%]">
        {type == "variables" ? elements.map((elem) => (
          <div key={elem.id} >
            <Grid>
              <Text ml={30} dangerouslySetInnerHTML={{ __html: elem.text }} color="dark" fz="xl" fw={700}></Text>
              {elem.toggle ? (
                <Button className="ml-auto w-48 m-8" color={value} onClick={() => toggle()} radius="md" size="md">
                  {value == "red" ? "Exclude" : "Include"}
                </Button>)
                : ""
              }
            </Grid>

            <Divider my="sm" color="gray" size="sm" variant="dashed" />
            <Stack>
              {elem.elements.length > 0 ? elem.elements.map((state) => (
                <Grid
                  key={state.id}
                  className="ml-[30px] mr-[30px] mt-[7px] mb-[3px]"
                >
                  <Text className="w-[100%] md:w-[300px] 2xl:w-[500px]">{state.label}: </Text>
                  {state.type == "textarea" ? (
                    <Textarea
                      className="ml-auto w-[400px] md:w-[300px] 2xl:w-[400px]"
                      withAsterisk
                    />) : state.type == "checkbox" ? (
                      <>
                        <CheckboxChoices hide={hide} choices={state.choices} other={state.other} />
                        <div>
                          {show ? state.other.elements.map((elem) => (
                            <div key={elem.id} className="flex flex-row items-center justify-between ">
                              <div><Text>{elem.label} </Text></div>
                              <Textarea
                                className="w-96 lg:ml-80"
                                withAsterisk
                              />
                            </div>

                          )) : ""}
                        </div>
                      </>
                    ) : state.type == "dropdown" ?
                    <>
                      <DropdownChoices choices={state.choices} other={state.other} />
                    </> : state.type == "stars" ? (
                      <>
                        <Rating
                          defaultValue={5}
                          fractions={2}
                          style={{ marginLeft: 190 }}
                          color="indigo" size="xl" />
                      </>
                    ) : state.type == "slid" ? (
                      <>
                        <Slider
                          defaultValue={20}
                          size="xl"
                          radius="xl"
                          color="teal"
                          max={70}
                          marks={[
                            { value: 20, label: '20%' },
                            { value: 40, label: '40%' },
                            { value: 60, label: '60%' },
                          ]}
                          style={{ width: 400, marginLeft: "auto" }}
                          step={20}
                        />
                      </>
                    ) : state.type == "input" ? (
                      <TextInput
                        required
                        style={{ width: 400, marginLeft: "auto" }}
                        icon={state.icon ? state.icon : ""}
                        rightSection={state.rightSection ?
                          <Tooltip label="Sample Tooltip on calculator, content will be populated in the future" events={{ hover: true, focus: true, touch: false }}>
                            {state.rightSection}
                          </Tooltip> : ""
                        }
                        disabled={state.disabled ? true : false}
                        placeholder="$0"
                      // defaultValue={myCompany.name}
                      />) : state.type == "table" ? (
                        <div className={styles.ProseMirror} dangerouslySetInnerHTML={{ __html: state.content }}></div>
                      ) : ""
                  }
                </Grid>)) : ""}
            </Stack>
          </div>)) : ""}
      </Stack>

      <div style={{ width: '22%', marginLeft: "auto" }}>
        <FloatingCard />
      </div>

    </Grid>

  );
};

export default InputVariable;
