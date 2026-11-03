import { useEffect, useState } from 'react'

/** Render saved dialogue at its authored due time and keep the latest line in view. */
export function usePacedSceneLines<T extends {id:string;at:number}>(lines:T[],sceneNumber:number){
  const [now,setNow]=useState(Date.now)
  const visible=lines.filter(line=>line.at<=now)
  const nextAt=lines.find(line=>line.at>now)?.at
  useEffect(()=>{
    if(nextAt===undefined)return
    const timer=window.setTimeout(()=>setNow(Date.now()),Math.max(30,Math.min(500,nextAt-Date.now())))
    return()=>window.clearTimeout(timer)
  },[nextAt,now])
  useEffect(()=>{
    const target=document.querySelector<HTMLDivElement>(`[data-chapter1-scene="${sceneNumber}"] .c1-scroll`)
    if(!target)return
    const distance=target.scrollHeight-target.clientHeight-target.scrollTop
    if(distance<160||target.scrollTop===0&&visible.length<=2)target.scrollTop=target.scrollHeight
  },[visible.length,sceneNumber])
  return {visible,typing:nextAt!==undefined}
}
