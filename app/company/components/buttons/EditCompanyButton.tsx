import { useState } from "react";
import { Modal, Button, Text, TextInput, Grid, Stack } from "@mantine/core";
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
      first_name: "Jason",
      last_name: "Ronda",
      email: "jason.ronda003@gmail.com",
      phone: "09269666992",
    },
  });

  const handleSubmit = async (values: typeof form.values) => {
    console.log(values, 'rarara')
    // try {
    //   showNotification({
    //     id: "edit-row",
    //     loading: true,
    //     title: `Updating ${name}`,
    //     message: "Please wait, updating edited row",
    //     autoClose: false,
    //     disallowClose: true,
    //     color: "teal",
    //   });
    //   const response = await axios.patch(
    //     `http://54.159.8.194/v1/dashboard/roi/${id}/${p.id}`,
    //     { title: values.company },
    //     { headers: { Authorization: `Bearer ${value}` } }
    //   );
    //   if (response) {
    //     refetch();
    //     updateNotification({
    //       id: "edit-row",
    //       color: "teal",
    //       title: `${name} row was updated to ${values.company}`,
    //       message: "A row was updated! and renamed",
    //       icon: <IconCheck size={16} />,
    //       autoClose: 2500,
    //     });
    //   }
    // } catch (error) {
    //   updateNotification({
    //     id: "edit-row",
    //     color: "red",
    //     title: "Updating a table row failed",
    //     message: "Something went wrong, Please try again",
    //     autoClose: false,
    //   });
    //   return error;
    // }
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
                  {...form.getInputProps('company')}
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
                <TextInput
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
              Change ROI Name
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
