import React = require('react')
import * as katex from 'katex'



interface KataxRendererProps {
  content
}

interface KataxRendererState {

}

export class KataxRenderer extends React.Component<KataxRendererProps, KataxRendererState> {
  private container: HTMLDivElement

  constructor(props) {
    super(props)
  }

  ref = el => this.container = el

  componetDidMount() {
    this.update(this.props.content)
  }

  componentWillReceiveProps(nextProps: KataxRendererProps) {
    if (this.props.content !== nextProps.content) {
      this.update(nextProps.content)
    }
  }

  update = (content) => {
    katex.render(content, this.container)
  }

  render() {
    return <div className="KataxRenderer black center" ref={ this.ref }>

    </div>
  }
}