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
import { UserDataProp } from "@app/context/user.context";

export interface IButtonAddCompanyProps {
  refetch: () => void;
  user: UserDataProp
}

const AddCompanyButton: React.FC<IButtonAddCompanyProps> = ({ refetch, user }) => {
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
      notes: ""
    },
  });

  const handleSubmit = async (values: typeof form.values) => {
    console.log("file", file)
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
          active: 1
        }, {
        headers: {
          Authorization: `Bearer ${user.tokens.access.token}`,
        },
      });

      console.log('create company', response)
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
      console.log('create company error', error)
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
          className="p-[30px] text-[30px] !bg-[#073e52] text-white"
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
              className="ml-[30px] mr-[30px] mt-[30px] mb-[15px]"
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
              className="ml-[30px] mr-[30px] mb-[15px]"
            >
              <Text>Company Alias: </Text>
              <TextInput
                required
                className="w-[550px] ml-auto"
                // defaultValue={myCompany.name}
                placeholder="New Title Name"
                {...form.getInputProps("alias")}
              />
            </Grid>
            <Grid style={{ marginLeft: 30, marginRight: 30 }} className="ml-[30px] mr-[30px]">
              <Text>Licenses: </Text>
              <NumberInput
                defaultValue={0}
                className="w-[550px] ml-auto"
                min={0}
                {...form.getInputProps("licenses")}
                required
              />
            </Grid>
            <Text align="center" className="mt-[10px]" weight={700}>
              Account Contact
            </Text>
            <Grid className="ml-[30px] mr-[30px] mb-[10px]">
              <div>
                <Text>First Name: </Text>
                <TextInput
                  required
                  className="w-[350px] ml-auto"
                  // defaultValue="Jason"
                  placeholder="First Name"
                  {...form.getInputProps("contact_fname")}
                />
              </div>
              <div className="ml-auto">
                <Text>Last Name: </Text>
                <TextInput
                  required
                  className="w-[350px] ml-auto"
                  // defaultValue="Ronda"
                  placeholder="Last Name"
                  {...form.getInputProps("contact_lname")}
                />
              </div>
            </Grid>
            <Grid className="ml-[30px] mr-[30px] mb-[10px]">
              <div>
                <Text>Email: </Text>
                <TextInput
                  required
                  className="w-[350px] ml-auto"
                  placeholder="Email Address"
                  // defaultValue="jason.ronda003@gmail.com"
                  {...form.getInputProps("contact_email")}
                />
              </div>
              <div style={{ marginLeft: "auto" }}>
                <Text>Contact Number: </Text>
                <TextInput
                  required
                  className="w-[350px] ml-auto"
                  // defaultValue="09269666992"
                  placeholder="Phone Number"
                  {...form.getInputProps("contact_phone")}
                />
              </div>
            </Grid>
            <Grid
              className="ml-[30px] mr-[30px] mb-[15px]"
            >
              <div
                className="flex justify-between items-center"
              >
                <Text className="mr-[20px]">
                  Contract and Agreements:{" "}
                </Text>
                <Group>
                  <FileButton onChange={setFile}>
                    {(props) => (
                      <Button
                        type="button"
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
              <div className="ml-[20px]">
                {file && (
                  <Text size="sm" align="center" mt="xs">
                    Picked file: {file.name}
                  </Text>
                )}
              </div>
            </Grid>
            <Grid className="ml-[30px] mr-[30px]">
              <Text className="mr-[20px]">Contract Start: </Text>
              <DatePicker
                value={startDate}
                onChange={setStartDate}
                clearable
                className="w-[250px]"
              />
              {/* onChange={dat => dat && setDate(dat)} */}
            </Grid>
            <Grid className="ml-[30px] mr-[30px] mt-[10px]">
              <Text className="mr-[26px]">Contract End: </Text>
              <DatePicker
                value={endDate}
                onChange={setEndDate}
                clearable
                className="w-[250px]"
                minDate={startDate || new Date()}
              />
            </Grid>
            <Grid className="ml-[30px] mr-[30px] mt-[10px]">
              <Text>Notes: </Text>
              <Textarea
                className="w-[600px] ml-auto"
                autosize
                minRows={3}
                maxRows={4}
                {...form.getInputProps("notes")}
              />
            </Grid>
          </Stack>

          <Grid justify="flex-end" className="m-[20px]">
            <Button
              type="submit"
              radius="sm"
              size="sm"
              color="teal"
              className="mr-[10px]"
              onClick={() => setOpened(false)}
            >
              Save Company
            </Button>
            <Button
              type="button"
              radius="sm"
              size="sm"
              onClick={() => setOpened(false)}
              className="bg-white text-black border-gray-500"
            >
              Close
            </Button>
          </Grid>
        </form>
      </Modal>

      <Button
        type="button"
        leftIcon={<AiFillPlusCircle />}
        radius="sm"
        size="sm"
        onClick={() => setOpened(true)}
        color="teal"
        className="w-[300px]"
      >
        Create Company
      </Button>
    </>
  );
};

export default AddCompanyButton;
