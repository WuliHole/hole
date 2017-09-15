import React = require('react')
import { default as initQiniuUploader } from './initQiniuBuilder'
import * as classnames from 'classnames'

interface IUploaderProps extends UpdateOptions {
  onClick?(e: Event, QiniuUploader)
  className?: string
}

export default
  class Uploader extends React.PureComponent<IUploaderProps, {}> {
  uploader: QiniuUploader
  constructor(props) {
    super(props)
    this.uploader = initQiniuUploader(this.props)
  }

  chooseFile = (e) => {
    if (this.props.onClick) {
      this.props.onClick(e, this.uploader)
      return
    }
    this.uploader.chooseFile()
  }

  render() {
    const { className = '' } = this.props
    return <div className={ classnames('Uploader', className) } onClick={ this.chooseFile }>
      { this.props.children }
    </div>
  }
}

export const CDN_HOST = 'http://lowsweet.qiniudn.com/'
export function filePublicPathGen(fileKey: string, size?: number) {
  if (fileKey) {
    let ret = `${CDN_HOST}${fileKey}`
    if (size) {
      ret = ret + `?imageView2/1/w/${size}/h/${size}`
    }
    return ret
  }
}
