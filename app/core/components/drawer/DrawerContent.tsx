import { Button, Collapse, Image, Text } from "@mantine/core";
import { useLocalStorage } from "@mantine/hooks";
import { current } from "@reduxjs/toolkit";
import router from "next/router";
import React, { useState } from "react";
import { MdCalculate, MdKeyboardArrowDown, MdKeyboardArrowRight, MdLineWeight, MdAccessTimeFilled } from "react-icons/md";

const DashboardDrawer = () => {

  
  const [openCompany, setOpenCompany] = useState(false);
  const [openTemplate, setOpenTemplate] = useState(false);
  const [current, setCurrent] = useLocalStorage({ key: "current-user" });

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
            <Collapse
              in={openCompany}
            >
              <Button
                variant="subtle"
                color="blue"
                fullWidth
                style={{ marginTop: 5, marginLeft: 8, color: "lightgray" }}
                leftIcon={<MdLineWeight />}
              >
                Create Company
              </Button>
              <Button
                variant="subtle"
                color="blue"
                fullWidth
                style={{ marginTop: 5, color: "lightgray" }}
                leftIcon={<MdLineWeight />}
              >
                Company List
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
                openTemplate ? (
                  <MdKeyboardArrowDown />
                ) : (
                  <MdKeyboardArrowRight />
                )
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
                onClick={() => router.push(`/templates/${current}`)}
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
