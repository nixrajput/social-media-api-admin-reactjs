import React from 'react'

const Avatar = ({ avatar, width = "40px", height = '40px', fit = 'cover' }) => {
    const style = {
        position: "relative",
        width: width,
        height: height,
        objectFit: fit,
    }

    if (avatar && avatar.url) {
        return (
            <div style={style}>
                <img
                    src={avatar.url}
                    style={style}
                    alt="avatar"
                    width={width}
                    height={height}
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
                width={width}
                height={height}
            />
        </div>
    )
}

export default Avatar;