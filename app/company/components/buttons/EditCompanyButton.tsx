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
import { UserDataProp } from "@app/context/user.context";

export interface IButtonCompanyProps {
  id: string;
  refetch: () => void;
  name: string;
  myCompany: ICompanyProps;
  user: UserDataProp
}

const EditCompanyButton: React.FC<IButtonCompanyProps> = ({
  id,
  refetch,
  name,
  myCompany,
  user
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
        }, {
          headers: {
            Authorization: `Bearer ${user.tokens.access.token}`,
          },
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
          className="p-[30px] text-[30px] !bg-[#073e52] text-white"
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
              className="ml-[30px] mr-[30px] mt-[30px] mb-[15px]"
            >
              <div>
                <Text>Company Name: </Text>
                <TextInput
                  required
                  className="w-[350px] ml-auto"
                  // defaultValue={myCompany.name}
                  placeholder="New Title Name"
                  {...form.getInputProps("company")}
                />
              </div>
              <div className="ml-auto">
                <Text>Company Alias: </Text>
                <TextInput
                  required
                  className="w-[350px] ml-auto"
                  // defaultValue={myCompany.alias}
                  placeholder="Company Alias"
                  {...form.getInputProps("alias")}
                />
              </div>
            </Grid>
            <Grid className="ml-[30px] mr-[30px]">
              <div>
                <Text>Licenses: </Text>
                <NumberInput
                  required
                  className="w-[350px] ml-auto"
                  // defaultValue={myCompany.licenses}
                  placeholder="New Title Name"
                  {...form.getInputProps("licenses")}
                />
              </div>
            </Grid>
            <Text align="center" className="mt-[30px]" weight={700}>
              Account Contact
            </Text>
            <Grid className="ml-[30px] mr-[30px] mb-[30px]">
              <div>
                <Text>First Name: </Text>
                <TextInput
                  required
                  className="w-[350px] ml-auto"
                  // defaultValue="Jason"
                  placeholder="First Name"
                  {...form.getInputProps("first_name")}
                />
              </div>
              <div className="ml-auto">
                <Text>Last Name: </Text>
                <TextInput
                  required
                  className="w-[350px] ml-auto"
                  // defaultValue="Ronda"
                  placeholder="Last Name"
                  {...form.getInputProps("last_name")}
                />
              </div>
            </Grid>
            <Grid className="ml-[30px] mr-[30px] mb-[80px]">
              <div>
                <Text>Email: </Text>
                <TextInput
                  required
                  className="w-[350px] ml-auto"
                  placeholder="Email Address"
                  // defaultValue="jason.ronda003@gmail.com"
                  {...form.getInputProps("email")}
                />
              </div>
              <div className="ml-auto">
                <Text>Contact Number: </Text>
                <TextInput
                  required
                  className="w-[350px] ml-auto"
                  // defaultValue="09269666992"
                  placeholder="Phone Number"
                  {...form.getInputProps("phone")}
                />
              </div>
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
              Edit Company
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
        leftIcon={<AiOutlineEdit />}
        radius="sm"
        size="xs"
        onClick={() => setOpened(true)}
        color="blue"
      >
        Edit
      </Button>
    </>
  );
};

export default EditCompanyButton;
