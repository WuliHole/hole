import React = require('react')

class TexError extends Error {
  public position: number
}

interface KatexErrorRendererProps {
  content: string
  error: TexError
}

interface KatexErrorRendererState {

}

export class KatexErrorRenderer extends React.Component<KatexErrorRendererProps, KatexErrorRendererState> {
  constructor(props) {
    super(props)
  }

  /**
   * Get the position info from error message.
   * We need remove all string before ' at position '
   * @example message="KaTeX parse error: Expected 'EOF', got '\sqrtasdaasdas' at position 14: \sqrtasdaasdas̲"
   *          then we will get "14: \sqrtasdaasdas̲"
   */
  getPositionInfo(message: string) {
    const rule = /at\sposition\s/
    const result = message.match(rule)
    if (result) {
      const index = result.index
      return message.slice(index).replace(rule, '')
    }
  }

  render() {
    const char = this.props.content.charAt(this.props.error.position)
    const positionInfo = this.getPositionInfo(this.props.error.message)
    return <div className="KatexErrorRenderer red" >
      tex公式解析失败
      错误的字符:   ({ positionInfo })
    </div>
  }
}