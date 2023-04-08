import React from 'react'
import { Image } from 'react-native'

const PhotoPreview: React.FC<{ photo: string }> = ({ photo }) => {
  return <Image className="h-full w-full" source={{ uri: photo }} />
}

export default PhotoPreview
