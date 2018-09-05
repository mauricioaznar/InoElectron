import RouteObjectHelper from 'renderer/api/functions/RouteObjectHelper'
import EntityTypes from 'renderer/api/EntityTypes'
import Categories from 'renderer/api/Categories'
import GlobalEntityIdentifier from 'renderer/api/functions/GlobalEntityIdentifier'

let routeObjects = []

routeObjects.push(RouteObjectHelper.createRouteObject(EntityTypes.HOME,
  {
    category: Categories.HOME,
    componentName: 'Main'
  },
  [
    RouteObjectHelper.createRouteObject(EntityTypes.HOME, {
      appDefault: true,
      componentName: 'Default',
      categoryDefault: true,
      groupDefault: true,
      navbar: true,
      title: 'Inicio'
    })
  ]
))

routeObjects.push(RouteObjectHelper.createRouteObject(EntityTypes.AUTH,
  {
    category: Categories.AUTH,
    componentName: 'Main'
  },
  [
    RouteObjectHelper.createRouteObject(EntityTypes.AUTH, {
      componentName: 'MyProfile',
      categoryDefault: true,
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

routeObjects.push(RouteObjectHelper.createRouteObject(EntityTypes.PRODUCTION_EVENT,
  {
    componentName: 'Main',
    category: Categories.PRODUCTION
  },
  [
    RouteObjectHelper.createRouteObject(EntityTypes.PRODUCTION_EVENT,
      {
        componentName: 'List',
        groupDefault: true,
        navbar: true
      }
    ),
    RouteObjectHelper.createRouteObject(EntityTypes.PRODUCTION_EVENT,
      {
        componentName: 'Create'
      }
    ),
    RouteObjectHelper.createRouteObject(EntityTypes.PRODUCTION_EVENT,
      {
        componentName: 'Edit',
        params: [GlobalEntityIdentifier]
      }
    ),
    RouteObjectHelper.createRouteObject(EntityTypes.PRODUCTION_EVENT,
      {
        componentName: 'View',
        params: [GlobalEntityIdentifier]
      }
    ),
    RouteObjectHelper.createRouteObject(EntityTypes.PRODUCTION_EVENT,
      {
        componentName: 'ProductionEventReport',
        title: 'Reporte de eventos de produccion',
        navbar: true,
        params: [GlobalEntityIdentifier]
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
        title: 'Ordenes de bolseo',
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
    ),
    RouteObjectHelper.createRouteObject(EntityTypes.BAG_ORDER_PRODUCTION,
      {
        componentName: 'BagReport',
        navbar: true,
        title: 'Reporte de bolseo'
      }
    )
  ]
))

routeObjects.push(RouteObjectHelper.createRouteObject(EntityTypes.ROLL_ORDER_PRODUCTION,
  {
    componentName: 'Main',
    category: Categories.PRODUCTION
  },
  [
    RouteObjectHelper.createRouteObject(EntityTypes.ROLL_ORDER_PRODUCTION,
      {
        componentName: 'List',
        groupDefault: true,
        title: 'Ordenes de extrusion',
        navbar: true
      }
    ),
    RouteObjectHelper.createRouteObject(EntityTypes.ROLL_ORDER_PRODUCTION,
      {
        componentName: 'Create'
      }
    ),
    RouteObjectHelper.createRouteObject(EntityTypes.ROLL_ORDER_PRODUCTION,
      {
        componentName: 'View',
        params: [GlobalEntityIdentifier]
      }
    ),
    RouteObjectHelper.createRouteObject(EntityTypes.ROLL_ORDER_PRODUCTION,
      {
        componentName: 'Edit',
        params: [GlobalEntityIdentifier]
      }
    ),
    RouteObjectHelper.createRouteObject(EntityTypes.ROLL_ORDER_PRODUCTION,
      {
        componentName: 'Del',
        params: [GlobalEntityIdentifier]
      }
    ),
    RouteObjectHelper.createRouteObject(EntityTypes.ROLL_ORDER_PRODUCTION,
      {
        componentName: 'RollReport',
        navbar: true,
        title: 'Reporte de extrusion'
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
    )
  ]
))

routeObjects.push(RouteObjectHelper.createRouteObject(EntityTypes.EMPLOYEE,
  {
    componentName: 'Main',
    category: Categories.PRODUCTION
  },
  [
    RouteObjectHelper.createRouteObject(EntityTypes.EMPLOYEE,
      {
        componentName: 'List',
        groupDefault: true,
        navbar: true
      }
    ),
    RouteObjectHelper.createRouteObject(EntityTypes.EMPLOYEE,
      {
        componentName: 'Create'
      }
    ),
    RouteObjectHelper.createRouteObject(EntityTypes.EMPLOYEE,
      {
        componentName: 'Edit',
        params: [GlobalEntityIdentifier]
      }
    ),
    RouteObjectHelper.createRouteObject(EntityTypes.EMPLOYEE,
      {
        componentName: 'View',
        params: [GlobalEntityIdentifier]
      }
    )
  ]
))

routeObjects.push(RouteObjectHelper.createRouteObject(EntityTypes.COMPANY,
  {
    componentName: 'Main',
    category: Categories.SALES
  },
  [
    RouteObjectHelper.createRouteObject(EntityTypes.COMPANY,
      {
        componentName: 'List',
        groupDefault: true,
        title: 'Empresas',
        navbar: true
      }
    ),
    RouteObjectHelper.createRouteObject(EntityTypes.COMPANY,
      {
        componentName: 'Create',
        title: 'Empresas'
      }
    ),
    RouteObjectHelper.createRouteObject(EntityTypes.COMPANY,
      {
        componentName: 'Edit',
        params: [GlobalEntityIdentifier],
        title: 'Empresas'
      }
    ),
    RouteObjectHelper.createRouteObject(EntityTypes.COMPANY,
      {
        componentName: 'View',
        params: [GlobalEntityIdentifier],
        title: 'Empresas'
      }
    ),
    RouteObjectHelper.createRouteObject(EntityTypes.COMPANY,
      {
        componentName: 'Del',
        params: [GlobalEntityIdentifier],
        title: 'Empresas'
      }
    )
  ]
))

export default routeObjects


