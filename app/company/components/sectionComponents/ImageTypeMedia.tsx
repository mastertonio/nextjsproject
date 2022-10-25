import { useEffect, useRef, useState } from "react";
import { Text, Group, Button, createStyles, Image } from "@mantine/core";
import { Dropzone, MIME_TYPES } from "@mantine/dropzone";
import { IconCloudUpload, IconX, IconDownload } from "@tabler/icons";

const useStyles = createStyles((theme) => ({
  wrapper: {
    position: "relative",
    marginBottom: 30,
  },

  dropzone: {
    borderWidth: 1,
    paddingBottom: 50,
  },

  icon: {
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[3]
        : theme.colors.gray[4],
  },

  control: {
    position: "absolute",
    width: 250,
    left: "calc(50% - 125px)",
    bottom: -20,
  },
}));

const ImageDropzone = () => {
  const { classes, theme } = useStyles();
  const [image, setImage] = useState<File>();
  const [preview, setPreview] = useState<string>();
  const openRef = useRef<() => void>(null);

  useEffect(() => {
    if (image) {
      const reader = new FileReader();
      reader.onload = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(image);
    } else {
      setPreview("");
    }
  }, [image]);

  return (
    <div className={classes.wrapper} style={{ marginLeft: "auto" }}>
      <Dropzone
        openRef={openRef}
        onDrop={(files) => {
          setImage(files[0]);
        }}
        className={classes.dropzone}
        radius="md"
        accept={[MIME_TYPES.jpeg, MIME_TYPES.png]}
        maxSize={30 * 1024 ** 2}
      >
        <div style={{ pointerEvents: "none" }}>
          <Group position="center">
            <Dropzone.Accept>
              <IconDownload
                size={50}
                color={theme.colors[theme.primaryColor][6]}
                stroke={1.5}
              />
            </Dropzone.Accept>
            <Dropzone.Reject>
              <IconX size={50} color={theme.colors.red[6]} stroke={1.5} />
            </Dropzone.Reject>
            {preview ? (
              ""
            ) : (
              <Dropzone.Idle>
                <IconCloudUpload
                  size={50}
                  color={
                    theme.colorScheme === "dark"
                      ? theme.colors.dark[0]
                      : theme.black
                  }
                  stroke={1.5}
                />
              </Dropzone.Idle>
            )}
          </Group>

          {preview ? (
            <div
              style={{ width: 440, marginLeft: "auto", marginRight: "auto" }}
            >
              <Image radius="md" src={preview} alt="Random unsplash image" />
            </div>
          ) : (
            <div>
              <Text align="center" weight={700} size="lg" mt="xl">
                <Dropzone.Accept>Drop files here</Dropzone.Accept>
                <Dropzone.Reject>
                  Jpeg and PNG file less than 30mb
                </Dropzone.Reject>
                <Dropzone.Idle>Upload Image</Dropzone.Idle>
              </Text>
              <Text align="center" size="sm" mt="xs" color="dimmed">
                Drag&apos;n&apos;drop files here to upload. We can accept only{" "}
                <i>.jpeg and .png</i> files that are less than 30mb in size.
              </Text>
            </div>
          )}
        </div>
      </Dropzone>

      <Button
        className={classes.control}
        size="md"
        radius="xl"
        onClick={() => openRef.current?.()}
      >
        Select files
      </Button>
    </div>
  );
};

export default ImageDropzone;
