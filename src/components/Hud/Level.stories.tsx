import React from 'react'
import Level, { LevelProps } from './Level'
import { Meta, Story } from '@storybook/react'

export default {
  title: 'Hud/Level',
  component: Level,
} as Meta

const Template: Story<LevelProps> = (args) => <Level {...args} />
export const CounterExample = Template.bind({})
CounterExample.args = { levels: ['beginner', 'intermediate', 'expert'] }
