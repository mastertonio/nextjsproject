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
  PasswordInput,
  Select,
  MultiSelect,
  Progress,
  Popover,
  Box
} from "@mantine/core";
import * as Yup from "yup";
import { useForm, yupResolver } from "@mantine/form";
import { AiFillPlusCircle, AiOutlineEdit } from "react-icons/ai";
import axios from "axios";
import { useLocalStorage } from "@mantine/hooks";
import { useRouter } from "next/router";
import { showNotification, updateNotification } from "@mantine/notifications";
import { IconCheck, IconX } from "@tabler/icons";
import { ICompanyProps } from "@app/dashboard/components/table/utils/tableMethods";
import { DatePicker } from "@mantine/dates";
import dayjs from "dayjs";
import { useQuery, useQueryClient } from "react-query";
import { useUserStore } from "@app/store/userState";
import { getSession } from "next-auth/react";
import { UserDataProp, UserAddComp } from "@app/context/user.context";

export interface IButtonAddCompanyProps {
  refetch: () => void;
}

function PasswordRequirement({ meets, label }: { meets: boolean; label: string }) {
  return (
    <Text
      color={meets ? 'teal' : 'red'}
      sx={{ display: 'flex', alignItems: 'center' }}
      mt={7}
      size="sm"
    >
      {meets ? <IconCheck size="0.9rem" /> : <IconX size="0.9rem" />} <Box ml={10}>{label}</Box>
    </Text>
  );
}

const requirements = [
  { re: /[0-9]/, label: 'Includes number' },
  { re: /[a-z]/, label: 'Includes lowercase letter' },
  { re: /[A-Z]/, label: 'Includes uppercase letter' },
  // { re: /[$&+,:;=?@#|'<>.^*()%!-]/, label: 'Includes special symbol' },
];

function getStrength(password: string) {
  let multiplier = password.length > 5 ? 0 : 1;

  requirements.forEach((requirement) => {
    if (!requirement.re.test(password)) {
      multiplier += 1;
    }
  });

  return Math.max(100 - (100 / (requirements.length + 1)) * multiplier, 10);
}

const AddCompanyUserButton: React.FC<Partial<UserAddComp>> = ({ tokens, user, myCompany, refetch }) => {
  const [opened, setOpened] = useState(false);
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [endDate, setEndDate] = useState<Date | null>(new Date());
  const [state, setState] = useState();
  const [currency, setCurrency] = useState<string | null>(null);
  const [saveAdd, setSaveAdd] = useState<boolean>(false);
  const queryClient = useQueryClient()
  const [popoverOpened, setPopoverOpened] = useState(false);
  const [value, setValue] = useState('');
  const checks = requirements.map((requirement, index) => (
    <PasswordRequirement key={index} label={requirement.label} meets={requirement.re.test(value)} />
  ));
  const strength = getStrength(value);
  const color = strength === 100 ? 'teal' : strength > 50 ? 'yellow' : 'red';

  const userZ = useUserStore((state) => (state.user))

  const schema = Yup.object({
    first_name: Yup.string().required('This field is required'),
    last_name: Yup.string().required('This field is required'),
    password: value === "" ? Yup.string().required('This field is required') : Yup.string().nullable(),
    email: Yup.string().email("Invalid Email").required('This field is required'),
    currency: Yup.string().required('This field is required'),
    role: Yup.string().required('This field is required'),
  })

  const getManagers = async () => {
    return await axios.get(
      `/v1/company/${router.query.comp_id}/manager`, {
      headers: {
        Authorization: `Bearer ${tokens?.access.token}`,
      },
    }
    );
  };

  const getTemplates = async () => {
    return await axios.get(
      `/v1/company/${router.query.comp_id}/template`, {
      headers: {
        Authorization: `Bearer ${tokens?.access.token}`,
      }
    }
    );
  };

  const { isLoading, isError, error, data, isFetching } = useQuery(
    "get_add_Managers",
    getManagers
  );

  const templates = useQuery(["templates"], getTemplates);
  console.log("templates.data", templates.data)
  // const templateList = templates?.data?.data
  //   ?.map((a: { name: string; build: any }) => {
  //     return a?.build?.map(
  //       (b: { _id: string; name: string }) => ({
  //         key: b._id,
  //         value: b._id,
  //         label: b.name
  //       })
  //     );
  //   })
  //   .flat();

  const templateList = templates?.data?.data
    ?.map((a: { _id: string; name: string }) => {
      return {
        key: a._id,
        value: a._id,
        label: a.name
      }
    }
    )

  console.log("templateList", templateList)

  // const templateList2 = templates?.data?.data
  //   ?.map((a: { name: string; build: any }) => {
  //     return a?.build?.map(
  //       (b: { _id: string; name: string; group: string }) => ({
  //         key: b._id,
  //         value: b._id,
  //         label: b.name,
  //         group: a.name,
  //       })
  //     );
  //   })
  //   .flat();

  // const defaultTemps = templateList?.map((a: { value: any }) => {
  //   return a.value;
  // });

  const [filter, setFilter] = useState<string[]>([""]);

  const transferlist = data?.data.map((item: { id: string; email: string }) => ({
    key: item.id,
    value: item.id,
    label: item.email,
  }));

  console.log('transfer list', data)

  const form = useForm({
    initialValues: {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      currency: "",
      manager: "",
      role: "",
    }, validate: yupResolver(schema)
  });

  const handleSubmit = async (values: typeof form.values) => {
    try {
      showNotification({
        id: "edit-comp",
        loading: true,
        title: `Updating`,
        message: "Please wait, updating edited row",
        autoClose: false,

        color: "teal",
      });
      const response = await axios.post(
        `/v1/company/${router.query.comp_id}/user`,
        {
          first_name: values.first_name,
          last_name: values.last_name,
          email: values.email,
          password: values.password,
          currency: values.currency,
          manager: values.manager,
          role: values.role,
          template: filter,
        }, {
        headers: {
          Authorization: `Bearer ${tokens?.access.token}`,
        },
      });
      if (response) {
        Promise.all(
          [
            queryClient.invalidateQueries({ queryKey: ['get_all_company_users'] }),
            queryClient.invalidateQueries({ queryKey: ['license'] }),
            queryClient.invalidateQueries({ queryKey: ['get_all_company_users_with_templates'] }),
            queryClient.invalidateQueries({ queryKey: ['get_specific_company_users'] }),
          ]
        )
        updateNotification({
          id: "edit-comp",
          color: "teal",
          title: `row was updated to `,
          message: "A row was updated! and renamed",
          icon: <IconCheck size={16} />,
          autoClose: 2500,
        });
        form.reset();
        setValue('')
        setFile(null);
        setStartDate(null);
        setEndDate(null);
      }

      if (saveAdd === true) {
        form.setValues({
          first_name: "",
          last_name: "",
          email: "",
          password: "",
          currency: form.values.currency,
          manager: form.values.manager,
          role: form.values.role,
        })
      } else {
        form.reset();
        setValue('')
      }
      setOpened(false)
    } catch (error: any) {
      console.log('submitted error', error?.response)
      updateNotification({
        id: "edit-comp",
        color: "red",
        title: "Updating a table row failed",
        message: `${error?.response?.data?.code == 422 ? 'Email is already exist' : 'Something went wrong, Please try again'}`,
        autoClose: false,
      });
      return error;
    }
  };

  const rolesData = [
    { label: 'Manager/Director', value: '3' },
    { label: 'End User', value: '4' },
    { label: 'Admin', value: '2' },
  ]

  const curData = [
    {
      label: "USD",
      value: "USD",
    },
    {
      label: "PHP",
      value: "PHP",
    },
    {
      label: "EUR",
      value: "EUR",
    },
    {
      label: "JPY",
      value: "JPY",
    },
    {
      label: "GBP",
      value: "GBP",
    },
    {
      label: "AUD",
      value: "AUD",
    },
    {
      label: "CAD",
      value: "CAD",
    },
    {
      label: "CHF",
      value: "CHF",
    },
    {
      label: "CNY",
      value: "CNY",
    },
  ];

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
          Add Company User
        </Text>

        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Stack
            justify="flex-start"
            sx={(theme) => ({
              backgroundColor:
                theme.colorScheme === "dark"
                  ? theme.colors.dark[8]
                  : theme.colors.gray[0],
              height: 640,
            })}
          >
            <Grid
              className="ml-[30px] mr-[30px] mt-[30px] mb-[15px]"
            >
              <Text>Email: <span className="text-[#fa5252]">*</span> </Text>
              <TextInput
                withAsterisk
                // required
                className="w-[550px] ml-auto"
                placeholder=""
                {...form.getInputProps("email")}
              />
            </Grid>
            <Grid
              className="ml-[30px] mr-[30px] mb-[15px]"
            >
              <Text>Password: <span className="text-[#fa5252]">*</span> </Text>
              <div className="w-[550px] ml-auto">
                <Popover opened={popoverOpened} position="bottom" width="target">
                  <Popover.Target>
                    <div
                      onFocusCapture={() => setPopoverOpened(true)}
                      onBlurCapture={() => setPopoverOpened(false)}
                    >
                      <PasswordInput
                        // required
                        withAsterisk
                        placeholder=""
                        description="Password must include at least one letter, number and special character"
                        {...form.getInputProps("password")}
                        value={value}
                        // error={value === "" ? "This field is required" : null}
                        onChange={(event) => setValue(event.currentTarget.value)}
                      />
                    </div>
                  </Popover.Target>
                  <Popover.Dropdown>
                    <Progress color={color} value={strength} size={5} mb="xs" />
                    <PasswordRequirement label="Includes at least 6 characters" meets={value.length > 5} />
                    {checks}
                  </Popover.Dropdown>
                </Popover>
              </div>
            </Grid>
            <Grid
              className="ml-[30px] mr-[30px] mb-[15px]"
            >
              <Text>First Name: <span className="text-[#fa5252]">*</span> </Text>
              <TextInput
                withAsterisk
                // required
                className="w-[550px] ml-auto"
                placeholder=""
                {...form.getInputProps("first_name")}
              />
            </Grid>
            <Grid
              className="ml-[30px] mr-[30px] mb-[15px]"
            >
              <Text>Last Name: <span className="text-[#fa5252]">*</span></Text>
              <TextInput
                withAsterisk
                // required
                className="w-[550px] ml-auto"
                placeholder=""
                {...form.getInputProps("last_name")}
              />
            </Grid>
            <Grid
              className="ml-[30px] mr-[30px] mb-[15px]"
            >
              <Text>Currency: <span className="text-[#fa5252]">*</span></Text>
              <Select
                withAsterisk
                defaultValue={currency}
                data={curData}
                placeholder="Choose Currency"
                {...form.getInputProps("currency")}
                className="w-[550px] ml-auto"
              // required
              />
            </Grid>
            <Grid
              className="ml-[30px] mr-[30px] mb-[15px]"
            >
              <Text>Role: <span className="text-[#fa5252]">*</span></Text>
              <Select
                withAsterisk
                data={rolesData}
                placeholder="Choose Role"
                {...form.getInputProps("role")}
                className="w-[550px] ml-auto"
              // required
              />
              {/* <TextInput
                required
                style={{ width: 550, marginLeft: "auto" }}
                placeholder="Choose Role"
                {...form.getInputProps("role")}
              /> */}
            </Grid>
            <Grid
              className="ml-[30px] mr-[30px] mb-[15px]"
            >
              <Text>Select Manager: </Text>
              <Select
                placeholder=""
                className="w-[550px] ml-auto"
                defaultValue={state}
                data={transferlist?.length > 0 ? transferlist : []}
                {...form.getInputProps("manager")}
              />
            </Grid>

            <Grid className="ml-[30px] mr-[30px] mt-[10px]">
              <Text>Templates: </Text>
              <MultiSelect
                className="w-[550px] ml-auto"
                placeholder="Choose Templates"
                searchable
                // clearable
                data={templateList ?? []}
                // defaultValue={templateList?.map((a: { value: string; }) => a.value)}
                // value={filter}
                styles={{ input: { overflow: 'auto', maxHeight: 120 } }}
                onChange={setFilter}
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
              onClick={() => {
                setSaveAdd(true)
              }}
            >
              Save and Add
            </Button>
            <Button
              type="submit"
              radius="sm"
              size="sm"
              color="teal"
              className="mr-[10px]"
            // onClick={() => setOpened(false)}
            >
              Save User
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
        Add User
      </Button>
    </>
  );
};

export default AddCompanyUserButton;
