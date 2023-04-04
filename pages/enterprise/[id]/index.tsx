import React, { useEffect, useState } from 'react';
import EnterpriseNavbar from "@app/core/components/sidebar/EnterpriseNav";
import NavbarSimple from "@app/core/components/sidebar/EnterpriseSidebar";
import Projection from "@app/enterprise/Projection";
import { AppShell, Navbar, Header, Grid, SimpleGrid, Flex } from "@mantine/core";
import { contentData, finalData } from "@app/enterprise/constants/content";
import SliderCard from "@app/core/components/card";
import NewValueBucket from "@app/core/components/card/NewValueBucket";
import InputVariable, { iElemsProp } from "@app/enterprise/components/input/NewInput";

interface CardSection {
  id: string;
  sectionName: string;
}

const Enterprise = () => {
  const [valueBucketState, setValueBucketState] = useState<CardSection[]>([])

  useEffect(() => {
    const formValue = JSON.parse(localStorage.getItem("valueBucket") ?? '[]') as CardSection[];
    setValueBucketState(formValue)
    console.log('storage value bucket', valueBucketState)
  }, [])


  return (
    <AppShell
      padding={0}
      navbar={<NavbarSimple />}
      header={<EnterpriseNavbar />}
      styles={(theme) => ({
        main: {
          backgroundColor:
            theme.colorScheme === "dark"
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
          // width: '100%',
        },
      })}
      className="m-0 p-0"
    >
      <>
        {finalData
          ? finalData.sections.map((section) => (
            <div className="w-full text-[#676a6c]" key={section.id}>
              <Projection
                title={section.headers.title.mainTitle.text}
                description={section.headers.title.description}
                subTitle={section.headers.title.subTitle.text}
                content={section.headers.title.content}
                length={section.headers.title.content.elements.length}
                quotes={section.headers.title.quotes}
                key={section.order}
              />

              <div>
                {/* filter Gray Contents here */}
                {section.GrayContent.type == "sliders" ? (
                  <SimpleGrid
                    cols={3}
                    p={10}
                    pr={20}
                    className="bg-[#f3f3f4] sm:grid block pr-[10px] sm:pr-[20px] pl-[10px] sm:pl-[20px] pt-[20px] sm:pt-[20px]"
                  >
                    {valueBucketState.map((card) => (
                      <NewValueBucket
                        key={card.id}
                        label={card.sectionName}
                      />
                    ))}
                    {/* {contentData.sections.sliders.elements.map((element) => (
                      <SliderCard
                        key={element.id}
                        label={element.title}
                        money={element.money}
                        progress={element.value}
                      />
                    ))} */}
                  </SimpleGrid>
                ) : section.GrayContent.type == "variables" ? (
                  <div className="bg-[#e9ecef]">

                    {/* <Flex
                      gap="xs"
                      direction="row"
                      wrap="wrap"
                      w={"100%"}
                      style={{ marginTop: 10, marginBottom: 10, padding: 10 }}
                    > */}
                    <InputVariable elements={section.GrayContent.elements as iElemsProp[]} type={section.GrayContent.type} />
                    {/* </Flex> */}
                  </div>
                ) : (
                  <div className="bg-[#e9ecef]">
                    <br></br>
                  </div>
                )}
              </div>
            </div>
          ))
          : ""}
        {/* <div style={{ width: "100%", color: "#676a6c" }}>
          <Projection
            title={contentData.sections.headers.title.mainTitle.text}
            description={contentData.sections.headers.title.description}
            subTitle={contentData.sections.headers.title.subTitle.text}
          />

          <SimpleGrid cols={3} p={10} pr={20} style={{ backgroundColor: "#e9ecef" }}>
            {contentData.sections.sliders.elements.map((element) => <SliderCard key={element.id} label={element.title} money={element.money} progress={element.value} />)}
          </SimpleGrid>
        </div> */}
      </>
    </AppShell>
  );
};

export default Enterprise;
