import React, { useState } from 'react';
import {
  AppShell,
  Navbar,
  Header,
  Footer,
  Text,
  MediaQuery,
  Burger,
  useMantineTheme,
} from '@mantine/core';

import RoiNavbar from '../app/core/components/navbar/Navbar'

const Dashboard: React.FC = () => {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);
  return (
    <AppShell
      styles={{
        main: {
          background: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
        },
      }}
      navbarOffsetBreakpoint="sm"
      asideOffsetBreakpoint="sm"
      fixed
      navbar={
        <Navbar p="md" hiddenBreakpoint="sm" hidden={!opened} width={{ sm: 200, lg: 300 }}>
          <Text>Application Side bar</Text>
        </Navbar>
      }
      footer={
        <Footer height={60} p="md">
          © The ROI Shop Footer
        </Footer>
      }
      header={
        <RoiNavbar />
      }
    >
      <Text>Content Here</Text>
    </AppShell>
  );
}


export default Dashboard