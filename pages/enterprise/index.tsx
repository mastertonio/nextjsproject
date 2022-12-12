import EnterpriseNavbar from "@app/core/components/sidebar/EnterpriseNav";
import NavbarSimple from "@app/core/components/sidebar/EnterpriseSidebar";
import Projection from "@app/enterprise/Projection";
import { AppShell, Navbar, Header, Grid, SimpleGrid } from "@mantine/core";
import { contentData, finalData } from "@app/enterprise/constants/content";
import SliderCard from "@app/core/components/card";

const Enterprise = () => {
  const getContentType = (content: any) => {

  }

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
          margin: 0
        },
      })}
      style={{ margin: 0, padding: 0 }}
    >
      <>
        {finalData ? finalData.sections.map((section) => (
          <div style={{ width: "100%", color: "#676a6c" }} key={section.id}>
            <Projection
              title={section.headers.title.mainTitle.text}
              description={section.headers.title.description}
              subTitle={section.headers.title.subTitle.text}
              content={section.headers.title.content}
              length={section.headers.title.content.elements.length}
              quotes={section.headers.title.quotes}
            />

            {/* filter Gray Contents here */}
            {section.GrayContent.type == "sliders" ?
              (<SimpleGrid cols={3} p={10} pr={20} style={{ backgroundColor: "#e9ecef" }}>
                {contentData.sections.sliders.elements.map((element) => <SliderCard key={element.id} label={element.title} money={element.money} progress={element.value} />)}
              </SimpleGrid>)
              : section.GrayContent.type == "" ?
                (<SimpleGrid cols={3} p={10} pr={20} style={{ backgroundColor: "#e9ecef" }}>
                 <div style={{ height: 100}}></div>
                </SimpleGrid>)
                : ""
            }

          </div>)) : ""}
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
