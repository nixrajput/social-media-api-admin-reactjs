import React from 'react'

const CircleAvatar = ({ avatar, size = '40px', fit = 'cover' }) => {
    const style = {
        width: size,
        height: size,
        borderRadius: '50%',
        objectFit: fit,
    }

    if (avatar && avatar.url) {
        return (
            <div style={style}>
                <img
                    src={avatar.url}
                    style={style}
                    alt="avatar"
                    width={size}
                    height={size}
                />
            </div>
        )
    }

    return (
        <div style={style}>
            <img
                src='../../avatar.png'
                style={style}
                alt="avatar"
                width={size}
                height={size}
            />
        </div>
    )
}

export default CircleAvatar;