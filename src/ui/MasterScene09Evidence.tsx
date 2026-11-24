import { referenceCardImage } from '../content/masterScene09'
import { NpcPhotoMessage } from './NpcPhotoMessage'

export function SecondaryCardPhoto({onOpen}:{onOpen:()=>void}) {
 return <NpcPhotoMessage src={referenceCardImage} alt="Photograph of a Greyhaven secondary reference card" sender="Maya" onOpen={onOpen}/>
}
