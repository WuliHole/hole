import React = require('react')
import { default as initQiniuUploader } from './initQiniuBuilder'


interface IUploaderProps extends UpdateOptions {
  onClick?(e: Event, QiniuUploader)
}

export default
  class Uploader extends React.PureComponent<IUploaderProps, void> {
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
    return <div className="Uploader" onClick={ this.chooseFile }>
      { this.props.children }
    </div>
  }
}

export const CDN_HOST = 'http://oq3qzwm4b.bkt.clouddn.com/'
export function filePublicPathGen(fileKey: string) {
  return `${CDN_HOST}${fileKey}`
}
