import React from 'react'
import LinearGradient from 'react-native-linear-gradient'

const GradientView = () => {
  return (
    <LinearGradient
    style={{position: 'absolute', top: 0, bottom: 0, left: 0, right: 0}}
    colors={['#18213e', '#453a8e', '#9242a9']}
  />
  )
}

export default GradientView