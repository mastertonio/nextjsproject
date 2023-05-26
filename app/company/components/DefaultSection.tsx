import { DndListHandleProps } from "@app/core/components/forms/Sections";
import {
  Button,
  Container,
  Divider,
  Grid,
  SimpleGrid,
  Skeleton,
  Stack,
  useMantineTheme,
  Image,
  Menu,
  Affix,
  Transition,
  Modal,
  TextInput,
  Group,
  NumberInput,
  Select,
  Text,
} from "@mantine/core";
import { IconArrowUp, IconPlus } from "@tabler/icons";
import SectionBlockQuotes from "./sectionComponents/BlockQuotes";
import SectionDescription from "./sectionComponents/Description";
import SectionHeader from "./sectionComponents/Header";
import SectionMedia from "./sectionComponents/VideoLinkMedia";
import CreateCalculator from "./sectionComponents/modals/CreateCalculator";
import MediaSelection from "./sectionComponents/modals/MediaSelection";
import ImageDropzone from "./sectionComponents/ImageTypeMedia";
import { useEffect, useState } from "react";
import GifsMedia from "./sectionComponents/GifsMedia";
import VideoLinkMedia from "./sectionComponents/VideoLinkMedia";
import { useWindowScroll } from "@mantine/hooks";
import { useForm } from "@mantine/form";
import { useCalcStore } from "@app/store/builderStore";

const PRIMARY_COL_HEIGHT = 300;

type iDefaultSectionProps = {
  id: string;
  name: string;
  description: string;
  title: string;
  quote: string;
  media: string;
  price: number;
  author: string;
};

const DefaultSection: React.FC<iDefaultSectionProps> = ({
  name,
  id,
  description,
  media,
  price,
  quote,
  title,
  author,
}) => {
  const theme = useMantineTheme();
  // const SECONDARY_COL_HEIGHT = PRIMARY_COL_HEIGHT / 2 - theme.spacing.md / 2;
  const [mediaType, setMediaType] = useState("");
  const [scroll, scrollTo] = useWindowScroll();
  const [desc, showDesc] = useState<boolean>(false);
  const [med, showMed] = useState<boolean>(false);
  const [quo, showQuo] = useState<boolean>(false);
  const [calc, showCalc] = useState<boolean>(false);
  const [opened, setOpened] = useState(false);
  const variables = useCalcStore((state) => state.variables);
  const addVar = useCalcStore((state) => state.add);
  const rmVar = useCalcStore((state) => state.remove);
  const updVar = useCalcStore((state) => state.update);

  const form = useForm({
    initialValues: {
      var_name: "",
      type: "INPUT",
      value: 0
    },
  });

  return (
    <div
      style={{
        marginBottom: 50,
        padding: 30,
        marginLeft: 10,
        marginRight: 10,
        backgroundColor: "white",
        borderRadius: 10,
        boxShadow: "#c2410c",
      }}
    >
      <SectionHeader id={id} title={title} price={price} />
      <Grid mb={40}>
        <Stack>
          <Menu
            trigger="hover"
            openDelay={100}
            closeDelay={400}
            position="right-start"
            shadow="md"
            width={200}
          >
            <Menu.Target>
              <Button type="button" mr={"auto"} compact variant="subtle" color="#FFFFFF">
                <IconPlus size={20} />
              </Button>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Label>Add Components</Menu.Label>
              <Menu.Item onClick={() => showDesc((prev) => !prev)}>
                Add | Remove Description
              </Menu.Item>
              <Menu.Item onClick={() => showMed((prev) => !prev)}>
                Add | Remove Media
              </Menu.Item>
              <Menu.Item onClick={() => showQuo((prev) => !prev)}>
                Add | Remove Quotes
              </Menu.Item>
              <Menu.Item onClick={() => showCalc((prev) => !prev)}>
                Add | Remove Calculator Area
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>

          {desc ? (
            <SectionDescription name={title} description={description} />
          ) : (
            ""
          )}
          {quo ? <SectionBlockQuotes quote={quote} author={author} /> : ""}
        </Stack>
        {med ? (
          <Stack ml={"auto"}>
            {mediaType == "image" ? (
              <ImageDropzone />
            ) : mediaType == "gifs" ? (
              <GifsMedia />
            ) : mediaType == "video" ? (
              <VideoLinkMedia />
            ) : (
              ""
            )}
            <MediaSelection setMediaType={setMediaType} mediaType={mediaType} />
          </Stack>
        ) : (
          ""
        )}

        {/* <SectionMedia media={media} /> */}
      </Grid>
      {calc ? (
        <>
          <Divider my="md" />
          <div style={{ marginTop: 50 }}>
            <Modal
              opened={opened}
              onClose={() => setOpened(false)}
              title="Create Variables"
            >
              <form
                onSubmit={form.onSubmit((values) => {
                  addVar(
                    values.var_name,
                    values.type as "INPUT" | "OUTPUT" | "FIXED",
                    values.value
                  );
                  setOpened((prev) => !prev);
                  form.reset()
                })}
              >
                <TextInput
                  my={10}
                  withAsterisk
                  label="Variable Name"
                  placeholder="Eg. Length, Width, Height"
                  {...form.getInputProps("var_name")}
                />

                <Select
                  my={10}
                  label="Variable Type"
                  placeholder="Pick variable type"
                  data={[
                    { value: "INPUT", label: "Input" },
                    { value: "FIXED", label: "Fixed" },
                    { value: "OUTPUT", label: "Output" },
                  ]}
                  {...form.getInputProps("type")}
                />

                {form.values.type == "OUTPUT" ? (
                  <TextInput
                    my={10}
                    label="Enter Formula"
                    placeholder="Eg. Length x width"
                    {...form.getInputProps("value")}
                  />
                ) : (
                  <NumberInput
                    my={10}
                    hideControls
                    withAsterisk
                    label="Variable Value"
                    placeholder="Enter Numirical Value"
                    {...form.getInputProps("value")}
                  />
                )}

                <Group position="right" mt="md">
                  <Button variant="filled" color="teal" type="submit">Submit</Button>
                </Group>
              </form>
            </Modal>

            <Button
              type="button"
              mr={"auto"}
              leftIcon={<IconPlus size={20} />}
              compact
              variant="subtle"
              color="#FFFFFF"
              onClick={() => setOpened((prev) => !prev)}
            >
              Create Variables
            </Button>
            <div style={{ padding: 15, paddingRight: 30, width: "50%", borderWidth: 1, borderStyle: 'double', borderRadius: 2 }}>
              {variables
                ? variables.map((vars) => (
                  <ul key={vars.id}>
                    {" "}
                    {vars.type == "INPUT" ? (
                      <Grid my={10}>
                        <Text>{vars.var_name}</Text>
                        <NumberInput
                          hideControls
                          defaultValue={vars.value}
                          ml={"auto"}
                        />
                      </Grid>
                    ) : vars.type == "FIXED" ? (
                      <Grid my={10}>
                        <Text>{vars.var_name}</Text>
                        <Text ml={"auto"}>{vars.value}</Text>
                      </Grid>
                    ) : vars.type == "OUTPUT" ? (
                      <Grid my={10}>
                        <Text>{vars.var_name}</Text>
                        <Text ml={"auto"}>{vars.value}</Text>
                      </Grid>
                    ) : (
                      ""
                    )}{" "}
                  </ul>
                ))
                : ""}
            </div>
          </div>
        </>
      ) : (
        ""
      )}

      {/* <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Button
          type="button"
          mt={2}
          style={{ position: "absolute", marginTop: 40 }}
          compact
          variant="subtle"
          color="#FFFFFF"
        >
          Add Calculator Area
        </Button>
      </div> */}
      <Affix position={{ bottom: 20, right: 20 }}>
        <Transition transition="slide-up" mounted={scroll.y > 0}>
          {(transitionStyles) => (
            <Button
              type="button"
              leftIcon={<IconArrowUp size={16} />}
              style={transitionStyles}
              onClick={() => scrollTo({ y: 0 })}
              color="teal"
            >
              Scroll to top
            </Button>
          )}
        </Transition>
      </Affix>
    </div>
  );
};

export default DefaultSection;
