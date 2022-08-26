import { Center, Loader, Skeleton } from "@mantine/core";

const SkeletonLoader: React.FC = () => {
  return (
    <tbody>
      <tr>
        <td>
          <Center
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              width: "100%",
              height: "100%",
            }}
          >
            <Loader color="teal" size="xl" variant="dots" />
          </Center>
        </td>
      </tr>
    </tbody>
  );
};

export default SkeletonLoader;
