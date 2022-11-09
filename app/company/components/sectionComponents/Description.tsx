import {
  ActionIcon,
  Box,
  Button,
  ColorInput,
  ColorPicker,
  Container,
  HoverCard,
  Text,
  Textarea,
  TextInput,
  TypographyStylesProvider,
} from "@mantine/core";
import React, { useEffect, useState } from "react";
import Rte from "@app/company/components/sectionComponents/rte";
import sanitizeHtml from "sanitize-html";
import { IconSettings } from "@tabler/icons";

type iSectionDescriptionProps = {
  name: string;
  description: string;
};

const SectionDescription: React.FC<iSectionDescriptionProps> = ({
  name,
  description,
}) => {
  const initialValue =
    "<p>Your initial <b>html value</b> or an empty string to init editor without value</p>";
  const [descValue, setDesc] = useState(description || initialValue);
  const [changeDesc, setDescChange] = useState(false);
  const [color, setColor] = useState("");
  const [picker, setPicker] = useState(false);

  return (
    <Container ml={40} style={{ margin: 40, padding: 0 }}>
      {changeDesc ? (
        <div style={{ width: 1000 }}>
          <React.Suspense fallback={"...Loading Rte"}>
            <Rte
              value={descValue}
              onChange={setDesc}
              // onBlur={() => setDescChange(false)}
              id="rte"
            />
            <Button
              style={{ marginLeft: "auto", display: "block" }}
              variant="subtle"
              color="teal"
              onClick={() => setDescChange(false)}
            >
              Save
            </Button>
          </React.Suspense>
          {/* <Textarea
            label="Enter New Description"
            value={descValue}
            onChange={(event) => setDesc(event.currentTarget.value)}
            onBlur={() => setDescChange(false)}
            onKeyDown={(event) => {
              if (event.key == "Enter") {
                setDescChange(false);
              }
            }}
          /> */}
        </div>
      ) : (
        <div style={{ display: 'flex', alignItems: 'center'}}>
          <TypographyStylesProvider onClick={() => setDescChange(true)} mb={20}>
            <div
              style={{ width: 1000, color: color }}
              dangerouslySetInnerHTML={{ __html: descValue }}
            />
          </TypographyStylesProvider>
          {/* <HoverCard
            shadow="md"
            withArrow
            openDelay={200}
            closeDelay={400}
            position='right-start'
          >
            <HoverCard.Target>
              <ActionIcon variant="transparent">
                <IconSettings size={16} />
              </ActionIcon>
            </HoverCard.Target>

            <HoverCard.Dropdown>
              <ColorInput
                style={{ margin: 7 }}
                value={color}
                onChange={setColor}
              />
            </HoverCard.Dropdown>
          </HoverCard> */}
        </div>
      )}
    </Container>
  );
};

export default SectionDescription;
