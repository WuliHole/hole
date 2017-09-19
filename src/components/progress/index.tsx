
import * as progress from 'nprogress'
import './progress.style.less'
const inc = progress.inc as any

progress.configure({ showSpinner: false, trickleSpeed: 200 })
export default progress