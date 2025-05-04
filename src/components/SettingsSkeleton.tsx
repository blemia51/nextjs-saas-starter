import React from 'react';
import { CONFIG_KEYS } from '@/lib/config-keys'

const SettingsSkeleton: React.FC = () => (
  <div>
    {
      CONFIG_KEYS.map((_, i) => (
        <div key={i} className="flex items-center gap-4">
          <div className="w-1/3 h-10 my-2 bg-gray-200 dark:bg-[#303030] rounded animate-pulse" />
          <div className="flex-1 h-10 bg-gray-200 dark:bg-[#303030] rounded animate-pulse" />
          <div className="w-10 h-10 bg-gray-200 dark:bg-[#303030] rounded animate-pulse" />
        </div>
      ))
    }
  </div>
)
export default SettingsSkeleton