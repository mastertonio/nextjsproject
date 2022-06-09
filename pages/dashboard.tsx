import React, { useEffect, useState } from "react";
import {
  AppShell,
  useMantineTheme,
  LoadingOverlay,
  Table,
  Button,
  Select,
  Text,
  TextInput,
  Kbd,
  Grid,
  Modal,
} from "@mantine/core";
import { useStyles } from "../styles/dashboardStyle";
import { AiOutlineSearch } from "react-icons/ai";
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
import { Rating } from 'react-simple-star-rating'

const Dashboard: React.FC = () => {
  const theme = useMantineTheme();
  const { classes } = useStyles();
  const [data, setData] = useState<any>();
  const [value] = useLocalStorage({ key: "auth-token" });
  const [visible, setVisible] = useState(true);
  const [opened, setOpen] = useState(false);
  const [values, setValues] = useState<string | null>("");
  const [search, setSearch] = useState<string>("");
  const [rating, setRating] = useState<number>(0)

  useEffect(() => {
    const getDashboardData = async () => {
      try {
        const res = await axios.get(
          "http://54.159.8.194/v1/dashboard/6298548c95e432514d017b3b",
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

  const handleSearch = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setSearch(event.target.value);
  };

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

  const handleChange = (event: React.SetStateAction<string | null>) => {
    if (event === "Closed Won") {
      setOpen(true);
    }
    setValues(event);
    console.log(event, "eveeent");
  };

  const handleRating = (rate: number) => {
    setRating(rate)
  }

  useEffect(() => {
    console.log("the value has changed", values);
  }, [values]);

  const dropdown = (
    <Select
      style={{ width: 150 }}
      defaultValue="Active"
      data={[
        { value: "Active", label: "Active" },
        { value: "Closed Won", label: "Closed Won" },
        { value: "Closed Lost", label: "Closed Lost" },
      ]}
      onChange={(event) => handleChange(event)}
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
    },
  ];

  const filterSearch = {
    nodes: elements.filter((item) => item.roiname.includes(search)),
  };

  const rows = filterSearch.nodes.map((element) => (
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

  const rightSection = (
    <div style={{ display: "flex", alignItems: "center" }}>
      <Kbd>Ctrl</Kbd>
      <span style={{ margin: "0 5px" }}>+</span>
      <Kbd>K</Kbd>
    </div>
  );

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
      <Modal
        opened={opened}
        onClose={() => {
          setOpen((prev) => !prev);
          setRating(0)
        }}
        title="Importance Modal"
      >
        <Rating onClick={handleRating} ratingValue={rating} /* Available Props */ />
      </Modal>
      <Grid justify="space-between">
        <Grid.Col span={2}>
          <Welcome
            name={data?.welcome.account_name}
            active_roi={data?.welcome.active_roi}
            current_roi={data?.welcome.current_roi}
          />
          <ViewCount viewcount={data?.viewcount} />
        </Grid.Col>
        <Grid.Col span={6}>
          <DashboardGraph chartData={data?.chart} />
        </Grid.Col>
        <Grid.Col span={3}>
          <CreateNewRoi />
          <RoiRanking rankings={data?.ranking} />
        </Grid.Col>
      </Grid>
      <div className={classes.table}>
        <Text size="lg">My ROIs</Text>
        <Grid justify="space-between" align="center">
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
          <TextInput
            placeholder="Search"
            icon={<AiOutlineSearch size={16} />}
            rightSectionWidth={90}
            styles={{ rightSection: { pointerEvents: "none" } }}
          />
        </Grid>
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
