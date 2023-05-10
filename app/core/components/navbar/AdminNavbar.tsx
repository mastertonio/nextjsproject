import axios from "axios";
import {
    useMantineTheme,
    Burger,
    Header,
    MediaQuery,
    Group,
    Button,
} from "@mantine/core";
import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useStyles } from "@styles/navStyle";
import AdminList, { IAdminListProps } from "./components/AdminList";
import PoweredByRoi from "./components/PoweredByRoi";
import ActionList from "./components/ActionList";
import Drawer from 'react-modern-drawer'
import 'react-modern-drawer/dist/index.css'
import DashboardDrawer from "../drawer/DrawerContent";
import { useLocalStorage } from "@mantine/hooks";
import { useQuery } from "react-query";
import UserContext, { UserContextTypes, UserDataProp } from "@context/user.context";
import Link from 'next/link';
import { UserState, useUserStore } from "@app/store/userState";
import { GetServerSideProps } from "next";

export interface AdminDataProp {
    user: UserContextTypes
    tokens: {
        access: {
            token: string,
            expires: string
        },
        refresh: {
            token: string,
            expires: string
        }
    }
    templateID?: string | any
    id?: string | any
}

const AdminNavbar: React.FC<AdminDataProp> = ({ user, tokens, templateID, id }) => {
    const theme = useMantineTheme();
    const router = useRouter();
    const { classes } = useStyles();
    const [opened, setOpened] = useState(false);
    const [isOpen, setIsOpen] = React.useState(false)
    const toggleDrawer = () => {
        setIsOpen((prevState) => !prevState)
    }

    const handleLinkClick = (e: any) => {
        e.preventDefault();
        window.open(e.target.href, '_blank');
    };

    return (
        <Header height={opened === true ? 220 : 70} p="md" className={`${classes.header} flex-col sm:flex-row`}>
            <MediaQuery largerThan="sm" styles={{ display: "none" }}>
                <Burger
                    opened={opened}
                    onClick={() => setOpened((o) => !o)}
                    size="sm"
                    color={theme.colors.gray[5]}
                    mr="xl"
                />
            </MediaQuery>
            <div className="ml-auto sm:ml-[unset] mt-[-30px] sm:mt-0">
                <Drawer
                    open={isOpen}
                    onClose={toggleDrawer}
                    direction='left'
                    className="!bg-[#2f4050] !p-[20px]"
                >
                    <DashboardDrawer user={user} tokens={tokens} />
                </Drawer>
                <Button
                    type="button"
                    className="mr-auto !bg-[#00acac]"
                    onClick={toggleDrawer}
                >
                    Navigate
                </Button>
            </div>
            {/* {router.route.includes("dashboard") && user?.role == "admin" || user?.role == "company-admin" || user?.role == "company-manager" ? (
        <div>
          <Drawer
            open={isOpen}
            onClose={toggleDrawer}
            direction='left'
            style={{ backgroundColor: '#2f4050', padding: 20 }}
          >
            <DashboardDrawer user={user} />
          </Drawer>
          <Button
            type="button"
            style={{ marginRight: "auto", backgroundColor: '#00acac' }}
            onClick={toggleDrawer}
          >
            Navigate
          </Button>
        </div>

      ) : (
        ""
      )} */}
            {router.route.includes("dashboard/manager") && user?.role == "company-manager" ? (
                <div className="ml-[10px]">
                    <Button
                        type="button"
                        className="mr-auto"
                        onClick={() => router.push('/dashboard')}
                    >
                        Main Dashboard
                    </Button>
                </div>

            ) : (
                ""
            )}
            {router.route == "/dashboard" && user?.role == "company-manager" ? (
                <div className="ml-[10px]">
                    <Button
                        type="button"
                        className="mr-auto"
                        onClick={() => router.push('/dashboard/manager')}
                    >
                        Back to Reporting
                    </Button>
                </div>

            ) : (
                ""
            )}
            <Group position="right" className={`${opened === true ? 'flex' : 'hidden'} ml-[unset] sm:ml-auto sm:flex flex-col sm:flex-row justify-start sm:justify-center z-10 sm:z-0 pt-[30px] sm:pt-0 pb-[5px] sm:pb-0`}>
                {/* <AdminList tokens={tokens} user={user} /> */}
                <Button
                    type="button"
                    className="mr-auto bg-blue-600">
                    <Link href={`/enterprise/${router.query.id}?temp_ver=${router.query.ver_id}`} passHref replace>
                        <a target="_blank" onClick={handleLinkClick}>Preview</a>
                    </Link>
                </Button>
                {/* <Button
                    type="button"
                    className="mr-auto bg-blue-600"
                    onClick={() => {

                        // Open the URL in a new tab
                        window.open('/new-url', '_blank')

                        // Push the current page's URL to the browser history
                        router.push({ pathname: `/enterprise/${router.query.id}`, query: { temp_ver: id } });
                    }}
                >
                    Enterprise
                </Button> */}
                <PoweredByRoi />
                <ActionList />
            </Group>
        </Header>
    );
};

export default AdminNavbar;
