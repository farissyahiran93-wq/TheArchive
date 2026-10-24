export interface StoryClock {
  now:()=>number
  set:(callback:()=>void,delay:number)=>number
  clear:(id:number)=>void
}

/** A browser callback can run before the wall-clock deadline; keep the saved queue armed. */
export function armStoryTick(dueAt:number,tick:()=>void,immediate=false,clock:StoryClock={now:Date.now,set:(fn,ms)=>window.setTimeout(fn,ms),clear:id=>window.clearTimeout(id)}):()=>void {
  if(!Number.isFinite(dueAt))return ()=>{}
  let active=true,handle:number
  const run=()=>{
    if(!active)return
    const remaining=dueAt-clock.now()
    if(!immediate&&remaining>0){handle=clock.set(run,Math.max(1,remaining));return}
    active=false
    tick()
  }
  handle=clock.set(run,immediate?0:Math.max(0,dueAt-clock.now()))
  return ()=>{active=false;clock.clear(handle)}
}
