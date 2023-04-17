import React from 'react'
import FastImage from 'react-native-fast-image'

const PhotoPreview: React.FC<{ photo: string }> = ({ photo }) => {
  return <FastImage className="h-full w-full" source={{ uri: photo }} />
}

export default PhotoPreview
