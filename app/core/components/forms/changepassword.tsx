import { useForm } from "@mantine/form";
import {
  PasswordInput,
  Group,
  Button,
  Box,
  Text,
  Center,
  Progress,
} from "@mantine/core";
import { BsFolderSymlinkFill } from "react-icons/bs";
import axios from "axios";
import { useLocalStorage } from "@mantine/hooks";
import { useState } from "react";
import { showNotification, updateNotification } from "@mantine/notifications";
import { IconCheck, IconX } from "@tabler/icons";
import { useInputState } from "@mantine/hooks";

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

const ChangePass: React.FC = () => {
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
      showNotification({
        id: "load-pass",
        loading: true,
        title: "Updating your password...",
        message: "Data will be loaded within seconds",
        autoClose: false,
        disallowClose: true,
        color: "teal",
      });
      const res = await axios.patch(
        `/v1/users/${current}`,
        { password: values.confirmPassword }
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
    }
    return error;
  };

  return (
    <Box
      sx={{
        maxWidth: "full",
        margin: 5,
        padding: 20,
        backgroundColor: "white",
        borderRadius: 10,
      }}
      mx="auto"
    >
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <PasswordInput
          label="Password"
          placeholder="Password"
          value={values}
          onChange={setValues}
          required
          // {...form.getInputProps("password")}
        />

        <PasswordInput
          mt="sm"
          label="Confirm password"
          placeholder="Confirm password"
          {...form.getInputProps("confirmPassword")}
        />
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
        <Group position="right" mt="md">
          <Button
            leftIcon={<BsFolderSymlinkFill size={14} />}
            color="teal"
            type="submit"
          >
            Update Password
          </Button>
        </Group>
      </form>
    </Box>
  );
};

export default ChangePass;
