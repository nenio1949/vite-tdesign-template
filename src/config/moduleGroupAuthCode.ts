/**
 * 模块权限分组，区别于单个权限码(新)
 * 由于模块权限比较细分，但又存在对模块整体可操作性判断的情况，固进行模块权限码分组
 */
export type Operates = 'delete' | 'update' | 'create' | 'view'
export type Module =
  | '/order/fault'
  | '/order/overhaul'
  | '/order/inspection-tour'
  | '/tool/ledger'
  | '/fault/hand'
  | '/fault/daily'
  | '/fault/knowledge-base'
  | '/change-shift/ledger'
  | '/overhaul/plan'
  | '/overhaul/build-plan'
  | '/device/classify'
  | '/device/ledger'
  | '/device/widget'
  | '/material/ledger'
  | '/material/consume'
  | '/material/total-consume'
  | '/outsourcing/company'
  | '/outsourcing/project'
  | '/repairs/overhaul'
  | '/repairs/inspection-tour'
  | '/inspection-tour/plan'
  | '/console/approve-flow'
  | '/console/fault-report'
  | '/console/organization'
  | '/console/manufacturer'
  | '/console/fault-type'
  | '/console/overhaul-cycle'
  | '/console/authority'
  | '/console/authority-group'
  | '/console/pre-field'
  | '/console/device-major'
  | '/console/weather'
  | '/console/place'
  | '/console/place-type'
  | '/console/line'
  | '/console/duty-point'
  | '/console/work-type'

type ModuleGroupAuthCodeConfig = {
  [j in Module]: {
    [k in Operates]?: string
  }
}
const moduleGroupAuthCodeConfig: ModuleGroupAuthCodeConfig = {
  /** 工单 */
  // 故障工单
  '/order/fault': {
    view: 'GDGL-GZ-VIEW'
  },
  // 检修工单
  '/order/overhaul': {
    view: 'GDGL-JX-VIEW'
  },
  // 巡视工单
  '/order/inspection-tour': {
    view: 'GDGL-XS-VIEW'
  },
  /** 工器具 */
  // 工器具台账
  '/tool/ledger': {
    delete: 'GQJ-TZ-DELETE',
    update: 'GQJ-TZ-EDIT',
    create: 'GQJ-TZ-ADD',
    view: 'GQJ-TZ-VIEW'
  },
  /** 故障管理 */
  // 故障提报
  '/fault/hand': {
    delete: 'GZGL-TB-DELETE',
    update: 'GZGL-TB-EDIT',
    create: 'GZGL-TB-ADD',
    view: 'GZGL-TB-VIEW'
  },
  // 日报故障
  '/fault/daily': {
    create: 'GZGL-RBGZ-ADD',
    view: 'GZGL-RBGZ-VIEW'
  },
  // 故障知识库
  '/fault/knowledge-base': {
    delete: 'GZGL-ZSK-DELETE',
    update: 'GZGL-ZSK-EDIT',
    create: 'GZGL-ZSK-ADD',
    view: 'GZGL-ZSK-VIEW'
  },
  /** 交接班管理 */
  // 交接班台账
  '/change-shift/ledger': {
    view: 'JJB-VIEW'
  },
  /** 检修管理 */
  // 检修计划
  '/overhaul/plan': {
    delete: 'JXGL-JH-DELETE',
    update: 'JXGL-JH-EDIT',
    create: 'JXGL-JH-ADD',
    view: 'JXGL-JH-VIEW'
  },
  // 施工计划
  '/overhaul/build-plan': {
    delete: 'JXGL-SG-DELETE',
    update: 'JXGL-SG-EDIT',
    create: 'JXGL-SG-ADD',
    view: 'JXGL-SG-VIEW'
  },
  /** 设备管理 */
  // 设备分类
  '/device/classify': {
    delete: 'SBGL-FL-DELETE',
    update: 'SBGL-FL-EDIT',
    create: 'SBGL-FL-ADD',
    view: 'SBGL-FL-VIEW'
  },
  // 设备台账
  '/device/ledger': {
    delete: 'SBGL-TZ-DELETE',
    update: 'SBGL-TZ-EDIT',
    create: 'SBGL-TZ-ADD',
    view: 'SBGL-TZ-VIEW'
  },
  // 部件台账
  '/device/widget': {
    delete: 'SBGL-BJ-DELETE',
    update: 'SBGL-BJ-EDIT',
    create: 'SBGL-BJ-ADD',
    view: 'SBGL-BJ-VIEW'
  },
  /** 物资管理 */
  // 物资台账
  '/material/ledger': {
    delete: 'WZGL-TZ-DELETE',
    update: 'WZGL-TZ-EDIT',
    create: 'WZGL-TZ-ADD',
    view: 'WZGL-TZ-VIEW'
  },
  // 物资消耗
  '/material/consume': {
    view: 'WZGL-XH-VIEW'
  },
  // 物资总耗
  '/material/total-consume': {
    view: 'WZGL-ZH-VIEW'
  },
  /** 委外管理 */
  // 委外单位
  '/outsourcing/company': {
    delete: 'WW-DW-DELETE',
    update: 'WW-DW-EDIT',
    create: 'WW-DW-ADD',
    view: 'WW-DW-VIEW'
  },
  // 委外项目
  '/outsourcing/project': {
    delete: 'WW-XM-DELETE',
    update: 'WW-XM-EDIT',
    create: 'WW-XM-ADD',
    view: 'WW-XM-VIEW'
  },
  /** 修程管理 */
  // 检修修程
  '/repairs/overhaul': {
    delete: 'XCGL-JX-DELETE',
    update: 'XCGL-JX-EDIT',
    create: 'XCGL-JX-ADD',
    view: 'XCGL-JX-VIEW'
  },
  // 巡视修程
  '/repairs/inspection-tour': {
    update: 'XCGL-XS-EDIT',
    create: 'XCGL-XS-ADD',
    view: 'XCGL-XS-VIEW'
  },
  /** 巡视管理 */
  // 巡视计划
  '/inspection-tour/plan': {
    delete: 'XSGL-JH-DELETE',
    update: 'XSGL-JH-EDIT',
    create: 'XSGL-JH-ADD',
    view: 'XSGL-JH-VIEW'
  },
  /** 系统配置 */
  // 审批流
  '/console/approve-flow': {
    delete: 'XTPZ-APPROVE-DELETE',
    update: 'XTPZ-APPROVE-EDIT',
    create: 'XTPZ-APPROVE-ADD',
    view: 'XTPZ-APPROVE-VIEW'
  },
  // 故障报告方
  '/console/fault-report': {
    delete: 'XTPZ-BGF-DELETE',
    update: 'XTPZ-BGF-EDIT',
    create: 'XTPZ-BGF-ADD',
    view: 'XTPZ-BGF-VIEW'
  },
  // 部门与成员管理
  '/console/organization': {
    update: 'XTPZ-BM-EDIT',
    view: 'XTPZ-BM-VIEW'
  },
  // 供应商管理
  '/console/manufacturer': {
    delete: 'XTPZ-GYS-DELETE',
    update: 'XTPZ-GYS-EDIT',
    create: 'XTPZ-GYS-ADD',
    view: 'XTPZ-GYS-VIEW'
  },
  // 故障类型
  '/console/fault-type': {
    delete: 'XTPZ-GZLX-DELETE',
    update: 'XTPZ-GZLX-EDIT',
    create: 'XTPZ-GZLX-ADD',
    view: 'XTPZ-GZLX-VIEW'
  },
  // 检修周期
  '/console/overhaul-cycle': {
    delete: 'XTPZ-JXZQ-DELETE',
    update: 'XTPZ-JXZQ-EDIT',
    create: 'XTPZ-JXZQ-ADD',
    view: 'XTPZ-JXZQ-VIEW'
  },
  // 权限配置
  '/console/authority': {
    update: 'XTPZ-QXPZ-EDIT',
    view: 'XTPZ-QXPZ-VIEW'
  },
  // 权限分组
  '/console/authority-group': {
    view: ''
  },
  // 预置字段
  '/console/pre-field': {
    view: ''
  },
  // 设备专业
  '/console/device-major': {
    delete: 'XTPZ-SBZY-DELETE',
    update: 'XTPZ-SBZY-EDIT',
    create: 'XTPZ-SBZY-ADD',
    view: 'XTPZ-SBZY-VIEW'
  },
  // 天气
  '/console/weather': {
    create: 'XTPZ-TQ-ADD',
    view: 'XTPZ-TQ-VIEW'
  },
  // 位置管理
  '/console/place': {
    delete: 'XTPZ-WZGL-DELETE',
    update: 'XTPZ-WZGL-EDIT',
    create: 'XTPZ-WZGL-ADD',
    view: 'XTPZ-WZGL-VIEW'
  },
  // 位置类型
  '/console/place-type': {
    delete: 'XTPZ-WZLX-DELETE',
    update: 'XTPZ-WZLX-EDIT',
    create: 'XTPZ-WZLX-ADD',
    view: 'XTPZ-WZLX-VIEW'
  },
  // 线路
  '/console/line': {
    delete: 'XTPZ-XL-DELETE',
    update: 'XTPZ-XL-EDIT',
    create: 'XTPZ-XL-ADD',
    view: 'XTPZ-XL-VIEW'
  },
  // 值班点
  '/console/duty-point': {
    create: 'XTPZ-ZBD-ADD',
    view: 'XTPZ-ZBD-VIEW'
  },
  // 作业类型
  '/console/work-type': {
    delete: 'XTPZ-ZYLX-DELETE',
    update: 'XTPZ-ZYLX-EDIT',
    create: 'XTPZ-ZYLX-ADD',
    view: 'XTPZ-ZYLX-VIEW'
  }
}

export default moduleGroupAuthCodeConfig
