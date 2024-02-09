import React from 'react';

const NavbarSkeletonLoader = () => {
  return (
    <div className="flex items-center justify-between p-4 animate-pulse">
      <div className="h-8 bg-gray-300 rounded w-36"></div> {/* Logo placeholder */}

      <div className="flex space-x-4">
        <div className="h-8 w-16 bg-gray-300 rounded"></div>
      </div>
    </div>
  );
};

export default NavbarSkeletonLoader;
