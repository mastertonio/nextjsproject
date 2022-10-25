import { Blockquote, Button, TextInput } from "@mantine/core";
import React from "react";
import { useState } from "react";
import Rte from "@app/company/components/sectionComponents/rte";

type IQuoteProps = {
  quote: string;
  author: string;
};

const SectionBlockQuotes: React.FC<IQuoteProps> = ({ author, quote }) => {
  const [authorValue, setAuthor] = useState(author || 'Author');
  const [changeAuthor, setAuthorChange] = useState(false);

  const [quoteValue, setQuote] = useState(quote || '');
  const [changeQuote, setQuoteChange] = useState(false);
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
        <Blockquote
          onClick={() => {
            setAuthorChange(true);
            setQuoteChange(true);
          }}
          cite={authorValue ? ("- " + authorValue) : ""}
        >
          
          {quoteValue ? <div dangerouslySetInnerHTML={{ __html: quoteValue }}></div> : "Insert Quotes Here"}
        </Blockquote>
      )}
    </div>
  );
};

export default SectionBlockQuotes;
