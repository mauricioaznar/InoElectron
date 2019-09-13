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
    }),
    RouteObjectHelper.createRouteObject(EntityTypes.HOME, {
      componentName: 'Analytics',
      navbar: true,
      title: 'Analytics'
    }),
    RouteObjectHelper.createRouteObject(EntityTypes.HOME,
      {
        componentName: 'Calendar',
        title: 'Calendario',
        navbar: true
      }
    )
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
      componentName: 'UserManual',
      navbar: true,
      title: 'Manual de usuario'
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

routeObjects.push(RouteObjectHelper.createRouteObject(EntityTypes.ORDER_RETURN,
  {
    componentName: 'Main',
    category: Categories.PRODUCTION
  },
  [
    RouteObjectHelper.createRouteObject(EntityTypes.ORDER_RETURN,
      {
        componentName: 'List',
        groupDefault: true,
        navbar: true
      }
    ),
    RouteObjectHelper.createRouteObject(EntityTypes.ORDER_RETURN,
      {
        componentName: 'Create'
      }
    ),
    RouteObjectHelper.createRouteObject(EntityTypes.ORDER_RETURN,
      {
        componentName: 'View',
        params: [GlobalEntityIdentifier]
      }
    ),
    RouteObjectHelper.createRouteObject(EntityTypes.ORDER_RETURN,
      {
        componentName: 'Edit',
        params: [GlobalEntityIdentifier]
      }
    )
  ]
))

routeObjects.push(RouteObjectHelper.createRouteObject(EntityTypes.ORDER_REQUEST,
  {
    componentName: 'Main',
    category: Categories.SALES
  },
  [
    RouteObjectHelper.createRouteObject(EntityTypes.ORDER_REQUEST,
      {
        componentName: 'List',
        groupDefault: true,
        navbar: true
      }
    ),
    RouteObjectHelper.createRouteObject(EntityTypes.ORDER_REQUEST,
      {
        componentName: 'Create'
      }
    ),
    RouteObjectHelper.createRouteObject(EntityTypes.ORDER_REQUEST,
      {
        componentName: 'Edit',
        params: [GlobalEntityIdentifier]
      }
    ),
    RouteObjectHelper.createRouteObject(EntityTypes.ORDER_REQUEST,
      {
        componentName: 'View',
        params: [GlobalEntityIdentifier]
      }
    )
  ]
))

routeObjects.push(RouteObjectHelper.createRouteObject(EntityTypes.ORDER_SALE,
  {
    componentName: 'Main',
    category: Categories.SALES
  },
  [
    RouteObjectHelper.createRouteObject(EntityTypes.ORDER_SALE,
      {
        componentName: 'List',
        groupDefault: true,
        navbar: true
      }
    ),
    RouteObjectHelper.createRouteObject(EntityTypes.ORDER_SALE,
      {
        componentName: 'Create'
      }
    ),
    RouteObjectHelper.createRouteObject(EntityTypes.ORDER_SALE,
      {
        componentName: 'Edit',
        params: [GlobalEntityIdentifier]
      }
    ),
    RouteObjectHelper.createRouteObject(EntityTypes.ORDER_SALE,
      {
        componentName: 'View',
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
    )
  ]
))

routeObjects.push(RouteObjectHelper.createRouteObject(EntityTypes.CLIENT_CONTACT,
  {
    componentName: 'Main',
    category: Categories.SALES
  },
  [
    RouteObjectHelper.createRouteObject(EntityTypes.CLIENT_CONTACT,
      {
        componentName: 'List',
        groupDefault: true,
        categoryDefault: true,
        navbar: true
      }
    ),
    RouteObjectHelper.createRouteObject(EntityTypes.CLIENT_CONTACT,
      {
        componentName: 'Create'
      }
    ),
    RouteObjectHelper.createRouteObject(EntityTypes.CLIENT_CONTACT,
      {
        componentName: 'Edit',
        params: [GlobalEntityIdentifier]
      }
    ),
    RouteObjectHelper.createRouteObject(EntityTypes.CLIENT_CONTACT,
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
    category: Categories.HUMAN_RESOURCES
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

routeObjects.push(RouteObjectHelper.createRouteObject(EntityTypes.EMPLOYEE_ATTENDANCE,
  {
    componentName: 'Main',
    category: Categories.HUMAN_RESOURCES
  },
  [
    RouteObjectHelper.createRouteObject(EntityTypes.EMPLOYEE_ATTENDANCE,
      {
        componentName: 'List'
      }
    ),
    RouteObjectHelper.createRouteObject(EntityTypes.EMPLOYEE_ATTENDANCE,
      {
        componentName: 'BlockList',
        groupDefault: true,
        categoryDefault: true,
        navbar: true
      }
    ),
    RouteObjectHelper.createRouteObject(EntityTypes.EMPLOYEE_ATTENDANCE,
      {
        componentName: 'Create'
      }
    ),
    RouteObjectHelper.createRouteObject(EntityTypes.EMPLOYEE_ATTENDANCE,
      {
        componentName: 'Edit',
        params: [GlobalEntityIdentifier]
      }
    ),
    RouteObjectHelper.createRouteObject(EntityTypes.EMPLOYEE_ATTENDANCE,
      {
        componentName: 'View',
        params: [GlobalEntityIdentifier]
      }
    )
  ]
))

routeObjects.push(RouteObjectHelper.createRouteObject(EntityTypes.MACHINE,
  {
    componentName: 'Main',
    category: Categories.PRODUCTION
  },
  [
    RouteObjectHelper.createRouteObject(EntityTypes.MACHINE,
      {
        componentName: 'List',
        groupDefault: true,
        navbar: true
      }
    ),
    RouteObjectHelper.createRouteObject(EntityTypes.MACHINE,
      {
        componentName: 'Create'
      }
    ),
    RouteObjectHelper.createRouteObject(EntityTypes.MACHINE,
      {
        componentName: 'Edit',
        params: [GlobalEntityIdentifier]
      }
    ),
    RouteObjectHelper.createRouteObject(EntityTypes.MACHINE,
      {
        componentName: 'View',
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
        title: 'Clientes',
        navbar: true
      }
    ),
    RouteObjectHelper.createRouteObject(EntityTypes.CLIENT,
      {
        componentName: 'Create',
        title: 'Clientes'
      }
    ),
    RouteObjectHelper.createRouteObject(EntityTypes.CLIENT,
      {
        componentName: 'Edit',
        params: [GlobalEntityIdentifier],
        title: 'Clientes'
      }
    ),
    RouteObjectHelper.createRouteObject(EntityTypes.CLIENT,
      {
        componentName: 'View',
        params: [GlobalEntityIdentifier],
        title: 'Clientes'
      }
    )
  ]
))

routeObjects.push(RouteObjectHelper.createRouteObject(EntityTypes.EXPENSE,
  {
    componentName: 'Main',
    category: Categories.ADMINISTRATION
  },
  [
    RouteObjectHelper.createRouteObject(EntityTypes.EXPENSE,
      {
        componentName: 'List',
        groupDefault: true,
        navbar: true,
        categoryDefault: true
      }
    ),
    RouteObjectHelper.createRouteObject(EntityTypes.EXPENSE,
      {
        componentName: 'InvoiceList',
        title: 'Facturas',
        navbar: true
      }
    ),
    RouteObjectHelper.createRouteObject(EntityTypes.EXPENSE,
      {
        componentName: 'Create'
      }
    ),
    RouteObjectHelper.createRouteObject(EntityTypes.EXPENSE,
      {
        componentName: 'Edit',
        params: [GlobalEntityIdentifier]
      }
    ),
    RouteObjectHelper.createRouteObject(EntityTypes.EXPENSE,
      {
        componentName: 'View',
        params: [GlobalEntityIdentifier]
      }
    )
  ]
))

routeObjects.push(RouteObjectHelper.createRouteObject(EntityTypes.SUPPLIER,
  {
    componentName: 'Main',
    category: Categories.ADMINISTRATION
  },
  [
    RouteObjectHelper.createRouteObject(EntityTypes.SUPPLIER,
      {
        componentName: 'List',
        groupDefault: true,
        navbar: true
      }
    ),
    RouteObjectHelper.createRouteObject(EntityTypes.SUPPLIER,
      {
        componentName: 'Create'
      }
    ),
    RouteObjectHelper.createRouteObject(EntityTypes.SUPPLIER,
      {
        componentName: 'Edit',
        params: [GlobalEntityIdentifier]
      }
    ),
    RouteObjectHelper.createRouteObject(EntityTypes.SUPPLIER,
      {
        componentName: 'View',
        params: [GlobalEntityIdentifier]
      }
    )
  ]
))


export default routeObjects


