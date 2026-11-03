import { useEffect, useState } from 'react'
import type { InventoryFinaleV2State } from '../game/inventoryFinaleV2'
export function useCallSubtitleReady(lines:InventoryFinaleV2State['lines']){
  const [now,setNow]=useState(Date.now)
  useEffect(()=>{const update=()=>setNow(Date.now());const timer=window.setInterval(update,200);document.addEventListener('visibilitychange',update);return()=>{window.clearInterval(timer);document.removeEventListener('visibilitychange',update)}},[])
  return lines.length===0||lines[lines.length-1].at<=now
}
