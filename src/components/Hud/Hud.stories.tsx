import React from 'react'
import Hud, {HudProps} from './Hud'
import {Meta, Story} from '@storybook/react'

export default {
  title: "Hud/Hud",
  component: Hud,
} as Meta

const Template: Story<HudProps> = (args) => <Hud {...args} />
export const HudExample = Template.bind({})
HudExample.args = {
  time: '000',
  levels: ['beginner', 'intermediate', 'expert'],
  mines: '010',
}