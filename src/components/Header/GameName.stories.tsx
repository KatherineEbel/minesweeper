import React from 'react'
import { Meta, Story } from '@storybook/react'
import GameName, { GameNameProps } from './GameName'

export default {
  title: 'Header/GameName',
  component: GameName,
} as Meta

const Template: Story<GameNameProps> = (args) => <GameName {...args} />

export const MinesweeperGameName = Template.bind({})
MinesweeperGameName.args = {
  text: 'minesweeper',
}
