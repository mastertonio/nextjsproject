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
} from "@mantine/core";
import {
  IconQuestionMark,
  IconZoomQuestion,
  IconCalculator,
  IconAt,
} from "@tabler/icons";

type iVariableProp = {
  id: string;
  type: string;
  label: string;
  format: string;
};

export type iElemsProp = {
  id: string;
  type: string;
  text: string;
  elements: iVariableProp[];
};

type iVariablesProps = {
  id: string;
  label?: string;
  type: string;
  text?: string;
  elems?: iElemsProp[];
};

const InputVariable: React.FC<iVariablesProps> = ({
  id,
  label,
  text,
  type,
  elems,
}) => {
  return (
    <Flex
      gap="xs"
      direction="row"
      wrap="wrap"
      w={"100%"}
      style={{ marginTop: 10, marginBottom: 10, padding: 10 }}
    >
      <div style={{ backgroundColor: "white", padding: 10, width: "69%" }}>
        <Text color="dark" fz="xl" fw={700}>
          Please tell us a little about your sales organization
        </Text>
        <Stack>
          <Grid
            className="ml-[30px] mr-[30px] mt-[30px] mb-[15px]"
          >
            <Text>Number of salespeople: </Text>
            <TextInput
              required
              className="w-[450px] ml-auto"
            // defaultValue={myCompany.name}
            />
          </Grid>
          <Grid
            style={{
              marginLeft: 30,
              marginRight: 30,
              marginBottom: 15,
            }}
          >
            <Text>Average deal value: </Text>
            <TextInput
              required
              className="w-[450px] ml-auto"
              icon={<IconAt size={14} />}
            />
          </Grid>
          <Grid
            style={{
              marginLeft: 30,
              marginRight: 30,
              marginBottom: 15,
            }}
          >
            <Text>
              What is the expected combined annual sales for those reps:{" "}
            </Text>
            <TextInput
              required
              className="w-[450px] ml-auto"
              rightSection={
                <Tooltip label="Sample Tooltip on calculator, content will be populated in the future" events={{ hover: true, focus: true, touch: false }}>
                  <Button variant="subtle" color="gray" radius="xs" size="xs" compact><IconCalculator size="18" /></Button>
                </Tooltip>
              }
            />
          </Grid>
          <Grid
            style={{
              marginLeft: 30,
              marginRight: 30,
              marginBottom: 15,
            }}
          >
            <Text>Deals needed to hit your sales goal: </Text>
            <TextInput
              required
              className="w-[450px] ml-auto"
            // defaultValue={myCompany.name}
            />
          </Grid>
          <Grid
            style={{
              marginLeft: 30,
              marginRight: 30,
              marginBottom: 15,
            }}
          >
            <Text>What are the main reasons you lose to the outcome: </Text>
            <TextInput
              required
              className="w-[450px] ml-auto"
            // defaultValue={myCompany.name}
            />
          </Grid>
        </Stack>
      </div>
      <div className="w-[29px] ml-auto">
        <FloatingCard />
      </div>
    </Flex>
  );
};

export default InputVariable;
