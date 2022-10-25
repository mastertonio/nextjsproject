import { Text, Image, Container } from "@mantine/core";
import ReactPlayer from 'react-player'

type IMediaProps = {
  media?: string
}

const VideoLinkMedia: React.FC<IMediaProps> = ({ media }) => {
  return (
    <div style={{ width: 530, marginLeft: "auto" }}>
      <div style={{ height: 420}}>
        <ReactPlayer
          controls
          playing
          light={true}
          className="object-cover h-fit w-fit absolute top-0 left-0"
          url={media || "https://share.vidyard.com/watch/feATQcRhijLdXwZgTh5nDG?"}
          width="100%"
          height="100%"
        />
      </div>
    </div>
  );
};

export default VideoLinkMedia;
