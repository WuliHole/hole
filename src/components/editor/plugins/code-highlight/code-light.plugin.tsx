import React = require('react')
import { EditorPluginBuilder, InAddtionAccepts } from '../interface.plugin'
import { EditorState, ContentBlock, ContentState } from 'draft-js'
import Prism = require('prismjs')
import PrismDecorator = require('draft-js-prism')
import './style.less'
import './laguage'

interface PluginConfig { }
interface Method { }
export type codeHighLightPlugin = InAddtionAccepts & Method

const WS = /\s+/g
const BACK_SLASH = /\//g
const mapFileExtensionToLanguage = (name: string) => FILE_EXTENSION_MAP[name] ? FILE_EXTENSION_MAP[name] : name
export const FILE_EXTENSION_MAP = {
  js: 'javascript',
  'c++': 'cpp',
  ts: 'typescript',
  py: 'python',
  rb: 'ruby'
}

export const codeHighLightPlugin: EditorPluginBuilder<PluginConfig, Method> = (...args) => {

  let currentSyntax

  // "//${type}"           it'sworkring
  // "//   ${type}   "     it'sworkring
  // "/*${type}*/"         not working
  // support file extension name. ie: js=>javascript , ts=>typescript
  function getSyntax(block: ContentBlock) {
    const text = block.getText().replace(WS, '')

    if (!text || !text.startsWith('//')) {
      return currentSyntax
    }

    let languageType = text.replace(BACK_SLASH, '')
    languageType = mapFileExtensionToLanguage(languageType)
    const syntaxDefinition = Prism.languages[languageType]

    if (typeof syntaxDefinition === 'object') {
      currentSyntax = languageType
    }

    if (__DEV__) {
      /* tslint:disable */
      console.log(text, languageType, syntaxDefinition, currentSyntax)
      /* tslint:enable */
    }
    return currentSyntax
  }

  function render({ type, children }) {
    return (
      <span className={ `prism-token token ${type}` }>{ children }</span>
    )
  }

  return {
    decorators: [new PrismDecorator({ prism: Prism, getSyntax, render })],
  }
}




export default codeHighLightPlugin