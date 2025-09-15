export function getCoolDate(oldTimestamp: string) {
  let timestamp = new Date(oldTimestamp)
  let day = timestamp.getDate()
  let month = timestamp.getMonth() + 1
  let year = timestamp.getFullYear()
  return (`${day}/${month}/${year}`)
}