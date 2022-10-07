import { Text, Image, Container } from "@mantine/core";
import ReactPlayer from 'react-player'

const SectionMedia = () => {
  return (
    <div style={{ width: 530, marginLeft: "auto" }}>
      <div style={{ height: 420}}>
        <ReactPlayer
          controls
          playing
          light={true}
          className="object-cover h-fit w-fit absolute top-0 left-0"
          url={"https://www.youtube.com/watch?v=Z9e7K6Hx_rY&list=RDDAE1NbKstqk&index=28"}
          width="100%"
          height="100%"
        />
      </div>
    </div>
  );
};

export default SectionMedia;
