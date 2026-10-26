import type {GameSave} from './types'
export const scene09Required=['register-read','finding-aid-read',... [2,3,4,5,6,7,8,9,17].map(n=>'pass-'+n)]
export const scene09Tiles=['entry-number','series-dates','custody-fields','coverage-limit','access-limit']
export const scene09PrivateBoundary=(s:GameSave)=>!s.chapter1?.transferRegister?.privateConsent
export const scene09LocalEligible=(s:GameSave,i:number)=>{
 const p=s.chapter1?.transferRegister;if(!p)return false
 const has=(f:string)=>p.flags.includes(f)
 if(i===1)return true
 if(i>=2&&i<=5)return has('register-read')&&scene09Tiles.slice(0,3).every(f=>p.inspections.includes(f))
 if(i>=6&&i<=10||i===17)return has('register-read')&&has('finding-aid-read')
 if(i===11)return has('register-read')&&has('finding-aid-read')&&has('pass-7')&&has('pass-9')
 if(i===18)return !p.complete&&scene09Required.every(has)&&scene09Tiles.every(f=>p.inspections.includes(f))
 return false
}
