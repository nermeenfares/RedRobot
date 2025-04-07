import React from 'react';

interface LoadingProps {
  size?: 'sm' | 'md' | 'lg';
}

const Loading: React.FC<LoadingProps> = ({ size = 'md' }) => {
  const sizeClasses = {
    sm: 'h-4 w-4 border-2',
    md: 'h-8 w-8 border-4',
    lg: 'h-12 w-12 border-4',
  };

  return (
    <div className="flex items-center justify-center">
      <div
        className={`animate-spin rounded-full border-solid border-gray-300 border-t-blue-500 ${sizeClasses[size]}`}
      />
    </div>
  );
};

export default Loading;