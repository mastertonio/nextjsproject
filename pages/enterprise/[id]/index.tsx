import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useQuery } from "react-query";
import { useRouter } from 'next/router';
import { getSession } from 'next-auth/react';
import EnterpriseNavbar from "@app/core/components/sidebar/EnterpriseNav";
import NavbarSimple from "@app/core/components/sidebar/EnterpriseSidebar";
import Projection from "@app/enterprise/Projection";
import { AppShell, Group, Badge, SimpleGrid, Card, Text, Grid, Stack } from "@mantine/core";
import { contentData, finalData } from "@app/enterprise/constants/content";
import SliderCard from "@app/core/components/card";
import NewValueBucket from "@app/core/components/card/NewValueBucket";
import InputVariable, { iElemsProp } from "@app/enterprise/components/input/NewInput";
import MainLoader from '@app/core/components/loader/MainLoader';

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
  const [sectionEmpty, setSectionEmpty] = useState<boolean>(false);
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
    if (data?.data.data.content.sections.length === 0) {
      setSectionEmpty(true)
    } else {
      setSectionEmpty(false)
    }

    console.log("is section empty", sectionEmpty);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data])


  useEffect(() => {
    const formValue = JSON.parse(localStorage.getItem("valueBucket") ?? '[]') as CardSection[];
    setValueBucketState(formValue)
    console.log('storage value bucket', valueBucketState)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (isLoading) return <MainLoader />;

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

              {/* <SimpleGrid
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
              </SimpleGrid> */}
              <div>
                {section.grayContent.dataType == "sliders" ? (
                  <SimpleGrid
                    cols={3}
                    p={10}
                    pr={20}
                    className="bg-[#f3f3f4] sm:grid block pr-[10px] sm:pr-[20px] pl-[10px] sm:pl-[20px] pt-[20px] sm:pt-[20px]"
                  >
                    {section.grayContent.elements.map((element: any) => (
                      <SliderCard
                        key={element.element_id}
                        label={section.sectionTitle}
                        money={element?.body?.total}
                        progress={element?.footer?.value}
                        isSectionEmpty={sectionEmpty}
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

        {sectionEmpty && (
          <div className="w-full text-[#676a6c]">
            <div className="overflow-hidden">
              <div className="ml-[22px] mr-[22px]">
                <h1 className="text-left text-[#676a6c] text-[26px] sm:text-[30px] font-medium">No Data Found <span className="float-right text-[#216C2A] font-bold"></span></h1>
              </div>
            </div>

            <SimpleGrid
              cols={3}
              p={10}
              pr={20}
              className="bg-[#f3f3f4] sm:grid block pr-[10px] sm:pr-[20px] pl-[10px] sm:pl-[20px] pt-[20px] sm:pt-[20px]"
            >
              <Card className="h-[240px] mb-4 !border-t-[4px] border-t-[#e7eaec] hover:border-t-[#2f4050] animate-card" shadow="sm" p="lg" withBorder>
                <Card.Section withBorder className="h-[48px] mb-0 pt-[14px] pl-[15px] pr-[15px] pb-[6px] "
                >
                  <Group position="apart">
                    <Text className="text-[20px] sm:text-[18px] text-[#428bca]" weight={700}></Text>
                    <Badge variant="filled" className="rounded-[0.25em] text-[10px] leading-[15px] pt-[3px] pb-[3px] pl-[8px] pr-[8px]"></Badge>
                  </Group>
                </Card.Section>
                <Card.Section>

                </Card.Section>
                <Text className="text-[30px] text-[#216C2A] mt-[20px] mb-[20px]" weight={700} align='end'>
                </Text>
              </Card>

              <Card className="h-[240px] mb-4 !border-t-[4px] border-t-[#e7eaec] hover:border-t-[#2f4050] animate-card" shadow="sm" p="lg" withBorder>
                <Card.Section withBorder className="h-[48px] mb-0 pt-[14px] pl-[15px] pr-[15px] pb-[6px] "
                >
                  <Group position="apart">
                    <Text className="text-[20px] sm:text-[18px] text-[#428bca]" weight={700}></Text>
                    <Badge variant="filled" className="rounded-[0.25em] text-[10px] leading-[15px] pt-[3px] pb-[3px] pl-[8px] pr-[8px]"></Badge>
                  </Group>
                </Card.Section>
                <Card.Section>

                </Card.Section>
                <Text className="text-[30px] text-[#216C2A] mt-[20px] mb-[20px]" weight={700} align='end'>
                </Text>
              </Card>
            </SimpleGrid>

            <div className="bg-[#e9ecef]">
              <Grid
                className="mt-[10px] mb-[10px] p-[10px] w-full"
              >
                <Stack pb={20} className="bg-[white] p-[10px] ml-[15px] rounded-[12px] w-[96%] sm:w-[76%] pb-[30px] sm:pb-[20px] h-[500px]"></Stack>

                <div className="ml-[15px] sm:ml-auto w-full sm:w-[22%] mt-[10px] sm:mt-0">
                  <Card mb={10} shadow="sm" p="lg" radius="md" withBorder>
                    <Card.Section pt={20} pl={20} className="h-[300px]">
                      <Text fz={25} ></Text>
                    </Card.Section>
                  </Card>
                </div>
              </Grid>
            </div>
          </div>
        )}
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
