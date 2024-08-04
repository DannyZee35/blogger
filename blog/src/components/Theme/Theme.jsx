import { createTheme } from "@mui/material";

export const theme = createTheme({
  palette: {
    primary: {
      main: '#2ECB72',
    },
    secondary:{
        main:'#001920',
    },
    common:{
        black:'#001920',
    }
  },
  mixins: {
    toolbar: {
      minHeight: 64, // You can set this to the height of your AppBar
    },
  },
});
