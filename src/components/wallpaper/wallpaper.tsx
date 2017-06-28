import React = require('react')
import './wallpaper.less'

interface WallPaperProps {
  src?: string
  style?: React.CSSProperties
  className?: string
}

export const defualtWallPaper = 'http://lowsweet.qiniudn.com/bg?imageView2/1/w/1599/h/1500'

export class WallPaper extends React.Component<WallPaperProps, void> {
  private e: HTMLDivElement
  static GradientColor = 'rgba(0, 0, 0, 0.75)'

  constructor(props) {
    super(props)
  }

  componentDidMount() {
    if (this.props.src) {
      const bg = new Image()
      bg.src = this.props.src || ''
      bg.onload = () => {
        const color = WallPaper.GradientColor
        this.e.classList.add('bg-image')
        this.e.style.backgroundImage = `linear-gradient(${color}, ${color}),url('${this.props.src}')`
      }
    }
  }

  ref = (el) => this.e = el

  render() {
    const {
      style = {},
      className = ''
    } = this.props
    return <div className={ 'wallPaper ' + className } ref={ this.ref } style={ style }>
      { this.props.children }
    </div>
  }
}