import RouteObjectHelper from 'renderer/services/routeObject/RouteObjectHelper'
import EntityTypes from 'renderer/api/EntityTypes'
import ChildTypes from 'renderer/api/ChildTypes'
import Categories from 'renderer/api/Categories'
import GlobalEntityIdentifier from 'renderer/services/api/GlobalEntityIdentifier'

let routeObjects = []

routeObjects.push(RouteObjectHelper.createRouteObject(EntityTypes.AUTH, ChildTypes.MAIN,
  {
    category: Categories.AUTH
  },
  [
    RouteObjectHelper.createRouteObject(EntityTypes.AUTH, ChildTypes.MY_PROFILE, {
      categoryDefault: true,
      entityDefault: true,
      title: 'Mi perfil'
    }),
    RouteObjectHelper.createRouteObject(EntityTypes.AUTH, ChildTypes.TOKEN, {
      requiresAuth: false,
      title: 'Ingreso'
    })
  ]
))

routeObjects.push(RouteObjectHelper.createRouteObject(EntityTypes.BAG, ChildTypes.MAIN,
  {
    category: Categories.PRODUCTION
  },
  [
    RouteObjectHelper.createRouteObject(EntityTypes.BAG, ChildTypes.LIST,
      {
        categoryDefault: true,
        appDefault: true,
        entityDefault: true,
        iconClass: 'fa fa-list'
      }
    ),
    RouteObjectHelper.createRouteObject(EntityTypes.BAG, ChildTypes.CREATE,
      {
        iconClass: 'fa fa-plus'
      }
    ),
    RouteObjectHelper.createRouteObject(EntityTypes.BAG, ChildTypes.EDIT,
      {
        params: [GlobalEntityIdentifier],
        iconClass: 'fa fa-edit'
      }
    ),
    RouteObjectHelper.createRouteObject(EntityTypes.BAG, ChildTypes.VIEW,
      {
        params: [GlobalEntityIdentifier],
        iconClass: 'fa fa-eye'
      }
    ),
    RouteObjectHelper.createRouteObject(EntityTypes.BAG, ChildTypes.DEL,
      {
        params: [GlobalEntityIdentifier],
        iconClass: 'fa fa-trash-o'
      }
    )
  ]
))

routeObjects.push(RouteObjectHelper.createRouteObject(EntityTypes.BAG_ORDER_ADJUSTMENT, ChildTypes.MAIN,
  {
    category: Categories.PRODUCTION
  },
  [
    RouteObjectHelper.createRouteObject(EntityTypes.BAG_ORDER_ADJUSTMENT, ChildTypes.LIST,
      {
        entityDefault: true,
        iconClass: 'fa fa-list'
      }
    ),
    RouteObjectHelper.createRouteObject(EntityTypes.BAG_ORDER_ADJUSTMENT, ChildTypes.CREATE,
      {
        iconClass: 'fa fa-plus'
      }
    ),
    RouteObjectHelper.createRouteObject(EntityTypes.BAG_ORDER_ADJUSTMENT, ChildTypes.VIEW,
      {
        params: [GlobalEntityIdentifier],
        iconClass: 'fa fa-eye'
      }
    ),
    RouteObjectHelper.createRouteObject(EntityTypes.BAG_ORDER_ADJUSTMENT, ChildTypes.DEL,
      {
        params: [GlobalEntityIdentifier],
        iconClass: 'fa fa-trash-o'
      }
    )
  ]
))

routeObjects.push(RouteObjectHelper.createRouteObject(EntityTypes.BAG_ORDER_SALE_REQUEST, ChildTypes.MAIN,
  {
    category: Categories.SALES
  },
  [
    RouteObjectHelper.createRouteObject(EntityTypes.BAG_ORDER_SALE_REQUEST, ChildTypes.LIST,
      {
        categoryDefault: true,
        entityDefault: true,
        iconClass: 'fa fa-list'
      }
    ),
    RouteObjectHelper.createRouteObject(EntityTypes.BAG_ORDER_SALE_REQUEST, ChildTypes.CREATE,
      {
        iconClass: 'fa fa-plus'
      }
    ),
    RouteObjectHelper.createRouteObject(EntityTypes.BAG_ORDER_SALE_REQUEST, ChildTypes.EDIT,
      {
        params: [GlobalEntityIdentifier],
        iconClass: 'fa fa-edit'
      }
    ),
    RouteObjectHelper.createRouteObject(EntityTypes.BAG_ORDER_SALE_REQUEST, ChildTypes.VIEW,
      {
        params: [GlobalEntityIdentifier],
        iconClass: 'fa fa-eye'
      }
    ),
    RouteObjectHelper.createRouteObject(EntityTypes.BAG_ORDER_SALE_REQUEST, ChildTypes.DEL,
      {
        params: [GlobalEntityIdentifier],
        iconClass: 'fa fa-trash-o'
      }
    )
  ]
))

routeObjects.push(RouteObjectHelper.createRouteObject(EntityTypes.BAG_ORDER_SALE_RECEIPT, ChildTypes.MAIN,
  {
    category: Categories.SALES
  },
  [
    RouteObjectHelper.createRouteObject(EntityTypes.BAG_ORDER_SALE_RECEIPT, ChildTypes.LIST,
      {
        categoryDefault: true,
        entityDefault: true,
        iconClass: 'fa fa-list'
      }
    ),
    RouteObjectHelper.createRouteObject(EntityTypes.BAG_ORDER_SALE_RECEIPT, ChildTypes.CREATE,
      {
        iconClass: 'fa fa-plus'
      }
    ),
    RouteObjectHelper.createRouteObject(EntityTypes.BAG_ORDER_SALE_RECEIPT, ChildTypes.EDIT,
      {
        params: [GlobalEntityIdentifier],
        iconClass: 'fa fa-edit'
      }
    ),
    RouteObjectHelper.createRouteObject(EntityTypes.BAG_ORDER_SALE_RECEIPT, ChildTypes.VIEW,
      {
        params: [GlobalEntityIdentifier],
        iconClass: 'fa fa-eye'
      }
    ),
    RouteObjectHelper.createRouteObject(EntityTypes.BAG_ORDER_SALE_RECEIPT, ChildTypes.DEL,
      {
        params: [GlobalEntityIdentifier],
        iconClass: 'fa fa-trash-o'
      }
    )
  ]
))

routeObjects.push(RouteObjectHelper.createRouteObject(EntityTypes.BAG_ORDER_PRODUCTION, ChildTypes.MAIN,
  {
    category: Categories.PRODUCTION
  },
  [
    RouteObjectHelper.createRouteObject(EntityTypes.BAG_ORDER_PRODUCTION, ChildTypes.LIST,
      {
        entityDefault: true,
        iconClass: 'fa fa-list'
      }
    ),
    RouteObjectHelper.createRouteObject(EntityTypes.BAG_ORDER_PRODUCTION, ChildTypes.CREATE,
      {
        iconClass: 'fa fa-plus'
      }
    ),
    RouteObjectHelper.createRouteObject(EntityTypes.BAG_ORDER_PRODUCTION, ChildTypes.VIEW,
      {
        params: [GlobalEntityIdentifier],
        iconClass: 'fa fa-eye'
      }
    ),
    RouteObjectHelper.createRouteObject(EntityTypes.BAG_ORDER_PRODUCTION, ChildTypes.DEL,
      {
        params: [GlobalEntityIdentifier],
        iconClass: 'fa fa-trash-o'
      }
    )
  ]
))

routeObjects.push(RouteObjectHelper.createRouteObject(EntityTypes.CLIENT, ChildTypes.MAIN,
  {
    category: Categories.SALES
  },
  [
    RouteObjectHelper.createRouteObject(EntityTypes.CLIENT, ChildTypes.LIST,
      {
        categoryDefault: true,
        entityDefault: true,
        iconClass: 'fa fa-list'
      }
    ),
    RouteObjectHelper.createRouteObject(EntityTypes.CLIENT, ChildTypes.CREATE,
      {
        iconClass: 'fa fa-plus'
      }
    ),
    RouteObjectHelper.createRouteObject(EntityTypes.CLIENT, ChildTypes.EDIT,
      {
        params: [GlobalEntityIdentifier],
        iconClass: 'fa fa-edit'
      }
    ),
    RouteObjectHelper.createRouteObject(EntityTypes.CLIENT, ChildTypes.VIEW,
      {
        params: [GlobalEntityIdentifier],
        iconClass: 'fa fa-eye'
      }
    ),
    RouteObjectHelper.createRouteObject(EntityTypes.CLIENT, ChildTypes.DEL,
      {
        params: [GlobalEntityIdentifier],
        iconClass: 'fa fa-trash-o'
      }
    )
  ]
))

export default routeObjects


