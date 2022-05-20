import { useMantineTheme, Text } from "@mantine/core";
import React from "react";
import { useRouter } from "next/router";

const Welcome: React.FC = () => {
  const theme = useMantineTheme();
  const router = useRouter();


  return (
    <div style={{ width: "100%"}}>
      <Text>Welcome Jason</Text>
      <Text size="xs">You have 307 Current ROIs and 307 Active ROIs</Text>
    </div>
  );
};

export default Welcome;
