import { useState } from "react";
import { Button, Grid, Modal, SegmentedControl, Text } from "@mantine/core";
import axios from "axios";
import { useLocalStorage } from "@mantine/hooks";

interface ISegmentedProps {
  val: string;
  refetch: ()=> void;
  name: string
  id: string
}

const Segmented: React.FC<ISegmentedProps> = ({ val, refetch, name, id }) => {
  const [value, setValue] = useState(val);
  const [opened, setOpened] = useState(false);
  
  const [values] = useLocalStorage({ key: "auth-token" });

  return (
    <>
    <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        withCloseButton={false}
        size="xl"
        centered
        padding={0}
      >
        <Text
          weight={700}
          color="gray"
          style={{
            padding: 30,
            fontSize: 25,
            backgroundColor: "#073e52",
            color: "white",
          }}
          align="center"
        >
          Are you sure you want to set <Text component="span" color="teal">{name}</Text> to {value=="active" ? <Text component="span" color="red">Inactive</Text> : <Text component="span" color="teal">Active</Text>} ?
        </Text>

          <Grid justify="flex-end" style={{ margin: 20 }}>
            <Button
              type="submit"
              radius="sm"
              size="sm"
              color={value=="active" ? "red" : "teal"}
              style={{ marginRight: 10 }}
              onClick={async() => {
                setOpened(false)
                setValue(value=="active" ? "inactive" : "active")
                const response = await axios.patch(
                  `http://54.159.8.194/v1/company/${id}`,
                  {
                    active: value=="active" ? 0 : 1
                  },
                  { headers: { Authorization: `Bearer ${values}` } }
                );
                if(response){
                  refetch()
                }
              }}
            >
              Set to {value=="active" ? "Inactive" : "Active"}
            </Button>
            <Button
              radius="sm"
              size="sm"
              onClick={() => setOpened(false)}
              style={{
                backgroundColor: "white",
                color: "black",
                borderColor: "gray",
              }}
            >
              Close
            </Button>
          </Grid>
      </Modal>
      <SegmentedControl
      size="xs"
      onClick={()=> {
        setOpened(true)
      }}
      value={value}
      color={value == "active" ? "teal" : "gray"}
      data={[
        { label: "Inactive", value: "inactive" },
        { label: "Active", value: "active" },
      ]}
    />
    </>
    
  );
};

export default Segmented;
