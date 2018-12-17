export default function (entityRelationshipName, entityId) {
  return {
    [entityRelationshipName]: entityId,
    active: 1
  }
}
