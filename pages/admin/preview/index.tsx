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

  const { register, handleSubmit, formState: { errors } } = useForm();


  interface MemoizedFact {
    [index: number]: number;
  }

  const cells = [{
    address: 'A1',
    forcedValue: '',
    format: '0,0',
    formula: null,
    label: 'This is the first input',
    value: 10,
  },{
    address: 'A2',
    forcedValue: '',
    format: '0,0%',
    formula: null,
    label: 'This is the second input',
    value: 30,
  },{
    address: 'A3',
    forcedValue: '',
    format: '$0,0',
    formula: 'A1 * A2 * 45.8',
    label: 'This is the first calculation',
    value: 10,
  },{
    address: 'A4',
    forcedValue: '',
    format: '',
    formula: 'SUM(45,56,23,11)',
    label: 'This is the first calculation',
    value: 10,
  },{
    address: 'A5',
    forcedValue: '',
    format: '',
    formula: 'SUM(A1, A3, A4)',
    label: 'This is the first calculation',
    value: 0,
  }]

  //let sheets = new (sheet as any)(cells);

  // console.log(sheets);
  // console.log(sheets.parser.parse('5 * 12 * ( 2 + 4 ) / 60'));

  const arr = [
    { id: "ad", name: "jasonform1" },
    { id: "adc", name: "jasonform2" },
  ]

  const [total, setTotal] = useState(0)

  const onSubmit = (data: any) => {
    // const test = parser.parse(`SUM(${+data.jasonform1}, ${+data.jasonform2})`)
    //setTotal(test.result)
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
