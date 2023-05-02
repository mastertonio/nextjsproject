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
// import * as formulajs from '@formulajs/formulajs';

import RoiNavbar from "@core/components/navbar/Navbar";
import TemplateSpecifics from "@app/admin/components/TemplateSpecifics";
import Sections from "@app/admin/components/Sections";
import { useRouter } from "next/router";
import { UserState, useUserStore } from "@app/store/userState";
import { useForm } from "react-hook-form";
import { getSession } from "next-auth/react";


const AdminBuilder: React.FC<any> = (login) => {
    const router = useRouter();
    const theme = useMantineTheme();
    const { classes } = useStyles();
    const userZ = useUserStore((state) => (state.user))
    const FormulaParser = require('hot-formula-parser').Parser
    const parser = new FormulaParser()

    // console.log(parser);
    const { register, handleSubmit, formState: { errors } } = useForm();

    const arr = [
        { id: "ad", name: "jasonform1" },
        { id: "adc", name: "jasonform2" },
    ]

    // const test1 = parser.parse('5 * 12 * ( 2 + 4 ) / 60').result
    // console.log('5 * 12 * ( 2 + 4 ) / 60', test1)

    const [total, setTotal] = useState(0)

    const onSubmit = (data: any) => {
        const test = parser.parse(`SUM(${+data.jasonform1}, ${+data.jasonform2})`)
        setTotal(test.result)
    };

    return (
        <AppShell
            styles={{
                main: {
                    background: "#d5dbe0"
                    // background:
                    //   theme.colorScheme === "dark"
                    //     ? theme.colors.dark[8]
                    //     : theme.colors.gray[0],
                },
            }}
            navbarOffsetBreakpoint="sm"
            asideOffsetBreakpoint="sm"
            className="p-0 m-0"
            fixed
            header={<RoiNavbar user={login.data.user.user} tokens={login.data.user.tokens} />}
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
                        {/* <Cell /> */}
                        <input type="submit" />
                    </div>
                </form>
                <h1>{total}</h1>
            </div>
        </AppShell>
    );
};

export async function getServerSideProps(ctx: any) {
    const session = await getSession({ req: ctx.req });
    if (!session) {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            },
        };
    }
    // Pass data to the page via props
    return { props: { data: session } }
}


export default AdminBuilder;
