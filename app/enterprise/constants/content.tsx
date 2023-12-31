import { Button } from "@mantine/core";
import { Table } from "@mantine/core/lib/Table";
import {
  IconQuestionMark,
  IconZoomQuestion,
  IconCalculator,
  IconAt,
} from "@tabler/icons";

export const contentData = {
  sections: {
    id: "Section 1",
    order: 1,
    headers: {
      title: {
        type: "element",
        mainTitle: {
          type: "text",
          style: "",
          text: '<h1 class="text-left text-[green] text-[28px] sm:text-[2em]">ROI DASHBOARD | 2 Year Projection <span style="float:right;">$0</span></h1>',
        },
        subTitle: {
          type: "text",
          text: `<hr><h3 class="text-[22px] font-bold">Select a section below to review your ROI</h3>`,
        },
        description: `<p class="text-[16px]">To calculate your return on investment, begin with the first section below. The information entered therein will automatically populate corresponding fields in the other sections. You will be able to move from section to section to add and/or adjust values to best reflect your organization and process. To return to this screen, click the ROI Dashboard button to the left.</p>`,
      },
    },
    sliders: {
      type: "element",
      classes: "row border-bottom gray-bg dashboard-header",
      elements: [
        {
          type: "card",
          classes: "col-lg-4",
          title: "Improve Win Rate",
          sliderType: "stacked",
          money: 50,
          label: "Conservative Factor:",
          value: 50,
          step: 5,
          id: "CON1940",
        },
        {
          type: "slider",
          classes: "col-lg-4",
          title: "Reduce",
          sliderType: "stacked",
          money: 10,
          label: "Conservative Factor:",
          value: 10,
          step: 5,
          id: "CON1941",
        },
        {
          type: "slider",
          classes: "col-lg-4",
          title: "Additional Selling Time",
          sliderType: "stacked",
          money: 150,
          label: "Conservative Factor:",
          value: 90,
          step: 5,
          id: "CON1942",
        },
        {
          type: "slider",
          classes: "col-lg-4",
          title: "Fast Onboarding",
          sliderType: "stacked",
          money: 22,
          label: "Conservative Factor:",
          value: 70,
          step: 5,
          id: "CON1943",
        },
        {
          type: "slider",
          classes: "col-lg-4",
          title: "Customer Retention",
          sliderType: "stacked",
          money: 11,
          label: "Conservative Factor:",
          value: 30,
          step: 5,
          id: "CON1944",
        },
        {
          type: "slider",
          classes: "col-lg-4",
          title: "Summary",
          sliderType: "stacked",
          money: 750,
          label: "Conservative Factor:",
          value: 20,
          step: 5,
          id: "CON1945",
        },
      ],
    },
  },
};

export const finalData = {
  sections: [
    {
      id: "Section 1",
      order: 1231241,
      headers: {
        title: {
          type: "element",
          mainTitle: {
            type: "text",
            style: "",
            text: '<h1 class="text-left text-[#676a6c] text-[26px] sm:text-[30px] font-medium">ROI DASHBOARD | 2 Year Projection <span class="float-right text-[#216C2A] font-bold">$0</span></h1>',
          },
          subTitle: {
            type: "text",
            text: `<hr><h3 class="text-[22px] font-bold">Select a section below to review your ROI</h3>`,
          },
          description: `<p class="text-[16px]">To calculate your return on investment, begin with the first section below. The information entered therein will automatically populate corresponding fields in the other sections. You will be able to move from section to section to add and/or adjust values to best reflect your organization and process. To return to this screen, click the ROI Dashboard button to the left. <br><br></p>`,
          quotes: {
            type: "revolver",
            position: "bottom", //top , bottom of writeup, outside = outside entire section header
            elements: [
              {
                type: "quote",
                quote: {
                  text: "We love the tool! It is changing the conversation we have with our existing customers.",
                  author: "David Verhaag, Vice President Customer Success",
                },
              },
              {
                type: "quote",
                quote: {
                  text: "Hey Michael, I created an ROI for my first client yesterday and we closed today. The ROI Shop made getting approval from the CFO a piece of cake and resulted in my first sale!",
                  author: "Natalie Grant - Sales Rep",
                },
              },
            ],
          },
          content: {
            type: "",
            elements: [],
          },
        },
      },
      GrayContent: {
        type: "sliders",
        classes: "row border-bottom gray-bg dashboard-header",
        elements: [
          {
            type: "card",
            classes: "col-lg-4",
            title: "Improve Win Rate",
            sliderType: "stacked",
            money: 50,
            label: "Conservative Factor:",
            value: 50,
            step: 5,
            id: "CON1940",
          },
          {
            type: "slider",
            classes: "col-lg-4",
            title: "Reduce",
            sliderType: "stacked",
            money: 10,
            label: "Conservative Factor:",
            value: 10,
            step: 5,
            id: "CON1941",
          },
          {
            type: "slider",
            classes: "col-lg-4",
            title: "Additional Selling Time",
            sliderType: "stacked",
            money: 150,
            label: "Conservative Factor:",
            value: 90,
            step: 5,
            id: "CON1942",
          },
          {
            type: "slider",
            classes: "col-lg-4",
            title: "Fast Onboarding",
            sliderType: "stacked",
            money: 22,
            label: "Conservative Factor:",
            value: 70,
            step: 5,
            id: "CON1943",
          },
          {
            type: "slider",
            classes: "col-lg-4",
            title: "Customer Retention",
            sliderType: "stacked",
            money: 11,
            label: "Conservative Factor:",
            value: 30,
            step: 5,
            id: "CON1944",
          },
          {
            type: "slider",
            classes: "col-lg-4",
            title: "Summary",
            sliderType: "stacked",
            money: 750,
            label: "Conservative Factor:",
            value: 20,
            step: 5,
            id: "CON1945",
          },
        ],
      },
    },
    {
      id: "Section 2",
      order: 1123346,
      headers: {
        title: {
          type: "element",
          mainTitle: {
            type: "text",
            style: "",
            text: '<h1 class="mb-[20px] text-[24px] sm:text-[2em]">Improve Win Rate <span class="float-right">$0</span></h1>',
          },
          subTitle: {
            type: "text",
            text: `<hr/>`,
          },
          quotes: {
            type: "revolver",
            position: "bottom", //top , bottom of writeup, outside = outside entire section header
            elements: [
              {
                type: "quote",
                quote: {
                  text: "We love the tool! It is changing the conversation we have with our existing customers.",
                  author: "David Verhaag, Vice President Customer Success",
                },
              },
              {
                type: "quote",
                quote: {
                  text: "Hey Michael, I created an ROI for my first client yesterday and we closed today. The ROI Shop made getting approval from the CFO a piece of cake and resulted in my first sale!",
                  author: "Natalie Grant - Sales Rep",
                },
              },
              {
                type: "quote",
                quote: {
                  text: "IT spending is on the decline - It will be more important than ever to arm your <q>Champion</q>> with the tools necessary to sell the project internally.",
                  author: "Gartner",
                },
              },
            ],
          },
          description: "",
          content: {
            type: "headerElements",
            //we will determine how many columns to add by using elements.length and I think we must put a limit of 2 or 3 content per column and if it is more than 4, we will add another row of div with columns of the remainder of 2 or 3
            elements: [
              {
                type: "description",
                span: "auto", //number or "auto" to adapt on another element with specific size
                text: `Studies show that 40 - 60% of all opportunities will end in a no decision. 
                    This happens so often because prospects have a difficult time quantifying your benefits / value.. 
                    Companies will make a purchasing decision for two main reasons:
                    <br><br>
                    1) You're going to make them money<br><br>
                    2) You're going to save them money<br><br>
                    Yet the majority of salespeople do not have the tools to engage in these types of financial discussions. 
                    Therefore they are only left to sell features and functionality.
                    <br><br><hr>`,
              },
              {
                type: "media",
                class: "col-lg-5",
                span: "auto",
                mediaOrigin: "video", // youtubee or another video - will act as second type to the media type
                link: `https://www.youtube.com/embed/zT9t8G7ajhg`,
              },
              // {
              //   type: "description",
              //   span: "auto", //number or "auto" to adapt on another element with specific size
              //   text: `Studies show that 40 - 60% of all opportunities will end in a no decision.
              //   This happens so often because prospects have a difficult time quantifying your benefits / value..
              //       Companies will make a purchasing decision for two main reasons:
              //       <br><br>
              //       1) You're going to make them money<br><br>
              //       2) You're going to save them money<br><br>
              //       <br><br><hr>`,
              // },
              // {
              //   type: "description",
              //   span: "auto", //number or "auto" to adapt on another element with specific size
              //   text: `Studies show that 40 - 60% of all opportunities will end in a no decision.
              //   This happens so often because prospects have a difficult time quantifying your benefits / value..
              //       Companies will make a purchasing decision for two main reasons:
              //       <br><br>
              //       1) You're going to make them money<br><br>
              //       2) You're going to save them money<br><br>
              //       <br><br><hr>`,
              // },
            ],
          },
        },
      },

      GrayContent: {
        type: "variables",
        classes: "row border-bottom gray-bg dashboard-header",
        elements: [
          {
            id: "0112334544",
            type: "text",
            text: "<h4>Please tell us a little about your sales organization</h4>",
            toggle: true,
            elements: [
              {
                id: "02078",
                cellId: "A1",
                type: "input",
                label: "Number of salespeople",
                format: "0,0",
                icon: null,
                rightSection: null,
                disabled: false
              },
              {
                id: "03697",
                cellId: "A2", //
                type: "input",
                label: "Average deal value",
                format: "$0,0",
                icon: null,
                rightSection: null,
                disabled: false
              },
              {
                id: "05678",
                cellId: "A3",
                type: "output",
                label:
                  "What is the expected combined annual sales for those reps",
                formula: "A1 x A2", //
                format: "$0,0",
                icon: null,
                rightSection: (<Button variant="subtle" color="gray" radius="xs" size="xs" compact><IconCalculator size="18" /></Button>),
                disabled: true
              },
              {
                id: "060678",
                type: "input",
                label: "Deals needed to hit your sales goal",
                formula: "TBD",
                format: "0,0",
                icon: null,
                rightSection: null,
                disabled: false
              },
              {
                id: "091372",
                type: "inputB",
                label: 'Opportunities lost to "no decision" and / or competition based on win rate',
                formula: "TBD",
                format: "0,0",
                icon: null,
                rightSection: (<Button variant="subtle" color="gray" radius="xs" size="xs" compact><IconCalculator size="18" /></Button>),
                disabled: false
              },
              {
                id: "077890",
                type: "textarea",
                label: "What are the main reasons you lose to the outcome:",
                icon: null,
                rightSection: null,
                disabled: false
              },
              {
                id: "0227678",
                type: "stars",
                label: "Map and explore dependencies between all business entities.",
                icon: null,
                rightSection: null,
                disabled: false
              },
              {
                id: "033789",
                type: "slid",
                label: "Fusion Gains - Impact Analysis (target 50%)",
                icon: null,
                rightSection: null,
                disabled: false
              },
            ],

          }, {
            id: "0117925",
            type: "text",
            text: "<h4>Increase Sales With A Better Value Articulation</h4>",
            toggle: false,
            elements: [
              {
                id: "02780",
                type: "input",
                label: "Out of the 0 deals lost, how many could you have won with better value messaging?",
                format: "0,0",
                icon: null,
                rightSection: null,
                disabled: false
              },
              {
                id: "053679",
                type: "output",
                label:
                  "ncrease Sales Revenue by Reducing Loss Rate by Only 0%",
                formula: "TBD",
                format: "$0,0",
                icon: null,
                rightSection: (<Button variant="subtle" color="gray" radius="xs" size="xs" compact><IconQuestionMark size="18" /></Button>),
                disabled: true
              },
              {
                id: "07457856976",
                type: "textarea",
                label: "What are the main reasons you lose to the outcome:",
                icon: (<Button variant="subtle" color="gray" radius="xs" size="xs" compact><IconQuestionMark size="18" /><IconQuestionMark size="18" /></Button>),
                rightSection: null,
                disabled: false
              }, {
                id: "110797949",
                type: "table",
                label: "Table testing, with label or no ?",
                disabled: false,
                content: (`<table>
                <tbody>
                  <tr>
                    <th>Name</th>
                    <th colspan="3">Description</th>
                  </tr>
                  <tr>
                    <td>Cyndi Lauper</td>
                    <td>singer</td>
                    <td>songwriter</td>
                    <td>actress</td>
                  </tr>
                  <tr>
                    <td>Marie Curie</td>
                    <td>scientist</td>
                    <td>chemist</td>
                    <td>physicist</td>
                  </tr>
                  <tr>
                    <td>Indira Gandhi</td>
                    <td>prime minister</td>
                    <td colspan="2">politician</td>
                  </tr>
                </tbody>
              </table>`)
              },
              {
                id: "856888379979",
                type: "checkbox",
                label: "Identify the activities your Plan and Process Owners participate in:",
                icon: null,
                rightSection: null,
                disabled: false,
                other: {
                  enabled: true,
                  name: "Other",
                  elements: [
                    {
                      id: "0745645456",
                      type: "textarea",
                      label: "What are the main reasons you lose to the outcome:",
                      icon: null,
                      rightSection: null,
                      disabled: false
                    },
                  ]
                },
                choices: [
                  {
                    id: '00167987567',
                    name: "Define/Document Processes"
                  },
                  {
                    id: '002948',
                    name: "Create Impact Assessments"
                  },
                  {
                    id: '00356767',
                    name: "Document Process Requirements and Dependencies"
                  },
                  {
                    id: '0047897890',
                    name: "Develop Plans"
                  },
                  {
                    id: '00545656',
                    name: "Develop Recovery Strategies"
                  },
                  {
                    id: '006678789',
                    name: "Educate Team on Plan"
                  },
                  {
                    id: '007123123123',
                    name: "Exercise Plan (and Team)"
                  }
                ]
              },
              {
                id: "08989898989",
                type: "dropdown",
                label: "Identify the activities your Plan and Process Owners participate in:",
                icon: null,
                rightSection: null,
                disabled: false,
                other: {
                  enabled: true,
                  name: "Other",
                  elements: [
                    {
                      id: "0177777",
                      type: "textarea",
                      label: "What are the main reasons you lose to the outcome:",
                      icon: null,
                      rightSection: null,
                      disabled: false
                    },
                    {
                      id: "0666666",
                      type: "input",
                      label: "Lost revenue per deal",
                      formula: "TBD",
                      format: "0,0",
                      icon: null,
                      rightSection: null,
                      disabled: false
                    },
                  ]
                },
                choices: [
                  {
                    id: '00111111',
                    name: "Define/Document Processes"
                  },
                  {
                    id: '0022222',
                    name: "Create Impact Assessments"
                  },
                  {
                    id: '003333',
                    name: "Document Process Requirements and Dependencies"
                  },
                  {
                    id: '0044444',
                    name: "Develop Plans"
                  },
                  {
                    id: '00555555',
                    name: "Develop Recovery Strategies"
                  },
                  {
                    id: '006566556',
                    name: "Educate Team on Plan"
                  },
                  {
                    id: '0073454545',
                    name: "Exercise Plan (and Team)"
                  }
                ]
              },
            ],
          },
          // {
          //   id: "03",
          //   type: "text",
          //   text: "<h4>Cost of Discounting - Current State</h4>",
          //   elements: [
          //     {
          //       id: "02",
          //       type: "input",
          //       label: "Average deal value",
          //       format: "0,0",
          //       icon: null, 
          //       rightSection: null, 
          //       disabled: false
          //     },
          //     {
          //       id: "03",
          //       type: "input",
          //       label: "Average discount applied per deal (%)",
          //       format: "$0,0",
          //       icon: null, 
          //       rightSection: null, 
          //       disabled: false
          //     },
          //     {
          //       id: "05",
          //       type: "output",
          //       label:
          //         "Estimated list price before discounting",
          //       formula: "TBD",
          //       format: "$0,0",
          //       icon: null, 
          //       rightSection: null, 
          //       disabled: true
          //     },
          //     {
          //       id: "06",
          //       type: "input",
          //       label: "Lost revenue per deal",
          //       formula: "TBD",
          //       format: "0,0",
          //       icon: null, 
          //       rightSection: null, 
          //       disabled: false
          //     },
          //     {
          //       id: "07",
          //       type: "textarea",
          //       label: 'Number of "deals" needed to hit your sales goal',
          //       icon: null, 
          //       rightSection: null, 
          //       disabled: false
          //     },
          //   ],
          // },
        ],
      },
    },
    {
      id: "Section 3",
      order: 1789,
      headers: {
        title: {
          type: "element",
          mainTitle: {
            type: "text",
            style: "",
            text: '<h1 class="mb-[20px] text-[24px] sm:text-[2em]">Reduce Discounting <span class="float-right">$0</span></h1>',
          },
          subTitle: {
            type: "text",
            text: `<hr/>`,
          },
          quotes: {
            type: "revolver",
            position: "bottom", //top , bottom of writeup, outside = outside entire section header
            elements: [
              {
                type: "quote",
                quote: {
                  text: "We love the tool! It is changing the conversation we have with our existing customers.",
                  author: "David Verhaag, Vice President Customer Success",
                },
              },
              {
                type: "quote",
                quote: {
                  text: "Hey Michael, I created an ROI for my first client yesterday and we closed today. The ROI Shop made getting approval from the CFO a piece of cake and resulted in my first sale!",
                  author: "Natalie Grant - Sales Rep",
                },
              },
              {
                type: "quote",
                quote: {
                  text: "IT spending is on the decline - It will be more important than ever to arm your <q>Champion</q>> with the tools necessary to sell the project internally.",
                  author: "Gartner",
                },
              },
            ],
          },
          description: "",
          content: {
            type: "headerElements",
            //we will determine how many columns to add by using elements.length and I think we must put a limit of 2 or 3 content per column and if it is more than 4, we will add another row of div with columns of the remainder of 2 or 3
            elements: [
              {
                type: "description",
                span: 6,
                text: `If your salespeople do not have the ability to quantify what their prospects current problems are costing them (current state), then they will have a hard time defending pricing when negotiations start.
                <br><br>In most cases, if you can reduce your discount rate by just 1 or 2% it will pay for the cost of the service.
                    <br><br><hr>`,
              },
              {
                type: "media",
                span: "auto",
                class: "col-lg-5",
                mediaOrigin: "video", // youtubee or another video - will act as second type to the media type
                link: `https://www.youtube.com/watch?v=O2m5FkGSgrs`,
              },
            ],
          },
        },
      },

      GrayContent: {
        type: "variables",
        classes: "row border-bottom gray-bg dashboard-header",
        elements: [
          {
            id: "03adwdaw",
            type: "text",
            text: "<h4>Cost of Discounting - Current State</h4>",
            elements: [
              {
                id: "02asdasdsad",
                type: "input",
                label: "Average deal value",
                format: "0,0",
                icon: null,
                rightSection: null,
                disabled: false
              },
              {
                id: "03asddsdaads",
                type: "input",
                label: "Average discount applied per deal (%)",
                format: "$0,0",
                icon: null,
                rightSection: null,
                disabled: false
              },
              {
                id: "05wghjd",
                type: "output",
                label:
                  "Estimated list price before discounting",
                formula: "TBD",
                format: ["05wghjd", "03asddsdaads", { operation: "SUM" }],//if array, possible
                icon: null,
                rightSection: (<Button variant="subtle" color="gray" radius="xs" size="xs" compact><IconCalculator size="18" /></Button>),
                disabled: true
              },
              {
                id: "06jfgdj",
                type: "input",
                label: "Lost revenue per deal",
                formula: "TBD",
                format: "0,0",
                icon: null,
                rightSection: null,
                disabled: false
              },
              {
                id: "07dfjgj",
                type: "textarea",
                label: 'Number of "deals" needed to hit your sales goal',
                icon: null,
                rightSection: null,
                disabled: false
              },
            ],
          }
        ],
      },
    },
    {
      id: "Section 4",
      order: 145673,
      headers: {
        title: {
          type: "element",
          mainTitle: {
            type: "text",
            style: "",
            text: '<h1 class="mb-[20px] text-[24px] sm:text-[2em]">Additional Selling Time<span class="float-right">$0</span></h1>',
          },
          subTitle: {
            type: "text",
            text: `<hr/>`,
          },
          quotes: {
            type: "revolver",
            position: "bottom", //top , bottom of writeup, outside = outside entire section header
            elements: [
              {
                type: "quote",
                quote: {
                  text: "We love the tool! It is changing the conversation we have with our existing customers.",
                  author: "David Verhaag, Vice President Customer Success",
                },
              },
              {
                type: "quote",
                quote: {
                  text: "Hey Michael, I created an ROI for my first client yesterday and we closed today. The ROI Shop made getting approval from the CFO a piece of cake and resulted in my first sale!",
                  author: "Natalie Grant - Sales Rep",
                },
              },
              {
                type: "quote",
                quote: {
                  text: "IT spending is on the decline - It will be more important than ever to arm your <q>Champion</q>> with the tools necessary to sell the project internally.",
                  author: "Gartner",
                },
              },
            ],
          },
          description: "",
          content: {
            type: "headerElements",
            //we will determine how many columns to add by using elements.length and I think we must put a limit of 2 or 3 content per column and if it is more than 4, we will add another row of div with columns of the remainder of 2 or 3
            elements: [
              {
                type: "description",
                span: 6,
                text: `This section of the ROI calculates how much time and money is wasted chasing bad opportunities across your sales organization. By utilizing this tool early in the sales cycle it will help you weed out some of those unqualified deals.

                1- If the prospect is not willing to go through this exercise- How interested are they?
                
                2- If the prospect dismisses all of your savings or gains. Are they really going to move forward with you?
                
                3- If the prospect never clicks on the ROI link after you've shared it with them... They are Probably not that interested.
                    <br><br><hr>`,
              },
              {
                type: "media",
                span: "auto",
                class: "col-lg-5",
                mediaOrigin: "video", // youtubee or another video - will act as second type to the media type
                link: `https://vimeo.com/148656280?embedded=true&source=vimeo_logo&owner=16840335`,
              },
            ],
          },
        },
      },

      GrayContent: {
        type: "",
        classes: "row border-bottom gray-bg dashboard-header",
        elements: [],
      },
    },
  ],
};

const test = {
  id: "Section 3",
  order: 1,
  headers: {
    title: {
      type: "element",
      mainTitle: {
        type: "text",
        style: "",
        text: '<h1 class="mb-[20px]">Reduce Discounting <span class="float-right">$0</span></h1>',
      },
      subTitle: {
        type: "text",
        text: `<hr/>`,
      },
      description: "",
      content: {
        type: "headerElements",
        //we will determine how many columns to add by using elements.length and I think we must put a limit of 2 or 3 content per column and if it is more than 4, we will add another row of div with columns of the remainder of 2 or 3
        elements: [
          {
            type: "description",
            text: `If your salespeople do not have the ability to quantify what their prospects current problems are costing them (current state), then they will have a hard time defending pricing when negotiations start.
            In most cases, if you can reduce your discount rate by just 1 or 2% it will pay for the cost of the service..
                <br><br><hr>`,
          },
          {
            type: "media",
            class: "col-lg-5",
            mediaOrigin: "video", // youtubee or another video - will act as second type to the media type
            link: `https://www.youtube.com/watch?v=O2m5FkGSgrs`,
          },

          {
            type: "revolver",
            elements: [
              {
                type: "quote",
                quote: {
                  text: "We love the tool! It is changing the conversation we have with our existing customers.",
                  author: "David Verhaag, Vice President Customer Success",
                },
              },
              {
                type: "quote",
                quote: {
                  text: "Hey Michael, I created an ROI for my first client yesterday and we closed today. The ROI Shop made getting approval from the CFO a piece of cake and resulted in my first sale!",
                  author: "Natalie Grant - Sales Rep",
                },
              },
              {
                type: "quote",
                quote: {
                  text: "IT spending is on the decline - It will be more important than ever to arm your <q>Champion</q>> with the tools necessary to sell the project internally.",
                  author: "Gartner",
                },
              },
            ],
          },
        ],
      },
    },
  },

  GrayContent: {
    type: "",
    classes: "row border-bottom gray-bg dashboard-header",
    elements: [],
  },
};
