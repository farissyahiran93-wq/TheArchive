/** Project old combined photo/text records as two visual events without rewriting saves. */
export function splitPhotoTranscript<T extends {id:string;text:string;photo?:string}>(lines:T[],include:(line:T)=>boolean=()=>true):T[]{
 return lines.flatMap(line=>line.photo&&line.text&&include(line)?[{...line,text:''},{...line,id:`${line.id}-DIALOGUE`,photo:undefined}]:[line])
}
