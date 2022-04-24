import React from 'react'
import { extendTheme, theme as chakraTheme } from '@chakra-ui/react'

const theme = {
  fonts: {
    body: `Inter,-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol"`
  },
  fontWeights: {
    normal: 400,
    medium: 600,
    bold: 700
  }
}

export default extendTheme(theme)
