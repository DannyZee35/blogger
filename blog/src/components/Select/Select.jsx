import { Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import React from "react";

const SelectComponent = ({ label, options, sx = {}, ...props }, ref) => {
  return (
    <FormControl sx={sx} fullWidth>
      <InputLabel>{label}</InputLabel>
      <Select {...props} ref={ref}>
        {options?.map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default React.forwardRef(SelectComponent);
