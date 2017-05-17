import React = require('react')
import { default as initQiniuUploader, Options } from './initQiniuBuilder'


interface IUploaderProps extends Options {

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

