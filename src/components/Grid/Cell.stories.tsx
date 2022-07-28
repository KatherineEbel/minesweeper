import Cell, {CellProps} from './Cell'
import { CellState } from '../../lib/cell'
import {Meta, Story} from '@storybook/react'

export default {
  title: 'Grid/Cell',
  component: Cell,
  argTypes: {
    coords: {
      defaultValue: [1, 1]
    },
    onClick: () => null
  }
} as Meta

const Template: Story<CellProps> = (args) => <Cell {...args}/>
export const CellClosed = Template.bind({})
CellClosed.args = {
  type: CellState.hidden
}

export const CellEmpty = Template.bind({})
CellEmpty.args = {
  type: CellState.empty
}

export const CellBomb = Template.bind({})
CellBomb.args = {
  type: CellState.bomb
}

export const CellWeakFlag = Template.bind({})
CellWeakFlag.args = {
  type: CellState.weakFlag
}

export const CellFlag = Template.bind({})
CellFlag.args = {
  type: CellState.flag
}

export const CellWithOne = Template.bind({})
CellWithOne.args = {
  type: 1
}

export const CellWithTwo = Template.bind({})
CellWithTwo.args = {
  type: 2
}

export const CellWithThree = Template.bind({})
CellWithThree.args = {
  type: 3
}


