import { useState } from "react";
import {
  ActionIcon,
  Anchor,
  Button,
  Divider,
  Group,
  Popover,
  Radio,
  RadioGroup
} from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import { useSetState } from "@mantine/hooks";
import { AiOutlineCalendar } from "react-icons/ai";
import { BiFilterAlt as FilterIcon } from "react-icons/bi";

const DateFilter = (props: { column: { filterValue: any; setFilter: any; filterOptions: any; }; }) => {
  const {
    column: { filterValue, setFilter, filterOptions }
  } = props;
  const [opened, setOpened] = useState(false);
  const [state, setState] = useSetState(
    filterValue || { operator: "eq", value: null }
  );

  const handleClose = () => {
    setState(filterValue || { operator: "cont", value: "" });
    setOpened(false);
  };

  const handleClear = () => {
    setFilter(undefined);
    setState({ operator: "cont", value: "" });
    setOpened(false);
  };

  const handleApply = () => {
    setFilter(state);
    setOpened(false);
  };

  return (
    <Popover
      target={
        <ActionIcon
          variant={filterValue ? "light" : "hover"}
          color={filterValue ? "blue" : "gray"}
          onClick={() => setOpened((o) => !o)}
        >
          <FilterIcon />
        </ActionIcon>
      }
      opened={opened}
      onClose={handleClose}
      onClick={(e) => e.stopPropagation()}
      position="bottom"
      transition="scale-y"
      // zIndex={10000}
    >
      <RadioGroup
        description="Select your option"
        orientation="vertical"
        size="sm"
        value={state.operator}
        onChange={(o) => setState({ operator: o })}
      >
        <Radio value="eq">Equals</Radio>
        <Radio value="not_eq">Does not equal</Radio>
        <Radio value="gt">After</Radio>
        <Radio value="gteq">After or on</Radio>
        <Radio value="lt">Before</Radio>
        <Radio value="lteq">Before or on</Radio>
      </RadioGroup>
      <Divider my="sm" />
      <DatePicker
        icon={<AiOutlineCalendar />}
        placeholder="Pick date"
        mb="sm"
        withinPortal={false}
        value={state.value}
        onChange={(val) => setState({ value: val })}
      />

      <Group position="apart">
        <Anchor component="button" color="gray" onClick={handleClear}>
          Clear
        </Anchor>
        <Button onClick={handleApply}>Apply</Button>
      </Group>
    </Popover>
  );
};

export default DateFilter;
