'use client'

import ImageList from '@mui/material/ImageList'

export default function ImageListClient() {
  return (
    <ImageList>
      <li>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="https://images.unsplash.com/photo-1531746020798-e6953c6e8e04" alt="Image" />
      </li>
    </ImageList>
  )
}
