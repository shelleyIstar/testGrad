import dynamic from 'dva/dynamic';

// wrapper of dynamic
const dynamicWrapper = (app, models, component) => dynamic({
  app,
  models: () => models.map(m => import(`../models/${m}.js`)),
  component,
});

// nav data
export const getNavData = app => [
  {
    component: dynamicWrapper(app, ['user', 'login'], () => import('../layouts/BasicLayout')),
    layout: 'BasicLayout',
    name: '首页', // for breadcrumb
    path: '/',
    children: [
      {
        name: 'Dashboard',
        icon: 'dashboard',
        path: 'dashboard',
        children: [
          {
            name: '管理工作台',
            path: 'workplace',
            component: dynamicWrapper(app, ['project', 'activities', 'chart'], () => import('../routes/Dashboard/Workplace')),
          },
          {
            name: '数据分析页',
            path: 'analysis',
            component: dynamicWrapper(app, ['chart'], () => import('../routes/Dashboard/Analysis')),
          },
          // {
          //   name: '数据监控页',
          //   path: 'monitor',
          //   component: dynamicWrapper(app, ['monitor'], () => import('../routes/Dashboard/Monitor')),
          // },
        ],
      },
      {
        name: '文章页',
        path: 'form',
        icon: 'form',
        children: [
          {
            name: '文章提交',
            path: 'step-form',
            component: dynamicWrapper(app, ['form'], () => import('../routes/Forms/StepForm')),
            children: [
              {
                path: 'confirm',
                component: dynamicWrapper(app, ['form'], () => import('../routes/Forms/StepForm/Step2')),
              },
              {
                path: 'result',
                component: dynamicWrapper(app, ['form'], () => import('../routes/Forms/StepForm/Step3')),
              },
            ],
          },
        ],
      },
      {
        name: '信息汇总',
        path: 'list',
        icon: 'table',
        children: [
          {
            name: '学生信息',
            path: 'table-list',
            component: dynamicWrapper(app, ['rule'], () => import('../routes/List/TableList')),
          },
          {
            name: '问题列表',
            path: 'basic-list',
            component: dynamicWrapper(app, ['list'], () => import('../routes/List/BasicList')),
          },
          {
            name: '小程序项目',
            path: 'card-list',
            component: dynamicWrapper(app, ['list'], () => import('../routes/List/CardList')),
          },
          // {
          //   name: '搜索列表（项目）',
          //   path: 'cover-card-list',
          //   component: dynamicWrapper(app, ['list'], () => import('../routes/List/CoverCardList')),
          // },
          // {
          //   name: '搜索列表（应用）',
          //   path: 'filter-card-list',
          //   component: dynamicWrapper(app, ['list'], () => import('../routes/List/FilterCardList')),
          // },
          // {
          //   name: '搜索列表（文章）',
          //   path: 'search',
          //   component: dynamicWrapper(app, ['list'], () => import('../routes/List/SearchList')),
          // },
        ],
      },
      {
        name: '详情页',
        path: 'profile',
        icon: 'profile',
        children: [
          {
            name: '学生详情页',
            path: 'advanced',
            component: dynamicWrapper(app, ['rule'], () => import('../routes/Profile/AdvancedProfile')),
          },
        ],
      },
      // {
      //   name: '结果',
      //   path: 'result',
      //   icon: 'check-circle-o',
      //   children: [
      //     {
      //       name: '成功',
      //       path: 'success',
      //       component: dynamicWrapper(app, [], () => import('../routes/Result/Success')),
      //     },
      //     {
      //       name: '失败',
      //       path: 'fail',
      //       component: dynamicWrapper(app, [], () => import('../routes/Result/Error')),
      //     },
      //   ],
      // },
      // {
      //   name: '异常',
      //   path: 'exception',
      //   icon: 'warning',
      //   children: [
      //     {
      //       name: '403',
      //       path: '403',
      //       component: dynamicWrapper(app, [], () => import('../routes/Exception/403')),
      //     },
      //     {
      //       name: '404',
      //       path: '404',
      //       component: dynamicWrapper(app, [], () => import('../routes/Exception/404')),
      //     },
      //     {
      //       name: '500',
      //       path: '500',
      //       component: dynamicWrapper(app, [], () => import('../routes/Exception/500')),
      //     },
      //   ],
      // },
    ],
  },
  {
    component: dynamicWrapper(app, [], () => import('../layouts/UserLayout')),
    path: '/user',
    layout: 'UserLayout',
    children: [
      {
        name: '帐户',
        icon: 'user',
        path: 'user',
        children: [
          {
            name: '登录',
            path: 'login',
            component: dynamicWrapper(app, ['login'], () => import('../routes/User/Login')),
          },
          {
            name: '注册',
            path: 'register',
            component: dynamicWrapper(app, ['register'], () => import('../routes/User/Register')),
          },
          {
            name: '注册结果',
            path: 'register-result',
            component: dynamicWrapper(app, [], () => import('../routes/User/RegisterResult')),
          },
        ],
      },
    ],
  },
];
