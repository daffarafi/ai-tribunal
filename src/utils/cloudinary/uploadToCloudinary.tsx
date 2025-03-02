export const uploadToCloudinary = async (
  base64Image: string,
  preset: string
) => {
  const cloudName = 'dva9njnya' // Ganti dengan Cloudinary Cloud Name Anda
  const uploadPreset = preset // Buat upload preset di Cloudinary
  const apiUrl = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`

  const formData = new FormData()
  formData.append('file', base64Image)
  formData.append('upload_preset', uploadPreset)

  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      body: formData,
    })

    const data = await response.json()
    return data.secure_url // URL gambar yang sudah diunggah
  } catch (error) {
    console.error('Upload ke Cloudinary gagal:', error)
    return null
  }
}
