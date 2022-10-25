import { useContext, useState } from "react";
import {
  Modal,
  Button,
  Text,
  TextInput,
  Grid,
  SimpleGrid,
  Box,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { AiOutlineDelete } from "react-icons/ai";
import { useLocalStorage } from "@mantine/hooks";
import { useRouter } from "next/router";
import axios from "axios";
import { AiOutlineExclamationCircle } from "react-icons/ai";
import { showNotification, updateNotification } from "@mantine/notifications";
import { IconCheck, IconPlus } from "@tabler/icons";
import { IButtonRoiNameProps } from "@app/dashboard/components/buttons/EditButton";
import LeadGrid from "../layout/defaultOption";
import LayoutOption1 from "../layout/option1";
import shortUUID from "short-uuid";
import BuilderContext from "@app/context/builder.context";
import Option1 from "../layout/option1";
import Option2 from "../layout/option2";
import Option3 from "../layout/option3";
import Option4 from "../layout/option4";
import Option5 from "../layout/option5";

type IAddSectionModalProps = {
  style: string;
};

const AddSectionModal: React.FC<IAddSectionModalProps> = ({ style }) => {
  const [opened, setOpened] = useState(false);
  const [value] = useLocalStorage({ key: "auth-token" });
  const router = useRouter();
  const p = router.query;
  const builderCtx = useContext(BuilderContext)

  const form = useForm({
    initialValues: {
      title: "",
    },
  });

  return (
    <>
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        withCloseButton={false}
        size="xl"
        padding={0}
      >
        {" "}
        <Text
          weight={500}
          color="gray"
          style={{
            paddingTop: 30,
            paddingLeft: 30,
            paddingRight: 30,
            fontSize: 30,
            backgroundColor: "white",
            color: "gray",
          }}
        >
          Choose a Section Layout
        </Text>
        <SimpleGrid cols={3} style={{ margin: 20}}>
        <Box
            component="div"
            sx={(theme) => ({
              backgroundColor: "whitesmoke",
              textAlign: "center",
              padding: theme.spacing.sm,
              borderRadius: theme.radius.md,
              borderWidth: 5,
              borderColor: 'gray',
              cursor: "pointer",

              "&:hover": {
                backgroundColor: theme.colors.cyan[1]
              },
            })}
            onClick={()=> builderCtx.addSection({ id: shortUUID.generate(), name: shortUUID.generate(), title: 'Edit Section Title', description: "Edit Section Description"})}
          >
            <LeadGrid />
          </Box>
          <Box
            component="div"
            sx={(theme) => ({
              backgroundColor: "whitesmoke",
              color:
                theme.colorScheme === "dark"
                  ? theme.colors.blue[4]
                  : theme.colors.blue[7],
              textAlign: "center",
              padding: theme.spacing.sm,
              borderRadius: theme.radius.md,
              borderColor: 'whitesmoke',
              cursor: "pointer",

              "&:hover": {
                backgroundColor: theme.colors.cyan[1]
              },
            })}
            onClick={()=> builderCtx.addSection({ id: shortUUID.generate(), name: shortUUID.generate(), title: 'Edit Section Title', description: "Edit Section Description"})}
          >
            <Option1 />
          </Box>
          <Box
            component="div"
            sx={(theme) => ({
              backgroundColor: "whitesmoke",
              color:
                theme.colorScheme === "dark"
                  ? theme.colors.blue[4]
                  : theme.colors.blue[7],
              textAlign: "center",
              padding: theme.spacing.sm,
              borderRadius: theme.radius.md,
              borderColor: 'whitesmoke',
              cursor: "pointer",

              "&:hover": {
                backgroundColor: theme.colors.cyan[1]
              },
            })}
            onClick={()=> builderCtx.addSection({ id: shortUUID.generate(), name: shortUUID.generate(), title: 'Edit Section Title', description: "Edit Section Description"})}
          >
            <Option2 />
          </Box>
          <Box
            component="div"
            sx={(theme) => ({
              backgroundColor: "whitesmoke",
              color:
                theme.colorScheme === "dark"
                  ? theme.colors.blue[4]
                  : theme.colors.blue[7],
              textAlign: "center",
              padding: theme.spacing.sm,
              borderRadius: theme.radius.md,
              borderColor: 'whitesmoke',
              cursor: "pointer",

              "&:hover": {
                backgroundColor: theme.colors.cyan[1]
              },
            })}
            onClick={()=> builderCtx.addSection({ id: shortUUID.generate(), name: shortUUID.generate(), title: 'Edit Section Title', description: "Edit Section Description"})}
          >
            <Option3 />
          </Box>
          <Box
            component="div"
            sx={(theme) => ({
              backgroundColor: "whitesmoke",
              color:
                theme.colorScheme === "dark"
                  ? theme.colors.blue[4]
                  : theme.colors.blue[7],
              textAlign: "center",
              padding: theme.spacing.sm,
              borderRadius: theme.radius.md,
              borderColor: 'whitesmoke',
              cursor: "pointer",

              "&:hover": {
                backgroundColor: theme.colors.cyan[1]
              },
            })}
            onClick={()=> builderCtx.addSection({ id: shortUUID.generate(), name: shortUUID.generate(), title: 'Edit Section Title', description: "Edit Section Description"})}
          >
            <Option4 />
          </Box>
          <Box
            component="div"
            sx={(theme) => ({
              backgroundColor: "whitesmoke",
              color:
                theme.colorScheme === "dark"
                  ? theme.colors.blue[4]
                  : theme.colors.blue[7],
              textAlign: "center",
              padding: theme.spacing.sm,
              borderRadius: theme.radius.md,
              borderColor: 'whitesmoke',
              cursor: "pointer",

              "&:hover": {
                backgroundColor: theme.colors.cyan[1]
              },
            })}
            onClick={()=> builderCtx.addSection({ id: shortUUID.generate(), name: shortUUID.generate(), title: 'Edit Section Title', description: "Edit Section Description"})}
          >
            <Option5 />
          </Box>
        </SimpleGrid>
        <Grid justify="flex-end" style={{ margin: 20 }}>
          {/* <Button
            type="submit"
            radius="sm"
            size="sm"
            color="green"
            style={{ marginRight: 10 }}
          >
            Add Section
          </Button> */}
          <Button
            radius="sm"
            size="sm"
            onClick={() => setOpened(false)}
            style={{
              backgroundColor: "white",
              color: "black",
              borderColor: "gray",
            }}
          >
            Close
          </Button>
        </Grid>
      </Modal>
      <Button
        leftIcon={<IconPlus />}
        variant="subtle"
        className={style}
        onClick={() => setOpened(true)}
      >
        Add Sections
      </Button>
    </>
  );
};

export default AddSectionModal;
