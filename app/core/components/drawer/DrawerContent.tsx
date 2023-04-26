import { Button, Collapse } from "@mantine/core";
// import { useLocalStorage } from "@mantine/hooks";
import router from "next/router";
import React, { useState } from "react";
import Image from 'next/image'
import {
  MdCalculate,
  MdKeyboardArrowDown,
  MdKeyboardArrowRight,
  MdLineWeight,
  MdAccessTimeFilled,
  MdLogout,
  MdSpaceDashboard,
} from "react-icons/md";
import Cookies from 'js-cookie';
import { signOut } from "next-auth/react";
import { UserDataProp } from "@app/context/user.context";

const DashboardDrawer = ({ user, tokens }: UserDataProp) => {
  const [openCompany, setOpenCompany] = useState(false);
  const [openTemplate, setOpenTemplate] = useState(false);

  return (
    <>
      <div>
        <div className="mt-[35px]">
          <Image src="/logo.png" alt="random" height={60} width={200} />
        </div>
        <div>
          <Button
            type="button"
            variant="subtle"
            fullWidth
            className="mt-[100px] text-[lightgray] flex items-start"
            onClick={() => router.push(`/dashboard`)}
            leftIcon={<MdSpaceDashboard />}
            size="md"
          >
            Dashboard
          </Button>
        </div>
        {user.role.includes('admin') ? (<div>
          <Button
            variant="subtle"
            color="blue"
            fullWidth
            className="mt-[5px] text-[lightgray] flex items-start"
            onClick={() => setOpenCompany((o) => !o)}
            leftIcon={<MdCalculate />}
            rightIcon={
              openCompany ? <MdKeyboardArrowDown /> : <MdKeyboardArrowRight />
            }
            size="md"
          >
            Company
          </Button>
          <Collapse in={openCompany}>
            {user?.role == "admin" ? (
              <Button
                type="button"
                variant="subtle"
                color="blue"
                fullWidth
                className="mt-[5px] ml-[8px] text-[lightgray]"
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
              className="mt-[5px] text-[lightgray]"
              leftIcon={<MdLineWeight />}
              onClick={() => router.push(`/users`)}
            >
              Company Users
            </Button>
          </Collapse>
        </div>) : ""}

        <div>
          <Button
            type="button"
            variant="subtle"
            color="blue"
            fullWidth
            className="mt-[5px] text-[lightgray] flex items-start"
            size="md"
            leftIcon={<MdAccessTimeFilled />}
            onClick={() => setOpenTemplate((o) => !o)}
            rightIcon={
              openTemplate ? <MdKeyboardArrowDown /> : <MdKeyboardArrowRight />
            }
          >
            Manage Template
          </Button>
          <Collapse in={openTemplate}>
            {/* <Button
              type="button"
              variant="subtle"
              color="blue"
              fullWidth
              className="mt-[5px] ml-[8px] text-[lightgray]"
              leftIcon={<MdLineWeight />}
              onClick={() => router.push(`/admin/builder`)}
            // onClick={() => router.push(`/templates/builder`)}
            >
              Create Template
            </Button> */}
            <Button
              type="button"
              variant="subtle"
              color="blue"
              fullWidth
              className="mt-[5px] text-[lightgray]"
              leftIcon={<MdLineWeight />}
              onClick={() => router.push(`/templates`)}
            >
              Template List
            </Button>
          </Collapse>
        </div>
        <div>
          <Button
            type="button"
            variant="subtle"
            color="blue"
            fullWidth
            className="mt-[5px] text-[lightgray] flex items-start"
            size="md"
            leftIcon={<MdLogout />}
            onClick={async () => {
              const data = await signOut({ redirect: false, callbackUrl: "/" })
              router.push(data.url)
            }}
          >
            Logout
          </Button>
        </div>
      </div>
    </>
  );
};

export default DashboardDrawer;
