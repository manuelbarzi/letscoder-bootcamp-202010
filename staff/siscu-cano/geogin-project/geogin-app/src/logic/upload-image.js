import { call } from 'geogin-utils'
// import { validatePicture } from './helpers/validations'

export default function (picture, callback) {
//   validatePicture(picture)
  const reader = new window.FileReader()
  reader.readAsBinaryString(picture[0])

  reader.onerror = function () {
    throw new Error('File cannot be opened')
  }

  reader.onload = function () {
    const imageBase64 = window.btoa(reader.result)
    let imageBase64Wrapper = `data:image/gif;base64,${imageBase64}`

    imageBase64Wrapper = imageBase64Wrapper.replace(/(\r\n|\n|\r)/gm, '')

    call('POST', 'http://localhost:4000/api/image-upload',
      { 'Content-type': 'application/json' },
      JSON.stringify({ data: imageBase64Wrapper }),
      (status, response) => {
        console.log(status)
        console.log(response)

        if (response.status === 0) {
          return callback(new Error('server error'))
        } else if (response.status !== 201) {
          const { error } = JSON.parse(response)
          console.log(error)
          return callback(new Error(error))
        }
        const res = JSON.parse(response.body)
        // const {imgUrl} = res.uploadResponse
        console.log(res.uploadResponse.url)
        callback(null, res.uploadResponse.url)
      })
  }
}
