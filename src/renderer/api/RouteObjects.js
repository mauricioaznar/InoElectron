import RouteObjectHelper from 'renderer/services/routeObject/RouteObjectHelper'
import EntityTypes from 'renderer/api/EntityTypes'
import Categories from 'renderer/api/Categories'
import GlobalEntityIdentifier from 'renderer/services/api/GlobalEntityIdentifier'

let routeObjects = []

routeObjects.push(RouteObjectHelper.createRouteObject(EntityTypes.AUTH,
  {
    category: Categories.AUTH,
    componentName: 'Main'
  },
  [
    RouteObjectHelper.createRouteObject(EntityTypes.AUTH, {
      componentName: 'MyProfile',
      categoryDefault: 'true',
      groupDefault: true,
      navbar: true,
      title: 'Mi perfil'
    }),
    RouteObjectHelper.createRouteObject(EntityTypes.AUTH, {
      componentName: 'Downloads',
      navbar: true,
      title: 'Descargas'
    }),
    RouteObjectHelper.createRouteObject(EntityTypes.AUTH, {
      componentName: 'Login',
      requiresAuth: false,
      title: 'Ingreso',
      appDefaultNotAuth: true
    })
  ]
))

routeObjects.push(RouteObjectHelper.createRouteObject(EntityTypes.BAG,
  {
    componentName: 'Main',
    category: Categories.PRODUCTION
  },
  [
    RouteObjectHelper.createRouteObject(EntityTypes.BAG,
      {
        appDefault: true,
        componentName: 'List',
        categoryDefault: true,
        groupDefault: true,
        navbar: true
      }
    ),
    RouteObjectHelper.createRouteObject(EntityTypes.BAG,
      {
        componentName: 'Create'
      }
    ),
    RouteObjectHelper.createRouteObject(EntityTypes.BAG,
      {
        componentName: 'Edit',
        params: [GlobalEntityIdentifier]
      }
    ),
    RouteObjectHelper.createRouteObject(EntityTypes.BAG,
      {
        componentName: 'View',
        params: [GlobalEntityIdentifier]
      }
    )
  ]
))

routeObjects.push(RouteObjectHelper.createRouteObject(EntityTypes.BAG_ORDER_ADJUSTMENT,
  {
    componentName: 'Main',
    category: Categories.PRODUCTION
  },
  [
    RouteObjectHelper.createRouteObject(EntityTypes.BAG_ORDER_ADJUSTMENT,
      {
        componentName: 'List',
        groupDefault: true,
        navbar: true
      }
    ),
    RouteObjectHelper.createRouteObject(EntityTypes.BAG_ORDER_ADJUSTMENT,
      {
        componentName: 'Create'
      }
    ),
    RouteObjectHelper.createRouteObject(EntityTypes.BAG_ORDER_ADJUSTMENT,
      {
        componentName: 'View',
        params: [GlobalEntityIdentifier]
      }
    )
  ]
))

routeObjects.push(RouteObjectHelper.createRouteObject(EntityTypes.BAG_ORDER_SALE_REQUEST,
  {
    componentName: 'Main',
    category: Categories.SALES
  },
  [
    RouteObjectHelper.createRouteObject(EntityTypes.BAG_ORDER_SALE_REQUEST,
      {
        componentName: 'List',
        groupDefault: true,
        navbar: true,
        iconClass: 'fa fa-list'
      }
    ),
    RouteObjectHelper.createRouteObject(EntityTypes.BAG_ORDER_SALE_REQUEST,
      {
        componentName: 'Create',
        iconClass: 'fa fa-plus'
      }
    ),
    RouteObjectHelper.createRouteObject(EntityTypes.BAG_ORDER_SALE_REQUEST,
      {
        componentName: 'Edit',
        params: [GlobalEntityIdentifier],
        iconClass: 'fa fa-edit'
      }
    ),
    RouteObjectHelper.createRouteObject(EntityTypes.BAG_ORDER_SALE_REQUEST,
      {
        componentName: 'View',
        params: [GlobalEntityIdentifier],
        iconClass: 'fa fa-eye'
      }
    ),
    RouteObjectHelper.createRouteObject(EntityTypes.BAG_ORDER_SALE_REQUEST,
      {
        componentName: 'Del',
        params: [GlobalEntityIdentifier],
        iconClass: 'fa fa-trash-o'
      }
    )
  ]
))

routeObjects.push(RouteObjectHelper.createRouteObject(EntityTypes.BAG_ORDER_SALE_RECEIPT,
  {
    componentName: 'Main',
    category: Categories.SALES
  },
  [
    RouteObjectHelper.createRouteObject(EntityTypes.BAG_ORDER_SALE_RECEIPT,
      {
        componentName: 'List',
        groupDefault: true,
        navbar: true,
        iconClass: 'fa fa-list'
      }
    ),
    RouteObjectHelper.createRouteObject(EntityTypes.BAG_ORDER_SALE_RECEIPT,
      {
        componentName: 'Create',
        iconClass: 'fa fa-plus'
      }
    ),
    RouteObjectHelper.createRouteObject(EntityTypes.BAG_ORDER_SALE_RECEIPT,
      {
        componentName: 'Edit',
        params: [GlobalEntityIdentifier],
        iconClass: 'fa fa-edit'
      }
    ),
    RouteObjectHelper.createRouteObject(EntityTypes.BAG_ORDER_SALE_RECEIPT,
      {
        componentName: 'View',
        params: [GlobalEntityIdentifier],
        iconClass: 'fa fa-eye'
      }
    ),
    RouteObjectHelper.createRouteObject(EntityTypes.BAG_ORDER_SALE_RECEIPT,
      {
        componentName: 'Del',
        params: [GlobalEntityIdentifier],
        iconClass: 'fa fa-trash-o'
      }
    )
  ]
))

routeObjects.push(RouteObjectHelper.createRouteObject(EntityTypes.BAG_ORDER_PRODUCTION,
  {
    componentName: 'Main',
    category: Categories.PRODUCTION
  },
  [
    RouteObjectHelper.createRouteObject(EntityTypes.BAG_ORDER_PRODUCTION,
      {
        componentName: 'List',
        groupDefault: true,
        navbar: true,
        iconClass: 'fa fa-list'
      }
    ),
    RouteObjectHelper.createRouteObject(EntityTypes.BAG_ORDER_PRODUCTION,
      {
        componentName: 'Create',
        iconClass: 'fa fa-plus'
      }
    ),
    RouteObjectHelper.createRouteObject(EntityTypes.BAG_ORDER_PRODUCTION,
      {
        componentName: 'View',
        params: [GlobalEntityIdentifier],
        iconClass: 'fa fa-eye'
      }
    ),
    RouteObjectHelper.createRouteObject(EntityTypes.BAG_ORDER_PRODUCTION,
      {
        componentName: 'Del',
        params: [GlobalEntityIdentifier],
        iconClass: 'fa fa-trash-o'
      }
    )
  ]
))

routeObjects.push(RouteObjectHelper.createRouteObject(EntityTypes.CLIENT,
  {
    componentName: 'Main',
    category: Categories.SALES
  },
  [
    RouteObjectHelper.createRouteObject(EntityTypes.CLIENT,
      {
        componentName: 'List',
        groupDefault: true,
        categoryDefault: true,
        navbar: true,
        iconClass: 'fa fa-list'
      }
    ),
    RouteObjectHelper.createRouteObject(EntityTypes.CLIENT,
      {
        componentName: 'Create',
        iconClass: 'fa fa-plus'
      }
    ),
    RouteObjectHelper.createRouteObject(EntityTypes.CLIENT,
      {
        componentName: 'Edit',
        params: [GlobalEntityIdentifier],
        iconClass: 'fa fa-edit'
      }
    ),
    RouteObjectHelper.createRouteObject(EntityTypes.CLIENT,
      {
        componentName: 'View',
        params: [GlobalEntityIdentifier],
        iconClass: 'fa fa-eye'
      }
    ),
    RouteObjectHelper.createRouteObject(EntityTypes.CLIENT,
      {
        componentName: 'Del',
        params: [GlobalEntityIdentifier],
        iconClass: 'fa fa-trash-o'
      }
    )
  ]
))

export default routeObjects


