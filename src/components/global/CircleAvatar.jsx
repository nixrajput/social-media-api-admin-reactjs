import React from 'react'

const CircleAvatar = ({ avatar, size = '40px', fit = 'cover' }) => {
    const style = {
        position: "relative",
        width: size,
        height: size,
        borderRadius: '50%',
        objectFit: fit,
        overflow: 'hidden',
        backgroundColor: '#a0a0a0',
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
                src='../../male_avatar.svg'
                style={style}
                alt="avatar"
                width={size}
                height={size}
            />
        </div>
    )
}

export default CircleAvatar;