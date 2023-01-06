import Head from "next/head";
import axios from "axios";
import {
  TextInput,
  Text,
  Button,
  Group,
  Box,
  PasswordInput,
  Container,
  useMantineTheme,
  Checkbox,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useStyles } from "../styles/indexStyle";
import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { useLocalStorage } from "@mantine/hooks";

const ForgotPassword: React.FC = () => {
  const { classes } = useStyles();
  const theme = useMantineTheme();
  const router = useRouter();
  const [value, setValue] = useLocalStorage({ key: "auth-token" });

  const form = useForm({
    initialValues: {
      email: "",
    },
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email")
    },
  });

  const handleSubmit = async (values: typeof form.values) => {
    try {
      const payload = {
        email: values.email
      };

      const res = await axios.post(
        "/v1/auth/login",
        payload
      );
      if (res) {
        setValue(res.data.tokens.access.token);
        router.push("/");
      }

      // router.push("/awdwa");
    } catch (error) {
      return error;
    }
  };


  return (
    <div
      className={classes.body}
      style={{ background: theme.fn.radialGradient("teal", "#00acac") }}
    >
      <Head>
        <title>The ROI Shop Forgot Password</title>
      </Head>
      <Container size="xs" px="xs" className={classes.wrapper}>
        <Text weight={500} className={classes.title}>
          Forgot Password
        </Text>
        <Box sx={{ width: 500, height: "45%" }} mx="md">
          <form onSubmit={form.onSubmit(handleSubmit)}>
            <TextInput
              required
              label="Email"
              placeholder="your@email.com"
              {...form.getInputProps("email")}
            />

            <Group position="right" mt="xs">
              <Button
                type="submit"
                style={{ background: theme.fn.radialGradient("#00acac") }}
                className={classes.button}
              >
                Send Email Verification
              </Button>
            </Group>
          </form>
        </Box>
        <div className={classes.forgot_password}>
          <Text>© The ROI Shop</Text>
          <Button variant="subtle" radius="lg" onClick={()=>(router.push('/'))}>
            Login
          </Button>
        </div>
      </Container>
    </div>
  );
};

export default ForgotPassword;
