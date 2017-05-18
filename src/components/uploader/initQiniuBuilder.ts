import { UploaderBuilder, Uploader } from 'qiniu4js'


/**
 * @doc https://github.com/lsxiao/qiniu4js
 */
export default function initQiniuBuilder({
  button,
  tokenUrl = '/api/uptoken',
  listener
 }: UpdateOptions): QiniuUploader {
  return new UploaderBuilder()
    .debug(__DEV__ || __TEST__)
    .domain('http://up-z1.qiniu.com')
    .button(button)
    .tokenUrl(tokenUrl)
    .interceptor(defaultInterceptor)
    .listener(listener)
    .build()
}

const defaultInterceptor = {
  // 拦截任务,返回true，任务将会从任务队列中剔除，不会被上传
  onIntercept: function (task: UploaderTask) {
    return task.file.size > 1024 * 1024
  },
  // 中断任务，返回true，任务队列将会在这里中断，不会执行上传操作。
  onInterrupt: function (task) {
    if (this.onIntercept(task)) {
      alert('请上传小于1m的文件')
      return true;
    } else {
      return false;
    }
  }
}
