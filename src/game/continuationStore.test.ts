import {it,expect,vi} from 'vitest'
import {ContinuationFixture} from '../../tests/helpers/continuation'
import {useGameStore} from './store'
vi.mock('./save',async original=>({...await original<typeof import('./save')>(),writeGame:vi.fn().mockResolvedValue(undefined),stagePendingSave:vi.fn(),clearPendingSave:vi.fn()}))
it('uses the packaged preview authorization for background recovery presentation, matching direct actions',()=>{
 const f=new ContinuationFixture().scene13();f.save.chapter2Access!.story!.continuation!.recoveryNotified=false
 const clock=vi.spyOn(Date,'now').mockReturnValue(f.save.chapter2Access!.recovery!.dueAt-1000)
 try{useGameStore.setState({save:f.save,ready:true,recoveryRequired:false});useGameStore.getState().tick();expect(useGameStore.getState().save.chapter2Access!.story!.continuation!.recoveryNotified).toBe(true)}finally{clock.mockRestore()}
})
