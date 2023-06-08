import { useForm } from "@mantine/form";
import {
  PasswordInput,
  Group,
  Button,
  Box,
  Text,
  Center,
  Progress,
  Stack,
} from "@mantine/core";
import { BsFolderSymlinkFill } from "react-icons/bs";
import axios from "axios";
import { useLocalStorage } from "@mantine/hooks";
import { useState } from "react";
import { showNotification, updateNotification } from "@mantine/notifications";
import { IconCheck, IconX } from "@tabler/icons";
import { useInputState } from "@mantine/hooks";
import { UserDataProp } from "@app/context/user.context";

function PasswordRequirement({
  meets,
  label,
}: {
  meets: boolean;
  label: string;
}) {
  return (
    <Text color={meets ? "teal" : "red"} mt={5} size="sm">
      <Center inline>
        {meets ? (
          <IconCheck size={14} stroke={1.5} />
        ) : (
          <IconX size={14} stroke={1.5} />
        )}
        <Box ml={7}>{label}</Box>
      </Center>
    </Text>
  );
}

const requirements = [
  { re: /[0-9]/, label: "Includes number" },
  { re: /[a-z]/, label: "Includes lowercase letter" },
  { re: /[A-Z]/, label: "Includes uppercase letter" },
  { re: /[$&+,:;=?@#|'<>.^*()%!-]/, label: "Includes special symbol" },
];

function getStrength(password: string) {
  let multiplier = password.length > 5 ? 0 : 1;

  requirements.forEach((requirement) => {
    if (!requirement.re.test(password)) {
      multiplier += 1;
    }
  });

  return Math.max(100 - (100 / (requirements.length + 1)) * multiplier, 0);
}

type ChangePassProps = {
  user: UserDataProp
}

const ChangePass: React.FC<ChangePassProps> = ({ user }) => {
  const [value] = useLocalStorage({ key: "auth-token" });
  const [current, setCurrent] = useLocalStorage({ key: "current-user" });
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [values, setValues] = useInputState("");
  const strength = getStrength(values);
  const checks = requirements.map((requirement, index) => (
    <PasswordRequirement
      key={index}
      label={requirement.label}
      meets={requirement.re.test(values)}
    />
  ));

  const bars = Array(5)
    .fill(0)
    .map((_, index) => (
      <Progress
        styles={{ bar: { transitionDuration: "0ms" } }}
        value={
          values.length > 0 && index === 0
            ? 100
            : strength >= ((index + 1) / 5) * 100
              ? 100
              : 0
        }
        color={strength > 80 ? "teal" : strength > 50 ? "yellow" : "red"}
        key={index}
        size={4}
      />
    ));

  const form = useForm({
    initialValues: {
      confirmPassword: "",
    },
  });

  const handleSubmit = async (values: typeof form.values) => {
    try {
      console.log(values, "inside try")
      showNotification({
        id: "load-pass",
        loading: true,
        title: "Updating your password...",
        message: "Data will be loaded within seconds",
        autoClose: false,

        color: "teal",
      });
      const res = await axios.patch(
        `/v1/users/${user.user.id}`,
        { password: values.confirmPassword }, {
        headers: {
          Authorization: `Bearer ${user.tokens.access.token}`,
        },
      }
      );

      if (res) {
        updateNotification({
          id: "load-pass",
          color: "teal",
          title: "Password was updated!",
          message: "User password updated!",
          icon: <IconCheck size={16} />,
          autoClose: 2500,
        });

        setValues("");
        form.reset();
      }

      form.reset();
      // router.push("/awdwa");
    } catch (error) {
      form.reset();
      setValues("");
      updateNotification({
        id: "load-pass",
        color: "red",
        title: "Update password failed",
        message: "Something went wrong, Please try again",
        autoClose: false,
      });

      
      console.log(error, "inside try")
    }
    return error;
  };

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <div className="mt-[20px] mb-[20px] bg-white p-[20px] rounded-[10px] shadow-lg">
        <Text weight={700} className="text-[30px] text-teal-500">
          Security
        </Text>
        <Stack>
          <div className="grid grid-cols-2 gap-4">
            <div className="gap-1">
              <p className="text-[14px] text-slate-900 mb-[5px] font-semibold">Password</p>
              <PasswordInput
                placeholder="Password"
                value={values}
                onChange={setValues}
                required
                className="w-full"
              // {...form.getInputProps("password")}
              />
            </div>

            <div className="gap-1">
              <p className="text-[14px] text-slate-900 mb-[5px] font-semibold">Confirm Password</p>
              <PasswordInput
                mt="sm"
                placeholder="Confirm password"
                className="w-full mt-0"
                {...form.getInputProps("confirmPassword")}
              />
            </div>
          </div>

          {values ? (
            <>
              <Group spacing={5} grow mt="xs" mb="md">
                {bars}
              </Group>
              <PasswordRequirement
                label="Has at least 8 characters"
                meets={values.length > 7}
              />
              <PasswordRequirement
                label="Matches Confirm Password"
                meets={values == form.values.confirmPassword}
              />
              {checks}
            </>
          ) : (
            ""
          )}

          {error ? <span>{error}</span> : ""}
        </Stack>

        <Group position="right" mt="md" className="mt-[20px]">
          <Button
            leftIcon={<BsFolderSymlinkFill size={14} />}
            className="ml-auto"
            color="teal"
            type="submit"
          >
            Update Password
          </Button>
        </Group>
      </div>
    </form>
  );
};

export default ChangePass;
