import { Button, Grid, NumberInput, Text, TextInput } from "@mantine/core";
import { IconMedal, IconCurrencyDollar, IconEdit } from "@tabler/icons";
import React, { useState } from "react";
import Rte from "@app/company/components/sectionComponents/rte";

type iSectionHeaderProps = {
  id: string;
  title: string;
  price: number;
};

const SectionHeader: React.FC<iSectionHeaderProps> = ({ id, title, price }) => {
  const [titleValue, setTitle] = useState(title);
  const [priceValue, setPrice] = useState<number | undefined>(price);
  const [changeTitle, setTitleChange] = useState(false);
  const [changePrice, setPriceChange] = useState(false);

  return (
    <Grid grow mb={10}>
      {changeTitle ? (
        <div style={{ width: 900 }}>
          <React.Suspense fallback={"...Loading Rte"}>
              <Rte
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
                style={{ marginLeft: 'auto', display: 'block',}}
                variant="subtle"
                color="teal"
                onClick={() => setTitleChange(false)}
              >
                Save
              </Button>
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
        <Text onClick={() => setTitleChange(true)}>
          <div dangerouslySetInnerHTML={{ __html: titleValue }} />
        </Text>
      )}
      {changePrice ? (
        <NumberInput
          value={priceValue}
          onChange={(val) => setPrice(val)}
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
