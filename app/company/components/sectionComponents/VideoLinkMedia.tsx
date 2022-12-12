import { Text, Image, Container } from "@mantine/core";
import ReactPlayer from 'react-player/lazy'

type IMediaProps = {
  media?: string
}

const VideoLinkMedia: React.FC<IMediaProps> = ({ media }) => {
  return (
    <div>
      <div style={{ height: 280, margin: 30}}>
        <ReactPlayer
          controls
          playing
          light={true}
          className="object-cover h-fit w-fit absolute top-0 left-0"
          url={media}
          width="100%"
          height="100%"
        />
      </div>
    </div>
  );
};

export default VideoLinkMedia;
