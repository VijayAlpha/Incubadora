import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
{
    title: 'Dashboard',
    icon: 'layout-outline',
    children: [
      {
        title: 'Dashboard',
        link: '/pages/dashboard',
      }
    ],
  },
  {
    title: 'FEATURES',
    group: true,
  },
];
