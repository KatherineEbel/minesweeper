import Cell, {CellProps} from './Cell'
import { CellState } from 'lib/cell'
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
  cellType: CellState.hidden
}

export const CellEmpty = Template.bind({})
CellEmpty.args = {
  cellType: CellState.empty
}

export const CellBomb = Template.bind({})
CellBomb.args = {
  cellType: CellState.bomb
}

export const CellWeakFlag = Template.bind({})
CellWeakFlag.args = {
  cellType: CellState.weakFlag
}

export const CellFlag = Template.bind({})
CellFlag.args = {
  cellType: CellState.flag
}

export const CellWithOne = Template.bind({})
CellWithOne.args = {
  cellType: 1
}

export const CellWithTwo = Template.bind({})
CellWithTwo.args = {
  cellType: 2
}

export const CellWithThree = Template.bind({})
CellWithThree.args = {
  cellType: 3
}


