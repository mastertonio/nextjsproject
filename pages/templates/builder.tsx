import React, { useContext, useEffect, useState } from "react";
import {
  AppShell,
  useMantineTheme,
  Grid,
  Stack,
} from "@mantine/core";
import { useStyles } from "@styles/dashboardStyle";
import { useLocalStorage, useScrollIntoView } from "@mantine/hooks";
import { useRouter } from "next/router";
import HeaderMegaMenu from "@app/core/components/navbar/BuilderHeader";
import { DndListHandle } from "@app/core/components/forms/Sections";
import BuilderContext from "@app/context/builder.context"

const TemplateBuilder: React.FC = () => {
  const { scrollIntoView, targetRef } = useScrollIntoView<HTMLDivElement>({
    offset: 60,
  });
  const router = useRouter();
  const theme = useMantineTheme();
  const { classes, cx } = useStyles();
  const [value] = useLocalStorage({ key: "auth-token" });
  const [current, setCurrent] = useLocalStorage({ key: "current-user" });
  const [company, setCompany] = useLocalStorage({ key: "my-company" });
  const builderCtx = useContext(BuilderContext)

  const data = [
    {
      position: 6,
      mass: 69,
      symbol: "A",
      name: "Carbon",
    },
    {
      position: 7,
      mass: 69,
      symbol: "B",
      name: "NobraC",
    }
  ];

  return (
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
      className=""
      fixed
      header={<HeaderMegaMenu />}
      // navbar={<TableOfContentsFloating links={tablelinks} />}
    >
      {builderCtx.totalSections !== 0 ? (
      <Grid>
        <Stack style={{ width: 1820 }}>
          <DndListHandle data={builderCtx.sections} />
        </Stack>
      </Grid>) : (<div> No Sections yet </div>) }
      
    </AppShell>
  );
};

export default TemplateBuilder;
