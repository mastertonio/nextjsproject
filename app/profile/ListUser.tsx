import React, { SetStateAction, useEffect, useState } from "react";
import {
    Input,
    Grid,
    ScrollArea,
    Table,
    Alert
} from "@mantine/core";
import { useStyles } from "@styles/dashboardStyle";
import axios from "axios";
import { useQuery, useQueries } from "react-query";
import { useLocalStorage } from "@mantine/hooks";
import Paginate from "@app/dashboard/components/table/paginate";
import {
    ICompanyTemplateUsersProps,
    sortCompanyTemplateUsersData,
} from "@app/dashboard/components/table/utils/tableMethods";
import Th from "@app/dashboard/components/table/Thead";
import SkeletonLoader from "@app/core/components/loader/SkeletonLoader";
import Pophover from "@app/core/components/popover/Pophover";
import EditCompanyUserButton from "@app/company/components/buttons/EditListUser";
import TransferButton from "@app/company/components/buttons/TransferUser";
import DeleteListUser from "@app/company/components/buttons/DeleteListUser";
import MainLoader from "@app/core/components/loader/MainLoader";
import FourOhFour from "pages/404";
import { UserDataProp } from "@app/context/user.context";

export interface ICompanyUserTable {
    id: string;
    template_name: string;
    calculator_name: string;
    username: string;
    link: string;
    createdAt: string;
    visits: string;
    unique_ip: string;
}

export interface ICompanyUsersProps {
    _id: string;
    email: string;
    manager_email: string;
    manager_id: string;
    created_rois: string;
}

export interface ICompanyUserTableProps {
    update: () => void;
    company: string;
    user: UserDataProp
    login: any;
}



const ListUser: React.FC<any> = ({
    company,
    update,
    user,
    manager
}) => {
    const { classes, cx } = useStyles();

    const getListUsers = async () => {
        return await axios.get(
            `/v1/company/${company}/user`, {
            headers: {
                Authorization: `Bearer ${user.tokens.access.token}`,
            },
        }
        );
    };

    const { isLoading, isError, error, data, refetch, isFetching } = useQuery(
        "get_all_company_users",
        getListUsers
    );

    const queries = [
        {
            queryKey: ["license"],
            queryFn: async () => {
                const res = await axios.get(`/v1/company/${company}/license`, {
                    headers: {
                        Authorization: `Bearer ${user.tokens.access.token}`,
                    },
                });
                return res.data;
            },
        },
    ];

    const results = useQueries(queries);

    const [limit, setLimit] = useState<number>(10);
    const [activePage, setPage] = useState<number>(1);
    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState<string[]>([]);
    const [sortedData, setSortedData] = useState(data?.data);
    const [sortBy, setSortBy] = useState<keyof ICompanyTemplateUsersProps | null>(
        null
    );
    const [reverseSortDirection, setReverseSortDirection] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        console.log('results list users', manager)
        setSortedData(data?.data);
    }, [data]);

    const indexOfLastPost = activePage * limit;
    const indexOfFirstPost = indexOfLastPost - limit;
    const currentPosts = sortedData?.slice(indexOfFirstPost, indexOfLastPost);

    const setSorting = (field: keyof ICompanyTemplateUsersProps) => {
        const reversed = field === sortBy ? !reverseSortDirection : false;
        setReverseSortDirection(reversed);
        setSortBy(field);
        setSortedData(
            sortCompanyTemplateUsersData(data?.data, { sortBy: field, reversed, search })
        );
    };

    const handleSearchChange = (event: React.SetStateAction<string>) => {
        setSearch(event);
        setSortedData(
            sortCompanyTemplateUsersData(data?.data, {
                sortBy,
                reversed: reverseSortDirection,
                search: event,
            })
        );
    };

    const handleFilterChange = (event: SetStateAction<string[]>) => {
        setFilter(event);
        setSortedData(
            sortCompanyTemplateUsersData(data?.data, {
                sortBy,
                reversed: reverseSortDirection,
                search: event,
            })
        );
    };

    const userList = currentPosts?.map((item: any) => ({
        id: item._id,
        username: item.email,
        manager_email: item.manager_email,
        manager_id: item.manager_id,
        created_rois: item.created_rois,
        actions: (
            <div
                style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    alignItems: 'center'
                }}
            >
                <EditCompanyUserButton />
                <TransferButton item={item} manager={manager} />
                <DeleteListUser />
            </div>
        ),
    }));

    return isLoading ? <MainLoader /> : (
        <div>
            <div className="mt-[20px] bg-white sm:p-[30px] p-[20px] rounded-[10px] shadow-lg">
                <Grid className="m-[10px] pt-[20px]">
                    <Alert color="teal" className="pt-[10px] pb-[10px] w-full">
                        <span className="text-[14px] text-slate-500 font-medium"><span className="text-slate-700 font-semibold">{results[0]?.data?.company_name}</span> has <span className="text-slate-700 font-semibold">{results[0]?.data ? results[0]?.data?.company_license : 0}</span> licenses and <span className="text-slate-700 font-semibold">{results[0]?.data ? results[0]?.data?.user_count : 0}</span> users.</span>
                    </Alert>
                </Grid>
                <Grid className="m-[20px]">
                    <Input
                        variant="default"
                        placeholder="Search"
                        className="ml-auto w-full sm:w-[unset] mt-[20px] sm:mt-0"
                    // onChange={(event: {
                    //     target: { value: React.SetStateAction<string> };
                    // }) => {
                    //     handleSearchChange(event.target.value);
                    // }}
                    />
                </Grid>
                <ScrollArea
                    className="h-[590px]"
                    onScrollPositionChange={({ y }) => setScrolled(y !== 0)}
                >
                    <Table
                        className={`${classes.table} w-[1300px] sm:w-[unset]`}
                        highlightOnHover
                        verticalSpacing="xs"
                        horizontalSpacing="xl"
                    >
                        <thead
                            className={`${cx(classes.header, { [classes.scrolled]: scrolled })} z-[50]`}
                        >
                            <tr>
                                <Th
                                    sorted={sortBy === "username"}
                                    reversed={reverseSortDirection}
                                    onSort={() => setSorting("username")}
                                    style="w-[300px] !p-[10px] !border-white !border-0"
                                >
                                    User Name
                                </Th>
                                <Th
                                    sorted={sortBy === "calculator_name"}
                                    reversed={reverseSortDirection}
                                    onSort={() => setSorting("calculator_name")}
                                    style="w-[300px] m:w-[300px] !p-[10px] !whitespace-nowrap sm:whitespace-normal !border-white !border-0"
                                >
                                    Created Cases
                                </Th>
                                <Th
                                    sorted={sortBy === "createdAt"}
                                    reversed={reverseSortDirection}
                                    onSort={() => setSorting("createdAt")}
                                    style="w-[400px] !p-[10px] !border-white !border-0"
                                >
                                    Manager
                                </Th>
                                <th className="!border-white !border-0 !p-[10px]"></th>
                            </tr>
                        </thead>
                        {isLoading ? (
                            <SkeletonLoader />
                        ) : (
                            <tbody>
                                {userList?.map((element: any) => (
                                    <tr key={element.id} className="h-[20px]">
                                        <td className="w-[10px] !p-[10px]">{element.username}</td>
                                        <td
                                            className="cursor-pointer w-[140px] pl-[30px] !p-[10px]"
                                        >
                                            {element.created_rois}
                                        </td>
                                        <td className="!p-[10px]">
                                            {!!element.manager_email ? element.manager_email : "Unassigned"}
                                        </td>
                                        <td className="!p-[10px]">{element.actions}</td>
                                    </tr>
                                ))}
                            </tbody>
                        )}
                    </Table>
                </ScrollArea>
                {/* <div className="mb-[40px]">
                        <Paginate
                            refetch={refetch}
                            page={sortedData ? Math.ceil(sortedData?.length / limit) : 10}
                            limit={limit}
                            totalResults={sortedData?.length}
                            setLimit={setLimit}
                            activePage={activePage}
                            setPage={setPage}
                            firstIndex={indexOfFirstPost}
                            lastIndex={indexOfLastPost}
                        />
                    </div> */}
            </div>
        </div>
    );

    // if (isError) {
    //     return <FourOhFour />;
    // }

    return <></>;
};

export default ListUser;
