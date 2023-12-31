import { useUserStore } from "@app/store/userState";
import {
    Button,
    Collapse,
    Navbar,
    useMantineTheme,
    Text,
} from "@mantine/core";
import { useLocalStorage } from "@mantine/hooks";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Image from 'next/image';
import {
    MdSpaceDashboard,
    MdCalculate,
    MdKeyboardArrowRight,
    MdKeyboardArrowDown,
    MdAccessTimeFilled,
    MdLineWeight,
    MdLogout
} from "react-icons/md";
import { useQuery } from "react-query";
import { useNavShowStore } from "@app/store/builderStore";
import { IAdminListProps } from "../navbar/components/AdminList";
import Cookies from 'js-cookie';
import { UserDataProp } from "@app/context/user.context";
import { signOut } from "next-auth/react";

const AdminRoleSidebar: React.FC<UserDataProp> = ({ tokens, user }) => {
    const router = useRouter();
    const navShow = useNavShowStore((state) => state.value);
    const [openCompany, setOpenCompany] = useState(false);
    const [openTemplate, setOpenTemplate] = useState(false);
    const [current, setCurrent] = useLocalStorage({ key: "current-user" });
    const [userData, setUser] = useState<any>({});
    const userZ = useUserStore((state) => (state.user))

    console.log('user data', user)

    const getCurrentUser = async () => {
        return await axios.get(`/v1/users/${user.id}`, {
            headers: {
                Authorization: `Bearer ${tokens.access.token}`,
            },
        });
    };

    const { isLoading, status, data, isFetching, refetch } = useQuery(
        "userList",
        getCurrentUser
    );

    const handleLogout = () => {
        try {
            // sessionStorage.clear()
            Cookies.set('x-access-token', ' ', {
                expires: Date.now()
            });

            Cookies.set('session.sig', ' ', {
                expires: Date.now()
            });

            Cookies.set('session', ' ', {
                expires: Date.now()
            });

            Cookies.remove('x-access-token', { path: '/' })
            Cookies.remove('session.sig', { path: '/' })
            Cookies.remove('session', { path: '/' })
            router.push("/");
        } catch (error) {
            return error;
        }
    };

    useEffect(() => {
        setUser(data?.data);
    }, [data]);

    return (
        <Navbar
            p="md"
            hiddenBreakpoint="sm"
            //   hidden={!opened}
            width={{ sm: 230, lg: 230 }}
            height="100vh"
            className={`bg-[#2f4050] text-[lightgray] mt-[-70px] flex-col items-start ${navShow === false ? 'hidden' : ''} sm:flex`}
        >
            <div className="mt-[35px]">
                <Image src="/logo.png" alt="random" height={55} width={190} />
            </div>
            <Text className={`flex flex-row mb-[80px] w-full text-[12px] ${user.first_name && user.last_name ? 'ml-[35px]' : 'ml-[0px] text-center'}`}>
                Welcome {user.first_name && user.last_name ? `${user.first_name} ${user.last_name}` : `${user.email}`}
            </Text>

            {user.role === 'admin' ? (
                <Navbar.Section>
                    <Button
                        type="button"
                        variant="subtle"
                        fullWidth
                        className="mt-[5px] text-[lightgray] text-[13px]"
                        onClick={() => {
                            router.push(`/company`)
                        }}
                        leftIcon={<MdSpaceDashboard />}
                        size="md"
                    >
                        Dashboard
                    </Button>
                </Navbar.Section>
            ) : null}
            {user.role === 'company-admin' ? (
                <Navbar.Section>
                    <Button
                        type="button"
                        variant="subtle"
                        fullWidth
                        className="mt-[5px] text-[lightgray] text-[13px]"
                        onClick={() => {
                            router.push(`/users`)
                        }}
                        leftIcon={<MdSpaceDashboard />}
                        size="md"
                    >
                        Dashboard
                    </Button>
                </Navbar.Section>
            ) : null}

            {user.role === 'company-manager' ? (
                <Navbar.Section>
                    <Button
                        type="button"
                        variant="subtle"
                        fullWidth
                        className="mt-[5px] text-[lightgray] text-[13px]"
                        onClick={() => {
                            router.push(`/dashboard/manager`)
                        }}
                        leftIcon={<MdSpaceDashboard />}
                        size="md"
                    >
                        Dashboard
                    </Button>
                </Navbar.Section>
            ) : null}

            {user.role === 'company-agent' ? (
                <Navbar.Section>
                    <Button
                        type="button"
                        variant="subtle"
                        fullWidth
                        className="mt-[5px] text-[lightgray] text-[13px]"
                        onClick={() => {
                            router.push(`/dashboard`)
                        }}
                        leftIcon={<MdSpaceDashboard />}
                        size="md"
                    >
                        Dashboard
                    </Button>
                </Navbar.Section>
            ) : null}

            {user.role == "admin" ? (<Navbar.Section>
                {/*<Button
                    type="button"
                    variant="subtle"
                    color="blue"
                    fullWidth
                    className="mt-[5px] text-[lightgray] text-[13px]"
                    // onClick={() => setOpenCompany((o) => !o)}
                    onClick={() => router.push(`/company`)}
                    leftIcon={<MdCalculate />}
                    // rightIcon={
                    //     openCompany ? <MdKeyboardArrowDown /> : <MdKeyboardArrowRight />
                    // }
                    size="md"
                >
                    Create Company
                </Button>
                 <Collapse
                    in={openCompany}
                    className="flex flex-col items-end"
                >
                    {user.role == "admin" ? (
                        <Button
                            type="button"
                            variant="subtle"
                            color="blue"
                            fullWidth
                            className="mt-[5px] ml-[17px] text-[lightgray]"
                            leftIcon={<MdLineWeight />}
                            onClick={() => router.push(`/company`)}
                        >
                            Manage Company
                        </Button>
                    ) : (
                        ""
                    )}
                    <Button
                        type="button"
                        variant="subtle"
                        color="blue"
                        fullWidth
                        className="mt-[5px] ml-[10px] text-[lightgray]"
                        leftIcon={<MdLineWeight />}
                        onClick={() => router.push(`/users`)}
                    >
                        Company Users
                    </Button>
                </Collapse> */}
            </Navbar.Section>) : ""}

            {user.role == "company-admin" ? (<Navbar.Section>
                <Button
                    type="button"
                    variant="subtle"
                    color="blue"
                    fullWidth
                    className="mt-[5px] text-[lightgray] text-[13px]"
                    size="md"
                    leftIcon={<MdAccessTimeFilled />}
                    onClick={() => {
                        router.push(`/templates`)
                    }}
                // onClick={() => setOpenTemplate((o) => !o)}
                // rightIcon={
                //     openTemplate ? <MdKeyboardArrowDown /> : <MdKeyboardArrowRight />
                // }
                >
                    Manage Templates
                </Button>
                {/* <Collapse in={openTemplate}>
                    <Button
                        type="button"
                        variant="subtle"
                        color="blue"
                        fullWidth
                        className="mt-[5px] ml-[17px] text-[lightgray]"
                        leftIcon={<MdLineWeight />}
                        onClick={() => router.push(`/templates/builder`)}
                    >
                        Create Template
                    </Button>
                    <Button
                        type="button"
                        variant="subtle"
                        color="blue"
                        fullWidth
                        className="mt-[5px] ml-[8px] text-[lightgray]"
                        leftIcon={<MdLineWeight />}
                        onClick={() => router.push(`/templates`)}
                    >
                        Template List
                    </Button>
                </Collapse> */}
            </Navbar.Section>) : ""}
            <Navbar.Section>
                <Button
                    type="button"
                    variant="subtle"
                    color="blue"
                    fullWidth
                    className="mt-[5px] text-[lightgray] text-[13px]"
                    size="md"
                    leftIcon={<MdLogout />}
                    onClick={async () => {
                        const data = await signOut({ redirect: false, callbackUrl: "/" })
                        router.push(data.url)
                    }}
                >
                    Logout
                </Button>
            </Navbar.Section>
        </Navbar>
    );
};

export default AdminRoleSidebar;
