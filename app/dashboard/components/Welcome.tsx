import { useMantineTheme, Text } from "@mantine/core";
import React from "react";
import { useRouter } from "next/router";

type iWelcomeProps = {
  name?: string;
  active_roi?: number;
  current_roi?: number;
};

const Welcome: React.FC<iWelcomeProps> = ({
  name,
  active_roi,
  current_roi,
}) => {
  return (
    <div style={{ width: "100%" }}>
      <Text>Welcome {name ? name : "User"}</Text>
      <Text size="xs">You have {current_roi ? current_roi : 0} Current ROIs and {active_roi ? active_roi : 0} Active ROIs</Text>
    </div>
  );
};

export default Welcome;
