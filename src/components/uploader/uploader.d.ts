interface QiniuUploader {
  start(): any
  chooseFile(): any
}

interface UpdateOptions {
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
  listener?: UpLoaderListener
}

interface UpLoaderListener {
  onReady?: (tasks: UploaderTask[]) => any
  onStart?: (tasks: UploaderTask[]) => any
  onTaskGetKey?: (task: UploaderTask) => any
  onTaskProgress?: (task: UploaderTask) => any
  onTaskSuccess: (task: UploaderTask) => any
  onTaskFail?: (task: UploaderTask) => any
  onTaskRetry?: (task: UploaderTask) => any
  /**
   * While all http request get response, even if failed
   */
  onFinish?: (tasks: UploaderTask[]) => any
}

type UploaderTask = {
  progress?: number
  key?: string
  result: {
    key: string
    hash: string
  }
  hash?: string
  file: File
}
