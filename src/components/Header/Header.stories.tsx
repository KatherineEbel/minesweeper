import React from 'react'
import Header, { HeaderProps } from './Header'
import { Meta, Story } from '@storybook/react'

export default {
  title: 'Header/Header',
  component: Header,
} as Meta

const Template: Story<HeaderProps> = (args) => <Header {...args} />
export const MainHeader = Template.bind({})
MainHeader.args = {
  text: 'minesweeper',
  feature: 'flag',
  firstAction: 'ctrl',
  secondAction: 'click',
}
