export const getClickedPos = (evt: MouseEvent) => {
  const target = evt.currentTarget as HTMLImageElement
  const rect = target.getBoundingClientRect()
  const x = evt.clientX - rect.left
  const y = evt.clientY - rect.top

  // 画像の元のサイズ
  const originalWidth = target.naturalWidth
  const originalHeight = target.naturalHeight

  // 画像の表示サイズ
  const displayedWidth = rect.width
  const displayedHeight = rect.height

  // 拡大縮小を考慮した座標の計算
  const xRatio = originalWidth / displayedWidth
  const yRatio = originalHeight / displayedHeight

  const originalX = x * xRatio
  const originalY = y * yRatio

  return [originalX, originalY]
}
export const getImagePosFromPagePos = (
  img: HTMLImageElement,
  imgX: number,
  imgY: number,
) => {
  // 画像の表示領域の情報を取得
  const rect = img.getBoundingClientRect()

  // 画像の元のサイズと表示サイズの比率を計算
  const originalWidth = img.naturalWidth
  const originalHeight = img.naturalHeight

  const displayedWidth = rect.width
  const displayedHeight = rect.height

  const xRatio = displayedWidth / originalWidth
  const yRatio = displayedHeight / originalHeight

  // 画像内の座標から、表示領域内での座標を計算
  const displayedX = imgX * xRatio
  const displayedY = imgY * yRatio

  // ページ左上からの座標を計算
  const pageX = rect.left + displayedX + window.scrollX
  const pageY = rect.top + displayedY + window.scrollY

  return { pageX, pageY }
}
