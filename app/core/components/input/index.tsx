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
      style={{ marginTop: 10, marginBottom: 10, padding: 10, width: "100%" }}
    >
      <Stack pb={20} w={"76%"} style={{ backgroundColor: "white", padding: 10, marginLeft: 10, borderRadius: 5 }}>
        {type == "variables" ? elements.map((elem) => (
          <div key={elem.id} >
            <Text ml={30} dangerouslySetInnerHTML={{ __html: elem.text }} color="dark" fz="xl" fw={700}>
            </Text>
            <Divider my="sm" color="gray" size="sm" variant="dashed" />
            <Stack>
              {elem.elements.length > 0 ? elem.elements.map((state) => (
                <Grid
                  key={state.id}
                  style={{
                    marginLeft: 30,
                    marginRight: 30,
                    marginTop: 7,
                    marginBottom: 3,
                  }}
                >
                  <Text>{state.label}: </Text>
                  {state.type !== "textarea" ? (
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
                    />) : (
                    <Textarea
                      style={{ width: 400, marginLeft: "auto" }}
                      withAsterisk
                    />)
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
