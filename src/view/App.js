
import React from 'react'
import {ThemeProvider} from 'styled-components'

import {Application} from 'view/Shared/Structural'
import {Header} from 'view/Global/Header'
import {List} from 'view/List'

import {theme} from 'view/theme'

export function App () {
  return (
    <ThemeProvider theme={theme}>
      <Application>
        <Header />
        <List />
      </Application>
    </ThemeProvider>
  )
}
