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
import { useUser } from "../app/context/jwtContext";
import { useLocalStorage } from '@mantine/hooks';

const Home: React.FC = () => {
  const { classes } = useStyles();
  const theme = useMantineTheme();
  const router = useRouter();
  const { state, dispatch } = useUser();
  const [value, setValue] = useLocalStorage({ key: 'auth-token' });

  const form = useForm({
    initialValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      password: (value) =>
        value.length > 8 ? null : "Passwords must be atleast 8 elements",
    },
  });

  const handleSubmit = async (values: typeof form.values) => {
    try {
      const payload = {
        email: values.email,
        password: values.password,
      };

      const res = await axios.post(
        "http://54.159.8.194/v1/auth/login",
        payload
      );
      if (res) {
        console.log(res);
        console.log(res.data.tokens.access.token,"res.data.tokens.access.token");
        setValue(res.data.tokens.access.token)
        dispatch({
          type: "LOAD_TOKEN",
          token: value,
        });
        router.push("/dashboard");
      }

      // router.push("/awdwa");
    } catch (error) {
      return error;
    }
  };

  useEffect(() => {
    console.log(state, "test1");
  }, [state]);

  return (
    <div
      className={classes.body}
      style={{ background: theme.fn.radialGradient("teal", "#00acac") }}
    >
      <Head>
        <title>The ROI Shop Login</title>
      </Head>
      <Container size="xs" px="xs" className={classes.wrapper}>
        <Text weight={500} className={classes.title}>
          The ROI Shop Login
        </Text>
        <Box sx={{ width: 500, height: "100%" }} mx="md">
          <form onSubmit={form.onSubmit(handleSubmit)}>
            <TextInput
              required
              label="Email"
              placeholder="your@email.com"
              {...form.getInputProps("email")}
            />

            <PasswordInput
              label="Password"
              placeholder="Password"
              {...form.getInputProps("password")}
            />

            <Checkbox
              mt="md"
              label="Remember Me"
              {...form.getInputProps("rememberMe", { type: "checkbox" })}
            />

            <Group position="right" mt="md">
              <Button
                type="submit"
                style={{ background: theme.fn.radialGradient("#00acac") }}
                className={classes.button}
              >
                Sign me in
              </Button>
            </Group>
          </form>
        </Box>
        <Text className={classes.login_footer}>© The ROI Shop</Text>
      </Container>
    </div>
  );
};

export default Home;
