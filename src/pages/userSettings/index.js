import React from 'react';
import { Lefter } from '../../widgets/lefter';
import { Righter } from '../../widgets/righter';
import UserSettingsPanel from './userSettingsPanel';

const UserSettings = () => {
  return (
    <div className='page'>
      <Lefter />
      <div className='main'>
        <UserSettingsPanel />
      </div>
      <Righter />
    </div>
  );
}

export default UserSettings;
