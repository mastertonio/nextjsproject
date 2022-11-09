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
import SectionContentDnd from "@app/company/components/SectionContentDnd";

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

  return (
    <AppShell
      styles={{
        main: {
          background: theme.colors.gray[2]
        },
      }}
      navbarOffsetBreakpoint="sm"
      asideOffsetBreakpoint="sm"
      className=""
      fixed
      header={<HeaderMegaMenu />}
      // navbar={<TableOfContentsFloating links={tablelinks} />}
    >
      <SectionContentDnd />
    </AppShell>
  );
};

export default TemplateBuilder;
