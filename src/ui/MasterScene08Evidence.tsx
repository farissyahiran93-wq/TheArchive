import { mayaCaptureLines } from '../content/mayaConversationV3'

export function MasterCapturePreview({expanded=false}:{expanded?:boolean}){
 const lines=expanded?mayaCaptureLines:mayaCaptureLines.slice(5)
 return <div className="maya-message-capture" aria-label="Maya’s saved message screenshot">
  <header><span aria-hidden="true">‹</span><b aria-hidden="true">D</b><strong>Daniel</strong></header>
  <div className="maya-captured-exchange">{lines.map((line,index)=><div key={index} className={line.sender==='maya'?'capture-sent':'capture-received'}>
   {'time' in line&&<time>{line.time}</time>}<p><span className="sr-only">{line.sender==='maya'?'Maya: ':'Daniel: '}</span>{line.text}</p>
  </div>)}</div>
 </div>
}
