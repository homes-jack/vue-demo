import ajax from './ajax'
import qs from 'qs'
// console.log(process.env.NODE_ENV)
const baseUrl = {
  serverLmp: {
    dev: 'http://testdms.maxuscloud.cn/ampService',
    uat: 'https://test34.maxuscloud.cn/ampService',
    production: 'https://xyx.saicmaxus.com/ampService',
    sitb: 'https://test102.maxuscloud.cn/ampService'
  },
  authUrl: {
    dev: 'http://testdms.maxuscloud.cn/auth',
    uat: 'https://test34.maxuscloud.cn/auth',
    production: 'https://xyx.saicmaxus.com/auth',
    sitb: 'https://test102.maxuscloud.cn/auth'
  }
}
//登陆过期跳转
const url = {
  dev: "http://testdms.maxuscloud.cn",
  uat: "https://test34.maxuscloud.cn",
  production: "https://xyx.saicmaxus.com",
  sitb: 'https://test102.maxuscloud.cn'
}
export const logUrl = `${url[process.env.NODE_ENV] || ''}/authcenter/base/logout?redirectUrl=${url[process.env.NODE_ENV] || ''}/web/authcenter/index.html#/`
console.log('api.js' + baseUrl.authUrl[process.env.NODE_ENV]);
console.log('api.js'+baseUrl.serverLmp[process.env.NODE_ENV]);
export const getUrlParams = (param) => {
  return qs.stringify(param)
}

export const selectPermissionListAppCode = async (param = {}, config = {
  dev: 'origin'
}) => await ajax.get(`${url[process.env.NODE_ENV] || ''}/menu/resource/selectPermissionByAppCode`, param, config)

export const authorizedApp = async (param = {}, config = {
  dev: 'origin'
}) => await ajax.get(`${url[process.env.NODE_ENV] || ''}/userService/current/authorizedApp`, param, config)

export const getMenuByUser = async (param = {}, config = {
  dev: 'origin'
}) => await ajax.get(`${url[process.env.NODE_ENV] || ''}/menu/userMenu/getMainMenuByUser`, param, config)

export const getSecMenuByUser = async (param = {}, config = {
  dev: 'origin'
}) => await ajax.post(`${url[process.env.NODE_ENV] || ''}/menu/userMenu/getSecMenuByUser`, param, config)

export const userAndProxyInfo = async (param = {}, config = {
  dev: 'origin'
}) => await ajax.get(`${url[process.env.NODE_ENV] || ''}/userService/current/userAndProxyInfo`, param, config)

export const getHistoryBehaviors = async (param = {}, config = {
  dev: 'origin'
}) => await ajax.get(`${url[process.env.NODE_ENV] || ''}/userService/current/getBehaviors`, param, config)

export const getOrgByOrgId = async (param = {}, config = {
  dev: 'origin'
}) => await ajax.get(`${url[process.env.NODE_ENV] || ''}/userService/org/getOrgByOrgId`, param, config)

export const dataRoleAuthorizationByUserId = async (param = {}, config = {
  dev: 'origin'
}) => await ajax.get(`${url[process.env.NODE_ENV] || ''}/userService/current/dataRoleAuthorizationByUserId`, param, config)

export const getOrgListByParentOrgId = async (param = {}, config = {
  dev: 'origin'
}) => await ajax.post(`${url[process.env.NODE_ENV] || ''}/auth/getOrgListByParentOrgId`, param, config)

// export const getInfo = async (param = {}, config = {}) =>
//   await ajax.get(`${baseUrl.serverB[process.env.NODE_ENV] || ''}/mobile/home/getHeadData`, param, config)

// export const test = async (param = {}, config = {}) =>
//   await ajax.get(`${baseUrl.serverA[process.env.NODE_ENV] || ''}/mobile/home/getHeadData`, param, { ...config, timeout: 1000 })


//--------下面是页面接口调用----------
//活动列表查询

export const postQueryActivityList = async (param = {}, config = {}) =>
await ajax.post(`${baseUrl.serverLmp[process.env.NODE_ENV] || ''}/activityWebController/queryActivityListByParam`, param, config)

//获取全部车系

export const postGetAllSeries = async (param = {}, config = {}) =>
await ajax.post(`${baseUrl.serverLmp[process.env.NODE_ENV] || ''}/masterDataWebController/getAllSeries`, param, config)

//通过代码类型获取活动目的

export const postQueryByCodeType = async (param = {}, config = {}) =>
await ajax.post(`${baseUrl.serverLmp[process.env.NODE_ENV] || ''}/tFixCodeWebController/queryByCodeType`, param, config)

//获取 级来源

export const postQuerySourceListByPid = async (param = {}, config = {}) =>
await ajax.post(`${baseUrl.serverLmp[process.env.NODE_ENV] || ''}/tSourceWebController/querySourceListByLevelCode`, param, config)

//获取一级
export const  postFirstSourceList = async (param = {}, config = {}) =>
  await ajax.post(`${baseUrl.serverLmp[process.env.NODE_ENV] || ''}/tSourceWebController/querySourceListByLevelCode`, param, config)
//获取二级来源

export const postQuerySourceListByPrimaryKey = async (param = {}, config = {}) =>
await ajax.post(`${baseUrl.serverLmp[process.env.NODE_ENV] || ''}/tSourceWebController/querySourceListByPrimaryKey`, param, config)

//数据字典根据CODE获取codeList

export const  getCodeListByCode = async (param = {}, config = {}) =>
await ajax.post(`${baseUrl.serverLmp[process.env.NODE_ENV] || ''}/tFixCodeWebController/queryByCodeType`, param, config)

//通过活动id去请求活动详情 activityWebController/queryActvityInfoByActId

export const postQueryActvityInfoByActId = async (param = {}, config = {}) =>
await ajax.post(`${baseUrl.serverLmp[process.env.NODE_ENV] || ''}/activityWebController/queryActivityInfoByActId`, param, config)

//查找审批历史信息

export const postQueryActAuditHistoryMain = async (param = {}, config = {}) =>
await ajax.post(`${baseUrl.serverLmp[process.env.NODE_ENV] || ''}
/actFlowController/getActAuditHistoryMain`, param, config)

//获取省市区域

export const postQueryRegionByParentId = async (param = {}, config = {}) =>
await ajax.post(`${baseUrl.serverLmp[process.env.NODE_ENV] || ''}
/masterDataWebController/queryRegionByParentId`, param, config)

//获取管理级别

export const postselectSystemMetadataByTypeCode = async (param = {},config = {})=>
await ajax.post(`${baseUrl.serverLmp[process.env.NODE_ENV] || ''}
/masterDataWebController/selectSystemMetadataByTypeCode`, param, config)

//通过省市code和级别获取经销商

export const postQueryDealerByCityCodeOrManageLevel = async (param = {},config = {})=>
await ajax.post(`${baseUrl.serverLmp[process.env.NODE_ENV] || ''}
/masterDataWebController/queryDealerByCityCodeOrManageLevel`, param, config)

//新增活动接口

export const postSaveActivityInfo = async (param = {},config = {})=>
await ajax.post(`${baseUrl.serverLmp[process.env.NODE_ENV] || ''}
/activityWebController/saveActivityInfo`, param, config)

//获取信息变更详情

export const postChangeApprovalList = async (param = {},config = {})=>
await ajax.post(`${baseUrl.serverLmp[process.env.NODE_ENV] || ''}
/activityWebController/queryActInfoChangeApprovalList`, param, config)

//活动变更并保存

export const postUpdateActivityTime = async (param = {},config = {})=>
await ajax.post(`${baseUrl.serverLmp[process.env.NODE_ENV] || ''}
/activityWebController/updateActivityTime`, param, config)

//推广活动查询

export const postQueryActSpreadPlan = async (param = {},config = {})=>
await ajax.post(`${baseUrl.serverLmp[process.env.NODE_ENV] || ''}
/actSpreadPlanWebController/queryActSpreadPlanListByConditions`, param, config)

//推广计划详情查询

export const postSelectByPrimaryKey = async (param = {},config = {})=>
await ajax.post(`${baseUrl.serverLmp[process.env.NODE_ENV] || ''}
/actSpreadPlanWebController/selectByPrimaryKey`, param, config)

//推广计划导入

export const postImportExcel = async (param = {},config = {})=>
await ajax.post(`${baseUrl.serverLmp[process.env.NODE_ENV] || ''}
/actSpreadPlanWebController/importExcel`, param, config)

//推广计划导出 /actSpreadPlanWebController/importExcel

export const postExportTAct = async (param = {},config = {})=>
await ajax.post(`${baseUrl.serverLmp[process.env.NODE_ENV] || ''}
/actSpreadPlanWebController/exportTActSpreadPlan`, param, config)

//垂媒活动导出
export const postExportMedia = async (param = {},config = {})=>
 await ajax.post(`${baseUrl.serverLmp[process.env.NODE_ENV] || ''}
/activityWebController/exportMediaActivity`, param, config)


//删除活动

export const postDeleteActivity = async (param = {},config = {})=>
await ajax.post(`${baseUrl.serverLmp[process.env.NODE_ENV] || ''}
/activityWebController/deleteActivity`, param, config)

//上传附件接口

export const postpload = async (param = {},config = {})=>
await ajax.post(`${baseUrl.serverLmp[process.env.NODE_ENV] || ''}
/fileInfoController/upload`, param, config)

//上传附件并保存

export const postploadAndSave = async (param = {},config = {})=>
await ajax.post(`${baseUrl.serverLmp[process.env.NODE_ENV] || ''}
/fileInfoController/uploadAndSaveFileInfo`, param, config)

//删除附件
export const deleteUploadFile = async (param = {},config = {})=>
await ajax.post(`${baseUrl.serverLmp[process.env.NODE_ENV] || ''}
/fileInfoController/deleteFileInfo`, param, config)

//获取车展活动列表

export const carShowActivityList = async (param = {},config = {})=>
await ajax.post(`${baseUrl.serverLmp[process.env.NODE_ENV] || ''}
/activityWebController/queryActivityListByParam`, param, config)


//导出车展活动到excel
export const exportCarShowList = async (param = {},config = {})=>
await ajax.post(`${baseUrl.serverLmp[process.env.NODE_ENV] || ''}
/actCarExhInfoWebController/exportActCarExh`, param, config)

//查看车展活动详情
export const carShowDetail = async (param = {},config = {})=>
await ajax.post(`${baseUrl.serverLmp[process.env.NODE_ENV] || ''}
/actCarExhInfoWebController/queryActCarExhInfoAndDealerInfo`, param, config)

//新增车展活动
export const addCarShowActivity = async (param = {},config = {})=>
await ajax.post(`${baseUrl.serverLmp[process.env.NODE_ENV] || ''}
/actCarExhInfoWebController/insertActCarExhInfo`, param, config)

//车展活动编辑页面数据
export const getCarShowEditData = async (param = {},config = {})=>
await ajax.post(`${baseUrl.serverLmp[process.env.NODE_ENV] || ''}
/actCarExhInfoWebController/queryActCarExhInfoByActId`, param, config)

//车展活动效果保存
export const carShowEffectSave = async (param = {},config = {})=>
await ajax.post(`${baseUrl.serverLmp[process.env.NODE_ENV] || ''}
/actCarExhInfoWebController/batchActCarExhInfo`, param, config)

//车展活动基础信息和承办经销商更新
export const carShowUpdate = async (param = {},config = {})=>
await ajax.post(`${baseUrl.serverLmp[process.env.NODE_ENV] || ''}
/actCarExhInfoWebController/updateActCarExhInfo`, param, config)

//分页获取经销商列表
export const queryActDealerList = async (param = {},config = {})=>
await ajax.post(`${baseUrl.serverLmp[process.env.NODE_ENV] || ''}
/actDealerController/queryActDealerListPageByParam`, param, config)

//编辑页面获取经销商列表
export const queryEditActDealerList = async (param = {},config = {})=>
await ajax.post(`${baseUrl.serverLmp[process.env.NODE_ENV] || ''}
/actDealerController/queryActDealerListByActivityId`, param, config)

//获取活动审批变更列表
export const getActivityApproveList = async (param = {},config = {})=>
await ajax.post(`${baseUrl.serverLmp[process.env.NODE_ENV] || ''}
/activityWebController/queryActChangeApprovalPageByParam`, param, config)

//活动变更审批
export const approveActivity = async (param = {},config = {})=>
await ajax.post(`${baseUrl.serverLmp[process.env.NODE_ENV] || ''}
/activityWebController/auditActInfoChange`, param, config)

//活动工作流审批 -- 根据流程编号查看页面标题  -1
export const uploadQueryTitle = async (param = {}, config = {}) =>
await ajax.post(`${baseUrl.serverLmp[process.env.NODE_ENV] || ''}/actFlowController/queryActFlowByFlowNo`, param, config)

//活动工作流审批 -- 根据流程编号查看活动详细信息-2
export const uploadQueryFlowNo = async (param = {}, config = {}) =>
await ajax.post(`${baseUrl.serverLmp[process.env.NODE_ENV] || ''}/activityWebController/queryActivityInfoByFlowNo`, param, config)

//活动工作流审批 --  显示按钮接口  -3
export const uploadQueryExecuteActions = async (param = {}, config = {}) =>
await ajax.post(`${baseUrl.serverLmp[process.env.NODE_ENV] || ''}/actFlowController/getExecuteActions`, param, config)

//活动工作流审批 -- 中间的审核附件的内容  -4
export const uploadQueryBusiActions = async (param = {}, config = {}) =>
await ajax.post(`${baseUrl.serverLmp[process.env.NODE_ENV] || ''}/actFlowController/getBusiActions`, param, config)

//活动工作流审批 -- 提交按钮接口  -5
export const uploadQueryAuditActFlow = async (param = {}, config = {}) =>
await ajax.post(`${baseUrl.serverLmp[process.env.NODE_ENV] || ''}/activityWebController/auditActFlow`, param, config)


//活动工作流审批 -- 底部的审批详情  -6
export const QueryAuditHistoryDetail = async (param = {}, config = {}) =>
await ajax.post(`${baseUrl.serverLmp[process.env.NODE_ENV] || ''}/actFlowController/getAuditHistoryDetail`, param, config)

//活动工作流审批 -- 下载推广计划模板  -7
export const uploadDownloadTemp = async (param = {}, config = {}) =>
await ajax.post(`${baseUrl.serverLmp[process.env.NODE_ENV] || ''}/fileInfoController/getTemplateInfo`, param, config)

export const uploadDownloadTempNew = async (param = {}, config = {}) =>
    await ajax.post(`${baseUrl.serverLmp[process.env.NODE_ENV] || ''}/fileInfoController/getTemplateInfo`, param, config)


export const postQueryActCarEx = async (param = {},config = {})=>
await ajax.post(`${baseUrl.serverLmp[process.env.NODE_ENV] || ''}
/actCarExhInfoWebController/queryActCarExhInfoAndDealerInfo`, param, config)

// 战区-大区-小区-经销商
export const postQueryPlace = async (param = {}, config = {}) =>
  await ajax.post(`${baseUrl.serverLmp[process.env.NODE_ENV] || ''}
/masterDataWebController/queryOrgDtoListByParentOrgId`, param, config)

// 战区找经销商
export const postQueryDealerList = async (param = {}, config = {}) =>
  await ajax.post(`${baseUrl.serverLmp[process.env.NODE_ENV] || ''}
/masterDataWebController/queryChildOrgByOrgId`, param, config)

//活动删除

export const delteActivity = async (param = {},config = {})=>
await ajax.post(`${baseUrl.serverLmp[process.env.NODE_ENV] || ''}
/activityWebController/deleteActivity`, param, config)

// 垂媒活动编辑
export const activityEdit = async (param = {}, config = {}) =>
  await ajax.post(`${baseUrl.serverLmp[process.env.NODE_ENV] || ''}
/activityWebController/updateActivityInfo`, param, config)
//垂媒活动提交

export const submitActivity = async (param = {},config = {})=>
await ajax.post(`${baseUrl.serverLmp[process.env.NODE_ENV] || ''}
/activityWebController/submitActivity`, param, config)

//信息变更提交

export const postActInfoChange = async (param = {},config = {})=>
await ajax.post(`${baseUrl.serverLmp[process.env.NODE_ENV] || ''}
/activityWebController/applyActInfoChange`, param, config)

//素材平台选取
export const getSouceList = async (param = {}, config = {}) =>
  await ajax.post(`${baseUrl.serverLmp[process.env.NODE_ENV] || ''}
/fileInfoController/getMaterialListByActId`, param, config)

export const getDealerList = async (param = {}, config = {}) =>
  await ajax.post(`${baseUrl.serverLmp[process.env.NODE_ENV] || ''}/actDealerController/queryActDealerListByActivityId`, param, config)

//clm潜客列表
export const getClm = async (param = {}, config = {}) =>
  await ajax.post(`${baseUrl.serverLmp[process.env.NODE_ENV] || ''}/actClmEffLeadsDetailController/queryActClmEffLeadsDetialList`, param, config)

//媒体活动审批-审批人
export const getNextAuditPerson = async (param = {}, config = {}) =>
  await ajax.post(`${baseUrl.serverLmp[process.env.NODE_ENV] || ''}/actFlowController/getNextAuditPerson`, param, config)
//根据媒体类型获取节点审核人列表
export const getApproveListByMediaType = async (param = {}, config = {}) =>
  await ajax.post(`${baseUrl.serverLmp[process.env.NODE_ENV] || ''}/activityWebController/getAuditNodePersonListByMediaResourceType`, param, config)

//根据活动编号获取审批人
export const getAuditNodePerson = async (param = {}, config = {}) =>
  await ajax.post(`${baseUrl.serverLmp[process.env.NODE_ENV] || ''}/activityWebController/getAuditNodePersonListByActId`, param, config)

//根据C端活动id查询
export const getCDActivityDetail = async (param = {}, config = {}) =>
  await ajax.post(`${baseUrl.serverLmp[process.env.NODE_ENV] || ''}/activityWebController/queryCdActivityInfoByActId`, param, config)

//C端活动更新
export const updateCDActivity = async (param = {}, config = {}) =>
  await ajax.post(`${baseUrl.serverLmp[process.env.NODE_ENV] || ''}/activityWebController/updateCdActivityInfo`, param, config)

//获取C端、经销商活动、经销商活动核销审核人
export const getNodePerson = async (param = {}, config = {}) =>
  await ajax.post(`${baseUrl.serverLmp[process.env.NODE_ENV] || ''}/activityWebController/getAuditNodePersonByFlowType`, param, config)

//c端活动查询详情
export const getCdActivityInfoByActId = async (param = {}, config = {}) =>
  await ajax.post(`${baseUrl.serverLmp[process.env.NODE_ENV] || ''}/activityWebController/queryCdActivityInfoByActId`, param, config)

//c端活动审批历史查询
export const getCdAuditHistoryDetailByActId = async (param = {}, config = {}) =>
  await ajax.post(`${baseUrl.serverLmp[process.env.NODE_ENV] || ''}/actFlowController/getAuditHistoryDetailByActId`, param, config)

//推广计划模板下载
export const exportTemplate = async (param = {}, config = {}) =>
  await ajax.post(`${baseUrl.serverLmp[process.env.NODE_ENV] || ''}/fileInfoController/getTemplateInfo`, param, config)

 // c端活动保存
 export const postSaveCdActivityInfo = async (param = {}, config = {}) =>
 await ajax.post(`${baseUrl.serverLmp[process.env.NODE_ENV] || ''}/activityWebController/saveCdActivityInfo`, param, config)

// c端活动草稿保存or更新
export const postSaveOrUpdateCdDraftAct = async (param = {}, config = {}) =>
    await ajax.post(`${baseUrl.serverLmp[process.env.NODE_ENV] || ''}/actCdController/saveOrUpdateCdDraftAct`, param, config)

// C端删除服务器临时文件
export const postdeleteTempFile = async (param = {}, config = {}) =>
    await ajax.post(`${baseUrl.serverLmp[process.env.NODE_ENV] || ''}/fileInfoController/deleteTempFile`, param, config)

//C端活动下载模板
export const uploadDownloadTempcd = async (param = {}, config = {}) =>
    await ajax.post(`${baseUrl.serverLmp[process.env.NODE_ENV] || ''}/fileInfoController/getTemplateInfo`, param, config)

 export const getTemplateInfo = async (param = {}, config = {}) =>
    await ajax.post(`${baseUrl.serverLmp[process.env.NODE_ENV] || ''}/fileInfoController/getTemplateInfo `, param, config)
//媒体活动草稿保存
export const saveOrUpdateMediaDraftAct = async (param = {}, config = {}) =>
  await ajax.post(`${baseUrl.serverLmp[process.env.NODE_ENV] || ''}/actMediaController/saveOrUpdateMediaDraftAct `, param, config)
  //新增车展活动保存功能
  export const saveOrUpdateCarExhDraftAct = async (param = {}, config = {}) =>
  await ajax.post(`${baseUrl.serverLmp[process.env.NODE_ENV] || ''}/actCarExhInfoWebController/saveOrUpdateCarExhDraftAct`, param, config)

//新增经销商活动保存
export const saveAddDealerActivity = async (param = {}, config = {}) =>
    await ajax.post(`${baseUrl.serverLmp[process.env.NODE_ENV] || ''}/activityWebController/saveDealerActivityInfo`, param, config)

//查询当前用户信息
export const getUserInfo = async (param = {}, config = {}) =>
    await ajax.post(`${baseUrl.serverLmp[process.env.NODE_ENV] || ''}/userInfoController/getUserInfo`, param, config)

//查询经销商下级经销商及本身
export const getNextDealerList = async (param = {}, config = {}) =>
    await ajax.post(`${baseUrl.serverLmp[process.env.NODE_ENV] || ''}/masterDataWebController/getCurrDealerByParentId`, param, config)

//经销商活动查询
export const getDealer = async (param = {}, config = {}) =>
  await ajax.post(`${baseUrl.serverLmp[process.env.NODE_ENV] || ''}/activityWebController/queryActivityListByParam `, param, config)
//经销商活动更新
export const uploadDealer = async (param = {}, config = {}) =>
  await ajax.post(`${baseUrl.serverLmp[process.env.NODE_ENV] || ''}/activityWebController/updateDealerActivityInfo`, param, config)

// 经销商活动核销详情查询
export const getDealerVerificateInfo = async (param = {}, config = {}) =>
    await ajax.post(`${baseUrl.serverLmp[process.env.NODE_ENV] || ''}/actDealerVerificationController/queryActDealerVerificationInfoByActId`, param, config)

//查询活动核销详情
export const getVerificateDetail = async (param = {}, config = {}) =>
  await ajax.post(`${baseUrl.serverLmp[process.env.NODE_ENV] || ''}/actDealerVerificationController/queryActDealerVerificationInfoByActId`, param, config)

//保存活动核销
export const saveVerificate = async (param = {}, config = {}) =>
  await ajax.post(`${baseUrl.serverLmp[process.env.NODE_ENV] || ''}/actDealerVerificationController/saveActDealerVerificationInfo`, param, config)

//经销商活动导出
export const exportActDelear = async (param = {}, config = {}) =>
  await ajax.post(`${baseUrl.serverLmp[process.env.NODE_ENV] || ''}/activityWebController/exportActDelear`, param, config)

  //经销商活动删除


 //经销商活动获取审批人
export const getDealerNodePerson = async (param = {}, config = {}) =>
 await ajax.post(`${baseUrl.serverLmp[process.env.NODE_ENV] || ''}/activityWebController/getAuditNodePersonByFlowType`, param, config)

 //经销商核销列表查询
export const queryActDealerVerificationList = async (param = {}, config = {}) =>
 await ajax.post(`${baseUrl.serverLmp[process.env.NODE_ENV] || ''}/actDealerVerificationController/queryActDealerVerificationListPageByParam`, param, config)

 //经销商核销导出

export const exportActDealerVerification = async (param = {}, config = {}) =>
 await ajax.post(`${baseUrl.serverLmp[process.env.NODE_ENV] || ''}/actDealerVerificationController/exportActDealerVerification`, param, config)

 //经销商核销提交

export const submitDealerActVer = async (param = {}, config = {}) =>
 await ajax.post(`${baseUrl.serverLmp[process.env.NODE_ENV] || ''}/actDealerVerificationController/submitDealerActVer`, param, config)

// 经销商核销审批
export const auditActVerifyFlow = async (param = {}, config = {}) =>
 await ajax.post(`${baseUrl.serverLmp[process.env.NODE_ENV] || ''}/actDealerVerificationController/auditActVerifyFlow`, param, config)

//获取一级来源（经销商活动）
export const getFirstSource = async (param = {}, config = {}) =>
 await ajax.post(`${baseUrl.serverLmp[process.env.NODE_ENV] || ''}/tSourceWebController/querySourceListByPidAndType`, param, config)

//经销商活动查询流转意见
export const getAuditHisByActIdAndFlowCode = async (param = {}, config = {}) =>
    await ajax.post(`${baseUrl.serverLmp[process.env.NODE_ENV] || ''}/actFlowController/getAuditHisByActIdAndFlowCode`, param, config)

//经销商活动草稿保存or更新
export const saveOrUpdateDealerDraftAct = async (param = {}, config = {}) =>
    await ajax.post(`${baseUrl.serverLmp[process.env.NODE_ENV] || ''}/actDealerInfoController/saveOrUpdateDealerDraftAct`, param, config)

//根据代码查询字典列表
export const queryCodeInfoByCode = async (param = {}, config = {}) =>
  await ajax.post(`${baseUrl.serverLmp[process.env.NODE_ENV] || ''}/tFixCodeWebController/queryByCode`, param, config)
// 查询经销商预算
export const queryActDealerBudget = async (param = {}, config = {}) =>
  await ajax.post(`${baseUrl.serverLmp[process.env.NODE_ENV] || ''}/actDealerRebateController/queryActDealerBudget`, param, config)