import { useEffect, useLayoutEffect, useRef } from 'react'
const handlers:{run:()=>void}[]=[]
export function handlePhoneBack():boolean {
  const current=handlers.at(-1)
  if(!current)return false
  current.run();return true
}
/** Last-opened media/profile views get Back before their containing conversation. */
export function usePhoneBack(handle:()=>void,enabled=true){
  const current=useRef(handle)
  useLayoutEffect(()=>{current.current=handle},[handle])
  useEffect(()=>{
    if(!enabled)return
    const entry={run:()=>current.current()};handlers.push(entry)
    return()=>{const index=handlers.indexOf(entry);if(index>=0)handlers.splice(index,1)}
  },[enabled])
}
