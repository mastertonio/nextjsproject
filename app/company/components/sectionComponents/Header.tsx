import {
  ActionIcon,
  Button,
  ColorPicker,
  Grid,
  HoverCard,
  NumberInput,
  Text,
  TextInput,
} from "@mantine/core";
import {
  IconMedal,
  IconCurrencyDollar,
  IconEdit,
  IconSettings,
} from "@tabler/icons";
import React, { useState } from "react";
import Rte from "@app/company/components/sectionComponents/rte";
import Tiptap from "./TiptapHeader";
import styles from "@styles/tiptap.module.scss";

type iSectionHeaderProps = {
  id: string;
  title: string;
  price: number;
};

const SectionHeader: React.FC<iSectionHeaderProps> = ({ id, title, price }) => {
  const [titleValue, setTitle] = useState(title);
  const [priceValue, setPrice] = useState(price);
  const [changeTitle, setTitleChange] = useState(false);
  const [changePrice, setPriceChange] = useState(false);

  const [color, setColor] = useState("");

  return (
    <Grid grow mb={10}>
      {changeTitle ? (
        <div style={{ width: 900 }}>
          <React.Suspense fallback={"...Loading Rte"}>
            <Tiptap titleValue={titleValue} setTitle={setTitle} setTitleChange={setTitleChange} />
            {/* <Rte
              value={titleValue}
              onChange={setTitle}
              // onBlur={() => setDescChange(false)}
              id="rte"
              controls={[
                ["bold", "italic", "underline"],
                ["h1", "h2", "h3"],
              ]}
            />
            <Button
              type="button"
              style={{ marginLeft: "auto", display: "block" }}
              variant="subtle"
              color="teal"
              onClick={() => setTitleChange(false)}
            >
              Save
            </Button> */}
          </React.Suspense>
          {/* <TextInput
            label="New Header Title"
            value={titleValue}
            onChange={(event) => setTitle(event.currentTarget.value)}
            onBlur={() => setTitleChange(false)}
            onKeyDown={(event) => {
              if (event.key == "Enter") {
                setTitleChange(false);
              }
            }}
          /> */}
        </div>
      ) : (
        <div style={{ display: 'flex', alignItems: 'center' }} onClick={() => setTitleChange(true)}>
          <div style={{ color: color }} dangerouslySetInnerHTML={{ __html: titleValue }} className={styles.ProseMirror} />
          {/* <HoverCard
            shadow="md"
            withArrow
            openDelay={200}
            closeDelay={400}
            position="right-start"
          >
            <HoverCard.Target>
              <ActionIcon style={{ marginLeft: 20 }} variant="transparent">
                <IconSettings size={16} />
              </ActionIcon>
            </HoverCard.Target>

            <HoverCard.Dropdown>
              <ColorPicker
                style={{ margin: 7 }}
                value={color}
                onChange={setColor}
              />
            </HoverCard.Dropdown>
          </HoverCard> */}
        </div>
      )}
      {changePrice ? (
        <NumberInput
          value={priceValue}
          onChange={(val) => setPrice(+val)}
          onBlur={() => setPriceChange(false)}
          hideControls
          parser={(value) => value?.replace(/\$\s?|(,*)/g, "")}
          onKeyDown={(event) => {
            if (event.key == "Enter") {
              setPriceChange(false);
            }
          }}
          ml={"auto"}
          icon={<IconCurrencyDollar size={18} />}
        />
      ) : (
        <Text
          onClick={() => setPriceChange(true)}
          color="green"
          size={40}
          weight={700}
          ml={"auto"}
        >
          ${priceValue ? priceValue : 0}
        </Text>
      )}
    </Grid>
  );
};

export default SectionHeader;
