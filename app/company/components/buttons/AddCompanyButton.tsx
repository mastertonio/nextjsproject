import { useEffect, useState } from "react";
import {
  Modal,
  Button,
  Text,
  TextInput,
  Grid,
  Stack,
  Group,
  FileButton,
  Textarea,
  NumberInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { AiFillPlusCircle, AiOutlineEdit } from "react-icons/ai";
import axios from "axios";
import { useLocalStorage } from "@mantine/hooks";
import { useRouter } from "next/router";
import { showNotification, updateNotification } from "@mantine/notifications";
import { IconCheck } from "@tabler/icons";
import { ICompanyProps } from "@app/dashboard/components/table/utils/tableMethods";
import { DatePicker } from "@mantine/dates";
import dayjs from "dayjs";

export interface IButtonAddCompanyProps {
  refetch: () => void;
}

const AddCompanyButton: React.FC<IButtonAddCompanyProps> = ({ refetch }) => {
  const [opened, setOpened] = useState(false);
  const [value] = useLocalStorage({ key: "auth-token" });
  const router = useRouter();
  const p = router.query;
  const [file, setFile] = useState<File | null>(null);
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [endDate, setEndDate] = useState<Date | null>(new Date());

  const form = useForm({
    initialValues: {
      name: "",
      alias: "",
      licenses: 1,
      contact_fname: "",
      contact_lname: "",
      contact_email: "",
      contact_phone: "",
      notes: "",
      active: "",
    },
  });

  const handleSubmit = async (values: typeof form.values) => {
    try {
      showNotification({
        id: "edit-comp",
        loading: true,
        title: `Updating`,
        message: "Please wait, updating edited row",
        autoClose: false,
        disallowClose: true,
        color: "teal",
      });
      const response = await axios.post(
        `/v1/company`,
        {
          alias: values.alias,
          licenses: values.licenses,
          contract_file: file,
          contract_start_date: startDate,
          contract_end_date: endDate,
          notes: values.notes,
          name: values.name,
          contact_fname: values.contact_fname,
          contact_lname: values.contact_lname,
          contact_email: values.contact_email,
          contact_phone: values.contact_phone,
        });
      if (response) {
        refetch();
        updateNotification({
          id: "edit-comp",
          color: "teal",
          title: `row was updated to `,
          message: "A row was updated! and renamed",
          icon: <IconCheck size={16} />,
          autoClose: 2500,
        });
        form.reset();
        setFile(null);
        setStartDate(null);
        setEndDate(null);
      }
    } catch (error) {
      updateNotification({
        id: "edit-comp",
        color: "red",
        title: "Updating a table row failed",
        message: "Something went wrong, Please try again",
        autoClose: false,
      });
      return error;
    }
  };

  return (
    <>
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        withCloseButton={false}
        size="xl"
        padding={0}
      >
        <Text
          weight={700}
          color="gray"
          style={{
            padding: 30,
            fontSize: 30,
            backgroundColor: "#073e52",
            color: "white",
          }}
          align="center"
        >
          Create Company
        </Text>

        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Stack
            justify="flex-start"
            sx={(theme) => ({
              backgroundColor:
                theme.colorScheme === "dark"
                  ? theme.colors.dark[8]
                  : theme.colors.gray[0],
              height: 680,
            })}
          >
            <Grid
              style={{
                marginLeft: 30,
                marginRight: 30,
                marginTop: 30,
                marginBottom: 15,
              }}
            >
              <Text>Company Name: </Text>
              <TextInput
                required
                style={{ width: 550, marginLeft: "auto" }}
                // defaultValue={myCompany.name}
                placeholder="New Title Name"
                {...form.getInputProps("name")}
              />
            </Grid>
            <Grid
              style={{
                marginLeft: 30,
                marginRight: 30,
                marginBottom: 15,
              }}
            >
              <Text>Company Alias: </Text>
              <TextInput
                required
                style={{ width: 550, marginLeft: "auto" }}
                // defaultValue={myCompany.name}
                placeholder="New Title Name"
                {...form.getInputProps("alias")}
              />
            </Grid>
            <Grid style={{ marginLeft: 30, marginRight: 30 }}>
              <Text>Licenses: </Text>
              <NumberInput
                defaultValue={0}
                style={{ marginLeft: 'auto', width: 550 }}
                min={0}
                {...form.getInputProps("licenses")}
                required
              />
            </Grid>
            <Text align="center" style={{ marginTop: 10 }} weight={700}>
              Account Contact
            </Text>
            <Grid style={{ marginLeft: 30, marginRight: 30, marginBottom: 10 }}>
              <div>
                <Text>First Name: </Text>
                <TextInput
                  required
                  style={{ width: 350, marginLeft: "auto" }}
                  // defaultValue="Jason"
                  placeholder="First Name"
                  {...form.getInputProps("contact_fname")}
                />
              </div>
              <div style={{ marginLeft: "auto" }}>
                <Text>Last Name: </Text>
                <TextInput
                  required
                  style={{ width: 350, marginLeft: "auto" }}
                  // defaultValue="Ronda"
                  placeholder="Last Name"
                  {...form.getInputProps("contact_lname")}
                />
              </div>
            </Grid>
            <Grid style={{ marginLeft: 30, marginRight: 30, marginBottom: 10 }}>
              <div>
                <Text>Email: </Text>
                <TextInput
                  required
                  style={{ width: 350, marginLeft: "auto" }}
                  placeholder="Email Address"
                  // defaultValue="jason.ronda003@gmail.com"
                  {...form.getInputProps("contact_email")}
                />
              </div>
              <div style={{ marginLeft: "auto" }}>
                <Text>Contact Number: </Text>
                <TextInput
                  required
                  style={{ width: 350, marginLeft: "auto" }}
                  // defaultValue="09269666992"
                  placeholder="Phone Number"
                  {...form.getInputProps("contact_phone")}
                />
              </div>
            </Grid>
            <Grid
              style={{
                marginLeft: 30,
                marginRight: 30,
                marginBottom: 15,
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Text style={{ marginRight: 20 }}>
                  Contract and Agreements:{" "}
                </Text>
                <Group>
                  <FileButton onChange={setFile}>
                    {(props) => (
                      <Button
                        variant="light"
                        color="dark"
                        radius="xs"
                        compact
                        {...props}
                      >
                        Choose File
                      </Button>
                    )}
                  </FileButton>
                </Group>
              </div>
              <div style={{ marginLeft: 20 }}>
                {file && (
                  <Text size="sm" align="center" mt="xs">
                    Picked file: {file.name}
                  </Text>
                )}
              </div>
            </Grid>
            <Grid style={{ marginLeft: 30, marginRight: 30 }}>
              <Text style={{ marginRight: 20 }}>Contract Start: </Text>
              <DatePicker
                value={startDate}
                onChange={setStartDate}
                clearable
                style={{ width: 250 }}
              />
              {/* onChange={dat => dat && setDate(dat)} */}
            </Grid>
            <Grid style={{ marginLeft: 30, marginRight: 30, marginTop: 10 }}>
              <Text style={{ marginRight: 26 }}>Contract End: </Text>
              <DatePicker
                value={endDate}
                onChange={setEndDate}
                clearable
                style={{ width: 250 }}
                minDate={startDate || new Date()}
              />
            </Grid>
            <Grid style={{ marginLeft: 30, marginRight: 30, marginTop: 10 }}>
              <Text>Notes: </Text>
              <Textarea
                style={{ width: 600, marginLeft: "auto" }}
                autosize
                minRows={3}
                maxRows={4}
                {...form.getInputProps("notes")}
              />
            </Grid>
          </Stack>

          <Grid justify="flex-end" style={{ margin: 20 }}>
            <Button
              type="submit"
              radius="sm"
              size="sm"
              color="teal"
              style={{ marginRight: 10 }}
              onClick={() => setOpened(false)}
            >
              Save Company
            </Button>
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
        </form>
      </Modal>

      <Button
        leftIcon={<AiFillPlusCircle />}
        radius="sm"
        size="sm"
        onClick={() => setOpened(true)}
        color="teal"
        style={{ width: 300 }}
      >
        Create Company
      </Button>
    </>
  );
};

export default AddCompanyButton;
