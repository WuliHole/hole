import * as React from 'react'
import { RichUtils, ContentBlock } from 'draft-js';
import * as classnames from 'classnames'
import { ButtonProps } from '../interface'
type blockIsActiveFn = (block: ContentBlock) => boolean

interface Props {
  blockType: string,
  children?: JSX.Element
  blockIsActive?: blockIsActiveFn
  onClick: (e, ...args) => any
}

export default ({
  blockType = null,
  children = null,
  blockIsActive = () => false,
  onClick
  }: Props) => (
    class BlockStyleButton extends React.Component<ButtonProps, any> {

      preventBubblingUp = (event) => { event.preventDefault(); }

      _onClick = (e) => {
        if (onClick) {
          onClick(
            e,
            {
              getEditorState: this.props.getEditorState,
              setEditorState: this.props.setEditorState
            }
          )
        }
      }

      blockTypeIsActive = () => {
        const editorState = this.props.getEditorState();
        const selectedBlock = editorState
          .getCurrentContent()
          .getBlockForKey(editorState.getSelection().getStartKey())
        return blockIsActive(selectedBlock)
      }

      render() {
        const { theme } = this.props;

        const className = classnames({
          [theme.button]: true,
          [theme.active]: this.blockTypeIsActive()
        })

        return (
          <div
            className={ theme.buttonWrapper }
            onMouseDown={ this.preventBubblingUp }
          >
            <button
              className={ className }
              onClick={ this._onClick }
              type="button"
              children={ React.cloneElement(children, this.props) }
            />
          </div>
        );
      }
    }
  );
