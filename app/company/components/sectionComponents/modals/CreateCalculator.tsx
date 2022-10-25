import { useContext, useState } from "react";
import {
  Modal,
  Button,
  Text,
  TextInput,
  Grid,
  SimpleGrid,
  Box,
  Image,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { AiOutlineDelete } from "react-icons/ai";
import { useLocalStorage } from "@mantine/hooks";
import { useRouter } from "next/router";
import axios from "axios";
import { AiOutlineExclamationCircle } from "react-icons/ai";
import { showNotification, updateNotification } from "@mantine/notifications";
import { IconCheck, IconPlus, IconCalculator } from "@tabler/icons";
import { IButtonRoiNameProps } from "@app/dashboard/components/buttons/EditButton";
import LeadGrid from "../layout/defaultOption";
import LayoutOption1 from "../layout/option1";
import shortUUID from "short-uuid";
import BuilderContext from "@app/context/builder.context";

type IMediaSelectionModalProps = {
  style?: string;
};

const CreateCalculator: React.FC<IMediaSelectionModalProps> = ({ style }) => {
  const [opened, setOpened] = useState(false);
  const [value] = useLocalStorage({ key: "auth-token" });
  const router = useRouter();
  const p = router.query;
  const builderCtx = useContext(BuilderContext);

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
        size="60%"
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
          Choose Input Type and Configure Calculator Formula
        </Text>
        <SimpleGrid cols={3} style={{ margin: 20 }}>
          Test
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
        
        variant="subtle"
        onClick={() => setOpened(true)}
        leftIcon={<IconPlus />}
      >
        Add Input with Calculator
      </Button>
    </>
  );
};

export default CreateCalculator;
