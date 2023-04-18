import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useQuery } from "react-query";
import { useRouter } from 'next/router';
import { getSession } from 'next-auth/react';
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

// Definitions of API data
type SidebarMenuItem = {
  _id: string;
  link: string | null;
  title: string;
  icon: string;
  menuSequence: number;
  navigationlist: SidebarNavigationItem[]
}

type SidebarNavigationItem = {
  _id: string;
  link: string | null;
  title: string;
  listSequence: number
}

type EnterpriseProps = {
  sidebar: {
    brand: {
      logo: string;
      title: string;
    };
    navigationMenu: SidebarMenuItem[];
  }
  content: {
    sections: {
      section_id: string;
      order: number;
      type: string;
      elements: {
        [key: string]: any;
        'dashboard-header': {
          element_id: string;
          title: string;
          projection: number;
          currency: string;
          currencySymbol: string;
          grandTotal: string;
          writeUp: string;
        };
        'dashboard-cards': {
          element_id: string;
          order: number;
          header: {
            title: string;
            isVisible: boolean;
          };
          body: {
            type: string;
            total: number;
            isVisible: boolean;
            currency: string;
            currencySymbol: string;
          };
          footer: {
            type: string;
            label: string;
            isVisible: boolean;
            value: number;
          };
        }[];
      };
    }[];
  };
};

const Enterprise: React.FC<any> = (login) => {
  const router = useRouter();
  const { id } = router.query;
  const [valueBucketState, setValueBucketState] = useState<CardSection[]>([])
  const getEnterpriseData = async () => {
    return await axios.get(`/v1/templateBuilder/${router.query.temp_ver}`, {
      headers: {
        Authorization: `Bearer ${login.data.user.tokens.access.token}`,
      },
    });
  };
  // const getEnterpriseData = async () => {
  //   return await axios.get(`/v1/templateBuilder/${login.data.user.user.company_id}/${id}`, {
  //     headers: {
  //       Authorization: `Bearer ${login.data.user.tokens.access.token}`,
  //     },
  //   });
  // };

  const { isLoading, data, refetch, isSuccess } = useQuery(
    "enterpriseData",
    getEnterpriseData,
  );

  useEffect(() => {
    console.log("data?.data", data);
  }, [data, login])


  useEffect(() => {
    const formValue = JSON.parse(localStorage.getItem("valueBucket") ?? '[]') as CardSection[];
    setValueBucketState(formValue)
    console.log('storage value bucket', valueBucketState)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


  return (
    <AppShell
      padding={0}
      navbar={<NavbarSimple sidebarData={data?.data.data.sidebar} />}
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
        {data?.data
          ? data?.data.data.content.sections.map((section: any) => (
            <div className="w-full text-[#676a6c]" key={section.id}>
              <Projection
                title={section.headers.title.mainTitle.text}
                description={section.headers.description}
                // subTitle={section.headers.title.subTitle.text}
                // content={section.headers.title.content}
                // length={section.headers.title.content.elements.length}
                // quotes={section.headers.title.quotes}
                key={section.order}
              />

              <SimpleGrid
                cols={3}
                p={10}
                pr={20}
                className="bg-[#f3f3f4] sm:grid block pr-[10px] sm:pr-[20px] pl-[10px] sm:pl-[20px] pt-[20px] sm:pt-[20px]"
              >
                {section.grayContent.elements.map((element: any) => (
                  <SliderCard
                    key={element.element_id}
                    label={element?.header?.title}
                    money={element?.body?.total}
                    progress={element?.footer?.value}
                  />
                ))}
              </SimpleGrid>
              <div>
                {section.grayContent.dataType == "sliders" ? (
                  <SimpleGrid
                    cols={3}
                    p={10}
                    pr={20}
                    className="bg-[#f3f3f4] sm:grid block pr-[10px] sm:pr-[20px] pl-[10px] sm:pl-[20px] pt-[20px] sm:pt-[20px]"
                  >
                    {contentData.sections.sliders.elements.map((element) => (
                      <SliderCard
                        key={element.id}
                        label={element.title}
                        money={element.money}
                        progress={element.value}
                      />
                    ))}
                  </SimpleGrid>
                ) : section.grayContent.dataType == "variables" ? (
                  <div className="bg-[#e9ecef]">
                    <InputVariable elements={section.grayContent.elements as iElemsProp[]} type={section.grayContent.dataType} />
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

export async function getServerSideProps(ctx: any) {
  const { params } = ctx;
  const session = await getSession({ req: ctx.req });
  if (!session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return { props: { data: session, id: params.id } }
}
