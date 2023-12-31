import { useContext, useEffect, useState } from "react";
import {
  Modal,
  Button,
  Group,
  TextInput,
  Text,
  Select,
  Grid,
  Checkbox,
} from "@mantine/core";
import { useForm, yupResolver } from "@mantine/form";
import * as Yup from "yup";
import { AiOutlineDown } from "react-icons/ai";
import { IAdminListProps } from "@core/components/navbar/components/AdminList";
import axios from "axios";
import { useLocalStorage } from "@mantine/hooks";
import { useRouter } from "next/router";
import { FaPlusSquare } from "react-icons/fa";
import { showNotification, updateNotification } from "@mantine/notifications";
import { IconCheck } from "@tabler/icons";
import { useMutation, useQuery, useQueryClient, useQueries } from "react-query";
import UserContext, { UserDataProp } from "@app/context/user.context";
import MainLoader from "@app/core/components/loader/MainLoader";
import { useUserStore } from "@app/store/userState";

const CreateNewRoi: React.FC<Partial<UserDataProp>> = ({ tokens, user }) => {
  const [opened, setOpened] = useState(false);
  const [checked, setChecked] = useState(true);
  const [tempName, setTempName] = useState<any>([])
  const [verID, setVerID] = useState<any>("")
  const [templateID, setTemplateID] = useState<string>("")
  const router = useRouter();
  const userZ = useUserStore((state) => (state.user))
  const queryClient = useQueryClient()

  // const schema = Yup.object().shape({
  //   name: Yup.string().required('This field is required'),
  //   template: tempID === "" ? Yup.string().required('This field is required') : Yup.string().nullable()
  // })

  const getTemplateButtonList = async () => {
    return await axios.get(
      `/v1/dashboard/template/list`, {
      headers: {
        Authorization: `Bearer ${tokens?.access.token}`,
      },
    }
    );
  };

  const { isLoading, status, data, isFetching, isSuccess, isError } = useQuery(
    "template_List",
    getTemplateButtonList
  );

  // test
  // const queries = [
  //   {
  //     queryKey: ['templates'],
  //     queryFn: async () => {
  //       const res = await axios.get(`/v1/company/${user?.company_id}/template`, {
  //         headers: {
  //           Authorization: `Bearer ${tokens?.access.token}`
  //         },
  //       });
  //       return res.data;
  //     },
  //   },
  // ];

  // const results = useQueries(queries);

  const form = useForm({
    initialValues: {
      name: "",
      template: "",
    },
    // validate: yupResolver(schema)
  });

  type iCreateTemplateProp = {
    name: string
    template_id: string
  }

  const createRoi = useMutation({
    mutationFn: (roi: iCreateTemplateProp) =>
      axios.post(`/v1/company/${user?.company_id}/template/${templateID}/version/${verID}/clone`,
        {
          name: roi.name,
          notes: " ",
          status: 1,
          projection: 0
        }
        , {
          headers: {
            Authorization: `Bearer ${tokens?.access.token}`,
          },
        }).then((response) => response.data),
    // axios.post(`/v1/dashboard/${user?.id}`, roi, {
    //   headers: {
    //     Authorization: `Bearer ${tokens?.access.token}`,
    //   },
    // }).then((response) => response.data),
    onMutate: (roi: iCreateTemplateProp) => {
      showNotification({
        id: "create-row",
        loading: true,
        title: `Creating ${roi.name}`,
        message: "Please wait ...",
        autoClose: false,

      });
    },
    onSuccess: (newRoi) => {
      console.log("newROi", newRoi)
      Promise.all(
        [
          queryClient.invalidateQueries({ queryKey: ['get_all_roi'] }),
          queryClient.invalidateQueries({ queryKey: ['graphData'] }),
          queryClient.invalidateQueries({ queryKey: ['ranking_list'] })
        ]
      )

      if (checked) {
        updateNotification({
          id: "create-row",
          color: "teal",
          title: `${newRoi.title} created`,
          message: "Redirecting shortly ...",
          icon: <IconCheck size={16} />,
          autoClose: 2500,
        });
        router.push({ pathname: `/enterprise/${newRoi.templateVersion.id}`, query: { temp_ver: newRoi.templateVersion.id } });
        // router.push(`/enterprise/${newRoi.template_version_id}`);
      }
      updateNotification({
        id: "create-row",
        color: "teal",
        title: `${newRoi.name} created`,
        message: "Successfully created a new ROI",
        icon: <IconCheck size={16} />,
        autoClose: 2500,
      })

      setOpened(false)
    },
    onError: (error) => {
      console.log('error create roi', error);
      if (error instanceof Error) {
        updateNotification({
          id: "create-row",
          color: "red",
          title: `Template creation failed`,
          message: error.message,
          autoClose: false,
        });
      }

      updateNotification({
        id: "create-row",
        color: "red",
        title: `Template creation failed`,
        message: "Something went wrong, Please try again",
        autoClose: false,
      });
    }
  })

  if (isSuccess) {
    const actionList = data?.data.map((a: { name: string; build: any }) => {
      return a?.build?.map((b: { template_id: string; _id: string; name: string; group: string }) => ({
        key: b._id,
        value: b._id,
        label: b.name,
        group: a.name,
        template_id: b.template_id
      }))
    }).flat();

    return (
      <>
        <Modal
          className="w-full"
          opened={opened}
          onClose={() => setOpened(false)}
          withCloseButton={false}
          size="50%"
        >
          <form onSubmit={form.onSubmit((values) => createRoi.mutate({ name: values.name, template_id: verID }))} className="m-[10px] sm:m-[30px]">
            <Text
              weight={700}
              color="gray"
              className="ml-[20px] mb-[40px] text-[25px] sm:text-[30px]"
            >
              Create A New ROI Calculation
            </Text>

            <Grid className="m-[20px]">
              <Text>Name <span className="text-[#fa5252]">*</span></Text>
              <TextInput
                required
                className="w-full ml-auto"
                placeholder="Enter Name"
                {...form.getInputProps("name")}
              />
            </Grid>

            <Grid className="m-[20px] mb-[20px] select-roi">
              <Text>Choose a Template <span className="text-[#fa5252]">*</span></Text>
              <Select
                className="w-full ml-auto"
                rightSection={<AiOutlineDown size="1rem" />}
                rightSectionWidth={40}
                placeholder="Template"
                searchable
                clearable
                data={
                  actionList?.length > 0
                    ? actionList
                    : [
                      {
                        value: "",
                        label: "No Template Detected",
                        disabled: true,
                      },
                    ]
                }
                styles={{ rightSection: { pointerEvents: 'none' } }}
                // {...form.getInputProps("template")}
                defaultValue={actionList?.length <= 1 ? actionList[0].value : ""}
                onChange={(value: string) => {
                  const selected = actionList.find((a: any) => a.value === value)
                  setTemplateID(selected.template_id)
                  setVerID(value)
                }}
                required
              // error={tempID === "" ? true : false}
              // value={
              //   actionList?.length === 1 ? actionList[0].label : actionList.label
              // }
              />
              {/* {tempID === "" ? (
                <p className="text-[#fa5252] text-[12px] mt-[5px]">This field is required</p>
              ) : null} */}

            </Grid>
            <Grid
              justify="flex-end"
              className="mr-[20px] mb-[140px]"
            >
              <Checkbox
                checked={checked}
                onChange={(event) => setChecked(event.currentTarget.checked)}
                label="Open the Created ROI"
              />
            </Grid>
            <Grid justify="flex-end">
              <Button
                type="submit"
                radius="sm"
                size="md"
                className="mr-[10px]"
              // onClick={() => setOpened(false)}
              >
                Create ROI
              </Button>
              <Button
                type="button"
                radius="sm"
                size="md"
                onClick={() => setOpened(false)}
                color="red"
              >
                Close
              </Button>
            </Grid>
          </form>
        </Modal>

        <Group position="center">
          <Button
            type="button"
            fullWidth
            leftIcon={<FaPlusSquare />}
            radius="sm"
            size="xl"
            className="h-[80px] sm:h-[100px] mt-[20px] sm:mt-0 mr-0 text-[20px] sm:text-[25px]"
            uppercase
            onClick={() => setOpened(true)}
          >
            Create a New ROI
          </Button>
        </Group>
      </>
    );
  }
  return <></>
}

export default CreateNewRoi;