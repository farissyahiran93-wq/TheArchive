/** In-game installation timing; independent from archive recovery. */
export const traceInstallDuration = 6000
const frames = [[0,0],[900,18],[1800,38],[3100,59],[4300,78],[5400,95],[6000,100]] as const
export function traceInstallationProgress(startedAt:number, now:number):number {
  const elapsed=Math.max(0,now-startedAt)
  if(elapsed>=traceInstallDuration)return 100
  for(let i=1;i<frames.length;i++){
    const [end,value]=frames[i], [start,previous]=frames[i-1]
    if(elapsed<end)return Math.floor(previous+(value-previous)*(elapsed-start)/(end-start))
  }
  return 100
}
export function traceInstallationLabel(progress:number):string {
  return progress<20?'Preparing secure environment':progress<40?'Installing core components':progress<60?'Configuring encrypted workspace':progress<80?'Initializing recovery modules':progress<100?'Verifying installation':'Installation complete'
}
