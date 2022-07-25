import React from 'react'
import Reset, { ResetProps } from './Reset'
import { Meta, Story } from '@storybook/react'

export default {
  title: 'Hud/Reset',
  component: Reset,
} as Meta

const Template: Story<ResetProps> = (args) => <Reset {...args} />
export const ResetExample = Template.bind({})
