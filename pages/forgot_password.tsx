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
  Image
} from "@mantine/core";
import { IconLock } from '@tabler/icons'
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
      className={`${classes.body} m-0 bg-[url('/bg.jpg')] bg-cover h-screen`}
    // style={{ background: theme.fn.radialGradient("teal", "#00acac") }}
    >
      <Head>
        <title>The ROI Shop Forgot Password</title>
      </Head>
      <div className="flex flex-row">
        <div className="grid grid-cols-1 md:grid-cols-1 xl:grid-cols-2 gap-40 items-center">
          <div className="text-center block order-last xl:order-1">
            <Image src="/forgot.png" alt="forgot" width={500} height="auto" />
          </div>
          <div className="order-1 block  xl:order-1">
            <Container size="xs" px="xs" className={`flex flex-col items-center justify-center m-w-[100px] w-full h-[450px] bg-white p-[30px] rounded-lg shadow-lg border-0`}>
              <Text className={`${classes.title} text-[30px] font-bold text-[#134e4a] flex flex-row items-center`}>
                <IconLock size={30} stroke={2.5} />
                <span className="ml-[10px]">Forgot Password</span>
              </Text>
              <Box sx={{ width: 400, height: "45%" }} className="mt-[20px] mb-[30px]">
                <form onSubmit={form.onSubmit(handleSubmit)}>
                  <Text className="text-[16px] font-semibold mb-[20px]">Email Address</Text>
                  <TextInput
                    required
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
                <Text className="text-[15px] font-semibold">© The ROI Shop</Text>
                <Button type="button" variant="subtle" radius="lg" onClick={() => (router.push('/'))} className="text-[15px] font-semibold">
                  Login
                </Button>
              </div>
            </Container>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
