import React from 'react'
import {Meta, Story} from '@storybook/react'
import Timer, {TimerProps} from './Timer'

export default {
  title: 'Hud/Timer',
  component: Timer
} as Meta

const Template: Story<TimerProps> = (args) => <Timer {...args}/>
export const TimerExample = Template.bind({})
TimerExample.args = {
  running: true,
  shouldClear: false
}