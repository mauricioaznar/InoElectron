import cloneDeep from 'renderer/services/common/cloneDeep'

export default function (relationshipObject, hostIdentificatorProperty, hostIdentificator) {
  let modifiedRelationshipObj = cloneDeep(relationshipObject)
  modifiedRelationshipObj[hostIdentificatorProperty] = hostIdentificator
  return modifiedRelationshipObj
}
