
import React from 'react'

import {Section} from 'view/Shared/Structural'
import {P} from 'view/Shared/Typography'
import Switch from 'view/Switch'

function Loading () {
  return <P>Loading</P>
}

function NoData () {
  return <P>No Data</P>
}

function Data () {
  return <P>Data</P>
}

// Boilerplate to mimic an API call and hydrating data. In many production applications this would
// be handled by dedicated state management & side-effect management libraries.
export class List extends React.Component {
  constructor (props) {
    super(props)

    this.updateState = () => {
      this.setState({
        data: (Math.round(Math.random()) === 1) ? ['Have', 'Some', 'Data'] : []
      })
    }

    this.state = {
      data: null
    }
  }

  componentDidMount () {
    setTimeout(this.updateState, 1500)
  }

  render () {
    const {data} = this.state

    return (
      <Section>
        <P>On refresh there is a 50:50 chance of having data or not.</P>
        <Switch data={data}>
          <Switch.Loading render={Loading} />
          <Switch.NoData render={NoData} />
          <Switch.Data render={Data} />
        </Switch>
      </Section>
    )
  }
}
