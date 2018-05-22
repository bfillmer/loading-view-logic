
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

const loadingComparator = data => !data
const noDataComparator = data => (data && (data.length === 0))

export const SwitchContext = React.createContext({
  state: LOADING,
  data: undefined
})

export class Switch extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      state: LOADING,
      data: this.props.data
    }
  }

  static getDerivedStateFromProps (nextProps, prevState) {
    switch (true) {
      case (nextProps.loadingComparator(nextProps.data)):
        return {
          state: LOADING,
          data: nextProps.data
        }
      case (nextProps.noDataComparator(nextProps.data)):
        return {
          state: NO_DATA,
          data: nextProps.data
        }
      default:
        return {
          state: DATA,
          data: nextProps.data
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
  data: PropTypes.any,
  loadingComparator: PropTypes.func,
  noDataComparator: PropTypes.func
}

Switch.defaultProps = {
  loadingComparator,
  noDataComparator
}

// Render loading component.
function Loading ({render}) {
  return (
    <SwitchContext.Consumer>
      {({data, state}) => {
        return (state === LOADING) ? React.createElement(render, {data}) : null
      }}
    </SwitchContext.Consumer>
  )
}

Loading.propTypes = {
  render: PropTypes.func.isRequired
}

Loading.displayName = 'Loading'

// Render component with empty data.
function NoData ({render}) {
  return (
    <SwitchContext.Consumer>
      {({data, state}) => {
        return (state === NO_DATA) ? React.createElement(render, {data}) : null
      }}
    </SwitchContext.Consumer>
  )
}

NoData.propTypes = {
  render: PropTypes.func.isRequired
}

NoData.displayName = 'NoData'

// Render Component with Data.
function Data ({render}) {
  return (
    <SwitchContext.Consumer>
      {({data, state}) => {
        return (state === DATA) ? React.createElement(render, {data}) : null
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
