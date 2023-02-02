import React, { useContext, useEffect, useState } from "react";
import {
  AppShell,
  useMantineTheme,
  LoadingOverlay,
  Text,
  Loader,
} from "@mantine/core";
import { useStyles } from "@styles/dashboardStyle";
import axios from "axios";
import { useQuery } from "react-query";

import RoiNavbar from "@core/components/navbar/Navbar";
import TemplateSpecifics from "@app/admin/components/TemplateSpecifics";
import Sections from "@app/admin/components/Sections";
import { useRouter } from "next/router";
import { UserState, useUserStore } from "@app/store/userState";
import { useForm } from "react-hook-form";


const AdminBuilder: React.FC<UserState> = () => {
  const router = useRouter();
  const theme = useMantineTheme();
  const { classes } = useStyles();
  const userZ = useUserStore((state) => (state.user))
  const FormulaParser = require('hot-formula-parser').Parser
  const parser = new FormulaParser()

  
  const { register, handleSubmit, formState: { errors } } = useForm();
  

  const arr = [
    { id: "ad", name: "jasonform1" },
    { id: "adc", name: "jasonform2" },
  ]

  const test1 = parser.parse('5 * 12 * ( 2 + 4 ) / 60').result
  console.log('5 * 12 * ( 2 + 4 ) / 60', test1)

  const test2 = parser.parse('ROUNDDOWN(1512*0.3, 0)').result
  console.log('ROUNDDOWN(1512*0.3, 0)', test2)

  const test3 = parser.parse('MAX( IF( 4 < 7, 8, 0 ), 12 )').result
  console.log('MAX( IF( 4 < 7, 8, 0 ), 12 )', test3)

  const test4 = parser.parse('IF( 1 = 1, ( 5 * 12 ), 0 )').result
  console.log('IF( 1 = 1, ( 5 * 12 ), 0 )', test4)

  const test5 = parser.parse('4+5').result
  console.log('4+5', test5)

  const test6 = parser.parse('SUM(4,5,6,9,11,13)').result
  console.log('SUM(4,5,6,9,11,13)', test6)

  const [total, setTotal] = useState(0)

  const onSubmit = (data: any) => {
    const test = parser.parse(`SUM(${+data.jasonform1}, ${+data.jasonform2})`)
    setTotal(test.result)
  };

  return (
    <AppShell
      styles={{
        main: {
          background:
            theme.colorScheme === "dark"
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
        },
      }}
      navbarOffsetBreakpoint="sm"
      asideOffsetBreakpoint="sm"
      className="p-0 m-0"
      fixed
      header={<RoiNavbar />}
    >
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col sm:flex-row">
            <label htmlFor="name">Name</label>
            {arr.map((ar) => (
              <input type="number" key={ar.id} id={ar.id} {...register(ar.name, { required: true, maxLength: 30 })} />
            ))}
            {/* <input id="name" {...register('name', { required: true, maxLength: 30 })} /> */}
            {errors.name && errors.name.type === "required" && <span>This is required</span>}
            {errors.name && errors.name.type === "maxLength" && <span>Max length exceeded</span>}
            <input type="submit" />
          </div>
        </form>
        <h1>{total}</h1>
      </div>
    </AppShell>
  );
};

export default AdminBuilder;
