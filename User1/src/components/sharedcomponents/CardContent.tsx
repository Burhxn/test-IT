import { Box, Icon, SvgIconProps, Typography } from '@mui/material'
import React from 'react'

type CardContentProps = {
    icon : React.ElementType<SvgIconProps>;
    text : string
}
const CardContentBox = ({icon : Icon, text}) : CardContentProps => {
  return (
    <Box display="flex" alignItems="flex-start" gap={2}>
        <Icon/>
        <Typography
           maxWidth={"200px"}
           whiteSpace={"nowrap"}
           overflow={"hidden"}
           textOverflow={"ellipsis"}
           variant="subtitle1"
           component="p">
            {text}
        </Typography>
    </Box>
  )
}

export default CardContentBox