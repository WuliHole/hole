import Katex = require('katex')
import * as React from 'react'
import * as DraftEditorBlock from 'draft-js/lib/DraftEditorBlock.react'
import { EditorState, ContentBlock, SelectionState } from 'draft-js'
import * as cls from 'classnames'
import { BlockProps } from '../../interface.plugin'
import { TextField } from 'material-ui'
import { KeyMap } from '../../../utils/keyMap'
import { KataxRenderer } from './texRenderer'
import { KatexErrorRenderer } from './texErrorRenderer'
import { getCursorPosition, getLineNumber, isNewlyCreated } from '../utils'
import { removeTeXBlock } from '../modifiers/removeTexBlock'
import './style.less'
import './texBlock.less'

import setSelectionToBlock from '../modifiers/setSelectionToBlock'
interface Props extends BlockProps {
  block: ContentBlock
  blockProps: BlockProps & { store }
}

interface State {
  focus?: boolean
  content?: string
}

export class TexBlock extends React.Component<Props, State> {
  private input: HTMLInputElement
  private getEditorState: () => EditorState
  private setEditorState: (e: EditorState) => any
  private setEditable: () => void
  private setEditorReadonly: () => void
  private getEditorRef: () => any
  private isReadonly: () => boolean
  private parseKatex: (content: string) => any
  private prevCursorPosition: number
  private currentCurosrPosition: number

  state = {
    focus: false,
    content: ''
  }

  ref = e => this.input = e

  componentDidMount() {
    const callbackName = `focus:${this.props.block.getKey()}`
    this.props.blockProps.store.updateItem(callbackName, this.focus)
    this.isReadonly = this.props.blockProps.store.getItem('isReadonly')
    this.setEditorState = this.props.blockProps.store.getItem('setEditorState')
    this.getEditorState = this.props.blockProps.store.getItem('getEditorState')
    this.setEditable = this.props.blockProps.store.getItem('setEditorEditable')
    this.setEditorReadonly = this.props.blockProps.store.getItem('setEditorReadonly')
    this.getEditorRef = this.props.blockProps.store.getItem('getEditorRef')
    this.parseKatex = Katex['__parse']
    this.prevCursorPosition = -1
    this.currentCurosrPosition = -1

    const entityKey = this.props.block.getEntityAt(0)
    if (entityKey) {
      const state = this.getEditorState()
      const { content } = state.getCurrentContent().getEntity(entityKey).getData()
      if (content) {
        this.setState({ content })
      }

      if (!this.isReadonly() && isNewlyCreated(state, entityKey)) {
        this.focus()
      }
    }
  }

  focus = () => {
    this.setEditorReadonly()
    this.setState({ focus: true }, () => { this.input.focus() })
  }

  blur = () => {
    this.setState({ focus: false })
  }

  handleKeyDown = (e: React.KeyboardEvent<any>) => {
    this.prevCursorPosition = this.currentCurosrPosition
    this.currentCurosrPosition = getCursorPosition(e.target as any)

    switch (e.keyCode) {
      case KeyMap.UpArrow:
        return this.handleUpArrow(e)

      case KeyMap.DownArrow:
        return this.handleDownArrow(e)

      case KeyMap.BackSpace:
      case KeyMap.Delete:
        return this.handleDelete(e)
    }
  }

  handleUpArrow(e: React.KeyboardEvent<any>) {
    if (this.currentCurosrPosition === 1 && this.prevCursorPosition === 1) {
      const state: EditorState = this.getEditorState()
      const prevBlock = state.getCurrentContent().getBlockBefore(this.props.block.getKey())
      this.focusOn(prevBlock, state)
    }
  }

  handleDownArrow(e: React.KeyboardEvent<any>) {
    if (this.currentCurosrPosition === getLineNumber(e.target)) {
      const state: EditorState = this.getEditorState()
      const nextBlock = state.getCurrentContent().getBlockAfter(this.props.block.getKey())
      this.focusOn(nextBlock, state)
    }
  }

  handleDelete(e: React.KeyboardEvent<any>) {
    if (this.state.content.length === 0) {
      const newState = removeTeXBlock(this.getEditorState(), this.props.block.getKey())
      this.focusOn(this.props.block, newState)
    }
  }

  focusOn(block: ContentBlock, state: EditorState) {
    setTimeout(() => {
      this.setEditable()
      this.getEditorRef().focus()
      setSelectionToBlock(state, this.setEditorState, block)
    }, 0)

    if (block.getKey() !== this.props.block.getKey()) {
      this.setState({ focus: false })
    }
  }

  onMouseDown = (e: React.MouseEvent<any>) => {
    if (this.isReadonly()) {
      return
    }

    this.setEditorReadonly()
    if (this.state.focus) {
      return e.stopPropagation()
    }

    e.preventDefault()
    setSelectionToBlock(this.getEditorState(), this.setEditorState, this.props.block)
    this.focus()
  }

  onValueChane = (e) => {
    const { value } = e.currentTarget
    this.setState({ content: value })
    this.updateEntityData({ content: value })
  }

  private updateEntityData(data) {
    const state = this.getEditorState()
    const entityKey = this.props.block.getEntityAt(0)
    if (!entityKey || !data || typeof data !== 'object') {
      return
    }

    const content = state.getCurrentContent().mergeEntityData(entityKey, data)

    this.setEditorState(EditorState.push(state, content, 'change-block-data'))
  }

  render() {
    const className = cls('tex-block', { 'tex-block-focused': this.props.blockProps.isFocused })
    let hasError = true
    let errorObj

    const content = this.state.content

    if (this.parseKatex && content) {
      try {
        this.parseKatex(content)
        hasError = false
      } catch (e) {
        errorObj = e
      }
    }

    return <div className={ className } onMouseDown={ this.onMouseDown }>
      {
        this.state.focus
        && <TextField
          id={ 'tex' + this.props.block.getKey() }
          multiLine
          style={ { width: '100%' } }
          onChange={ this.onValueChane }
          value={ this.state.content }
          onBlur={ this.blur }
          ref={ this.ref }
          onKeyDown={ this.handleKeyDown }
        />
      }
      { hasError && errorObj
        ? <KatexErrorRenderer content={ content } error={ errorObj } />
        : <KataxRenderer content={ content } />
      }
    </div>
  }
}