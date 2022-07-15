import { Text } from "@mantine/core";
import { useStyles } from "@styles/navStyle";

const PoweredByRoi: React.FC = () => {
  const { classes } = useStyles();
  return (<div className={classes.powered_by}>
    <Text color="gray" style={{ paddingRight: 5}}>Powered by</Text>    
    <Text variant="link" component="a" href="https://www.theroishop.com">The ROI Shop</Text>
  </div>);
};

export default PoweredByRoi;
