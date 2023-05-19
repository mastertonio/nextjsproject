import React, { useEffect, useState, useRef, BaseSyntheticEvent } from 'react';
import axios from 'axios';
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useRouter } from 'next/router';
import { getSession } from 'next-auth/react';
import EnterpriseNavbar from "@app/core/components/sidebar/EnterpriseNav";
import NavbarSimple from "@app/core/components/sidebar/EnterpriseSidebar";
import Projection from "@app/enterprise/Projection";
import {
  AppShell,
  Group,
  Badge,
  SimpleGrid,
  Card,
  Text,
  Grid,
  Stack,
  Input,
  Button,
  NumberInput,
  Tooltip,
  Divider,
  Textarea,
  Rating,
  Slider,
  Checkbox,
  Select,
  Radio,
} from "@mantine/core";
import { useScrollIntoView, useToggle } from '@mantine/hooks';
import { contentData, finalData } from "@app/enterprise/constants/content";
import SliderCard from "@app/core/components/card";
import CheckboxChoices, { iChoicesTypeProps, iOtherTypeProps } from "@app/enterprise/components/CheckboxChoices";
import DropdownChoices from "@app/enterprise/components/DropdownChoices";
import NewValueBucket from "@app/core/components/card/NewValueBucket";
import InputVariable, { iElemsProp, iElementProp } from "@app/enterprise/components/input/ElementInput";
import MainLoader from '@app/core/components/loader/MainLoader';
import { useTargetRefStore } from "@app/store/builderStore"
import { IconCheck, IconQuestionCircle } from '@tabler/icons';
import { useCalculatorStore } from '@app/store/builder/calculatorStore';
import {
  IconQuestionMark,
  IconZoomQuestion,
  IconCalculator,
  IconAt,
} from "@tabler/icons";
import { FaGripLinesVertical } from 'react-icons/fa'
import RichTextSection from '@app/core/components/richtext/RichTextSection';
import { showNotification, updateNotification } from '@mantine/notifications';
import he from 'he';
import RadioToggle from '@app/admin/components/RadioToggle';
import ReactPlayer from 'react-player';

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
  const [opened, setOpened] = useState(false);
  const router = useRouter();
  const { id } = router.query;
  const [show, setShow] = useState<boolean>(false)
  const [value, toggle] = useToggle(['teal', 'red']);
  const cells = useCalculatorStore((state) => (state.cells))
  const addItems = useCalculatorStore((state) => state.addItems)
  const update = useCalculatorStore((state) => state.update)
  const { setState } = useCalculatorStore
  const [valueBucketState, setValueBucketState] = useState<CardSection[]>([])
  const [sectionEmpty, setSectionEmpty] = useState<boolean>(false);
  const initialValue =
    "<p></p>";
  const [rteValue, setRTEValue] = useState<string>(initialValue)
  const { scrollIntoView, targetRef, scrollableRef } = useScrollIntoView<
    HTMLDivElement,
    HTMLDivElement
  >({ offset: 30, isList: true });
  const queryClient = useQueryClient()

  useEffect(() => {
    console.log("cells", cells)
  }, [cells])

  const getEnterpriseData = async () => {
    return await axios.get(`/v1/templateBuilder/${router.query.temp_ver}`, {
      headers: {
        Authorization: `Bearer ${login.data.user.tokens.access.token}`,
      },
    });
  };

  const hide = () => {
    setShow((prevState) => !prevState)
  }

  const handleScroll = () => {
    console.log('scroll', targetRef)
    scrollIntoView({
      alignment: 'center',
    })
  }

  console.log('temp version', router.query.temp_ver)
  // const getEnterpriseData = async () => {
  //   return await axios.get(`/v1/templateBuilder/${login.data.user.user.company_id}/${id}`, {
  //     headers: {
  //       Authorization: `Bearer ${login.data.user.tokens.access.token}`,
  //     },
  //   });
  // };

  const { isLoading, data, refetch, isSuccess } = useQuery(
    "enterpriseData",
    getEnterpriseData
  );

  useEffect(() => {
    console.log("data?.data", data?.data?.templateBuilderInfo);
    if (data?.data.data.content.sections.length === 0) {
      setSectionEmpty(true)
    } else {
      setSectionEmpty(false)
    }

    console.log("is section empty", sectionEmpty);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data])



  useEffect(() => {
    if (data?.data) {
      setState(data?.data.data.content.sections[0].grayContent.elements)
    }
    console.log("cellsis", cells)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cells, data])

  const flatData = data?.data.data.content.sections.map((section: { grayContent: { elements: any; }; }) => section.grayContent.elements).flat()

  useEffect(() => {
    addItems(flatData)
    // console.log("triggered",flatData, cells)
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
      navbar={<NavbarSimple sidebarData={data?.data.data.sidebar} sectionEmpty={sectionEmpty} scroll={handleScroll} />}
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
        <div className="w-full text-[#676a6c]">
          <div className="ml-[22px] mr-[22px]">
            <h1 className="text-left text-[#676a6c] text-[26px] sm:text-[30px] font-medium">{data?.data?.templateBuilderInfo?.name} | {data?.data?.templateBuilderInfo?.projection} Year Projection <span className="float-right text-[#216C2A] font-bold">$0</span></h1>
          </div>
        </div>
        <div className="overflow-hidden">
          <div className="ml-[22px] mr-[22px]">
            {/* <h1 className="text-left text-[#676a6c] text-[26px] sm:text-[30px] font-medium">Dashboard</h1> */}
            {/* <div dangerouslySetInnerHTML={{ __html: title }} /> */}
            {/* <div dangerouslySetInnerHTML={{ __html: subTitle }} /> */}
            {/* <div dangerouslySetInnerHTML={{ __html: description }} /> */}
          </div>
          {/* @jom loop mo dito lahat ng section tapos gawan mo ng slider cards lahat */}
          <SimpleGrid
            cols={3}
            p={10}
            pr={20}
            className="bg-[#f3f3f4] sm:grid block pr-[10px] sm:pr-[20px] pl-[10px] sm:pl-[20px] pt-[20px] sm:pt-[20px]"
          >
            {data?.data.data.content.sections.map((element: any) => (
              <SliderCard
                key={element._id}
                label={element.sectionTitle}
                money={0}
                progress={0}
                isSectionEmpty={sectionEmpty}
              />
            ))}
          </SimpleGrid>
          {/* <Grid className="sm:flex block">
        {quotes.position == "top" ? (
          <QuotesCarousel
            type={quotes.type}
            position={quotes.position}
            elements={quotes.elements}
          />
        ) : (
          ""
        )}
        {columns ? columns : ""}
        {quotes.position == "bottom" ? (
          <QuotesCarousel
            type={quotes.type}
            position={quotes.position}
            elements={quotes.elements}
          />
        ) : (
          ""
        )}
      </Grid> */}
          {/* { quotes.position == "bottom" ? (<QuotesCarousel type={quotes.type} position={quotes.position} elements={quotes.elements} />) : ""} */}
        </div>
        {data?.data
          ? data?.data.data.content.sections.map((section: any) => {
            console.log('enterprise section', section, data)
            return (
              <div className="w-full text-[#676a6c]" key={section.id} ref={targetRef}>
                <Projection
                  title={section.sectionTitle}
                  description={section.headers.description}
                  // subTitle={section.headers.title.subTitle.text}
                  // content={section.headers.title.content}
                  // length={section.headers.title.content.elements.length}
                  // quotes={section.headers.title.quotes}
                  key={section.order}
                />

                {section.headers?.title.content.elements[0] ? (
                  <div style={{ height: 300, margin: 30 }}>
                    <ReactPlayer
                      controls
                      playing
                      light={true}
                      className=""
                      url={section.headers?.title.content.elements[0]?.link ?? ''}
                      width="100%"
                      height="100%"
                    />
                  </div>
                ) : null}

                <Grid className="mt-[10px] mb-[10px] p-[10px] w-full">
                  <Stack pb={20} className="bg-[white] p-[10px] ml-[15px] rounded-[12px] w-[96%] sm:w-[100%] pb-[40px] sm:pb-30px]">
                    <form>
                      {section.grayContent.elements.length !== 0 ? (
                        <div className="mb-[30px]">
                          <Grid className="flex items-center">
                            <Text ml={30} dangerouslySetInnerHTML={{ __html: section.headers.title.description ? he.decode(section.headers.title.description) : "" }} color="dark" fz="xl" fw={700} />
                            <Button type="button" className="sm:ml-auto w-[100%] sm:w-[30%] m-[20px] sm:m-[20px]" color={value} onClick={() => toggle()} radius="md" size="md">
                              {value == "red" ? "Exclude" : "Include"}
                            </Button>
                          </Grid>
                          <Divider my="sm" color="gray" size="sm" variant="dashed" />
                        </div>
                      ) : ""}

                      {cells?.filter((item) => section.grayContent.elements.some((elem: { _id: any; }) => elem._id == item._id)).map((elem: any) => {
                        return (
                          <Stack key={elem._id}>
                            {elem.dataType == "Input" && elem.tooltip ? (
                              <Grid
                                className="ml-[30px] mr-[30px] mt-[20px] mb-[3px]"
                              >
                                <Text dangerouslySetInnerHTML={{ __html: he.decode(elem.title) }} className="text-[14px] w-1/2 mb-[10px] sm:mb-0" ></Text>
                                <div className='w-1/2 flex items-center'>
                                  <Input
                                    className="w-full"
                                    // icon={state.icon ? state.icon : ""}
                                    type="number"
                                    key={elem._id}
                                    defaultValue={elem.value}
                                    // id={elem.id}
                                    // {...register(`input${elem._id}`)}
                                    // onBlur={()=> this.refs.form.getDOMNode().dispatchEvent(new Event("submit"))}
                                    rightSection={
                                      elem.tooltip ?
                                        <Tooltip label={elem.tooltip} events={{ hover: true, focus: true, touch: false }}>
                                          <div className="flex flex-row items-center">
                                            <IconQuestionCircle size="20" />
                                          </div>
                                        </Tooltip> : ""
                                    }
                                    onBlur={async (event: BaseSyntheticEvent) => {
                                      console.log(event, "venti", elem)
                                      update({
                                        ...elem,
                                        value: +event.target.value
                                      })
                                      await axios.patch(`/v1/company/admintool/${data?.data.data.content.id}/section/${section._id}/element/${elem._id}`, {
                                        grayContent: {
                                          value: +event.target.value
                                        }
                                      }, {
                                        headers: {
                                          Authorization: `Bearer ${login.data.user.tokens.access.token}`,
                                        },
                                      })
                                      // console.log(cells, "from Inputtest")
                                    }}
                                    // disabled={state.disabled ? true : false}
                                    placeholder="$0"
                                  // defaultValue={myCompany.name}
                                  />
                                </div>
                              </Grid>
                              // <div className="flex items-center ml-auto remove-radius">
                              //   <Text className='mx-6'>{elem.title}</Text>
                              //   <NumberInput
                              //     className="w-[100px] md:w-[255px] 2xl:w-[255px]"
                              //     // icon={state.icon ? state.icon : ""}
                              //     hideControls
                              //   // rightSectionProps={{
                              //   //   onClick: showModalCalculate
                              //   // }}
                              //   // disabled
                              //   // value={result}
                              //   />
                              //   <Button
                              //     type="submit"
                              //     radius="xs"
                              //     size="sm"
                              //     className="w-[150px] sm:w-[unset] text-[12px] sm:text-[unset] rounded-l-none"
                              //     disabled
                              //   >
                              //     {elem.appendedText}
                              //   </Button>
                              //   {elem.tooltip ?
                              //     <Tooltip label={elem.tooltip} >
                              //       <IconQuestionCircle />
                              //     </Tooltip> : ""
                              //   }
                              // </div>
                            ) : elem.dataType == "Textarea"
                              // && elem.appendedText 
                              ? (
                                <Grid
                                  key={elem._id}
                                  className="ml-[30px] mr-[30px] mt-[20px] mb-[3px]"
                                >
                                  <Text dangerouslySetInnerHTML={{ __html: he.decode(elem.title) }} className="text-[14px] w-1/2 mb-[10px] sm:mb-0"></Text>
                                  <div className="w-1/2 ml-auto">
                                    {/* <Textarea
                                    className="w-full"
                                    withAsterisk
                                  /> */}
                                    <RichTextSection content={rteValue} onChange={setRTEValue} />
                                  </div>
                                </Grid>
                              ) : elem.dataType == "Ratings" ? (
                                <Grid
                                  key={elem._id}
                                  className="ml-[30px] mr-[30px] mt-[20px] mb-[3px]"
                                >
                                  <Text dangerouslySetInnerHTML={{ __html: he.decode(elem.title) }} className="text-[14px] w-1/2 mb-[10px] sm:mb-0"></Text>
                                  <div className="w-1/2 flex flex-row justify-center">
                                    <Rating
                                      defaultValue={5}
                                      fractions={2}
                                      className="mt-[10px] sm:mt-0"
                                      color="indigo" size="xl"
                                    />
                                  </div>
                                </Grid>
                              )
                                // : elem.dataType == "Checkbox" ? (
                                //   <Grid
                                //     key={elem._id}
                                //     className="ml-[30px] mr-[30px] mt-[20px] mb-[3px]"
                                //   >
                                //     <Text dangerouslySetInnerHTML={{ __html: he.decode(elem.title) }} className="text-[14px] w-1/2 mb-[10px] sm:mb-0"></Text>
                                //     <div className="flex w-1/2 items-center">
                                //       <Checkbox
                                //         label={elem.title}
                                //         color="dark"
                                //         radius="xl"
                                //         key={elem._id}
                                //       />
                                //     </div>
                                //   </Grid>
                                // ) 
                                : elem.dataType == "Dropdown" ? (
                                  <Grid
                                    key={elem._id}
                                    className="ml-[30px] mr-[30px] mt-[20px] mb-[3px]"
                                  >
                                    <Text dangerouslySetInnerHTML={{ __html: he.decode(elem.title) }} className="text-[14px] w-1/2 mb-[10px] sm:mb-0"></Text>
                                    <div className="flex flex-col ml-auto w-1/2">
                                      <Select
                                        data={elem.choices ? elem.choices : ""}
                                        placeholder="Pick one"
                                      />
                                    </div>
                                  </Grid>
                                ) : elem.dataType == "Radio" ? (
                                  <Grid
                                    key={elem._id}
                                    className="ml-[30px] mr-[30px] mt-[20px] mb-[3px]"
                                  >
                                    <Text dangerouslySetInnerHTML={{ __html: he.decode(elem.title) }} className="text-[14px] w-1/2 mb-[10px] sm:mb-0"></Text>
                                    <div className="flex flex-col ml-auto w-1/2">
                                      {elem.choices.map((elem: { label: string, _id: string }) => (
                                        <RadioToggle key={elem._id} color='gray' label={elem.label} />))}
                                    </div>
                                  </Grid>
                                ) : elem.dataType == "Checkbox" ? (
                                  <Grid
                                    key={elem._id}
                                    className="ml-[30px] mr-[30px] mt-[20px] mb-[3px]"
                                  >
                                    <Text dangerouslySetInnerHTML={{ __html: he.decode(elem.title) }} className="text-[14px] w-1/2 mb-[10px] sm:mb-0"></Text>
                                    <div className="flex flex-col ml-auto w-1/2">
                                      {elem.choices.map((elem: { label: string, _id: string }) => (
                                        <Checkbox
                                          key={elem._id}
                                          label={elem.label}
                                        />
                                      ))
                                      }
                                    </div>
                                  </Grid>
                                ) : elem.dataType == "Output" && elem.appendedText ? (
                                  <Grid
                                    className="ml-[30px] mr-[30px] mt-[20px] mb-[3px]"
                                  >
                                    <Text dangerouslySetInnerHTML={{ __html: he.decode(elem.title) }} className="text-[14px] w-1/2 mb-[10px] sm:mb-0"></Text>
                                    <div className='w-1/2 flex items-center'>
                                      <Input
                                        className="w-full appended-radius"
                                        // icon={state.icon ? state.icon : ""}
                                        type="number"
                                        key={elem._id}
                                        value={elem.value}

                                        disabled={true}
                                        placeholder="$0"
                                      // defaultValue={myCompany.name}
                                      />
                                      <Button className="appended-btn" type="submit" variant="filled" color="gray" radius="xs" disabled>{elem.appendedText}</Button>
                                    </div>
                                  </Grid>
                                ) : elem.dataType == "Input" && elem.appendedText ? (
                                  <Grid
                                    className="ml-[30px] mr-[30px] mt-[20px] mb-[3px]"
                                  >
                                    <Text dangerouslySetInnerHTML={{ __html: he.decode(elem.title) }} className="text-[14px] w-1/2 mb-[10px] sm:mb-0"></Text>
                                    <div className='w-1/2 flex'>
                                      <Input
                                        className="w-full appended-radius"
                                        // icon={state.icon ? state.icon : ""}
                                        type="number"
                                        key={elem._id}
                                        // id={elem.id}
                                        // {...register(`input${elem._id}`)}
                                        // onBlur={()=> this.refs.form.getDOMNode().dispatchEvent(new Event("submit"))}
                                        // disabled={state.disabled ? true : false}
                                        placeholder="$0"
                                      // defaultValue={myCompany.name}
                                      />
                                      <Button className="appended-btn w-auto" variant="filled" color="gray" radius="xs" disabled>{elem.appendedText}</Button>
                                    </div>
                                  </Grid>
                                ) : elem.dataType == "Input" ? (
                                  <Grid
                                    className="ml-[30px] mr-[30px] mt-[20px] mb-[3px]"
                                  >
                                    <Text dangerouslySetInnerHTML={{ __html: he.decode(elem.title) }} className="text-[14px] w-1/2 mb-[10px] sm:mb-0"></Text>
                                    <div className='w-1/2 flex items-center'>
                                      <Input
                                        className="w-full"
                                        // icon={state.icon ? state.icon : ""}
                                        type="number"
                                        key={elem._id}
                                        // id={elem.id}
                                        // {...register(`input${elem._id}`)}
                                        // onBlur={()=> this.refs.form.getDOMNode().dispatchEvent(new Event("submit"))}
                                        // disabled={state.disabled ? true : false}
                                        placeholder="$0"
                                      // defaultValue={myCompany.name}
                                      />
                                    </div>
                                  </Grid>
                                ) : ""}
                          </Stack>
                        )
                      })}
                    </form>
                  </Stack>

                  {/* <div className="bg-[#e9ecef]">
                    <InputVariable elements={section.grayContent.elements} type={section.grayContent.dataType} />
                  </div> */}
                  {/* {section.grayContent.dataType == "sliders" ? (
                    <SimpleGrid
                      cols={3}
                      p={10}
                      pr={20}
                      className="bg-[#f3f3f4] sm:grid block pr-[10px] sm:pr-[20px] pl-[10px] sm:pl-[20px] pt-[20px] sm:pt-[20px]"
                    >
                      {data?.data.data.content.sections.map((element: any) => (
                        <SliderCard
                          key={element._id}
                          label={element.sectionTitle}
                          money={0}
                          progress={0}
                          isSectionEmpty={sectionEmpty}
                        />
                      ))}
                    </SimpleGrid>
                  ) : section.grayContent.dataType == "variables" ? (
                    <div className="bg-[#e9ecef]">
                      <InputVariable elements={section.grayContent.elements as iElementProp[]} type={section.grayContent.dataType} />
                    </div>
                  ) : (
                    <div className="bg-[#e9ecef]">
                      <InputVariable elements={section.grayContent.elements as iElementProp[]} type={section.grayContent.dataType} />
                    </div>
                  )} */}
                </Grid>
              </div>
            )
          })
          : ""}

        {/* <div className="w-full text-[#676a6c]">
          <div>
            <SimpleGrid
              cols={3}
              p={10}
              pr={20}
              className="bg-[#f3f3f4] sm:grid block pr-[10px] sm:pr-[20px] pl-[10px] sm:pl-[20px] pt-[20px] sm:pt-[20px]"
            >
              {data?.data.data.content.sections.map((section: any) => (
                <SliderCard
                  key={section._id}
                  label={section.sectionTitle}
                  money={0}
                  progress={0}
                  isSectionEmpty={sectionEmpty}
                />
              ))}
            </SimpleGrid>
          </div>
        </div>

        {data?.data.data.content.sections.map((section: any, index: any) => (
          <div key={index}>
            {section.grayContent.dataType === "variables" ? (
              <div className="bg-[#e9ecef]">
                <InputVariable elements={section.grayContent.elements as iElemsProp[]} type={section.grayContent.dataType} />
              </div>
            ) : (
              <div className="bg-[#e9ecef]">
                <br></br>
              </div>
            )}
          </div>
        ))} */}


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
    </AppShell >
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
