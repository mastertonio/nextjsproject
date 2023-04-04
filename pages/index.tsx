import Head from "next/head";
import axios from "axios";
import { NextPage } from "next";
import {
  TextInput,
  Text,
  Button,
  Group,
  PasswordInput,
  useMantineTheme,
  Checkbox,
  LoadingOverlay,
  Paper,
  Title,
} from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { useForm } from "@mantine/form";
import { useStyles } from "../styles/indexStyle";
import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useLocalStorage } from "@mantine/hooks";
import UserContext, { UserContextTypes } from "@context/user.context";
import Image from "next/image";
import { useUserStore } from "@app/store/userState";
import { GetServerSideProps } from "next";
import { redirect } from "next/dist/server/api-utils";
import { getSession, signIn, useSession } from 'next-auth/react';
import { useMutation } from "react-query";

const Home: NextPage = (test) => {
  const { classes } = useStyles();
  const theme = useMantineTheme();
  const { data , status } = useSession()
  const router = useRouter();
  const [loading, setLoading] = useState(false);

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
      const res = await signIn('credentials', {
        email: values.email,
        password: values.password,
        redirect: false,
      })

      console.log(res, 'ress')
      // const payload = {
      //   email: values.email,
      //   password: values.password,
      // };
      // const res = await axios.post(
      //   `/v1/auth/login`,
      //   payload
      // );
      // if (res) {
      //   console.log('res', res);
      //   // userCtx.login(res.data);
      //   // setValue(res.data.tokens.access.token);
      //   // setRefresh(res.data.tokens.refresh.token);
      //   // sessionStorage.setItem("auth-token", value);
      //   // setUserInfo(res.data.user);
      //   // setCurrent(res.data.user.id);
      //   // setCompany(res.data.user.company_id);

      //   // router.push(`/dashboard`);
      //   setUserZ(res.data.user)
      //   setExpire(res.data.tokens.access.expires)
      //   setTokenZ(res.data.tokens.access.token)
      //   // setExpire(res.data.tokens.access.expires)
      //   // setTokenZ(res.data.tokens.access.token)
      //   // if (res.data.user.role == "company-manager") {
      //   //   router.push("/dashboard/manager");
      //   // } else {
      //   //   router.push(`/dashboard`);
      //   // }

      //   router.push(`/dashboard`);
      // }

      // router.push(`/dashboard`);
    } catch (error: any) {

      showNotification({
        title: 'Unauthorized',
        message: 'Incorrect email and password',
        color: 'red',
        styles: () => ({
          root: {
            padding: '15px'
          },
          title: {
            fontSize: '16px',
            fontWeight: 700,
            marginLeft: '5px'
          },
          description: {
            fontSize: '14px',
            fontWeight: 500,
            marginLeft: '5px'
          }
        }),
      })

      return error;
    }
  };

  type UserProp = {
    email: string,
    password: string
  }

  const loginUserMutation = useMutation({
    mutationFn: (values: UserProp) => signIn('credentials', { redirect: false, email: values.email, password: values.password }),
    onSuccess: () => {
      router.push('/dashboard')
    },
    onError: (error: any) => {
      if (error instanceof Error) {
        return error
      }
      return error
    }
  })


  if (loading) return <LoadingOverlay visible={!loading} />;

  return (
    <div className="flex flex-col sm:flex-row h-screen w-full login-auth">
      <div className="w-full sm:w-[35%] 2xl:w-[35%]">
        <Paper className={`${classes.form} p-[30px] md:p-[50px] lg:p-[50px]`} radius={0} p={30}>
          <div>
            <Title
              order={2}
              className={`${classes.title2} text-[22px] sm:text-[26px] mt-[50px] sm:mt-[30px]`}
              align="center"
              mt="xs"
              mb={50}
            >
              The ROI Shop Login
            </Title>

            <form onSubmit={form.onSubmit((values) => loginUserMutation.mutate(values))}>
              <TextInput
                required
                label="Email Address"
                placeholder="your@email.com"
                {...form.getInputProps("email")}
              />

              <PasswordInput
                label="Password"
                placeholder="Password"
                {...form.getInputProps("password")}
                style={{ marginTop: 20 }}
              />

              <Checkbox
                mt="md"
                label="Remember Me"
                {...form.getInputProps("rememberMe", { type: "checkbox" })}
              />

              <Group position="right" className="button-auth mb-[10px]">
                <Button
                  type="submit"
                  style={{ background: theme.fn.radialGradient("#00acac") }}
                  className={classes.button}
                >
                  Sign me in
                </Button>
              </Group>
            </form>
            <div className={classes.forgot_password}>
              <Text className="text-[14px]">© The ROI Shop</Text>
              <Button
                type="button"
                variant="subtle"
                radius="lg"
                onClick={() => router.push("/forgot_password")}
                className="ml-auto"
              >
                Forgot Password
              </Button>
            </div>
          </div>
        </Paper>
      </div>
      <Image src="/login.jpg" alt="bg" height={1000} width={1200} objectFit="cover" />
    </div>
  );
};


export default Home;
