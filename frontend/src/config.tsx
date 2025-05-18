import React from 'react';
import { Icon } from '@rsuite/icons';
import { VscTable, VscCalendar } from 'react-icons/vsc';
import { MdFingerprint, MdDashboard, MdModeEditOutline } from 'react-icons/md';
import CubesIcon from '@rsuite/icons/legacy/Cubes';

export const appNavs = [
  {
    eventKey: 'dashboard',
    icon: <Icon as={MdDashboard} />,
    title: 'Dashboard',
    to: '/dashboard'
  },

  {
    eventKey: 'tables',
    icon: <Icon as={VscTable} />,
    title: 'Tables',
    to: '/table-members',
    children: [
      {
        eventKey: 'members',
        title: 'Members',
        to: '/table-members'
      },

    ]
  },
  

  
];
