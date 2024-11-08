
const imageForm = document.querySelector("#form")
const imageInput = document.querySelector("#input")

imageForm.addEventListener("submit", async event => {
  event.preventDefault()
  const file = imageInput.files[0]

  // get secure url from our server
  const { url } = await fetch("http://127.0.0.1:8080/s3Url").then(res => res.json())
  console.log("Pre-signed URL: " + url)

  // post the image direclty to the s3 bucket
  await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "multipart/form-data"
    },
    body: file
  })

  const imageUrl = url.split('?')[0]
  console.log("Image URL :" + imageUrl)

  // post requst to the server to post the metadata of image


  const img = document.createElement("img")
  img.src = imageUrl
  document.body.appendChild(img)
})