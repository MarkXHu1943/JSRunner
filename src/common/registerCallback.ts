import { App } from 'vue'
import { Message } from '@arco-design/web-vue'
import { isElectron } from '@/utils'

export function registerCallback(app: App) {
  if (!isElectron) return

  if (utools.db.replicateStateFromCloud()) {
    Message.warning({
      content: '数据可能不完整，还在从云端复制中'
    })
  }

  // @ts-expect-error
  utools.onPluginEnter(({ code, type, payload, option }) => {
    if (code.startsWith('exec/')) {
      app.config.globalProperties.$router.push({
        name: 'Exec',
        params: {
          id: code.replace('exec/', ''),
          mainPush: option
        }
      })

      return
    }

    app.config.globalProperties.$router.push({
      name: 'Runner'
    })
  })
}
