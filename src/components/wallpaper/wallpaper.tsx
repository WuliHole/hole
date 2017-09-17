import React = require('react')
import './wallpaper.less'

interface WallPaperProps {
  src?: string
  style?: React.CSSProperties
  className?: string
}

export const defualtWallPaper = '../../assets/pattern.png'
export const defualWallpaperStyle: React.CSSProperties = {
  backgroundRepeat: 'repeat',
  backgroundPosition: 'center'
}

export class WallPaper extends React.Component<WallPaperProps, {}> {
  static defualtWallPaper = defualtWallPaper
  static defualStyle = defualWallpaperStyle

  private e: HTMLDivElement

  constructor(props) {
    super(props)
  }

  componentDidMount() {
    if (this.props.src) {
      const bg = new Image()
      bg.src = this.props.src || ''
      bg.onload = () => {
        this.e.style.backgroundImage = `url('${this.props.src}')`
      }
    }
  }

  ref = (el) => this.e = el

  render() {
    const {
      style = {},
      className = ''
    } = this.props
    return <div className={ 'wallpaper ' + className } ref={ this.ref } style={ style }>
      { this.props.children }
    </div>
  }
}