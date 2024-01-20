import React, { useState } from 'react';

const RoundAvatar = ({ name, imageSrc, avatarBg }) => {
    
    const [isImageLoaded, setIsImageLoaded] = useState(false);

    const handleImageLoad = () => {
        setIsImageLoaded(true);
    };

    const getInitials = (name) => {
        return name
            .split(' ')
            .map((part) => part.charAt(0))
            .join('')
            .toUpperCase();
    };

    return (
        <div className="w-40 h-40">
            {imageSrc ? (
                <img
                    src={imageSrc}
                    alt="Avatar"
                    className={`w-full h-full object-cover rounded-full ${isImageLoaded ? 'opacity-100' : 'opacity-0'
                        } transition-opacity`}
                    onLoad={handleImageLoad}
                />
            ) : (
                <div
                    className={`w-full h-full flex items-center justify-center rounded-full text-white text-7xl font-semibold`}
                    style={{backgroundColor:avatarBg}}
                >
                    {getInitials(name)}
                </div>
            )}
        </div>
    );
};

export default RoundAvatar;
