const zh = {
  common: {
    ok: '好',
    confirm: '确认',
    cancel: '取消',
    back: '返回',
    enable: '启动',
    disable: '禁用',
    enabled: '已启动',
    disabled: '已禁用',
    closed: '已关闭',
    opened: '已打开',
    close: '关闭',
    done: '完成',
    share: '分享',
  },
  homeScreen: {
    hello: '你好！',
  },
  permissionManager: {
    camera: '相机',
    unavailable: '{{permission}}功能不可用',
    blocked: '请前往设置授予{{permissions}}权限，才能正常使用该功能',
    openSettings: '打开设置',
  },
}

export default zh

export type Translations = typeof zh
