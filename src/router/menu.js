
//引入页面


const Basic = () => import('@/views/Basic')
const Degree = () => import('@/views/Basic/Degree')
const Face = () => import('@/views/Basic/Face')
const Nation = () => import('@/views/Basic/Nation')
const Place = () => import('@/views/Basic/Place')
const Building = () => import('@/views/Basic/Building')
const LongPeople = () => import('@/views/LongPeople')
const AddP = () => import('@/views/LongPeople/AddP')
const SeaP = () => import('@/views/LongPeople/SeaP')
const TxP = () => import('@/views/LongPeople/TxP')

const ShortPeople = () => import('@/views/ShortPeople')
const SAddP = () => import('@/views/ShortPeople/AddP')
const SSeaP = () => import('@/views/ShortPeople/Seap')

const System = () => import('@/views/System')
const Power = () => import('@/views/System/Power')


const User = () => import('@/views/User')
const Add = () => import('@/views/User/Add')
const New = () => import('@/views/User/New')
const Check = () => import('@/views/User/Check')
const Info = () => import('@/views/User/Info')


export const menu = [

  {
    path: '/basic',
    name: 'basic',
    component: Basic,
    redirect: "/basic/degree",
    meta: {
      title: "基本信息设置",
    },
    children: [
      {
        path: 'degree',
        name: 'degree',
        component: Degree,
        meta: {
          title: "文化程度设置",
        },
      },
      {
        path: 'face',
        name: 'Face',
        component: Face,
        meta: {
          title: "政治面貌设置",
        },
      },
      {
        path: 'place',
        name: 'place',
        component: Place,
        meta: {
          title: "籍贯信息设置",
        },
      },
      {
        path: 'nation',
        name: 'nation',
        component: Nation,
        meta: {
          title: "民族信息设置",
        },
      },
      {
        path: 'building',
        name: 'building',
        component: Building,
        meta: {
          title: "楼牌号设置",
        },
      }


    ]
  },
  {
    path: '/longpeople',
    name: 'longpeople',
    component: LongPeople,
    redirect: "/longpeople/addp",
    meta: {
      title: "常住人口管理",
    },
    children: [

      {
        path: 'addp',
        name: 'addp',
        component: AddP,
        meta: {
          title: "居民户口添加",
        },
        //   props(route){
        //       return {...route.query}
        // }
      },

      {
        path: 'seap',
        name: 'seap',
        component: SeaP,
        meta: {
          title: "居民户口查看",
        },
      },

      {
        path: 'txp',
        name: 'txp',
        component: TxP,
        meta: {
          title: "居民通讯录",
        },
      },


    ]

  },
  {
    path: '/shortpeople',
    name: 'shortpeople',
    component: ShortPeople,
    redirect: "/shortpeople/saddp",
    meta: {
      title: "暂住人口管理",
    },
    children: [

      {
        path: 'saddp',
        name: 'saddp',
        component: SAddP,
        meta: {
          title: "暂住人口添加",
        },

      },

      {
        path: 'sseap',
        name: 'sseap',
        component: SSeaP,
        meta: {
          title: "暂住人口查看",
        },

      },








    ]

  },
  {
    path: '/system',
    name: 'syetem',
    component: System,
    redirect: "/system/power",
    meta: {
      title: "系统管理",
    },
    children: [

      {
        path: 'power',
        name: 'power',
        component: Power,
        meta: {
          title: "管理者权限",
        },

      },










    ]

  },
  {
    path: '/user',
    name: 'user',
    component: User,
    redirect: "/user/add",
    meta: {
      title: "高效功能",
    },
    children: [

      {
        path: 'add',
        name: 'add',
        component: Add,
        meta: {
          title: "个人信息登记",
        },

      },
      {
        path: 'new',
        name: 'new',
        component: New,
        meta: {
          title: "事项进程",
        },

      },

      {
        path: 'check',
        name: 'check',
        component: Check,
        meta: {
          title: "事项审核",
        },

      },
      {
        path: 'info',
        name: 'info',
        component: Info,
        meta: {
          title: "个人中心",
        },

      },










    ]

  },



];

