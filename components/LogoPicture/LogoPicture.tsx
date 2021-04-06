import React from 'react';
import {Image} from 'react-native';


export type LogoPictureProps = {
    image: string,
    size?: number,
}

const LogoPicture = ({image, size = 50}: LogoPictureProps) => {
    return(
        <Image
            source={{ uri: image }}
            style={{
                width: size,
                height: size,
                borderRadius: size,
            }}
        />
    )

}

export default LogoPicture;
