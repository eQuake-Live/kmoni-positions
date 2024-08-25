//       -----------------
//       | クソコード注意！ |
//       -- --------------
//         V
//        💩
//        /T\  クソコード注意マン
//         |
//        🦵🦵

import 'virtual:uno.css'
import '@unocss/reset/tailwind.css'
import { getJST } from './date'
import { getClickedPos, getImagePosFromPagePos } from './clicked'

const getById = <T extends typeof Element>(
  id: string,
  type: T,
): T['prototype'] => {
  const elem = document.getElementById(id)
  if (elem instanceof type) {
    return elem
  }
  throw new TypeError('Element type is invalid.')
}

const sindo = getById('sindo', HTMLImageElement)
const positions = getById('positions', HTMLDivElement)
const exportAsJSON = getById('exportAsJSON', HTMLButtonElement)

setInterval(() => {
  const jst = new Date(getJST().getTime() - 3000)

  const yyyymmdd = `${jst.getFullYear().toString()}${(jst.getMonth() + 1).toString().padStart(2, '0')}${jst.getDate().toString().padStart(2, '0')}`
  const hhmmss = `${jst.getHours().toString().padStart(2, '0')}${jst.getMinutes().toString().padStart(2, '0')}${jst.getSeconds().toString().padStart(2, '0')}`

  sindo.src = `/kmoni/data/map_img/RealTimeImg/jma_s/${yyyymmdd}/${yyyymmdd}${hhmmss}.jma_s.gif`
}, 1000)

const POINTER_SIZE = 3

const addXY = (x: number, y: number) => {
  const elem = document.createElement('div')
  elem.className = 'rounded-full bg-[#f003] absolute grid place-items-center'
  elem.style.padding = `${POINTER_SIZE}px`

  const detail = document.createElement('div')
  detail.className = 'rounded-full bg-red-500 p-[0.5px]'
  elem.appendChild(detail)

  const { pageX, pageY } = getImagePosFromPagePos(sindo, x, y)
  elem.style.left = `${pageX - POINTER_SIZE}px`
  elem.style.top = `${pageY - POINTER_SIZE}px`

  elem.onclick = () => {
    const lastClicked = Number.parseInt(elem.dataset.lastClicked ?? '0')
    const now = new Date().getTime()

    if (now - lastClicked < 200) {
      elem.remove()
    }
    elem.dataset.lastClicked = now.toString()
  }
  elem.dataset.x = x.toString()
  elem.dataset.y = y.toString()

  positions.appendChild(elem)
}

sindo.onclick = (evt) => {
  const [x, y] = getClickedPos(evt)
  addXY(x, y)
}

const exportData = () => {
  const result: [number, number][] = []
  for (const child of positions.children) {
    const elem = child as HTMLDivElement
    const x = Number.parseInt(elem.dataset.x ?? '0')
    const y = Number.parseInt(elem.dataset.y ?? '0')
    result.push([x, y])
  }
  result.sort((a, b) => (a[0] * 1000 + a[1]) - (b[0] * 1000 + b[1]))
  result.filter(([x, y]) => x < 10 && y < 10)
  return result
}

exportAsJSON.addEventListener('click', () => {
  const data = exportData()

  // JSON.stringify(data, null, 2) より美しい JSON
  const json = `[\n${data.map(([x, y]) => `  [${x}, ${y}]`).join(',\n')}\n]\n`

  exportAsJSON.textContent = 'Saving...'
  exportAsJSON.disabled = true
  fetch('/save', {
    method: 'POST',
    body: json,
  }).then(() => {
    exportAsJSON.textContent = 'Save JSON'
    exportAsJSON.disabled = false
  })

  /*const blob = new Blob([json], {
    type: 'application/json'
  })
  const url = URL.createObjectURL(blob)
  const anchor = document.createElement('a')
  anchor.href = url
  anchor.download = 'equake-positions.json'
  anchor.click()
  anchor.remove()
  URL.revokeObjectURL(url)*/
})

const SESSION_SAVE_KEY = 'EQUAKE_POSITIONS'
sindo.onload = async () => {
  for (const [x, y] of JSON.parse(
    sessionStorage.getItem(SESSION_SAVE_KEY) ?? await fetch('/get').then(res => res.text()),
  )) {
    if (x < 20 && y < 20) {
      continue
    }
    addXY(x, y)
  }
  // 絶対変更時の方がいい
  setInterval(() => {
    sessionStorage.setItem(SESSION_SAVE_KEY, JSON.stringify(exportData()))
  }, 1000)

  sindo.onload = null
}
