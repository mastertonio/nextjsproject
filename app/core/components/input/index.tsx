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
} from "@mantine/core";
import {
  IconQuestionMark,
  IconZoomQuestion,
  IconCalculator,
  IconAt,
} from "@tabler/icons";
import { ReactNode } from "react";
import { iSliderCardProps } from "../card";

export type iVariableProp = {
  id: string;
  type: string;
  label: string;
  format: string;
  icon: ReactNode | null,
  rightSection: ReactNode | null,
  disabled: boolean
  content?: ReactNode
};

export type iElemsProp = {
  id: string;
  type: string;
  text: string;
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
            <Text ml={30} dangerouslySetInnerHTML={{ __html: elem.text }} color="dark" fz="xl" fw={700}>
            </Text>
            <Divider my="sm" color="gray" size="sm" variant="dashed" />
            <Stack>
              {elem.elements.length > 0 ? elem.elements.map((state) => (
                <Grid
                  key={state.id}
                  className="ml-[30px] mr-[30px] mt-[7px] mb-[3px]"
                >
                  <Text className="w-[100%] md:w-[300px] 2xl:w-[500px]">{state.label}: </Text>
                  {state.type !== "textarea" ? (
                    <TextInput
                      required
                      className="ml-auto w-[400px] md:w-[300px] 2xl:w-[400px]"
                      icon={state.icon ? state.icon : ""}
                      rightSection={state.rightSection ?
                        <Tooltip label="Sample Tooltip on calculator, content will be populated in the future" events={{ hover: true, focus: true, touch: false }}>
                          {state.rightSection}
                        </Tooltip> : ""
                      }
                      disabled={state.disabled ? true : false}
                      placeholder="$0"
                    // defaultValue={myCompany.name}
                    />) : (
                    <Textarea
                      className="ml-auto w-[400px] md:w-[300px] 2xl:w-[400px]"
                      withAsterisk
                    />)
                  }

                </Grid>)) : ""}
            </Stack>
          </div>)) : ""}
      </Stack>

      <div className="ml-[15px] sm:ml-auto w-full sm:w-[22%] mt-[10px] sm:mt-0">
        <FloatingCard />
      </div>

    </Grid>

  );
};

export default InputVariable;
