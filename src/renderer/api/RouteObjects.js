import RouteObjectHelper from 'renderer/api/functions/RouteObjectHelper'
import EntityTypes from 'renderer/api/EntityTypes'
import Categories from 'renderer/api/Categories'
import GlobalEntityIdentifier from 'renderer/api/functions/GlobalEntityIdentifier'

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

routeObjects.push(RouteObjectHelper.createRouteObject(EntityTypes.PRODUCT,
  {
    componentName: 'Main',
    category: Categories.PRODUCTION
  },
  [
    RouteObjectHelper.createRouteObject(EntityTypes.PRODUCT,
      {
        appDefault: true,
        componentName: 'List',
        categoryDefault: true,
        groupDefault: true,
        navbar: true
      }
    ),
    RouteObjectHelper.createRouteObject(EntityTypes.PRODUCT,
      {
        componentName: 'Create'
      }
    ),
    RouteObjectHelper.createRouteObject(EntityTypes.PRODUCT,
      {
        componentName: 'Edit',
        params: [GlobalEntityIdentifier]
      }
    ),
    RouteObjectHelper.createRouteObject(EntityTypes.PRODUCT,
      {
        componentName: 'View',
        params: [GlobalEntityIdentifier]
      }
    ),
    RouteObjectHelper.createRouteObject(EntityTypes.PRODUCT,
      {
        componentName: 'GetInventory',
        navbar: true,
        title: 'Inventario'
      }
    )
  ]
))

routeObjects.push(RouteObjectHelper.createRouteObject(EntityTypes.ORDER_ADJUSTMENT,
  {
    componentName: 'Main',
    category: Categories.PRODUCTION
  },
  [
    RouteObjectHelper.createRouteObject(EntityTypes.ORDER_ADJUSTMENT,
      {
        componentName: 'List',
        groupDefault: true,
        navbar: true
      }
    ),
    RouteObjectHelper.createRouteObject(EntityTypes.ORDER_ADJUSTMENT,
      {
        componentName: 'Create'
      }
    ),
    RouteObjectHelper.createRouteObject(EntityTypes.ORDER_ADJUSTMENT,
      {
        componentName: 'View',
        params: [GlobalEntityIdentifier]
      }
    ),
    RouteObjectHelper.createRouteObject(EntityTypes.ORDER_ADJUSTMENT,
      {
        componentName: 'Edit',
        params: [GlobalEntityIdentifier]
      }
    )
  ]
))

routeObjects.push(RouteObjectHelper.createRouteObject(EntityTypes.ORDER_SALE_REQUEST,
  {
    componentName: 'Main',
    category: Categories.SALES
  },
  [
    RouteObjectHelper.createRouteObject(EntityTypes.ORDER_SALE_REQUEST,
      {
        componentName: 'List',
        groupDefault: true,
        navbar: true
      }
    ),
    RouteObjectHelper.createRouteObject(EntityTypes.ORDER_SALE_REQUEST,
      {
        componentName: 'Calendar',
        title: 'Calendario',
        navbar: true
      }
    ),
    RouteObjectHelper.createRouteObject(EntityTypes.ORDER_SALE_REQUEST,
      {
        componentName: 'Create'
      }
    ),
    RouteObjectHelper.createRouteObject(EntityTypes.ORDER_SALE_REQUEST,
      {
        componentName: 'Edit',
        params: [GlobalEntityIdentifier]
      }
    ),
    RouteObjectHelper.createRouteObject(EntityTypes.ORDER_SALE_REQUEST,
      {
        componentName: 'View',
        params: [GlobalEntityIdentifier]
      }
    ),
    RouteObjectHelper.createRouteObject(EntityTypes.ORDER_SALE_REQUEST,
      {
        componentName: 'Del',
        params: [GlobalEntityIdentifier]
      }
    )
  ]
))

routeObjects.push(RouteObjectHelper.createRouteObject(EntityTypes.ORDER_SALE_RECEIPT,
  {
    componentName: 'Main',
    category: Categories.SALES
  },
  [
    RouteObjectHelper.createRouteObject(EntityTypes.ORDER_SALE_RECEIPT,
      {
        componentName: 'List',
        groupDefault: true,
        navbar: true
      }
    ),
    RouteObjectHelper.createRouteObject(EntityTypes.ORDER_SALE_RECEIPT,
      {
        componentName: 'Dashboard',
        title: 'Reportes',
        navbar: true
      }
    ),
    RouteObjectHelper.createRouteObject(EntityTypes.ORDER_SALE_RECEIPT,
      {
        componentName: 'Create'
      }
    ),
    RouteObjectHelper.createRouteObject(EntityTypes.ORDER_SALE_RECEIPT,
      {
        componentName: 'Edit',
        params: [GlobalEntityIdentifier]
      }
    ),
    RouteObjectHelper.createRouteObject(EntityTypes.ORDER_SALE_RECEIPT,
      {
        componentName: 'View',
        params: [GlobalEntityIdentifier]
      }
    ),
    RouteObjectHelper.createRouteObject(EntityTypes.ORDER_SALE_RECEIPT,
      {
        componentName: 'Del',
        params: [GlobalEntityIdentifier]
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
        navbar: true
      }
    ),
    RouteObjectHelper.createRouteObject(EntityTypes.BAG_ORDER_PRODUCTION,
      {
        componentName: 'Create'
      }
    ),
    RouteObjectHelper.createRouteObject(EntityTypes.BAG_ORDER_PRODUCTION,
      {
        componentName: 'View',
        params: [GlobalEntityIdentifier]
      }
    ),
    RouteObjectHelper.createRouteObject(EntityTypes.BAG_ORDER_PRODUCTION,
      {
        componentName: 'Edit',
        params: [GlobalEntityIdentifier]
      }
    ),
    RouteObjectHelper.createRouteObject(EntityTypes.BAG_ORDER_PRODUCTION,
      {
        componentName: 'Del',
        params: [GlobalEntityIdentifier]
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
        navbar: true
      }
    ),
    RouteObjectHelper.createRouteObject(EntityTypes.CLIENT,
      {
        componentName: 'Create'
      }
    ),
    RouteObjectHelper.createRouteObject(EntityTypes.CLIENT,
      {
        componentName: 'Edit',
        params: [GlobalEntityIdentifier]
      }
    ),
    RouteObjectHelper.createRouteObject(EntityTypes.CLIENT,
      {
        componentName: 'View',
        params: [GlobalEntityIdentifier]
      }
    ),
    RouteObjectHelper.createRouteObject(EntityTypes.CLIENT,
      {
        componentName: 'Del',
        params: [GlobalEntityIdentifier]
      }
    )
  ]
))

export default routeObjects


