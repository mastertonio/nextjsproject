import { Button, Collapse, Image, Text } from "@mantine/core";
import { useLocalStorage } from "@mantine/hooks";
import { current } from "@reduxjs/toolkit";
import router from "next/router";
import React, { useEffect, useState } from "react";
import {
  MdCalculate,
  MdKeyboardArrowDown,
  MdKeyboardArrowRight,
  MdLineWeight,
  MdAccessTimeFilled,
} from "react-icons/md";

const DashboardDrawer = ({ user }: any) => {
  const [openCompany, setOpenCompany] = useState(false);
  const [openTemplate, setOpenTemplate] = useState(false);
  const [current, setCurrent] = useLocalStorage({ key: "current-user" });
  const [company, setCompany] = useLocalStorage({ key: "my-company" });

  useEffect(()=>{
    console.log(user)
  },[user])

  return (
    <>
      <div>
        <Image style={{ marginTop: 35 }} src="/logo.png" alt="random" />
        <div>
          <Button
            variant="subtle"
            color="blue"
            fullWidth
            style={{
              marginTop: 130,
              color: "lightgray",
              display: "flex",
              alignItems: "start",
            }}
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
                style={{ marginTop: 5, marginLeft: 8, color: "lightgray" }}
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
              style={{ marginTop: 5, color: "lightgray" }}
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
            style={{
              marginTop: 5,
              color: "lightgray",
              display: "flex",
              alignItems: "start",
            }}
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
              style={{ marginTop: 5, marginLeft: 8, color: "lightgray" }}
              leftIcon={<MdLineWeight />}
            >
              Create Template
            </Button>
            <Button
              variant="subtle"
              color="blue"
              fullWidth
              style={{ marginTop: 5, color: "lightgray" }}
              leftIcon={<MdLineWeight />}
              onClick={() => router.push(`/templates`)}
            >
              Template List
            </Button>
          </Collapse>
        </div>
      </div>
    </>
  );
};

export default DashboardDrawer;
