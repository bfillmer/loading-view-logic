
import React from 'react'
import PropTypes from 'prop-types'

// USAGE
// <Switch data={}>
//   <Switch.Loading render={} />
//   <Switch.NoData render={} />
//   <Switch.Data render={} />
// </Switch>

const LOADING = 'LOADING'
const NO_DATA = 'NO_DATA'
const DATA = 'DATA'

export const SwitchContext = React.createContext({
  state: LOADING
})

export class Switch extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      state: LOADING
    }
  }

  static getDerivedStateFromProps (nextProps, prevState) {
    switch (true) {
      case (!nextProps.data):
        return {
          state: LOADING
        }
      case (nextProps.data && nextProps.data.length === 0):
        return {
          state: NO_DATA
        }
      default:
        return {
          state: DATA
        }
    }
  }

  render () {
    const {children} = this.props

    return (
      <SwitchContext.Provider value={this.state}>
        {children}
      </SwitchContext.Provider>
    )
  }
}

Switch.propTypes = {
  data: PropTypes.any
}

function Loading ({render}) {
  return (
    <SwitchContext.Consumer>
      {({state}) => {
        return (state === LOADING) ? React.createElement(render) : null
      }}
    </SwitchContext.Consumer>
  )
}

Loading.propTypes = {
  render: PropTypes.func.isRequired
}

Loading.displayName = 'Loading'

function NoData ({render}) {
  return (
    <SwitchContext.Consumer>
      {({state}) => {
        return (state === NO_DATA) ? React.createElement(render) : null
      }}
    </SwitchContext.Consumer>
  )
}

NoData.propTypes = {
  render: PropTypes.func.isRequired
}

NoData.displayName = 'NoData'

function Data ({render}) {
  return (
    <SwitchContext.Consumer>
      {({state}) => {
        return (state === DATA) ? React.createElement(render) : null
      }}
    </SwitchContext.Consumer>
  )
}

Data.propTypes = {
  render: PropTypes.func.isRequired
}

Data.displayName = 'Data'

Switch.Loading = Loading
Switch.NoData = NoData
Switch.Data = Data

export default Switch
