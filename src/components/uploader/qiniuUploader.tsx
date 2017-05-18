import React = require('react')
import { default as initQiniuUploader } from './initQiniuBuilder'


interface IUploaderProps extends UpdateOptions {

}

export default
  class Uploader extends React.PureComponent<IUploaderProps, void> {
  uploader: QiniuUploader
  constructor(props) {
    super(props)
    this.uploader = initQiniuUploader(this.props)
  }

  chooseFile = () => {
    this.uploader.chooseFile()
  }

  render() {
    return <div className="Uploader" onClick={ this.chooseFile }>
      { this.props.children }
    </div>
  }
}

const CDN_HOST = 'http://oq3qzwm4b.bkt.clouddn.com/'
export function filePublicPathGen(fileKey: string) {
  return `${CDN_HOST}${fileKey}`
}
