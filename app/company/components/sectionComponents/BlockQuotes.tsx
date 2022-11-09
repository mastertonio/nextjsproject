import { ActionIcon, Blockquote, Button, ColorPicker, HoverCard, TextInput } from "@mantine/core";
import React from "react";
import { useState } from "react";
import Rte from "@app/company/components/sectionComponents/rte";
import { IconSettings } from "@tabler/icons";

type IQuoteProps = {
  quote: string;
  author: string;
};

const SectionBlockQuotes: React.FC<IQuoteProps> = ({ author, quote }) => {
  const [authorValue, setAuthor] = useState(author || 'Author');
  const [changeAuthor, setAuthorChange] = useState(false);

  const [quoteValue, setQuote] = useState(quote || '');
  const [changeQuote, setQuoteChange] = useState(false);
  
  const [color, setColor] = useState("");
  return (
    <div>
      {changeQuote && changeAuthor ? (
        <div>
          <React.Suspense fallback={"...Loading Rte"}>
            <Rte
              value={quoteValue}
              onChange={setQuote}
              // onBlur={() => setDescChange(false)}
              id="rte"
              controls={[
                ["bold", "italic", "underline","strike"],
                ["h1", "h2", "h3"],
              ]}
            />
          </React.Suspense>
          {/* <TextInput
            label="Enter New Quote"
            value={quoteValue}
            onChange={(event) => setQuote(event.currentTarget.value)}
            onBlur={() => setQuoteChange(false)}
            onKeyDown={(event) => {
              if (event.key == "Enter") {
                setQuoteChange(false);
              }
            }}
          /> */}
          <TextInput
            label="Enter Quote Author"
            value={authorValue}
            onChange={(event) => setAuthor(event.currentTarget.value)}
            onBlur={() => setAuthorChange(false)}
            onKeyDown={(event) => {
              if (event.key == "Enter") {
                setAuthorChange(false);
              }
            }}
          />
          <Button
              style={{ marginLeft: 'auto', display: 'block',}}
              variant="subtle"
              color="teal"
              onClick={() => setQuoteChange(false)}
            >
              Save
            </Button>
        </div>
      ) : (
        <div style={{ display: 'flex', alignItems: 'start'}}>
        <Blockquote
          onClick={() => {
            setAuthorChange(true);
            setQuoteChange(true);
          }}
          cite={authorValue ? ("- " + authorValue) : ""}
        >
          
          {quoteValue ? <div style={{ color: color }} dangerouslySetInnerHTML={{ __html: quoteValue }}></div> : "Insert Quotes Here"}
        </Blockquote>
        {/* <HoverCard
            shadow="md"
            withArrow
            openDelay={200}
            closeDelay={400}
            position='right-start'
          >
            <HoverCard.Target>
              <ActionIcon style={{ marginTop: 20, marginLeft: 20}} variant="transparent">
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
    </div>
  );
};

export default SectionBlockQuotes;
