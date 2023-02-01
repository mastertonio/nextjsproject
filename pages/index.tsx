import Head from "next/head";
import axios from "axios";
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

const Home: React.FC = () => {
  const { classes } = useStyles();
  const theme = useMantineTheme();
  const router = useRouter();
  const [value, setValue] = useLocalStorage({ key: "auth-token" });
  const [refresh, setRefresh] = useLocalStorage({ key: "refresh-token" });
  const [current, setCurrent] = useLocalStorage({ key: "current-user" });
  const [userInfo, setUserInfo] = useLocalStorage({ key: "user-info" });
  const [company, setCompany] = useLocalStorage({ key: "my-company" });
  const [loading, setLoading] = useState(false);
  const userCtx = useContext(UserContext);


  const setUserZ = useUserStore((state) => (state.login))
  const setExpire = useUserStore((state) => (state.setExpires))
  const setTokenZ = useUserStore((state) => (state.setToken))

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
        `/v1/auth/login`,
        payload
      );
      console.log('res2', res.data.tokens.access.expires)
      if (res) {
        console.log('res', res);
        // userCtx.login(res.data);
        // setValue(res.data.tokens.access.token);
        // setRefresh(res.data.tokens.refresh.token);
        // sessionStorage.setItem("auth-token", value);
        // setUserInfo(res.data.user);
        // setCurrent(res.data.user.id);
        // setCompany(res.data.user.company_id);

        // router.push(`/dashboard`);
        setUserZ(res.data.user)
        setExpire(res.data.tokens.access.expires)
        setTokenZ(res.data.tokens.access.token)
        // setExpire(res.data.tokens.access.expires)
        // setTokenZ(res.data.tokens.access.token)
        // if (res.data.user.role == "company-manager") {
        //   router.push("/dashboard/manager");
        // } else {
        //   router.push(`/dashboard`);
        // }

        router.push(`/dashboard`);
      }

      router.push(`/dashboard`);
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


  if (loading) return <LoadingOverlay visible={!loading} />;

  return (
    <div className={classes.wrapper2}>
      <Paper className={`${classes.form} p-[30px] md:p-[50px] lg:p-[50px]`} radius={0} p={30}>
        <div
          className="flex justify-center items-center"
        >
          {/* <div
            style={{
              position: 'relative',
              marginTop: 5,
              width: '50%',
            }}
          >
            <Image layout="fill" objectFit="contain" src="/logo.png" alt="random" />
          </div> */}
        </div>
        <Title
          order={2}
          className={`${classes.title2} text-[22px] sm:text-[26px] mt-[50px] sm:mt-[30px]`}
          align="center"
          mt="xs"
          mb={50}
        >
          The ROI Shop Login
        </Title>

        <form onSubmit={form.onSubmit(handleSubmit)}>
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

          <Group position="right" style={{ marginBottom: 10 }}>
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
            variant="subtle"
            radius="lg"
            onClick={() => router.push("/forgot_password")}
            className="ml-auto"
          >
            Forgot Password
          </Button>
        </div>
      </Paper>
    </div>
  );
};

// export const getServerSideProps: GetServerSideProps = async (context) => {
//   // const data = 'from gssp'
//   const cookies = context.req.cookies
//   const res = await fetch(`${process.env.NEXT_DEV_PORT}/v1/auth/current`, {
//     headers: {
//       'Cookie': "session=" + cookies.session + ";session.sig=" + cookies['session.sig'] + ";x-access-token=" + cookies['x-access-token']
//     }
//   })
//   const user = await res.json();


//   // if (Object.keys(user).length === 0 && user.constructor === Object) {
//   // redirect to dashboard page if authenticated
//   return {
//     props: { user }
//   }

//   // return { props: { user } }
// }

export default Home;
