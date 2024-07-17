/**
 * 获取当前登录用户信息
 *
 * At 2022.08.26
 * By TangJiaHui
 * */

// 返回本地测试用户消息（在本地环境时自动生效，不会影响正式环境）
function getTestUserInfo(currentUser) {
  return {
    ...currentUser,
    // companyId: 11524,
    // projectId: 59
    // companyId: 11864
  }
}

export function getCurrentUserInfo() {
  const user = uni.$u.currentUser
  const isSubCompany = user.isSubCompanyModule()
  const isProject = user.isProjectModule()

  function getName() {
    if (isSubCompany) return currentUser.subCompanyName
    if (isProject) return currentUser.projectName
    return currentUser.companyName
  }

  const currentUser = {
    ...user.getUser(), // key、mName、mid
    companyId: user.getCompanyId(), // 企业id
    companyName: user.getCompanyName(), // 企业名称
    projectId: user.getProjectId(), // 项目id
    projectName: user.getProjectName(), // 项目名称
    subCompanyId: user.getDepartId(), // 子公司id
    subCompanyName: user.getDepartName(), // 子公司名称
    isCompany: !(isSubCompany || isProject), // 是否 企业
    isSubCompany, // 是否 子公司
    isProject, // 是否 项目
    getName,
  }

  if (process.env.NODE_ENV === 'development') {
    return getTestUserInfo(currentUser)
  }
  return currentUser
}
