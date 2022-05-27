import React, { useEffect, useState } from "react";
import {
  AppShell,
  useMantineTheme,
  LoadingOverlay,
  Table,
  Button,
  Select,
  Text,
} from "@mantine/core";
import { useStyles } from "../styles/dashboardStyle";
import axios from "axios";

import RoiNavbar from "../app/core/components/navbar/Navbar";
import RoiFooter from "../app/core/components/footer/Footer";
import Welcome from "../app/dashboard/components/Welcome";
import DashboardGraph from "../app/dashboard/components/DashboardGraph";
import ViewCount from "../app/dashboard/components/ViewCount";
import CreateNewRoi from "../app/dashboard/components/CreateNewRoi";
import RoiRanking from "../app/dashboard/components/RoiRanking";
import { useLocalStorage } from "@mantine/hooks";
import { AiOutlineStar } from "react-icons/ai";
import { showNotification } from "@mantine/notifications";

const Dashboard: React.FC = () => {
  const theme = useMantineTheme();
  const { classes } = useStyles();
  const [data, setData] = useState<any>();
  const [value] = useLocalStorage({ key: "auth-token" });
  const [visible, setVisible] = useState(true);
  const [opened, setOpen] = useState(false);

  useEffect(() => {
    const getDashboardData = async () => {
      try {
        const res = await axios.get(
          "http://54.159.8.194/v1/dashboard/628247b19e2a1d3a5ef8b9ad",
          {
            headers: {
              Authorization: `Bearer ${value}`,
            },
          }
        );
        if (res) {
          setData(res?.data);
          setVisible(false);
        }
      } catch (error) {
        console.log(error);
      }
    };

    getDashboardData();
  }, []);

  const button = (
    <Button
      size="xs"
      onClick={() =>
        showNotification({
          title: "You clicked Open button",
          message: "Hey there, your code is awesome! 🤥",
          autoClose: 1000,
          disallowClose: true,
          color: "blue",
        })
      }
    >
      Open
    </Button>
  );

  const dropdown = (
    <Select
      style={{ width: 150 }}
      placeholder="Active"
      data={[
        { value: "Active", label: "Active" },
        { value: "Inactive", label: "Inactive" },
      ]}
    />
  );

  const stars = (
    <div>
      <AiOutlineStar />
      <AiOutlineStar />
      <AiOutlineStar />
      <AiOutlineStar />
      <AiOutlineStar />
    </div>
  );

  const threeButtons = (
    <div>
      <Button
        size="xs"
        onClick={() =>
          showNotification({
            title: "You clicked Edit button",
            message: "Hey there, your code is awesome! 🤥",
            autoClose: 1000,
            disallowClose: true,
            color: "gray",
          })
        }
      >
        Edit
      </Button>
      <Button
        size="xs"
        color="teal"
        style={{ marginLeft: 2, marginRight: 2 }}
        onClick={() =>
          showNotification({
            title: "You clicked Clone button",
            message: "Hey there, your code is awesome! 🤥",
            autoClose: 1000,
            disallowClose: true,
            color: "teal",
          })
        }
      >
        Clone
      </Button>
      <Button
        size="xs"
        color="red"
        onClick={() =>
          showNotification({
            title: "You clicked Delete button",
            message: "Hey there, your code is awesome! 🤥",
            autoClose: 1000,
            disallowClose: true,
            color: "red",
          })
        }
      >
        Delete
      </Button>
    </div>
  );

  const elements = [
    {
      button: button,
      status: dropdown,
      importance: stars,
      roiname: "Sample template 1",
      dates: "2022-05-05T09:32:24.605+00:00",
      views: 0,
      uniqueViews: 0,
      actions: threeButtons,
    },
    {
      button: button,
      status: dropdown,
      importance: stars,
      roiname: "Sample template 2",
      dates: "2022-05-05T10:32:24.605+00:00",
      views: 1,
      uniqueViews: 1,
      actions: threeButtons,
    },
    {
      button: button,
      status: dropdown,
      importance: stars,
      roiname: "Sample template 3",
      dates: "2022-05-05T10:32:24.605+00:00",
      views: 2,
      uniqueViews: 2,
      actions: threeButtons,
    }
  ];

  const rows = elements.map((element) => (
    <tr key={element.roiname}>
      <td>{element.button}</td>
      <td>{element.status}</td>
      <td>{element.importance}</td>
      <td>{element.roiname}</td>
      <td>{element.dates}</td>
      <td>{element.views}</td>
      <td>{element.uniqueViews}</td>
      <td>{element.actions}</td>
    </tr>
  ));

  return visible ? (
    <LoadingOverlay visible={visible} />
  ) : (
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
      className={classes.body}
      fixed
      header={
        <RoiNavbar admin={data?.admin_list} actions={data?.template_list} />
      }
      footer={<RoiFooter />}
    >
      <div className={classes.body}>
        <div className={classes.welcome}>
          <Welcome
            name={data?.welcome.account_name}
            active_roi={data?.welcome.active_roi}
            current_roi={data?.welcome.current_roi}
          />
          <ViewCount viewcount={data?.viewcount} />
        </div>
        <div className={classes.dashboard_graph}>
          <DashboardGraph chartData={data?.chart} />
        </div>
        <div className={classes.welcome}>
          <CreateNewRoi />
          <RoiRanking rankings={data?.ranking} />
        </div>
      </div>
      <div className={classes.bar_graph_wrapper}>
        <Text size="lg">My ROIs</Text>
        <Select
          style={{ width: 150 }}
          placeholder="Template"
          data={[
            { value: "Template 1", label: "Template 1" },
            { value: "Template 2", label: "Template 2" },
            { value: "Template 3", label: "Template 3" },
            { value: "Template 4", label: "Template 4" },
            { value: "Template 5", label: "Template 5" },
            { value: "Template 6", label: "Template 6" },
          ]}
        />
        <Table
          className={classes.table}
          horizontalSpacing="xl"
          verticalSpacing="xs"
          highlightOnHover
        >
          <thead>
            <tr>
              <th> </th>
              <th>Status</th>
              <th>Importance</th>
              <th>ROI name</th>
              <th>Dates</th>
              <th>Views</th>
              <th>Unique Views</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </Table>
      </div>
    </AppShell>
  );
};

export default Dashboard;
