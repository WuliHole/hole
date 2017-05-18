import { UploaderBuilder, Uploader } from 'qiniu4js'

export interface Options {
  button?: string
  domain?: string
  scheme?: string
  retry?: number
  /**
   * 0-1, default 1
   */
  compress?: number
  /**
   *  第一个参数是宽度，第二个是高度,[200,0],限定高度，宽度等比缩放.
   *  [0,100]限定宽度,高度等比缩放.
   *  [200,100]固定长宽
   */
  scale?: number[]
  /**
   * 默认true，当chunk=true并且文件大于4MB才会进行分块上传
   */
  chunk?: boolean
  /**
   * auto upload
   */
  auto?: boolean
  /**
   * Mutiple File Selection
   */
  multiple?: boolean
  /**
   * 过滤文件，默认无，详细配置见http://www.w3schools.com/tags/att_input_accept.asp
   * ex:['.gif','.png','video/*']
   */
  accpet?: string[]
  /**
   * 如果saveKey中有需要在客户端解析的变量，则忽略该值。
   */
  tokenShare?: boolean
  /**
   * 设置token获取URL：客户端向该地址发送HTTP GET请求, 若成功，服务器端返回{"uptoken": 'i-am-token'}。
   * 覆盖tokenFunc的设置。
   */
  tokenUrl?: string
  listener?: Listener
}

interface Listener {
  onReady?: (tasks: Task[]) => any
  onStart?: (tasks: Task[]) => any
  onTaskGetKey?: (task: Task) => any
  onTaskProgress?: (task: Task) => any
  onTaskSucess?: (task: Task) => any
  onTaskFail?: (task: Task) => any
  onTaskRetry?: (task: Task) => any
  /**
   * While all http request get response, even if failed
   */
  onFinish: (tasks: Task[]) => any
}

type Task = {
  progress?: number
  key?: string
  hash?: string
  file: File
}

/**
 * @doc https://github.com/lsxiao/qiniu4js
 */
export default function initQiniuBuilder({
  button,
  tokenUrl = '/api/uptoken',
  listener
 }: Options): QiniuUploader {
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
  onIntercept: function (task: Task) {
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
