import { CLOUDINARY_CLOUD_NAME, CLOUDINARY_POSTS_FOLDER_ID, CLOUDINARY_USERS_FOLDER_ID } from './../config/key'

export const uploadImages = async(files: File[], type: string) => {
  const images = []

  for (const file of files) {
    const formData = new FormData()
    formData.append('file', file)
    type === 'users'
    ? formData.append('upload_preset', `${CLOUDINARY_USERS_FOLDER_ID}`)
    : formData.append('upload_preset', `${CLOUDINARY_POSTS_FOLDER_ID}`)

    try {
      const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/upload`, {
        method: 'POST',
        body: formData
      })
      const data = await res.json()

      images.push(data.secure_url)
    } catch (err: any) {
      console.log(err)
    }
  }

  return images
}