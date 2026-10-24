import {expect,it,vi} from 'vitest'
import {armStoryTick,type StoryClock} from './storyTimer'

function clockAt(start:number){let now=start;const tasks:{run:()=>void;delay:number}[]=[],clear=vi.fn();const clock:StoryClock={now:()=>now,set:(run,delay)=>{tasks.push({run,delay});return tasks.length},clear};return {clock,tasks,clear,at:(value:number)=>{now=value}}}

it('re-arms an early callback instead of dropping the queue, without moving the exact saved deadline',()=>{
  const c=clockAt(100),tick=vi.fn()
  armStoryTick(5600,tick,false,c.clock)
  expect(c.tasks[0].delay).toBe(5500)
  c.at(5599);c.tasks[0].run();expect(tick).not.toHaveBeenCalled();expect(c.tasks[1].delay).toBe(1)
  c.at(5600);c.tasks[1].run();expect(tick).toHaveBeenCalledTimes(1)
  c.tasks[1].run();expect(tick).toHaveBeenCalledTimes(1)
})
it('cancels both scheduled and already-queued callbacks when a chat or queue is paused',()=>{
  const c=clockAt(1),tick=vi.fn(),cancel=armStoryTick(100,tick,false,c.clock)
  cancel();c.at(100);c.tasks[0].run();expect(tick).not.toHaveBeenCalled();expect(c.clear).toHaveBeenCalledWith(1)
})
it('preserves the existing explicit reduced-motion immediate mode',()=>{
  const c=clockAt(1),tick=vi.fn();armStoryTick(100,tick,true,c.clock)
  expect(c.tasks[0].delay).toBe(0);c.tasks[0].run();expect(tick).toHaveBeenCalledTimes(1)
})
it('does not schedule a timer for an empty queue',()=>{
  const c=clockAt(1);armStoryTick(Infinity,vi.fn(),false,c.clock)();expect(c.tasks).toEqual([])
})
