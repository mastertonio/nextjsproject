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

const DashboardDrawer = ({ user }: any) => {
  const [openCompany, setOpenCompany] = useState(false);
  const [openTemplate, setOpenTemplate] = useState(false);
  // const [current, setCurrent] = useLocalStorage({ key: "current-user" });
  // const [company, setCompany] = useLocalStorage({ key: "my-company" });

  const handleLogout = () => {
    try {
      // sessionStorage.clear()
      Cookies.set('x-access-token', ' ', {
        expires: Date.now()
      });

      Cookies.remove('x-access-token', { path: '/' })
      router.push("/");
    } catch (error) {
      return error;
    }
  };

  return (
    <>
      <div>
        <div className="mt-[35px]">
          <Image src="/logo.png" alt="random" height={60} width={200} />
        </div>
        <div>
          <Button
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
        <div>
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
        </div>
        <div>
          <Button
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
            Template
          </Button>
          <Collapse in={openTemplate}>
            <Button
              variant="subtle"
              color="blue"
              fullWidth
              className="mt-[5px] ml-[8px] text-[lightgray]"
              leftIcon={<MdLineWeight />}
              onClick={() => router.push(`/templates/builder`)}
            >
              Create Template
            </Button>
            <Button
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
            variant="subtle"
            color="blue"
            fullWidth
            className="mt-[5px] text-[lightgray] flex items-start"
            size="md"
            leftIcon={<MdLogout />}
            onClick={handleLogout}
          >
            Logout
          </Button>
        </div>
      </div>
    </>
  );
};

export default DashboardDrawer;
