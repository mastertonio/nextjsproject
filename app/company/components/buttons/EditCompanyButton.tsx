import { useState } from "react";
import { Modal, Button, Text, TextInput, Grid, Stack, NumberInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { AiOutlineEdit } from "react-icons/ai";
import axios from "axios";
import { useLocalStorage } from "@mantine/hooks";
import { useRouter } from "next/router";
import { showNotification, updateNotification } from "@mantine/notifications";
import { IconCheck } from "@tabler/icons";
import { ICompanyProps } from "@app/dashboard/components/table/utils/tableMethods";

export interface IButtonCompanyProps {
  id: string;
  refetch: () => void;
  name: string;
  myCompany: ICompanyProps;
}

const EditCompanyButton: React.FC<IButtonCompanyProps> = ({
  id,
  refetch,
  name,
  myCompany,
}) => {
  const [opened, setOpened] = useState(false);
  const [value] = useLocalStorage({ key: "auth-token" });
  const router = useRouter();
  const p = router.query;

  const form = useForm({
    initialValues: {
      company: myCompany.name,
      alias: myCompany.alias,
      licenses: myCompany.licenses,
      first_name: !!myCompany.contact_fname
        ? myCompany.contact_fname
        : "Unassigned",
      last_name: !!myCompany.contact_lname
        ? myCompany.contact_lname
        : "Unassigned",
      email: !!myCompany.contact_email ? myCompany.contact_email : "Unassigned",
      phone: !!myCompany.contact_phone ? myCompany.contact_phone : "9269996669",
    },
  });

  const handleSubmit = async (values: typeof form.values) => {
    try {
      showNotification({
        id: "edit-comp",
        loading: true,
        title: `Updating ...`,
        message: "Please wait, updating edited row",
        autoClose: false,
        disallowClose: true,
        color: "teal",
      });
      const response = await axios.patch(
        `/v1/company/${id}`,
        {
          name: values.company,
          alias: values.alias,
          licenses: parseInt(values.licenses),
          contact_fname: values.first_name,
          contact_lname: values.last_name,
          contact_email: values.email,
          contact_phone: values.phone,
        }
      );
      if (response) {
        refetch();
        updateNotification({
          id: "edit-comp",
          color: "teal",
          title: `Company updated!`,
          message: "A company was edited! ",
          icon: <IconCheck size={16} />,
          autoClose: 2500,
        });
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
          {name}
        </Text>

        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Stack
            justify="flex-start"
            sx={(theme) => ({
              backgroundColor:
                theme.colorScheme === "dark"
                  ? theme.colors.dark[8]
                  : theme.colors.gray[0],
              height: 500,
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
              <div>
                <Text>Company Name: </Text>
                <TextInput
                  required
                  style={{ width: 350, marginLeft: "auto" }}
                  // defaultValue={myCompany.name}
                  placeholder="New Title Name"
                  {...form.getInputProps("company")}
                />
              </div>
              <div style={{ marginLeft: "auto" }}>
                <Text>Company Alias: </Text>
                <TextInput
                  required
                  style={{ width: 350, marginLeft: "auto" }}
                  // defaultValue={myCompany.alias}
                  placeholder="Company Alias"
                  {...form.getInputProps("alias")}
                />
              </div>
            </Grid>
            <Grid style={{ marginLeft: 30, marginRight: 30 }}>
              <div>
                <Text>Licenses: </Text>
                <NumberInput
                  required
                  style={{ width: 350, marginLeft: "auto" }}
                  // defaultValue={myCompany.licenses}
                  placeholder="New Title Name"
                  {...form.getInputProps("licenses")}
                />
              </div>
            </Grid>
            <Text align="center" style={{ marginTop: 30 }} weight={700}>
              Account Contact
            </Text>
            <Grid style={{ marginLeft: 30, marginRight: 30, marginBottom: 30 }}>
              <div>
                <Text>First Name: </Text>
                <TextInput
                  required
                  style={{ width: 350, marginLeft: "auto" }}
                  // defaultValue="Jason"
                  placeholder="First Name"
                  {...form.getInputProps("first_name")}
                />
              </div>
              <div style={{ marginLeft: "auto" }}>
                <Text>Last Name: </Text>
                <TextInput
                  required
                  style={{ width: 350, marginLeft: "auto" }}
                  // defaultValue="Ronda"
                  placeholder="Last Name"
                  {...form.getInputProps("last_name")}
                />
              </div>
            </Grid>
            <Grid style={{ marginLeft: 30, marginRight: 30, marginBottom: 80 }}>
              <div>
                <Text>Email: </Text>
                <TextInput
                  required
                  style={{ width: 350, marginLeft: "auto" }}
                  placeholder="Email Address"
                  // defaultValue="jason.ronda003@gmail.com"
                  {...form.getInputProps("email")}
                />
              </div>
              <div style={{ marginLeft: "auto" }}>
                <Text>Contact Number: </Text>
                <TextInput
                  required
                  style={{ width: 350, marginLeft: "auto" }}
                  // defaultValue="09269666992"
                  placeholder="Phone Number"
                  {...form.getInputProps("phone")}
                />
              </div>
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
              Edit Company
            </Button>
            <Button
              type="button"
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
        type="button"
        leftIcon={<AiOutlineEdit />}
        radius="sm"
        size="xs"
        onClick={() => setOpened(true)}
        color="yellow"
      >
        Edit
      </Button>
    </>
  );
};

export default EditCompanyButton;
