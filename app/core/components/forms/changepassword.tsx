import { useForm } from "@mantine/form";
import { PasswordInput, Group, Button, Box } from "@mantine/core";
import { BsFolderSymlinkFill } from "react-icons/bs";
import axios from "axios";
import { useLocalStorage } from "@mantine/hooks";
import { useState } from "react";

const ChangePass: React.FC = () => {
  const [value] = useLocalStorage({ key: "auth-token" });
  const [current, setCurrent] = useLocalStorage({ key: "current-user" });
  const [error, setError] = useState('')

  const form = useForm({
    initialValues: {
      password: "",
      confirmPassword: "",
    },

    validate: {
      confirmPassword: (value, values) =>
        value !== values.password ? "Passwords did not match" : null,
    },
  });

  const handleSubmit = async (values: typeof form.values) => {
    try {
      if (values.password == values.confirmPassword) {
        const res = await axios.post(
          "http://54.159.8.194/v1/auth/reset-password",
          { password: values.confirmPassword },
          {
            headers: {
              Authorization: `Bearer ${value}`,
            },
          }
        );

        if (res) {
          console.log(res);
        }
      }

      // router.push("/awdwa");
    } catch (error) {
      setError('Something went wrong')
    }
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
          {...form.getInputProps("password")}
        />

        <PasswordInput
          mt="sm"
          label="Confirm password"
          placeholder="Confirm password"
          {...form.getInputProps("confirmPassword")}
        />
        { error ? (<span>{error}</span>) : '' }
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
