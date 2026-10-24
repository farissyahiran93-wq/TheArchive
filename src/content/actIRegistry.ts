import { scene04Nodes } from './scene04Final'
import { actIFinalNodes } from './actIFinal'
import { scene01Nodes } from './scene01'
import type { OpeningState } from '../game/types'

const finalNodes = { ...actIFinalNodes, ...scene04Nodes }

/** Historical saves keep their pinned graph. Stable main choice IDs are shared, internal IDs aren't. */
export const actINodes = (scene?: Pick<NonNullable<OpeningState['scene01']>, 'scriptRevision'>) => scene?.scriptRevision === 'final-2026-10-23' ? finalNodes : scene01Nodes
