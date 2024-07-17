import request from './request'

export async function fileDownloadUrl(th = 2, fileUuid) {
  if (!fileUuid) return Promise.resolve('')
  return request.post(
    `/api-gateway/file-center/api/v1beta/fileDownloadUrl.htm`,
    {
      requestType: 'form',
      data: {
        th,
        fileUuid
      }
    }
  )
}

export async function getUrlByUuid(fileUuid, th) {
  return new Promise(resolve => {
    if (!fileUuid) return resolve('')
    fileDownloadUrl(th, fileUuid).then(
      urls => resolve(urls),
      () => resolve(undefined)
    )
  })
}

export async function getUrlsByUuids(fileUuids, th) {
  return new Promise(resolve => {
    Promise.all(fileUuids.map(uuid => getUrlByUuid(uuid, th))).then(
      urls => resolve(urls),
      () => resolve([])
    )
  })
}
