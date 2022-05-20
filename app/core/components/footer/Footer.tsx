import {
  useMantineTheme,
  Footer,
} from "@mantine/core";
import React from "react";
import { useRouter } from "next/router";

const RoiFooter: React.FC = () => {
  const theme = useMantineTheme();
  const router = useRouter();

  return (
    <Footer height={60} p="md">
      © The ROI Shop Footer
    </Footer>
  );
};

export default RoiFooter;
